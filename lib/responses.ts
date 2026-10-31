// The chat in the shape OpenAI's Responses API takes (Oct 31 2026). Every turn used to go out as an "input_text" part; the API
// only accepts that for the visitor's turns, and every chat starts with the assistant's welcome, so every request was refused
// (the visitor saw "The assistant could not respond right now"). Plain string content is valid for both roles.
export type ChatTurn = { role: "user" | "assistant"; content: string };

export function toResponsesInput(messages: ChatTurn[]) {
  return messages.map((message) => ({ role: message.role, content: message.content }));
}

// Reasoning models (gpt-5*, o*) spend part of max_output_tokens thinking; keep that short so a reply always fits.
export function reasoningFor(model: string): { effort: "low" } | undefined {
  return /^(gpt-5|o\d)/i.test(model.trim()) ? { effort: "low" } : undefined;
}
