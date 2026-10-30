import type { ValidInquiry } from "@/lib/inquiry";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";

export async function createQuoteRequestFromInquiry(inquiry: ValidInquiry) {
  if (inquiry.kind !== "quote" || !isDatabaseConfigured()) {
    return null;
  }

  const prisma = getPrismaClient();
  const quantity = Number.parseInt(inquiry.selectedProductQuantity || "1", 10);
  const normalizedQuantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;

  let selectedProduct:
    | {
        id: string;
        name: string;
        sku: string;
      }
    | null = null;

  if (inquiry.selectedProductSlug) {
    selectedProduct = await prisma.product.findUnique({
      where: { slug: inquiry.selectedProductSlug },
      select: {
        id: true,
        name: true,
        sku: true,
      },
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
      items:
        selectedProduct || inquiry.selectedProductName
          ? {
              create: {
                productId: selectedProduct?.id ?? null,
                productNameSnapshot: selectedProduct?.name || inquiry.selectedProductName || inquiry.selectedProductSlug,
                skuSnapshot: selectedProduct?.sku || inquiry.selectedProductSku || null,
                quantity: normalizedQuantity,
              },
            }
          : undefined,
    },
  });
}
