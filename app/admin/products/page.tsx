import type { Metadata } from "next";
import { AdminSessionBar } from "@/components/admin/admin-session-bar";
import { Container } from "@/components/container";
import { ProductsAdminManager } from "@/components/admin/products-admin-manager";
import { PageHero } from "@/components/page-hero";
import { requireAdminPage } from "@/lib/admin-auth";
import { getAdminCatalogProducts, getCatalogCategories } from "@/lib/catalog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata(
    "Admin Products",
    "Internal catalog management for ITQUEST AFRICA products, pricing, inventory, and category assignment.",
  ),
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const admin = await requireAdminPage();
  const [products, categories] = await Promise.all([getAdminCatalogProducts(), getCatalogCategories()]);

  return (
    <>
      <PageHero
        eyebrow="Internal Admin"
        title="Manage products, pricing, and stock"
        description="Use this internal page to add new catalog entries, edit current products, and keep inventory information aligned with the website."
      />

      <section className="section-light section-pad">
        <Container>
          <AdminSessionBar admin={admin} />
          <ProductsAdminManager products={products} categories={categories} />
        </Container>
      </section>
    </>
  );
}
