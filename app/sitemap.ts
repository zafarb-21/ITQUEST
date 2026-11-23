import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/lib/catalog";
import { navItems, siteConfig } from "@/lib/site-data";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [...navItems.map((item) => item.href), "/quote"].map((href) => ({
    url: `${siteConfig.url}${href === "/" ? "" : href}`,
    lastModified: now,
    changeFrequency: (href === "/products" ? "daily" : "monthly") as "daily" | "monthly",
    priority: href === "/" ? 1 : href === "/quote" || href === "/products" ? 0.9 : 0.7,
  }));
  let products: MetadataRoute.Sitemap = [];
  try {
    products = (await getCatalogProducts()).map((product) => ({
      url: `${siteConfig.url}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("[ITQUEST AFRICA] Sitemap: catalog unavailable", error instanceof Error ? error.message : error);
  }
  return [...pages, ...products];
}
