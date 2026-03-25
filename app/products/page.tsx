import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { products } from "@/lib/site-data";

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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => {
              const Icon = product.icon;

              return (
                <Reveal key={product.title} delay={index * 0.06}>
                  <article className="surface-card-light p-7">
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
          <Reveal delay={0.08}>
            <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white px-7 py-6 shadow-card">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Custom sourcing support
              </p>
              <p className="mt-3 text-base leading-8 text-slate-600">
                Product categories shown here are indicative. Availability may vary, and selected items can be
                sourced on request based on project specification, compatibility, and deployment goals.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Need hardware aligned to a specific project or environment?"
        description="Share the deployment context, expected scale, and technical requirements. ITQUEST AFRICA can help shape a more precise sourcing response."
      />
    </>
  );
}
