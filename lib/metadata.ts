import type { Metadata } from "next";
import { seoKeywords, siteConfig } from "@/lib/site-data";

export function buildMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    keywords: seoKeywords,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}
