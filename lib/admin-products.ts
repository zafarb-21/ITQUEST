import { PricingMode, StockStatus } from "@/generated/prisma/enums";
import { getPrismaClient } from "@/lib/prisma";

const pricingModes = ["PUBLIC_PRICE", "STARTING_AT", "REQUEST_QUOTE"] as const;
const stockStatuses = ["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK", "ON_REQUEST"] as const;

export type AdminProductMutationInput = {
  name: string;
  slug: string;
  sku: string;
  summary: string;
  description: string;
  currency: string;
  pricingMode: PricingMode;
  priceAmount: string;
  priceLabel: string;
  stockStatus: StockStatus;
  quantityAvailable: number;
  reorderLevel: number | null;
  leadTimeDays: number | null;
  inventoryNotes: string;
  isFeatured: boolean;
  isActive: boolean;
  categorySlug: string;
  newCategoryName: string;
  newCategorySlug: string;
  newCategoryDescription: string;
};

type AdminProductValidationResult =
  | { success: true; data: AdminProductMutationInput }
  | { success: false; errors: Record<string, string> };

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseBoolean(value: unknown) {
  if (typeof value === "boolean") return value;
  return value === "true" || value === "on";
}

function parseOptionalInteger(value: unknown) {
  const cleaned = clean(value);
  if (!cleaned) return null;
  const parsed = Number.parseInt(cleaned, 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function isValidSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function validateAdminProductPayload(payload: unknown): AdminProductValidationResult {
  const input = payload as Record<string, unknown>;

  const data: AdminProductMutationInput = {
    name: clean(input.name),
    slug: clean(input.slug).toLowerCase(),
    sku: clean(input.sku).toUpperCase(),
    summary: clean(input.summary),
    description: clean(input.description),
    currency: clean(input.currency).toUpperCase() || "USD",
    pricingMode: pricingModes.includes(clean(input.pricingMode) as PricingMode)
      ? (clean(input.pricingMode) as PricingMode)
      : "REQUEST_QUOTE",
    priceAmount: clean(input.priceAmount),
    priceLabel: clean(input.priceLabel),
    stockStatus: stockStatuses.includes(clean(input.stockStatus) as StockStatus)
      ? (clean(input.stockStatus) as StockStatus)
      : "ON_REQUEST",
    quantityAvailable: parseOptionalInteger(input.quantityAvailable) ?? 0,
    reorderLevel: parseOptionalInteger(input.reorderLevel),
    leadTimeDays: parseOptionalInteger(input.leadTimeDays),
    inventoryNotes: clean(input.inventoryNotes),
    isFeatured: parseBoolean(input.isFeatured),
    isActive: parseBoolean(input.isActive),
    categorySlug: clean(input.categorySlug),
    newCategoryName: clean(input.newCategoryName),
    newCategorySlug: clean(input.newCategorySlug).toLowerCase(),
    newCategoryDescription: clean(input.newCategoryDescription),
  };

  const errors: Record<string, string> = {};

  if (data.name.length < 2) {
    errors.name = "Enter a product name.";
  }

  if (!isValidSlug(data.slug)) {
    errors.slug = "Use lowercase letters, numbers, and hyphens only.";
  }

  if (data.sku.length < 3) {
    errors.sku = "Enter a SKU.";
  }

  if (data.summary.length < 10) {
    errors.summary = "Enter a short product summary.";
  }

  if (!/^[A-Z]{3}$/.test(data.currency)) {
    errors.currency = "Use a 3-letter currency code like USD.";
  }

  if (!Number.isFinite(data.quantityAvailable) || data.quantityAvailable < 0) {
    errors.quantityAvailable = "Quantity must be zero or more.";
  }

  if (data.reorderLevel !== null && (!Number.isFinite(data.reorderLevel) || data.reorderLevel < 0)) {
    errors.reorderLevel = "Reorder level must be zero or more.";
  }

  if (data.leadTimeDays !== null && (!Number.isFinite(data.leadTimeDays) || data.leadTimeDays < 0)) {
    errors.leadTimeDays = "Lead time must be zero or more.";
  }

  if (data.pricingMode !== "REQUEST_QUOTE") {
    if (!data.priceAmount) {
      errors.priceAmount = "Enter a price for public or starting-at pricing.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(data.priceAmount)) {
      errors.priceAmount = "Use a valid price, for example 420 or 420.00.";
    }
  }

  const hasNewCategory = Boolean(data.newCategoryName || data.newCategorySlug);
  if (hasNewCategory) {
    if (data.newCategoryName.length < 2) {
      errors.newCategoryName = "Enter a category name.";
    }

    if (!isValidSlug(data.newCategorySlug)) {
      errors.newCategorySlug = "Use lowercase letters, numbers, and hyphens only.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}

async function resolveCategoryId(
  input: Pick<AdminProductMutationInput, "categorySlug" | "newCategoryName" | "newCategorySlug" | "newCategoryDescription">,
) {
  const prisma = getPrismaClient();

  if (input.newCategoryName && input.newCategorySlug) {
    const category = await prisma.category.upsert({
      where: { slug: input.newCategorySlug },
      update: {
        name: input.newCategoryName,
        description: input.newCategoryDescription || null,
      },
      create: {
        name: input.newCategoryName,
        slug: input.newCategorySlug,
        description: input.newCategoryDescription || null,
      },
      select: { id: true },
    });

    return category.id;
  }

  if (!input.categorySlug) {
    return null;
  }

  const category = await prisma.category.findUnique({
    where: { slug: input.categorySlug },
    select: { id: true },
  });

  return category?.id ?? null;
}

export async function saveAdminProduct(input: AdminProductMutationInput, productId?: string) {
  const prisma = getPrismaClient();
  const categoryId = await resolveCategoryId(input);

  return prisma.$transaction(async (tx) => {
    const product = productId
      ? await tx.product.update({
          where: { id: productId },
          data: {
            categoryId,
            name: input.name,
            slug: input.slug,
            sku: input.sku,
            summary: input.summary,
            description: input.description || null,
            isActive: input.isActive,
            isFeatured: input.isFeatured,
            pricingMode: input.pricingMode,
            currency: input.currency,
          },
        })
      : await tx.product.create({
          data: {
            categoryId,
            name: input.name,
            slug: input.slug,
            sku: input.sku,
            summary: input.summary,
            description: input.description || null,
            isActive: input.isActive,
            isFeatured: input.isFeatured,
            pricingMode: input.pricingMode,
            currency: input.currency,
          },
        });

    await tx.inventoryItem.upsert({
      where: { productId: product.id },
      update: {
        quantityAvailable: input.quantityAvailable,
        reorderLevel: input.reorderLevel,
        stockStatus: input.stockStatus,
        leadTimeDays: input.leadTimeDays,
        notes: input.inventoryNotes || null,
        lastCheckedAt: new Date(),
      },
      create: {
        productId: product.id,
        quantityAvailable: input.quantityAvailable,
        reorderLevel: input.reorderLevel,
        stockStatus: input.stockStatus,
        leadTimeDays: input.leadTimeDays,
        notes: input.inventoryNotes || null,
      },
    });

    await tx.productPrice.updateMany({
      where: {
        productId: product.id,
        isActive: true,
      },
      data: {
        isActive: false,
      },
    });

    if (input.pricingMode !== "REQUEST_QUOTE" && input.priceAmount) {
      await tx.productPrice.create({
        data: {
          productId: product.id,
          amount: input.priceAmount,
          label: input.priceLabel || null,
          isActive: true,
        },
      });
    }

    return product;
  });
}
