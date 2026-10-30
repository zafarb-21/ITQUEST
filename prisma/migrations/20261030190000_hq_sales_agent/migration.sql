-- CreateEnum
CREATE TYPE "SalesQuoteStatus" AS ENUM ('READY', 'SENDING', 'SENT', 'FAILED');

-- AlterTable
ALTER TABLE "QuoteRequest" ADD COLUMN     "hqPickedAt" TIMESTAMP(3),
ADD COLUMN     "hqQuoteNumber" TEXT,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'form',
ADD COLUMN     "transcript" TEXT;

-- CreateTable
CREATE TABLE "AssistantLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "notes" TEXT,
    "sourcePage" TEXT,
    "transcript" TEXT,
    "quoteRequestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssistantLead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesQuote" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "quoteRequestId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "pdf" BYTEA NOT NULL,
    "pdfName" TEXT NOT NULL,
    "totalUsd" DECIMAL(12,2) NOT NULL,
    "status" "SalesQuoteStatus" NOT NULL DEFAULT 'READY',
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sentAt" TIMESTAMP(3),

    CONSTRAINT "SalesQuote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteRequest_hqPickedAt_idx" ON "QuoteRequest"("hqPickedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AssistantLead_quoteRequestId_key" ON "AssistantLead"("quoteRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "SalesQuote_number_key" ON "SalesQuote"("number");

-- CreateIndex
CREATE INDEX "SalesQuote_status_createdAt_idx" ON "SalesQuote"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "AssistantLead" ADD CONSTRAINT "AssistantLead_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesQuote" ADD CONSTRAINT "SalesQuote_quoteRequestId_fkey" FOREIGN KEY ("quoteRequestId") REFERENCES "QuoteRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
