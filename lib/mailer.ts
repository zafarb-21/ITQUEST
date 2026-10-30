import nodemailer from "nodemailer";
import { Resend } from "resend";
import { formatInquiryEmail, type ValidInquiry } from "@/lib/inquiry";

type MailProvider = "smtp" | "resend" | "log";

const provider = (process.env.MAIL_PROVIDER || "auto").toLowerCase();
const inquiryToEmail = process.env.INQUIRY_TO_EMAIL;
const inquiryBccEmail = process.env.INQUIRY_BCC_EMAIL;
const inquiryFromEmail =
  process.env.INQUIRY_FROM_EMAIL || "ITQUEST AFRICA <onboarding@resend.dev>";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;

const smtpTransport =
  smtpHost && smtpUser && smtpPassword
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      })
    : null;

function resolveProvider(): MailProvider {
  if (provider === "smtp" && smtpTransport) return "smtp";
  if (provider === "resend" && resend) return "resend";
  if (provider === "log") return "log";
  if (smtpTransport) return "smtp";
  if (resend) return "resend";
  return "log";
}

export async function sendInquiryEmail(inquiry: ValidInquiry) {
  const email = formatInquiryEmail(inquiry);
  const subject =
    inquiry.kind === "quote"
      ? `New quote request from ${inquiry.fullName}`
      : `New contact enquiry from ${inquiry.fullName}`;

  if (!inquiryToEmail) {
    console.info("[ITQUEST AFRICA] Inquiry received without INQUIRY_TO_EMAIL configured", {
      kind: inquiry.kind,
      from: inquiry.fullName,
      email: inquiry.email,
      sourcePage: inquiry.sourcePage,
    });
    return { delivered: false, provider: "log" as const };
  }

  const activeProvider = resolveProvider();

  if (activeProvider === "smtp" && smtpTransport) {
    await smtpTransport.sendMail({
      from: inquiryFromEmail,
      to: inquiryToEmail,
      bcc: inquiryBccEmail || undefined,
      replyTo: inquiry.email,
      subject,
      text: email.text,
      html: email.html,
    });

    return { delivered: true, provider: "smtp" as const };
  }

  if (activeProvider === "resend" && resend) {
    await resend.emails.send({
      from: inquiryFromEmail,
      to: inquiryToEmail,
      bcc: inquiryBccEmail || undefined,
      replyTo: inquiry.email,
      subject,
      text: email.text,
      html: email.html,
    });

    return { delivered: true, provider: "resend" as const };
  }

  console.info("[ITQUEST AFRICA] Inquiry received", {
    kind: inquiry.kind,
    from: inquiry.fullName,
    email: inquiry.email,
    sourcePage: inquiry.sourcePage,
  });

  return { delivered: false, provider: "log" as const };
}

// ---------------------------------------------------------------------------------------------------------------------
// Signed quotes from Zbot HQ's Sales agent go out from sales@ (app/api/hq/send-quote). Sales can have its own SMTP login
// (SALES_SMTP_*); otherwise the site's main SMTP or Resend is used, which must be allowed to send as SALES_FROM_EMAIL.
const salesFromEmail = process.env.SALES_FROM_EMAIL || "ITQUEST AFRICA Sales <sales@itquestafrica.com>";
const salesReplyTo = process.env.SALES_REPLY_TO || "sales@itquestafrica.com";
const salesBccEmail = process.env.SALES_BCC_EMAIL;

const salesSmtpTransport =
  process.env.SALES_SMTP_USER && process.env.SALES_SMTP_PASSWORD && (process.env.SALES_SMTP_HOST || smtpHost)
    ? nodemailer.createTransport({
        host: process.env.SALES_SMTP_HOST || smtpHost,
        port: Number(process.env.SALES_SMTP_PORT || smtpPort),
        secure: (process.env.SALES_SMTP_SECURE || String(smtpSecure)) === "true",
        auth: {
          user: process.env.SALES_SMTP_USER,
          pass: process.env.SALES_SMTP_PASSWORD,
        },
      })
    : null;

export type SalesQuoteEmail = {
  to: string;
  name: string;
  subject: string;
  message: string;
  pdf: Buffer;
  pdfName: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendSalesQuoteEmail(quote: SalesQuoteEmail) {
  const html = `<div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(
    quote.message,
  )}</div>`;
  const attachment = { filename: quote.pdfName, content: quote.pdf };

  const transport = salesSmtpTransport ?? (resolveProvider() === "smtp" ? smtpTransport : null);

  if (transport) {
    await transport.sendMail({
      from: salesFromEmail,
      to: quote.to,
      bcc: salesBccEmail || undefined,
      replyTo: salesReplyTo,
      subject: quote.subject,
      text: quote.message,
      html,
      attachments: [{ ...attachment, contentType: "application/pdf" }],
    });
    return { delivered: true, provider: "smtp" as const };
  }

  if (resolveProvider() === "resend" && resend) {
    const result = await resend.emails.send({
      from: salesFromEmail,
      to: quote.to,
      bcc: salesBccEmail || undefined,
      replyTo: salesReplyTo,
      subject: quote.subject,
      text: quote.message,
      html,
      attachments: [attachment],
    });
    if (result.error) {
      throw new Error(result.error.message || "Resend refused the email");
    }
    return { delivered: true, provider: "resend" as const };
  }

  throw new Error("No mail provider is configured for sales@ (set SMTP or RESEND_API_KEY on the site).");
}
