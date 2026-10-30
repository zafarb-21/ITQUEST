import { NextResponse } from "next/server";
import { checkHqToken } from "@/lib/hq";
import { sendSalesQuoteEmail } from "@/lib/mailer";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * Zbot HQ's Sales agent puts a signed quote into SalesQuote (status READY), then calls this to email it from sales@.
 * Body: { "number": "ITQ-Q-2026-0001" }. Auth: Authorization: Bearer <HQ_SITE_TOKEN>. Mail credentials never leave the site.
 */
export async function POST(request: Request) {
  if (!checkHqToken(request.headers.get("authorization"))) {
    return NextResponse.json({ ok: false, message: "Not allowed." }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ ok: false, message: "The database is not configured." }, { status: 503 });
  }

  let number = "";
  try {
    const body = (await request.json()) as { number?: unknown };
    number = typeof body.number === "string" ? body.number.trim() : "";
  } catch {
    // handled below
  }

  if (!/^ITQ-Q-\d{4}-\d{4,}$/.test(number)) {
    return NextResponse.json({ ok: false, message: "A quote number is required." }, { status: 400 });
  }

  const prisma = getPrismaClient();

  // Claim it: only a READY or FAILED quote moves to SENDING, so two calls never send it twice.
  const claimed = await prisma.salesQuote.updateMany({
    where: { number, status: { in: ["READY", "FAILED"] } },
    data: { status: "SENDING", error: null },
  });

  const quote = await prisma.salesQuote.findUnique({ where: { number } });

  if (!quote) {
    return NextResponse.json({ ok: false, message: "No such quote." }, { status: 404 });
  }

  if (claimed.count === 0) {
    return NextResponse.json({ ok: quote.status === "SENT", status: quote.status, message: `Quote is ${quote.status.toLowerCase()}.` });
  }

  try {
    await sendSalesQuoteEmail({
      to: quote.customerEmail,
      name: quote.customerName,
      subject: quote.subject,
      message: quote.message,
      pdf: Buffer.from(quote.pdf),
      pdfName: quote.pdfName,
    });

    await prisma.salesQuote.update({ where: { id: quote.id }, data: { status: "SENT", sentAt: new Date() } });

    if (quote.quoteRequestId) {
      await prisma.quoteRequest.update({
        where: { id: quote.quoteRequestId },
        data: { status: "QUOTED", hqQuoteNumber: quote.number },
      });
    }

    return NextResponse.json({ ok: true, status: "SENT" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown mail error";
    console.error("[ITQUEST AFRICA] Sales quote delivery failed", { number, message });
    await prisma.salesQuote.update({ where: { id: quote.id }, data: { status: "FAILED", error: message.slice(0, 500) } });
    return NextResponse.json({ ok: false, status: "FAILED", message }, { status: 502 });
  }
}
