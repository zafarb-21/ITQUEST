import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ProductsPageContent } from "@/components/products-page-content";
import { getCatalogProducts } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Products",
  "View ITQUEST AFRICA’s catalog of technology supply categories including routers, switches, fibre accessories, networking components, electronics, and smart devices.",
);

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getCatalogProducts();

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Networking gear, hardware and smart devices, sourced and supported"
        description="Routers, switches, Wi-Fi, CCTV, UPS, laptops and smart devices, sourced from trusted brands, configured before delivery and backed by support."
        primaryCta={{ href: "/quote", label: "Request Product Sourcing" }}
        secondaryCta={{ href: "/contact", label: "Talk to Sales" }}
      />

      <ProductsPageContent products={products} />

      <CtaBanner
        title="Need something not listed?"
        description="Send us the model or what it needs to do. We'll source it, price it and deliver it configured."
      />
    </>
  );
}
