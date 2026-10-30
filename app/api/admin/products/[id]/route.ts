import { NextResponse } from "next/server";
import { authorizeAdminApiRequest } from "@/lib/admin-auth";
import { saveAdminProduct, validateAdminProductPayload } from "@/lib/admin-products";
import { isDatabaseConfigured } from "@/lib/prisma";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteProps) {
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
    const { id } = await params;
    await saveAdminProduct(validation.data, id);
  } catch (error) {
    console.error("[ITQUEST AFRICA] Admin product update failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Could not update the product right now.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Product updated successfully.",
  });
}
