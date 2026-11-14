import { NextResponse } from "next/server";
import {
  buildAssistantSystemPrompt,
  extractLastUserMessage,
  liveCatalogNote,
  recommendServices,
  shouldCaptureLead,
  validateAssistantMessages,
} from "@/lib/assistant";
import { askAssistant, providerOrder } from "@/lib/assistant-llm";
import { siteConfig } from "@/lib/site-data";

export const runtime = "nodejs";

type AssistantRequestPayload = {
  messages?: unknown;
  sourcePage?: string;
};

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
  if (!providerOrder().length) {
    console.error("[ITQUEST AFRICA] Assistant has no key (DEEPSEEK_API_KEY or OPENAI_API_KEY)");

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

  try {
    const { reply } = await askAssistant({
      system: buildAssistantSystemPrompt(recommendedServices, await liveCatalogNote()),
      messages,
      sourcePage: typeof payload.sourcePage === "string" ? payload.sourcePage : "",
    });

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
