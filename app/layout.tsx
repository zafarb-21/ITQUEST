import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteAssistant } from "@/components/site-assistant";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoKeywords, siteConfig } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.itquestafrica.co.zw"),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: "ITQUEST AFRICA | Premium Technology Solutions in Zimbabwe",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <SiteAssistant />
        </div>
      </body>
    </html>
  );
}
