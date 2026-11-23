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
  /** Nov 2026: the customer's private quote page (Accept / Ask a question) */
  quoteUrl?: string;
};

function actionButtonsHtml(quoteUrl: string) {
  const url = escapeHtml(quoteUrl);
  return `<table cellpadding="0" cellspacing="0" style="margin: 24px 0 8px;"><tr>
    <td style="padding-right: 10px;"><a href="${url}" style="display: inline-block; padding: 12px 22px; border-radius: 999px; background: #0e7490; color: #ffffff; font-weight: 700; text-decoration: none; font-family: Arial, sans-serif;">View and accept the quote</a></td>
    <td><a href="${url}#ask" style="display: inline-block; padding: 12px 22px; border-radius: 999px; border: 1px solid #94a3b8; color: #0f172a; font-weight: 700; text-decoration: none; font-family: Arial, sans-serif;">Ask a question</a></td>
  </tr></table>
  <p style="font-family: Arial, sans-serif; color: #64748b; font-size: 12px;">This link is private to you. You can also simply reply to this email.</p>`;
}

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
  )}</div>${quote.quoteUrl ? actionButtonsHtml(quote.quoteUrl) : ""}`;
  const text = quote.quoteUrl
    ? `${quote.message}\n\nView, accept or ask about this quote: ${quote.quoteUrl}\n(This link is private to you.)`
    : quote.message;
  const attachment = { filename: quote.pdfName, content: quote.pdf };

  const transport = salesSmtpTransport ?? (resolveProvider() === "smtp" ? smtpTransport : null);

  if (transport) {
    await transport.sendMail({
      from: salesFromEmail,
      to: quote.to,
      bcc: salesBccEmail || undefined,
      replyTo: salesReplyTo,
      subject: quote.subject,
      text,
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
      text,
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

// ---------------------------------------------------------------------------------------------------------------------
// Nov 2026: the customer gets a "we have your request" email with their private status page. Best effort: a failure here
// never fails the request itself (it is already saved and Sales has it).
export async function sendRequestReceivedEmail(input: { to: string; name: string; statusUrl: string; items: { name: string; quantity: number }[] }) {
  const first = input.name.split(/\s+/)[0] || "there";
  const lines = input.items.map((x) => `- ${x.quantity} x ${x.name}`).join("\n");
  const text = `Hello ${first},\n\nThank you for your quote request. Our sales team usually sends a quotation within one business day.${
    lines ? `\n\nYou asked about:\n${lines}` : ""
  }\n\nFollow your request here: ${input.statusUrl}\n(This link is private to you.)\n\nITQUEST AFRICA\nEngineering the Future of Connectivity`;
  const html = `<div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
    <p>Hello ${escapeHtml(first)},</p>
    <p>Thank you for your quote request. Our sales team usually sends a quotation within one business day.</p>
    ${input.items.length ? `<p style="margin-bottom: 4px;">You asked about:</p><ul>${input.items.map((x) => `<li>${x.quantity} x ${escapeHtml(x.name)}</li>`).join("")}</ul>` : ""}
    <p><a href="${escapeHtml(input.statusUrl)}" style="display: inline-block; padding: 12px 22px; border-radius: 999px; background: #0e7490; color: #ffffff; font-weight: 700; text-decoration: none;">Follow your request</a></p>
    <p style="color: #64748b; font-size: 12px;">This link is private to you.</p>
    <p>ITQUEST AFRICA<br><span style="color: #64748b;">Engineering the Future of Connectivity</span></p></div>`;
  const subject = "We have your quote request | ITQUEST AFRICA";
  const transport = salesSmtpTransport ?? (resolveProvider() === "smtp" ? smtpTransport : null);
  if (transport) {
    await transport.sendMail({ from: salesFromEmail, to: input.to, replyTo: salesReplyTo, subject, text, html });
    return true;
  }
  if (resolveProvider() === "resend" && resend) {
    const result = await resend.emails.send({ from: salesFromEmail, to: input.to, replyTo: salesReplyTo, subject, text, html });
    if (result.error) throw new Error(result.error.message || "Resend refused the email");
    return true;
  }
  console.info("[ITQUEST AFRICA] Request-received email skipped: no mail provider configured", { to: input.to });
  return false;
}

/** Nov 2026: Sales hears straight away when a customer accepts a quote or asks about it on the quote page. */
export async function sendQuoteResponseNotice(input: { number: string; customer: string; action: "accepted" | "question"; text: string }) {
  const to = process.env.SALES_NOTIFY_EMAIL || process.env.INQUIRY_TO_EMAIL || salesReplyTo;
  const subject = input.action === "accepted" ? `Quote ${input.number} ACCEPTED by ${input.customer}` : `Question on quote ${input.number} from ${input.customer}`;
  const text = `${subject}\n\n${input.text}`.trim();
  const html = `<div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(text)}</div>`;
  const transport = salesSmtpTransport ?? (resolveProvider() === "smtp" ? smtpTransport : null);
  if (transport) {
    await transport.sendMail({ from: salesFromEmail, to, subject, text, html });
    return true;
  }
  if (resolveProvider() === "resend" && resend) {
    const result = await resend.emails.send({ from: salesFromEmail, to, subject, text, html });
    if (result.error) throw new Error(result.error.message || "Resend refused the email");
    return true;
  }
  console.info("[ITQUEST AFRICA] Quote response (no mail provider configured)", { number: input.number, action: input.action });
  return false;
}
