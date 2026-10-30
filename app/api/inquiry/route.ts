import { NextResponse } from "next/server";
import { type InquiryInput, validateInquiry } from "@/lib/inquiry";
import { sendInquiryEmail } from "@/lib/mailer";
import { isDatabaseConfigured } from "@/lib/prisma";
import { createQuoteRequestFromInquiry } from "@/lib/quote-requests";
import { siteConfig } from "@/lib/site-data";

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

  try {
    if (inquiry.kind === "quote" && isDatabaseConfigured()) {
      await createQuoteRequestFromInquiry(inquiry);
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

  return NextResponse.json({
    ok: true,
    message:
      inquiry.kind === "quote"
        ? "Your quote request has been received. Our team will review the details and respond shortly."
        : "Your enquiry has been received. Our team will get back to you shortly.",
  });
}
