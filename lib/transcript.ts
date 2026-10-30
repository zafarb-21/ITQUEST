export type TranscriptMessage = { role: "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CHARS = 6000;

/**
 * The chat that led to a lead, as plain text for the sales team ("Visitor: ..." / "Assistant: ...").
 * Accepts the widget's messages array; anything else is ignored. Control characters are stripped and the result is capped.
 */
export function formatTranscript(input: unknown): string {
  if (!Array.isArray(input)) return "";

  const lines = input
    .slice(-MAX_MESSAGES)
    .map((item) => {
      if (!item || typeof item !== "object") return "";
      const role = "role" in item ? item.role : undefined;
      const content = "content" in item ? item.content : undefined;
      if ((role !== "user" && role !== "assistant") || typeof content !== "string") return "";
      // eslint-disable-next-line no-control-regex
      const text = content.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, " ").trim().slice(0, 1500);
      return text ? `${role === "user" ? "Visitor" : "Assistant"}: ${text}` : "";
    })
    .filter(Boolean);

  const joined = lines.join("\n");
  return joined.length > MAX_CHARS ? joined.slice(joined.length - MAX_CHARS) : joined;
}
