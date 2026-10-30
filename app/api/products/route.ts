import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog";
import { isDatabaseConfigured } from "@/lib/prisma";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "DATABASE_URL is not configured yet.",
      },
      { status: 503 },
    );
  }

  try {
    const products = await getCatalogProducts();

    return NextResponse.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error("[ITQUEST AFRICA] Product catalog query failed", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Unable to load products right now.",
      },
      { status: 500 },
    );
  }
}
