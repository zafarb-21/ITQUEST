import { NextResponse } from "next/server";
import { authorizeAdminApiRequest } from "@/lib/admin-auth";
import { saveAdminProduct, validateAdminProductPayload } from "@/lib/admin-products";
import { isDatabaseConfigured } from "@/lib/prisma";

export async function POST(request: Request) {
  const authorizationError = await authorizeAdminApiRequest();
  if (authorizationError) return authorizationError;

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { ok: false, message: "DATABASE_URL is not configured." },
      { status: 503 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request payload." }, { status: 400 });
  }

  const validation = validateAdminProductPayload(payload);

  if (!validation.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please correct the highlighted fields.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  try {
    await saveAdminProduct(validation.data);
  } catch (error) {
    console.error("[ITQUEST AFRICA] Admin product creation failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Could not create the product right now.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Product created successfully.",
  });
}
