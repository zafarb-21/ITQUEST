"use client";

import { Boxes, CircleDollarSign, Clock3, PackageCheck, Search, ShieldQuestion, Tag } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { formatCatalogPrice, formatStockStatus } from "@/lib/catalog-display";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type ProductsPageContentProps = {
  products: CatalogProduct[];
};

export function ProductsPageContent({ products }: ProductsPageContentProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = normalizedQuery
    ? products.filter((product) =>
        [
          product.name,
          product.summary,
          product.description,
          product.sku,
          product.category?.name,
          product.inventoryNotes,
          formatCatalogPrice(product),
          formatStockStatus(product.stockStatus),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : products;

  return (
    <section className="section-light section-pad">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Supply Categories"
            title="Sourcing aligned to serious operational requirements"
            description="From networking essentials to smart-capable devices, ITQUEST AFRICA helps clients procure equipment with better alignment to use case, environment, and deployment quality."
            light
          />
        </Reveal>
        <Reveal delay={0.04}>
          <div className="relative mb-8 max-w-md">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products..."
              className="input-field pl-12"
              aria-label="Search products"
            />
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            return (
              <Reveal key={product.id} delay={index * 0.06}>
                <article id={product.slug} className="surface-card-light p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300">
                      <Boxes className="h-6 w-6" />
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {product.category ? (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                          {product.category.name}
                        </span>
                      ) : null}
                      <span className={cn("rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]", stockTone(product.stockStatus))}>
                        {formatStockStatus(product.stockStatus)}
                      </span>
                    </div>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-slate-950">{product.name}</h2>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{product.sku}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{product.summary}</p>
                  {product.description ? (
                    <p className="mt-3 text-sm leading-7 text-slate-500">{product.description}</p>
                  ) : null}
                  <div className="mt-6 space-y-3 text-sm text-slate-700">
                    <DetailRow icon={CircleDollarSign} label="Pricing" value={formatCatalogPrice(product)} />
                    <DetailRow icon={PackageCheck} label="Available units" value={String(product.quantityAvailable)} />
                    <DetailRow
                      icon={Clock3}
                      label="Lead time"
                      value={product.leadTimeDays ? `${product.leadTimeDays} day${product.leadTimeDays === 1 ? "" : "s"}` : "Varies by sourcing"}
                    />
                    <DetailRow icon={Tag} label="Category" value={product.category?.name ?? "General supply"} />
                    {product.inventoryNotes ? (
                      <DetailRow icon={ShieldQuestion} label="Note" value={product.inventoryNotes} />
                    ) : null}
                  </div>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink href={`/products/${product.slug}`} className="bg-slate-950 text-white hover:-translate-y-0.5 hover:bg-slate-900">
                      View Details
                    </ButtonLink>
                    <ButtonLink href={`/quote?product=${encodeURIComponent(product.slug)}`} variant="ghost" className="rounded-full border border-slate-200 px-5 py-3 text-slate-700 hover:border-slate-300 hover:bg-slate-100">
                      Get Quote
                    </ButtonLink>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        {products.length > 0 && filteredProducts.length === 0 ? (
          <Reveal delay={0.04}>
            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-7 py-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">No matching products</p>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Try a broader term such as networking, CCTV, Wi-Fi, security, hosting, or POS.
              </p>
            </div>
          </Reveal>
        ) : null}
        {products.length === 0 ? (
          <Reveal delay={0.06}>
            <div className="mt-8 rounded-[1.75rem] border border-amber-200 bg-amber-50 px-7 py-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Catalog not populated yet</p>
              <p className="mt-3 text-base leading-8 text-amber-900/80">
                The database is connected, but there are no active products available for display. Add products in the
                database or run the seed script to populate the catalog.
              </p>
            </div>
          </Reveal>
        ) : null}
        <Reveal delay={0.08}>
          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-7 py-6 shadow-card">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Custom sourcing support</p>
            <p className="mt-3 text-base leading-8 text-slate-600">
              Product categories shown here are indicative. Availability may vary, and selected items can be
              sourced on request based on project specification, compatibility, and deployment goals.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Boxes;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 text-brand-700" />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
        <p className="mt-1 leading-6 text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function stockTone(stockStatus: CatalogProduct["stockStatus"]) {
  if (stockStatus === "IN_STOCK") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (stockStatus === "LOW_STOCK") {
    return "bg-amber-50 text-amber-700";
  }

  if (stockStatus === "OUT_OF_STOCK") {
    return "bg-rose-50 text-rose-700";
  }

  return "bg-sky-50 text-sky-700";
}
