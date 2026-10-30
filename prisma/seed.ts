import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";

dotenv.config({ path: ".env.local" });
dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not configured.");
}

const adapter = new PrismaPg(
  new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
);

const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Networking & Infrastructure",
    slug: "networking-infrastructure",
    description: "Enterprise connectivity, routing, switching, wireless, and supporting infrastructure.",
  },
  {
    name: "Security & Surveillance",
    slug: "security-surveillance",
    description: "CCTV, access control, and site security systems for commercial environments.",
  },
  {
    name: "Retail & Digital Systems",
    slug: "retail-digital-systems",
    description: "Point-of-sale and digital systems for customer-facing operations.",
  },
];

const products = [
  {
    categorySlug: "networking-infrastructure",
    name: "Dual-Band Business Wi-Fi Access Point",
    slug: "dual-band-business-wifi-access-point",
    sku: "ITQ-WIFI-001",
    summary: "Ceiling-mount wireless access point for office, hospitality, and campus coverage.",
    description:
      "Managed dual-band access point suited to medium-density deployments with centralized administration and guest network support.",
    isFeatured: true,
    pricingMode: "STARTING_AT",
    currency: "USD",
    priceAmount: "185.00",
    priceLabel: "Starting price",
    inventory: {
      quantityAvailable: 18,
      reorderLevel: 5,
      stockStatus: "IN_STOCK",
      leadTimeDays: 2,
      notes: "Ideal for office and education deployments.",
    },
  },
  {
    categorySlug: "networking-infrastructure",
    name: "24-Port Managed Gigabit Switch",
    slug: "24-port-managed-gigabit-switch",
    sku: "ITQ-SW-024",
    summary: "Managed switch for branch networks, surveillance backbones, and structured office LANs.",
    description: "Layer 2 managed switch with VLAN support, monitoring features, and rack-mount deployment.",
    isFeatured: true,
    pricingMode: "PUBLIC_PRICE",
    currency: "USD",
    priceAmount: "420.00",
    priceLabel: "Standard selling price",
    inventory: {
      quantityAvailable: 7,
      reorderLevel: 3,
      stockStatus: "LOW_STOCK",
      leadTimeDays: 4,
      notes: "Limited stock while next shipment is in transit.",
    },
  },
  {
    categorySlug: "security-surveillance",
    name: "4-Camera IP CCTV Starter Kit",
    slug: "4-camera-ip-cctv-starter-kit",
    sku: "ITQ-CCTV-004",
    summary: "Entry surveillance package for small businesses and branch offices.",
    description: "Includes four IP cameras, network video recorder, storage, and core mounting accessories.",
    isFeatured: false,
    pricingMode: "STARTING_AT",
    currency: "USD",
    priceAmount: "650.00",
    priceLabel: "Package starting price",
    inventory: {
      quantityAvailable: 4,
      reorderLevel: 2,
      stockStatus: "LOW_STOCK",
      leadTimeDays: 5,
      notes: "Installation service priced separately.",
    },
  },
  {
    categorySlug: "security-surveillance",
    name: "Biometric Access Control Terminal",
    slug: "biometric-access-control-terminal",
    sku: "ITQ-ACS-101",
    summary: "Fingerprint and card-based access terminal for controlled entry points.",
    description:
      "Commercial access control terminal with attendance support, relay integration, and door event logging.",
    isFeatured: false,
    pricingMode: "REQUEST_QUOTE",
    currency: "USD",
    priceAmount: null,
    priceLabel: null,
    inventory: {
      quantityAvailable: 0,
      reorderLevel: 2,
      stockStatus: "ON_REQUEST",
      leadTimeDays: 10,
      notes: "Quoted per site design, locking hardware, and attendance requirements.",
    },
  },
  {
    categorySlug: "retail-digital-systems",
    name: "POS Touch Terminal Bundle",
    slug: "pos-touch-terminal-bundle",
    sku: "ITQ-POS-001",
    summary: "Retail-ready POS hardware bundle with touchscreen terminal, scanner, and receipt printer.",
    description: "Counter-top point-of-sale kit for shops, hospitality desks, and service counters.",
    isFeatured: true,
    pricingMode: "STARTING_AT",
    currency: "USD",
    priceAmount: "980.00",
    priceLabel: "Bundle starting price",
    inventory: {
      quantityAvailable: 3,
      reorderLevel: 2,
      stockStatus: "LOW_STOCK",
      leadTimeDays: 7,
      notes: "Software licensing depends on the deployment package.",
    },
  },
] as const;

async function main() {
  await prisma.quoteRequestItem.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.productPrice.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const categoryIds = new Map<string, string>();

  for (const category of categories) {
    const created = await prisma.category.create({ data: category });
    categoryIds.set(category.slug, created.id);
  }

  for (const product of products) {
    const createdProduct = await prisma.product.create({
      data: {
        categoryId: categoryIds.get(product.categorySlug),
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        summary: product.summary,
        description: product.description,
        isFeatured: product.isFeatured,
        pricingMode: product.pricingMode,
        currency: product.currency,
      },
    });

    await prisma.inventoryItem.create({
      data: {
        productId: createdProduct.id,
        ...product.inventory,
      },
    });

    if (product.priceAmount) {
      await prisma.productPrice.create({
        data: {
          productId: createdProduct.id,
          amount: product.priceAmount,
          label: product.priceLabel,
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
