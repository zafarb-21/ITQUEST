import { NextResponse } from "next/server";
import type { AssistantLeadInput } from "@/lib/assistant";
import { storeAssistantLead, validateAssistantLead } from "@/lib/assistant";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: AssistantLeadInput;

  try {
    payload = (await request.json()) as AssistantLeadInput;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request payload." },
      { status: 400 },
    );
  }

  const validation = validateAssistantLead(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields and try again.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  try {
    await storeAssistantLead(validation.data);
  } catch (error) {
    console.error("[ITQUEST AFRICA] Assistant lead capture failed", error);

    return NextResponse.json(
      {
        ok: false,
        message:
          "Your details could not be saved right now. Please try again or use the main contact form.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Your details have been captured. Our team can now follow up with the right next step.",
  });
}
