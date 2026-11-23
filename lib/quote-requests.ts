import type { ValidInquiry } from "@/lib/inquiry";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";
import { newPublicToken } from "@/lib/public-token";

type ItemCreate = { productId: string | null; productNameSnapshot: string; skuSnapshot: string | null; quantity: number };

export async function createQuoteRequestFromInquiry(inquiry: ValidInquiry) {
  if (inquiry.kind !== "quote" || !isDatabaseConfigured()) {
    return null;
  }

  const prisma = getPrismaClient();
  const items: ItemCreate[] = [];

  // Nov 2026: the quote basket. Every line is checked against the live catalog (names and SKUs come from the database,
  // never from the browser, when the product exists).
  if (inquiry.items.length) {
    const found = await prisma.product.findMany({
      where: { slug: { in: inquiry.items.map((x) => x.slug) } },
      select: { id: true, slug: true, name: true, sku: true },
    });
    for (const line of inquiry.items) {
      const product = found.find((p) => p.slug === line.slug);
      items.push({
        productId: product?.id ?? null,
        productNameSnapshot: product?.name || line.name || line.slug,
        skuSnapshot: product?.sku || line.sku || null,
        quantity: line.quantity,
      });
    }
  } else if (inquiry.selectedProductSlug || inquiry.selectedProductName) {
    const quantity = Number.parseInt(inquiry.selectedProductQuantity || "1", 10);
    const selectedProduct = inquiry.selectedProductSlug
      ? await prisma.product.findUnique({ where: { slug: inquiry.selectedProductSlug }, select: { id: true, name: true, sku: true } })
      : null;
    items.push({
      productId: selectedProduct?.id ?? null,
      productNameSnapshot: selectedProduct?.name || inquiry.selectedProductName || inquiry.selectedProductSlug,
      skuSnapshot: selectedProduct?.sku || inquiry.selectedProductSku || null,
      quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
    });
  }

  return prisma.quoteRequest.create({
    data: {
      fullName: inquiry.fullName,
      company: inquiry.company || null,
      email: inquiry.email,
      phone: inquiry.phone || null,
      message: inquiry.message,
      projectType: inquiry.projectType || null,
      industry: inquiry.industry || null,
      location: inquiry.location || null,
      timeline: inquiry.timeline || null,
      budget: inquiry.budget || null,
      primaryService: inquiry.primaryService || null,
      preferredContactMethod: inquiry.preferredContactMethod || null,
      sourcePage: inquiry.sourcePage || null,
      publicToken: newPublicToken(),
      items: items.length ? { create: items } : undefined,
    },
  });
}
