-- Nov 2026 site upgrade: product photos + specs, the customer's private request status page and quote page (accept / ask).

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "specs" JSONB;

-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "publicToken" TEXT;

-- AlterTable
ALTER TABLE "SalesQuote" ADD COLUMN     "acceptedAt" TIMESTAMP(3),
ADD COLUMN     "acceptedBy" TEXT,
ADD COLUMN     "customerMessage" TEXT,
ADD COLUMN     "customerMessageAt" TIMESTAMP(3),
ADD COLUMN     "publicToken" TEXT,
ADD COLUMN     "viewedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "QuoteRequest_publicToken_key" ON "QuoteRequest"("publicToken");

-- CreateIndex
CREATE UNIQUE INDEX "SalesQuote_publicToken_key" ON "SalesQuote"("publicToken");
