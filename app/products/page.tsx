import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ProductsPageContent } from "@/components/products-page-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Products",
  "View ITQUEST AFRICA’s premium catalog-style technology supply categories including routers, switches, fibre accessories, networking components, electronics, and smart devices.",
);

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="A premium catalog view of dependable technology supply capability"
        description="ITQUEST AFRICA supplies dependable technology hardware and connectivity equipment tailored to business, institutional, and infrastructure needs. This page is positioned as a capability showcase, not a low-end storefront."
        primaryCta={{ href: "/quote", label: "Request Product Sourcing" }}
        secondaryCta={{ href: "/contact", label: "Talk to Sales" }}
      />

      <ProductsPageContent />

      <CtaBanner
        title="Need hardware aligned to a specific project or environment?"
        description="Share the deployment context, expected scale, and technical requirements. ITQUEST AFRICA can help shape a more precise sourcing response."
      />
    </>
  );
}
