# ITQUEST AFRICA

Premium corporate technology website for ITQUEST AFRICA, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

## Database setup

The project is now scaffolded for PostgreSQL with Prisma 7.

Core tables included:

- `categories`
- `products`
- `product_prices`
- `inventory_items`
- `quote_requests`
- `quote_request_items`

Useful commands:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
npm run db:studio
```

Prisma 7 files added:

- `prisma/schema.prisma`
- `prisma.config.ts`
- `prisma/seed.ts`
- `lib/prisma.ts`
- `app/api/products/route.ts`

## Environment file

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your PostgreSQL connection string.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/itquest_africa?schema=public"
```

If `DATABASE_URL` is configured:

- `GET /api/products` returns the live catalog from the database.
- Quote submissions are stored in `quote_requests` before email delivery is attempted.

## Admin authentication

`/admin/products` and `/api/admin/products/*` are protected with Auth.js. Admin access fails closed until `AUTH_SECRET`, an OAuth provider, and that provider's allowlist are configured.

Generate a session secret and assign the output to `AUTH_SECRET`:

```bash
openssl rand -hex 32
```

For Google, configure:

```env
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
ADMIN_EMAILS=admin@example.com,second-admin@example.com
```

Use this callback URL in Google Cloud:

```text
http://localhost:3000/api/auth/callback/google
```

For Microsoft Entra ID, configure a single-tenant issuer and immutable user object IDs:

```env
AUTH_MICROSOFT_ENTRA_ID_ID=
AUTH_MICROSOFT_ENTRA_ID_SECRET=
AUTH_MICROSOFT_ENTRA_ID_ISSUER=https://login.microsoftonline.com/<tenant-id>/v2.0
ADMIN_MICROSOFT_OBJECT_IDS=<user-object-id>,<second-user-object-id>
```

Use this callback URL in the Entra application registration:

```text
http://localhost:3000/api/auth/callback/microsoft-entra-id
```

For production, register `https://itquestafrica.com/api/auth/callback/google`
or `https://itquestafrica.com/api/auth/callback/microsoft-entra-id` with the
corresponding OAuth provider. Keep localhost callbacks for local development.
Google access requires a verified email in `ADMIN_EMAILS`; Microsoft access uses
the stable Entra object ID rather than its mutable email claim.

## Form delivery

The enquiry and quote forms post to `/api/inquiry`.

Three delivery modes are supported:

1. `MAIL_PROVIDER=smtp`
2. `MAIL_PROVIDER=resend`
3. `MAIL_PROVIDER=auto`

`auto` is the default:

- SMTP is used first if SMTP credentials exist.
- Resend is used next if `RESEND_API_KEY` exists.
- If neither is configured, submissions are accepted and logged server-side.

## Recommended production setup

For a real company inbox on a custom domain, use one of these options:

### Option 1: SMTP

Use this if the company already has mailbox credentials such as Microsoft 365, Zoho Mail, cPanel mail, or another hosted mail service.

Required environment variables:

```env
MAIL_PROVIDER=smtp
INQUIRY_TO_EMAIL=info@itquestafrica.com
INQUIRY_FROM_EMAIL=ITQUEST AFRICA <info@itquestafrica.com>
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@itquestafrica.com
SMTP_PASSWORD=your-password
```

### Option 2: Resend

Use this if the deployment should send mail through Resend.

Required environment variables:

```env
MAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-key
INQUIRY_TO_EMAIL=info@itquestafrica.com
INQUIRY_FROM_EMAIL=ITQUEST AFRICA <enquiries@itquestafrica.com>
```

For production on Resend:

- Verify the sending domain in Resend.
- Use a real sender address on that verified domain.
- Keep `INQUIRY_TO_EMAIL` pointed at the inbox that should receive enquiries.

Optional:

```env
INQUIRY_BCC_EMAIL=director@itquestafrica.com
```

## Deploy to Vercel

The root `vercel.json` selects Next.js, installs locked dependencies with
`npm ci`, and builds with `npm run build`. Vercel manages the output directory
and API routes through its Next.js integration.

1. Push the project to your Git repository and import it into Vercel.
2. Select this folder as the Root Directory and keep the Next.js framework preset.
3. In Project Settings → Environment Variables, add the mail settings from
   `.env.example` for Production and, if needed, Preview. Configure either SMTP
   or Resend, including `INQUIRY_TO_EMAIL` and `INQUIRY_FROM_EMAIL`. Without a
   configured provider and recipient, forms only log submissions rather than
   delivering email. Use a separate test recipient for Preview deployments.
4. Deploy, then check the contact and quote forms and confirm email receipt.
5. Add your domain in Project Settings → Domains and apply the DNS records
   Vercel displays. Redeploy after changing environment variables.

For a CLI deployment from this folder:

```bash
npx vercel
```

Follow the prompts to sign in and link the project, then review the preview.
To publish to production:

```bash
npx vercel --prod
```

Project linking creates `.vercel/` locally. That directory and local environment
files are ignored by Git; keep credentials in Vercel's environment settings.
Do not commit `env.download`.

Configuration reference: https://vercel.com/docs/project-configuration/vercel-json

For the database-backed catalog and quote storage, configure `DATABASE_URL` and
run `npm run db:deploy` against the intended database before using those features.
For admin access, also configure `AUTH_SECRET`, OAuth credentials, the provider
allowlist, and production callback URLs as described above. Dependency installation
generates the Prisma client automatically. Use separate databases and OAuth
configuration for preview environments.

## Production domain and email

The public website uses `https://itquestafrica.com` and displays
`info@itquestafrica.com`. The shared values live in `lib/site-data.ts`.

Before switching production email delivery, provision the mailbox or alias and
verify the sending domain with your mail provider. Update Vercel's
`INQUIRY_TO_EMAIL`, `INQUIRY_FROM_EMAIL`, and any optional `INQUIRY_BCC_EMAIL`.
For SMTP, use the credentials provided by the mailbox host; for Resend, use a
verified sender on the new domain. Redeploy after updating environment variables.
Changing the source code or `.env.example` does not update Vercel's saved settings.

Keep admin allowlists tied to real authorized accounts; do not rename them just
because the website domain changed. Test both a contact enquiry and a quote and
confirm receipt in the destination inbox after deployment.

## Local checks

```bash
npm run db:generate
npm test
npm run build
npm run lint
```
