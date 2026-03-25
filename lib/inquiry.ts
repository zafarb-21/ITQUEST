export type InquiryKind = "contact" | "quote";

export type InquiryInput = {
  kind: InquiryKind;
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  website?: string;
  sourcePage?: string;
  projectType?: string;
  industry?: string;
  location?: string;
  timeline?: string;
  budget?: string;
  primaryService?: string;
  preferredContactMethod?: string;
};

export type ValidInquiry = InquiryInput & {
  company: string;
  phone: string;
  website: string;
  sourcePage: string;
  projectType: string;
  industry: string;
  location: string;
  timeline: string;
  budget: string;
  primaryService: string;
  preferredContactMethod: string;
};

export type InquiryValidationResult =
  | { success: true; data: ValidInquiry }
  | { success: false; errors: Record<string, string> };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateInquiry(input: InquiryInput): InquiryValidationResult {
  const data: ValidInquiry = {
    kind: input.kind,
    fullName: clean(input.fullName),
    company: clean(input.company),
    email: clean(input.email).toLowerCase(),
    phone: clean(input.phone),
    message: clean(input.message),
    website: clean(input.website),
    sourcePage: clean(input.sourcePage),
    projectType: clean(input.projectType),
    industry: clean(input.industry),
    location: clean(input.location),
    timeline: clean(input.timeline),
    budget: clean(input.budget),
    primaryService: clean(input.primaryService),
    preferredContactMethod: clean(input.preferredContactMethod),
  };

  const errors: Record<string, string> = {};

  if (data.kind !== "contact" && data.kind !== "quote") {
    errors.kind = "Invalid inquiry type.";
  }

  if (data.website) {
    errors.website = "Spam submission rejected.";
  }

  if (data.fullName.length < 2) {
    errors.fullName = "Enter a valid name.";
  }

  if (!isEmail(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (data.message.length < 20) {
    errors.message = "Please provide more project detail.";
  }

  if (data.kind === "quote" && data.projectType.length < 2) {
    errors.projectType = "Select or describe the project type.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

export function formatInquiryEmail(data: ValidInquiry) {
  const fields: Array<[string, string]> = [
    ["Inquiry Type", data.kind],
    ["Full Name", data.fullName],
    ["Company", data.company || "Not provided"],
    ["Email", data.email],
    ["Phone", data.phone || "Not provided"],
    ["Source Page", data.sourcePage || "Not provided"],
  ];

  if (data.primaryService) {
    fields.push(["Service Interest", data.primaryService]);
  }

  if (data.kind === "quote") {
    fields.push(
      ["Project Type", data.projectType || "Not provided"],
      ["Industry", data.industry || "Not provided"],
      ["Location", data.location || "Not provided"],
      ["Timeline", data.timeline || "Not provided"],
      ["Budget", data.budget || "Not provided"],
      ["Preferred Contact Method", data.preferredContactMethod || "Not provided"],
    );
  }

  const text = `${fields
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n")}\n\nMessage:\n${data.message}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New ${data.kind === "quote" ? "Quote Request" : "Contact Enquiry"}</h2>
      <table cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tbody>
          ${fields
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 8px 0; width: 180px; color: #475569; font-weight: 600;">${label}</td>
                  <td style="padding: 8px 0;">${value}</td>
                </tr>`,
            )
            .join("")}
        </tbody>
      </table>
      <div>
        <p style="margin: 0 0 8px; color: #475569; font-weight: 600;">Message</p>
        <div style="padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; white-space: pre-wrap;">${escapeHtml(
          data.message,
        )}</div>
      </div>
    </div>
  `;

  return { text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
