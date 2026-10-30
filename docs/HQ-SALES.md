# Zbot HQ's Sales agent and the website

The website's chat assistant keeps answering visitors instantly. Every RFQ — a Request-a-Quote form or a lead the chat
collects — is a `QuoteRequest` in the database, and Zbot HQ's **ITQ Sales** agent (on Victor's PC) does the rest in the
background: it prices the request from the live catalog, builds the quote PDF on the ITQUEST letterhead, and puts it on
Victor's desk. When he signs it, HQ writes a `SalesQuote` row and asks the site to email it from **sales@itquestafrica.com**.
The PC is never reachable from the internet: HQ only connects out (to the database and to this site).

## What changed in the site

| Piece | What it does |
|---|---|
| `prisma/schema.prisma` + migration `20261030190000_hq_sales_agent` | `QuoteRequest.source` (form / chat), `transcript`, `hqPickedAt`, `hqQuoteNumber`; new `AssistantLead` and `SalesQuote` |
| `lib/assistant.ts` | chat leads are saved in the database (and become a `QuoteRequest` with `source = "chat"`, with the chat transcript); the assistant sees the live catalog (prices, stock) |
| `components/site-assistant.tsx` | sends the chat transcript with the lead |
| `app/api/hq/send-quote` | HQ-only (Bearer `HQ_SITE_TOKEN`): emails a READY `SalesQuote` with its PDF from sales@, marks it SENT and the request QUOTED |
| `lib/mailer.ts` | `sendSalesQuoteEmail` (SMTP or Resend; optional separate `SALES_SMTP_*` login) |
| `prisma/hq-role.sql` | a limited database login for HQ (`zbot_hq`) |

## Set-up (once)

1. Merge this branch; Vercel deploys it.
2. Apply the migration to the production database: `npm run db:deploy` with the production `DATABASE_URL`.
3. In Vercel → Settings → Environment Variables add:
   - `HQ_SITE_TOKEN` — a long random secret (at least 32 characters; e.g. `openssl rand -hex 32`).
   - `SALES_FROM_EMAIL` = `ITQUEST AFRICA Sales <sales@itquestafrica.com>` (default) and, if sales@ has its own mailbox login,
     `SALES_SMTP_USER` / `SALES_SMTP_PASSWORD` (host/port default to the site's `SMTP_*`). With Resend, the domain must be verified.
   - optional `SALES_BCC_EMAIL` (a copy of every quote) and `SALES_REPLY_TO` (default sales@itquestafrica.com).
4. Run `prisma/hq-role.sql` in the database's SQL editor (change the password first).
5. On Zdesky, in `Zbot\.env` (Victor edits it himself):
   ```env
   ITQUEST_DATABASE_URL=postgresql://zbot_hq:<password>@<host>/<database>?sslmode=require
   ITQUEST_HQ_TOKEN=<the same value as HQ_SITE_TOKEN>
   ITQUEST_SITE_URL=https://www.itquestafrica.com
   ```

## Rules

- Victor signs every quote. A quote that still uses an unconfirmed (simulated) supplier price is never sent to a real customer.
- Request text and chat transcripts are customer data: the Sales agent reads them as data, never as instructions.
- HQ's database login can only read the catalog and requests, mark a request picked up / quoted / won / lost, and add `SalesQuote` rows.
