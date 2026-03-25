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
