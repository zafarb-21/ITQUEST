/** What a customer sees about their request and quote (the status page and the quote page). Plain logic, no database. */
export type RequestStage = { step: number; title: string; detail: string };

export const REQUEST_STEPS = ["Received", "Being priced", "Quote sent", "Decided"] as const;

export function requestStage(status: string, hasSentQuote: boolean): RequestStage {
  switch (status) {
    case "WON":
      return { step: 3, title: "Accepted: thank you", detail: "Your quote was accepted. Our team will contact you about the next steps and the invoice." };
    case "LOST":
      return { step: 3, title: "Closed", detail: "This request is closed. If you need anything else, request a new quote or message us on WhatsApp." };
    case "QUOTED":
      return hasSentQuote
        ? { step: 2, title: "Your quote is ready", detail: "We've emailed your quotation. You can view it, accept it or ask a question below." }
        : { step: 1, title: "Being priced", detail: "Our sales team is preparing your quotation." };
    case "REVIEWING":
    case "CONTACTED":
      return { step: 1, title: "Being priced", detail: "Our sales team is preparing your quotation, usually within one business day." };
    default:
      return { step: 0, title: "Received", detail: "We have your request. Our sales team usually sends a quotation within one business day." };
  }
}

export type QuoteState = "open" | "accepted" | "expired" | "closed";

/** validDays: from the quote's own validity (default 14). */
export function quoteState(q: { acceptedAt: Date | null; sentAt: Date | null; createdAt: Date; requestStatus?: string | null }, validDays = 14, now = new Date()): QuoteState {
  if (q.acceptedAt) return "accepted";
  if (q.requestStatus === "LOST" || q.requestStatus === "WON") return "closed";
  const from = q.sentAt ?? q.createdAt;
  if (now.getTime() - from.getTime() > validDays * 86400000) return "expired";
  return "open";
}

export function cleanCustomerText(value: unknown, max = 2000) {
  return typeof value === "string"
    ? value
        .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
        .trim()
        .slice(0, max)
    : "";
}
