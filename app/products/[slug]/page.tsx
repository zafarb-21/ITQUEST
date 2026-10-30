import type { Metadata } from "next";
import { CircleDollarSign, Clock3, PackageCheck, ShieldQuestion, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { getCatalogProductBySlug } from "@/lib/catalog";
import { formatCatalogPrice, formatStockStatus } from "@/lib/catalog-display";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | ITQUEST AFRICA",
    };
  }

  return {
    title: `${product.name} | ITQUEST AFRICA`,
    description: product.description || product.summary,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getCatalogProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={product.category?.name || "Product"}
        title={product.name}
        description={product.description || product.summary}
        primaryCta={{ href: `/quote?product=${encodeURIComponent(product.slug)}`, label: "Request This Product" }}
        secondaryCta={{ href: "/products", label: "Back to Products" }}
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.8fr)]">
            <Reveal>
              <div className="surface-card-light p-8 md:p-10">
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                    SKU {product.sku}
                  </span>
                  <span className="rounded-full bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700">
                    {formatStockStatus(product.stockStatus)}
                  </span>
                </div>

                <h2 className="mt-6 text-3xl font-semibold text-slate-950">Product Overview</h2>
                <p className="mt-4 text-base leading-8 text-slate-600">{product.summary}</p>
                {product.description ? (
                  <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>
                ) : null}

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <DetailCard icon={CircleDollarSign} label="Pricing" value={formatCatalogPrice(product)} />
                  <DetailCard icon={PackageCheck} label="Available units" value={String(product.quantityAvailable)} />
                  <DetailCard
                    icon={Clock3}
                    label="Lead time"
                    value={product.leadTimeDays ? `${product.leadTimeDays} day${product.leadTimeDays === 1 ? "" : "s"}` : "Varies by sourcing"}
                  />
                  <DetailCard icon={Tag} label="Category" value={product.category?.name ?? "General supply"} />
                </div>

                {product.inventoryNotes ? (
                  <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-6 py-5">
                    <div className="flex items-start gap-3">
                      <ShieldQuestion className="mt-1 h-5 w-5 text-brand-700" />
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">Inventory Note</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{product.inventoryNotes}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <aside className="section-panel p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Sourcing Support</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Need pricing, delivery timing, or a larger quantity?</h2>
                <p className="mt-4 text-sm leading-7 text-white/[0.72]">
                  Use the quote flow to request current pricing, confirm availability, or ask for recommended alternatives if this item is not the right fit for the project.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/quote?product=${encodeURIComponent(product.slug)}`}>Get a Quote</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Talk to Sales
                  </ButtonLink>
                </div>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Need this product aligned to a broader deployment?"
        description="Share site details, quantities, installation context, and lead-time expectations for a more practical sourcing response."
      />
    </>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CircleDollarSign;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-5 shadow-card">
      <Icon className="h-5 w-5 text-brand-700" />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-base leading-7 text-slate-700">{value}</p>
    </div>
  );
}
