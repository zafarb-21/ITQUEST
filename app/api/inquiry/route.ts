import { NextResponse } from "next/server";
import { type InquiryInput, validateInquiry } from "@/lib/inquiry";
import { sendInquiryEmail, sendRequestReceivedEmail } from "@/lib/mailer";
import { isDatabaseConfigured } from "@/lib/prisma";
import { createQuoteRequestFromInquiry } from "@/lib/quote-requests";
import { siteConfig } from "@/lib/site-data";
import { statusPageUrl } from "@/lib/site-url";

export async function POST(request: Request) {
  let payload: InquiryInput;

  try {
    payload = (await request.json()) as InquiryInput;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const validation = validateInquiry(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields and try again.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const inquiry = validation.data;
  let statusToken: string | null = null;

  try {
    if (inquiry.kind === "quote" && isDatabaseConfigured()) {
      const saved = await createQuoteRequestFromInquiry(inquiry);
      statusToken = saved?.publicToken ?? null;
    }
  } catch (error) {
    console.error("[ITQUEST AFRICA] Quote request persistence failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Your quote request could not be saved right now. Please try again or contact us directly at " +
          siteConfig.email +
          ".",
      },
      { status: 500 },
    );
  }

  try {
    await sendInquiryEmail(inquiry);
  } catch (error) {
    console.error("[ITQUEST AFRICA] Inquiry delivery failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Your request could not be delivered right now. Please try again or contact us directly at " +
          siteConfig.email +
          ".",
      },
      { status: 500 },
    );
  }

  // Nov 2026: the customer's private status page, and a "we have your request" email with its link (best effort)
  if (statusToken) {
    try {
      await sendRequestReceivedEmail({
        to: inquiry.email,
        name: inquiry.fullName,
        statusUrl: statusPageUrl(statusToken),
        items: inquiry.items.map((x) => ({ name: x.name, quantity: x.quantity })),
      });
    } catch (error) {
      console.error("[ITQUEST AFRICA] Request-received email failed", error instanceof Error ? error.message : error);
    }
  }

  return NextResponse.json({
    ok: true,
    message:
      inquiry.kind === "quote"
        ? "Your quote request has been received. Our sales team usually sends a quotation within one business day."
        : "Your enquiry has been received. Our team will get back to you shortly.",
    statusUrl: statusToken ? `/r/${statusToken}` : undefined,
  });
}
