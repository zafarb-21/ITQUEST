import { NextResponse } from "next/server";
import {
  buildAssistantSystemPrompt,
  extractLastUserMessage,
  recommendServices,
  shouldCaptureLead,
  validateAssistantMessages,
} from "@/lib/assistant";
import { siteConfig } from "@/lib/site-data";

export const runtime = "nodejs";

type AssistantRequestPayload = {
  messages?: unknown;
  sourcePage?: string;
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: {
    message?: string;
  };
};

function extractAssistantReply(result: OpenAIResponsePayload) {
  if (typeof result.output_text === "string" && result.output_text.trim()) {
    return result.output_text.trim();
  }

  const parts =
    result.output
      ?.flatMap((item) => item.content ?? [])
      .filter((part) => part.type === "output_text" && typeof part.text === "string")
      .map((part) => part.text?.trim() ?? "")
      .filter(Boolean) ?? [];

  return parts.join("\n\n").trim();
}

export async function POST(request: Request) {
  let payload: AssistantRequestPayload;

  try {
    payload = (await request.json()) as AssistantRequestPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const messages = validateAssistantMessages(payload.messages);

  if (!messages) {
    return NextResponse.json(
      { ok: false, message: "A valid conversation is required." },
      { status: 400 },
    );
  }

  const lastUserMessage = extractLastUserMessage(messages);
  const recommendedServices = recommendServices(lastUserMessage);
  const showLeadCapture = shouldCaptureLead(lastUserMessage);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("[ITQUEST AFRICA] Assistant is missing OPENAI_API_KEY");

    return NextResponse.json(
      {
        ok: false,
        message:
          "The assistant is not configured right now. Please use Request a Quote or contact " +
          siteConfig.email +
          " directly.",
      },
      { status: 500 },
    );
  }

  const model = process.env.OPENAI_MODEL || "gpt-5-mini";

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        store: false,
        max_output_tokens: 320,
        instructions: buildAssistantSystemPrompt(recommendedServices),
        metadata: {
          sourcePage: typeof payload.sourcePage === "string" ? payload.sourcePage : "",
        },
        input: messages.map((message) => ({
          role: message.role,
          content: [
            {
              type: "input_text",
              text: message.content,
            },
          ],
        })),
      }),
    });

    const result = (await response.json()) as OpenAIResponsePayload;

    if (!response.ok) {
      console.error("[ITQUEST AFRICA] Assistant response failed", {
        status: response.status,
        error: result.error?.message ?? "Unknown OpenAI error",
      });

      return NextResponse.json(
        {
          ok: false,
          message:
            "The assistant could not respond right now. Please try again, request a quote, or talk to our team directly.",
        },
        { status: 502 },
      );
    }

    const reply = extractAssistantReply(result);

    if (!reply) {
      console.error("[ITQUEST AFRICA] Assistant response was empty", result);

      return NextResponse.json(
        {
          ok: false,
          message:
            "The assistant did not return a usable response. Please try again or contact our team directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      reply,
      recommendedServices,
      showLeadCapture,
    });
  } catch (error) {
    console.error("[ITQUEST AFRICA] Assistant request failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "The assistant is temporarily unavailable. Please use Request a Quote or Talk to Our Team for immediate help.",
      },
      { status: 500 },
    );
  }
}
