"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/lib/site-data";

export function ProductsPageContent() {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredProducts = normalizedQuery
    ? products.filter((product) =>
        [product.title, product.description, ...product.points].join(" ").toLowerCase().includes(normalizedQuery),
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
            const Icon = product.icon;

            return (
              <Reveal key={product.title} delay={index * 0.06}>
                <article id={product.slug} className="surface-card-light p-7">
                  <div className="inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-slate-950">{product.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{product.description}</p>
                  <ul className="mt-6 space-y-3 text-sm text-slate-700">
                    {product.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-brand-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
        {filteredProducts.length === 0 ? (
          <Reveal delay={0.04}>
            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-7 py-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">No matching products</p>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Try a broader term such as networking, CCTV, Wi-Fi, security, hosting, or POS.
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
