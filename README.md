# ITQUEST AFRICA

Premium corporate technology website for ITQUEST AFRICA, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:3000`.

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
INQUIRY_TO_EMAIL=info@itquestafrica.co.zw
INQUIRY_FROM_EMAIL=ITQUEST AFRICA <info@itquestafrica.co.zw>
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@itquestafrica.co.zw
SMTP_PASSWORD=your-password
```

### Option 2: Resend

Use this if the deployment should send mail through Resend.

Required environment variables:

```env
MAIL_PROVIDER=resend
RESEND_API_KEY=your-resend-key
INQUIRY_TO_EMAIL=info@itquestafrica.co.zw
INQUIRY_FROM_EMAIL=ITQUEST AFRICA <enquiries@itquestafrica.co.zw>
```

For production on Resend:

- Verify the sending domain in Resend.
- Use a real sender address on that verified domain.
- Keep `INQUIRY_TO_EMAIL` pointed at the inbox that should receive enquiries.

Optional:

```env
INQUIRY_BCC_EMAIL=director@itquestafrica.co.zw
```

## Environment file

Copy `.env.example` to `.env.local` and fill in the values for the chosen provider.

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

## Local checks

```bash
npm run build
npm run lint
```
