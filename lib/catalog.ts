import { PricingMode, StockStatus } from "@/generated/prisma/enums";
import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";

export type CatalogCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  summary: string;
  description: string | null;
  category: {
    name: string;
    slug: string;
  } | null;
  pricingMode: PricingMode;
  currency: string;
  currentPrice: number | null;
  priceLabel: string | null;
  stockStatus: StockStatus;
  quantityAvailable: number;
  leadTimeDays: number | null;
  inventoryNotes: string | null;
  isFeatured: boolean;
};

export type AdminCatalogProduct = CatalogProduct & {
  isActive: boolean;
  categoryId: string | null;
  reorderLevel: number | null;
};

function mapCatalogProduct(product: Awaited<ReturnType<typeof getRawCatalogProducts>>[number]): CatalogProduct {
  const currentPrice = product.prices[0] ?? null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    summary: product.summary,
    description: product.description,
    category: product.category
      ? {
          name: product.category.name,
          slug: product.category.slug,
        }
      : null,
    pricingMode: product.pricingMode,
    currency: product.currency,
    currentPrice: currentPrice?.amount ? Number(currentPrice.amount) : null,
    priceLabel: currentPrice?.label ?? null,
    stockStatus: product.inventory?.stockStatus ?? StockStatus.ON_REQUEST,
    quantityAvailable: product.inventory?.quantityAvailable ?? 0,
    leadTimeDays: product.inventory?.leadTimeDays ?? null,
    inventoryNotes: product.inventory?.notes ?? null,
    isFeatured: product.isFeatured,
  };
}

async function getRawCatalogProducts(where?: { isActive?: boolean; slug?: string }) {
  const prisma = getPrismaClient();

  return prisma.product.findMany({
    where,
    include: {
      category: true,
      inventory: true,
      prices: {
        where: { isActive: true },
        orderBy: { effectiveFrom: "desc" },
        take: 1,
      },
    },
    orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
  });
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const products = await getRawCatalogProducts({ isActive: true });
  return products.map(mapCatalogProduct);
}

export async function getCatalogProductBySlug(slug: string): Promise<CatalogProduct | null> {
  if (!isDatabaseConfigured()) {
    return null;
  }

  const products = await getRawCatalogProducts({ isActive: true, slug });
  const product = products[0];

  return product ? mapCatalogProduct(product) : null;
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const prisma = getPrismaClient();
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
    },
  });
}

export async function getAdminCatalogProducts(): Promise<AdminCatalogProduct[]> {
  if (!isDatabaseConfigured()) {
    return [];
  }

  const products = await getRawCatalogProducts();

  return products.map((product) => {
    const mapped = mapCatalogProduct(product);

    return {
      ...mapped,
      isActive: product.isActive,
      categoryId: product.categoryId,
      reorderLevel: product.inventory?.reorderLevel ?? null,
    };
  });
}
