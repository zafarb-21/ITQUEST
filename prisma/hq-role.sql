-- Zbot HQ's ITQUEST Sales agent reads quote requests and writes signed quotes straight into this database.
-- Run this ONCE as the database owner (Neon / Supabase / Vercel Postgres SQL editor), after `npm run db:deploy`.
-- Replace the password first, then put this connection string into Zbot's .env on Zdesky as ITQUEST_DATABASE_URL:
--   postgresql://zbot_hq:<the password>@<host>/<database>?sslmode=require
-- The role can only: read the catalog and requests, mark a request as picked up / quoted / won / lost, and add SalesQuote rows.

CREATE ROLE zbot_hq LOGIN PASSWORD 'CHANGE-THIS-TO-A-LONG-RANDOM-PASSWORD';

GRANT USAGE ON SCHEMA public TO zbot_hq;
GRANT SELECT ON "Category", "Product", "ProductPrice", "InventoryItem",
                "QuoteRequest", "QuoteRequestItem", "AssistantLead", "SalesQuote" TO zbot_hq;
GRANT UPDATE ("status", "hqPickedAt", "hqQuoteNumber") ON "QuoteRequest" TO zbot_hq;
GRANT INSERT ON "SalesQuote" TO zbot_hq;
