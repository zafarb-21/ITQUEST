// The website assistant's brains (Nov 14 2026). DeepSeek answers first when DEEPSEEK_API_KEY is set (cheaper, same brain as
// Zbot HQ); OpenAI is the backup if DeepSeek fails, and the other way round when ASSISTANT_PROVIDER=openai. Keys live only in
// Vercel's environment variables.
import { reasoningFor, toResponsesInput, type ChatTurn } from "./responses";

export type Provider = "deepseek" | "openai";
type Env = Record<string, string | undefined>;

export function providerOrder(env: Env = process.env): Provider[] {
  const have: Record<Provider, boolean> = { deepseek: Boolean(env.DEEPSEEK_API_KEY), openai: Boolean(env.OPENAI_API_KEY) };
  const first: Provider = env.ASSISTANT_PROVIDER === "openai" ? "openai" : env.ASSISTANT_PROVIDER === "deepseek" ? "deepseek" : have.deepseek ? "deepseek" : "openai";
  return ([first, first === "deepseek" ? "openai" : "deepseek"] as Provider[]).filter((p) => have[p]);
}

type Ask = { system: string; messages: ChatTurn[]; sourcePage?: string };

async function askDeepSeek({ system, messages }: Ask, env: Env): Promise<string> {
  const base = (env.DEEPSEEK_BASE_URL || "https://api.deepseek.com").replace(/\/+$/, "");
  const model = env.DEEPSEEK_MODEL || "deepseek-flash";
  const res = await fetch(`${base}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.DEEPSEEK_API_KEY}` },
    body: JSON.stringify({
      model,
      max_tokens: 800,
      temperature: 0.5,
      messages: [{ role: "system", content: system }, ...messages.map((m) => ({ role: m.role, content: m.content }))],
    }),
    signal: AbortSignal.timeout(25000),
  });
  const data = (await res.json().catch(() => ({}))) as { choices?: { message?: { content?: string } }[]; error?: { message?: string } };
  if (!res.ok) throw new Error(`DeepSeek ${res.status}: ${data.error?.message ?? "error"} (model ${model})`);
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

async function askOpenAI({ system, messages, sourcePage }: Ask, env: Env): Promise<string> {
  const model = env.OPENAI_MODEL || "gpt-5-mini";
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.OPENAI_API_KEY}` },
    body: JSON.stringify({
      model,
      store: false,
      max_output_tokens: 800,
      ...(reasoningFor(model) ? { reasoning: reasoningFor(model) } : {}),
      instructions: system,
      metadata: { sourcePage: sourcePage ?? "" },
      input: toResponsesInput(messages),
    }),
    signal: AbortSignal.timeout(25000),
  });
  type Out = { output_text?: string; output?: { content?: { type?: string; text?: string }[] }[]; error?: { message?: string } };
  const data = (await res.json().catch(() => ({}))) as Out;
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${data.error?.message ?? "error"} (model ${model})`);
  if (typeof data.output_text === "string" && data.output_text.trim()) return data.output_text.trim();
  return (data.output ?? [])
    .flatMap((o) => o.content ?? [])
    .filter((c) => c.type === "output_text" && typeof c.text === "string")
    .map((c) => (c.text ?? "").trim())
    .filter(Boolean)
    .join("\n\n")
    .trim();
}

/** The first provider that gives a non-empty reply. Throws when none is configured or all fail. */
export async function askAssistant(ask: Ask, env: Env = process.env): Promise<{ reply: string; provider: Provider }> {
  const order = providerOrder(env);
  if (!order.length) throw new Error("no assistant key: set DEEPSEEK_API_KEY or OPENAI_API_KEY");
  let last: unknown = null;
  for (const p of order) {
    try {
      const reply = p === "deepseek" ? await askDeepSeek(ask, env) : await askOpenAI(ask, env);
      if (reply) return { reply, provider: p };
      last = new Error(`${p}: empty reply`);
    } catch (e) {
      last = e;
      console.error(`[ITQUEST AFRICA] Assistant: ${p} failed`, e instanceof Error ? e.message : e);
    }
  }
  throw last instanceof Error ? last : new Error("assistant failed");
}
