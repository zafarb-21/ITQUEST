import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "./globals.css";
import { SiteAssistant } from "@/components/site-assistant";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { seoKeywords, siteConfig } from "@/lib/site-data";

// Inter (OFL), served from this site: no Google Fonts request, so the first paint is faster on slow connections.
const inter = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "ITQUEST AFRICA | Reliable IT, Security & AI for Zimbabwean Businesses",
    template: "%s | ITQUEST AFRICA",
  },
  description: siteConfig.description,
  keywords: seoKeywords,
  openGraph: {
    title: "ITQUEST AFRICA",
    description: siteConfig.description,
    type: "website",
    siteName: "ITQUEST AFRICA",
    locale: "en_ZW",
  },
  twitter: {
    card: "summary_large_image",
    title: "ITQUEST AFRICA",
    description: siteConfig.description,
  },
};

// Nov 2026: business details for Google (LocalBusiness structured data)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.png`,
  image: `${siteConfig.url}/opengraph-image`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "622 Sandton Park, Westgate",
    addressLocality: "Harare",
    addressCountry: "ZW",
  },
  areaServed: "Zimbabwe",
  slogan: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <SiteAssistant />
          <WhatsAppFloat />
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        {/* Vercel Web Analytics (turn it on in Vercel -> the project -> Analytics). Only on Vercel: elsewhere the script isn't served. */}
        {process.env.VERCEL ? <Script src="/_vercel/insights/script.js" strategy="afterInteractive" /> : null}
      </body>
    </html>
  );
}
