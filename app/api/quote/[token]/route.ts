import { NextResponse } from "next/server";
import { sendQuoteResponseNotice } from "@/lib/mailer";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";
import { isPublicToken } from "@/lib/public-token";
import { cleanCustomerText, quoteState } from "@/lib/quote-status";
import { QUOTE_VALID_DAYS } from "@/lib/customer-quotes";

export const runtime = "nodejs";

/**
 * Nov 2026: the customer's answer on their private quote page.
 * { "action": "accept", "name": "...", "confirm": true }  or  { "action": "ask", "message": "..." }
 * Zbot HQ's Sales agent reads acceptedAt / customerMessageAt from SalesQuote (it marks the quote won and drafts the invoice).
 */
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isPublicToken(token) || !isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "This link isn't valid." }, { status: 404 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    // handled below
  }

  const prisma = getPrismaClient();
  const quote = await prisma.salesQuote.findUnique({
    where: { publicToken: token },
    select: {
      id: true,
      number: true,
      customerName: true,
      status: true,
      createdAt: true,
      sentAt: true,
      acceptedAt: true,
      customerMessage: true,
      customerMessageAt: true,
      quoteRequestId: true,
      quoteRequest: { select: { status: true } },
    },
  });
  if (!quote || quote.status !== "SENT") {
    return NextResponse.json({ ok: false, message: "This quote isn't available." }, { status: 404 });
  }

  const action = body.action === "accept" ? "accept" : body.action === "ask" ? "ask" : "";
  const now = new Date();

  if (action === "accept") {
    const name = cleanCustomerText(body.name, 120);
    if (name.length < 2 || body.confirm !== true) {
      return NextResponse.json({ ok: false, message: "Type your name and tick the box to accept." }, { status: 400 });
    }
    const state = quoteState({ ...quote, requestStatus: quote.quoteRequest?.status }, QUOTE_VALID_DAYS, now);
    if (state === "accepted") {
      return NextResponse.json({ ok: true, message: "This quote is already accepted." });
    }
    if (state !== "open") {
      return NextResponse.json(
        { ok: false, message: state === "expired" ? "This quote has expired: ask us for an updated one." : "This quote is closed." },
        { status: 409 },
      );
    }
    // only the first acceptance counts (two clicks never accept twice)
    const done = await prisma.salesQuote.updateMany({ where: { id: quote.id, acceptedAt: null }, data: { acceptedAt: now, acceptedBy: name } });
    if (done.count && quote.quoteRequestId) {
      await prisma.quoteRequest.update({ where: { id: quote.quoteRequestId }, data: { status: "WON" } });
    }
    if (done.count) {
      try {
        await sendQuoteResponseNotice({ number: quote.number, customer: quote.customerName, action: "accepted", text: `Accepted on the website by ${name}.` });
      } catch (error) {
        console.error("[ITQUEST AFRICA] Accept notice failed", error instanceof Error ? error.message : error);
      }
    }
    return NextResponse.json({ ok: true, message: "Thank you: the quote is accepted. Our team will contact you about the next steps and the invoice." });
  }

  if (action === "ask") {
    const message = cleanCustomerText(body.message, 2000);
    if (message.length < 3) {
      return NextResponse.json({ ok: false, message: "Type your question first." }, { status: 400 });
    }
    if (quote.customerMessageAt && now.getTime() - quote.customerMessageAt.getTime() < 30000) {
      return NextResponse.json({ ok: false, message: "Please wait a moment before sending another message." }, { status: 429 });
    }
    const stamp = now.toISOString().slice(0, 16).replace("T", " ");
    const thread = `${quote.customerMessage ? `${quote.customerMessage}\n\n` : ""}[${stamp} UTC] ${message}`.slice(-6000);
    await prisma.salesQuote.update({ where: { id: quote.id }, data: { customerMessage: thread, customerMessageAt: now } });
    try {
      await sendQuoteResponseNotice({ number: quote.number, customer: quote.customerName, action: "question", text: message });
    } catch (error) {
      console.error("[ITQUEST AFRICA] Question notice failed", error instanceof Error ? error.message : error);
    }
    return NextResponse.json({ ok: true, message: "Sent. Our sales team will answer by email, usually within one business day." });
  }

  return NextResponse.json({ ok: false, message: "Unknown action." }, { status: 400 });
}
