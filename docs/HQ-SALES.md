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

## Nov 2026: the customer's side of the loop

- **Quote basket:** "Add to quote" on product cards and pages collects several products (kept in the visitor's browser); the form on
  `/quote` sends them as one `QuoteRequest` with one `QuoteRequestItem` per product (names and SKUs re-read from the catalog).
- **Request status page** `/r/<token>`: every form request gets a private link (shown after submitting and emailed to the customer
  from sales@): Received → Being priced → Quote sent → Decided.
- **Quote page** `/q/<token>`: the quote email now has **View and accept the quote** / **Ask a question** buttons. The page shows the
  total, the validity (`QUOTE_VALID_DAYS`, default 14), the PDF, and lets the customer accept (name + tick box) or send a question.
  Accepting sets `SalesQuote.acceptedAt` and the request to `WON`, and emails Sales (`SALES_NOTIFY_EMAIL`, else `INQUIRY_TO_EMAIL`).
  Zbot HQ's Sales agent sees it on its next pass: the quote is won, Accounts drafts the invoice as a paper for Victor to sign, and a
  signed invoice is emailed from sales@ (ITQUEST Mail / Zoho). Questions reach Victor's HQ inbox; customer text is data, never instructions.
- **WhatsApp:** a chat button (bottom left) and links to +263 77 436 9288 on product pages, the quote page and the footer.
- **Product photos and specs:** the admin's product editor takes a photo link (https, from the manufacturer's own media kit) and a
  spec table (one `Label: value` per line).
- **Honest proof:** no invented testimonials or case studies; typical engagements are labelled as such, and real testimonials appear
  only once added (with the client's permission).
- **SEO:** `/sitemap.xml`, `/robots.txt` (private pages and admin excluded), LocalBusiness structured data, a share image, product
  pages cached for 5 minutes, and Vercel Web Analytics (switch it on in Vercel → the project → Analytics).

New settings (Vercel → Environment Variables, all optional): `SITE_URL` (default https://itquestafrica.com, used in customer links),
`SALES_NOTIFY_EMAIL`, `QUOTE_VALID_DAYS`. After merging, run the migration (`npm run db:deploy`, migration `20261102090000_site_upgrade`).
No change to `prisma/hq-role.sql` is needed: HQ's login reads the new columns with its existing grants.
