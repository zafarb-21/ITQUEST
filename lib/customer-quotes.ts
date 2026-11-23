import { getPrismaClient, isDatabaseConfigured } from "@/lib/prisma";
import { isPublicToken } from "@/lib/public-token";

/** Nov 2026: the customer's private pages. Everything is looked up by the unguessable token only; nothing else is exposed. */
export const QUOTE_VALID_DAYS = Number(process.env.QUOTE_VALID_DAYS || 14) || 14;

export async function getQuoteByToken(token: string) {
  if (!isPublicToken(token) || !isDatabaseConfigured()) return null;
  const prisma = getPrismaClient();
  return prisma.salesQuote.findUnique({
    where: { publicToken: token },
    select: {
      id: true,
      number: true,
      customerName: true,
      subject: true,
      pdfName: true,
      totalUsd: true,
      status: true,
      createdAt: true,
      sentAt: true,
      viewedAt: true,
      acceptedAt: true,
      acceptedBy: true,
      customerMessage: true,
      customerMessageAt: true,
      quoteRequest: {
        select: {
          status: true,
          publicToken: true,
          items: { select: { productNameSnapshot: true, skuSnapshot: true, quantity: true }, orderBy: { createdAt: "asc" } },
        },
      },
    },
  });
}

export async function getRequestByToken(token: string) {
  if (!isPublicToken(token) || !isDatabaseConfigured()) return null;
  const prisma = getPrismaClient();
  return prisma.quoteRequest.findUnique({
    where: { publicToken: token },
    select: {
      fullName: true,
      company: true,
      status: true,
      submittedAt: true,
      projectType: true,
      items: { select: { productNameSnapshot: true, skuSnapshot: true, quantity: true }, orderBy: { createdAt: "asc" } },
      salesQuotes: {
        where: { status: "SENT", publicToken: { not: null } },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { number: true, publicToken: true, totalUsd: true, sentAt: true, acceptedAt: true },
      },
    },
  });
}

export function money(value: unknown) {
  const n = Number(value);
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number.isFinite(n) ? n : 0);
}
