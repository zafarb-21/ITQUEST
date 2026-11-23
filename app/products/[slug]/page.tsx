import type { Metadata } from "next";
import { CircleDollarSign, Clock3, PackageCheck, ShieldQuestion, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToQuote } from "@/components/add-to-quote";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ProductImage } from "@/components/product-image";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { Reveal } from "@/components/reveal";
import { getCatalogProductBySlug } from "@/lib/catalog";
import { formatCatalogPrice, formatStockStatus } from "@/lib/catalog-display";
import { whatsappLink, whatsappMessageFor } from "@/lib/whatsapp";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Nov 2026: cached for 5 minutes instead of rebuilt on every visit (stock and prices change through the admin, not by the second)
export const revalidate = 300;

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

                <ProductImage src={product.imageUrl} alt={product.imageAlt || product.name} large className="mt-6" />

                <h2 className="mt-8 text-3xl font-semibold text-slate-950">Product Overview</h2>
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

                {product.specs.length ? (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-slate-950">Specifications</h3>
                    <table className="mt-4 w-full overflow-hidden rounded-[1.25rem] border border-slate-200 text-sm">
                      <tbody>
                        {product.specs.map((row) => (
                          <tr key={row.label} className="border-b border-slate-200 last:border-0">
                            <th scope="row" className="w-2/5 bg-slate-50 px-5 py-3 text-left font-semibold text-slate-600">
                              {row.label}
                            </th>
                            <td className="px-5 py-3 text-slate-700">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Sourcing Support</p>
                <h2 className="mt-4 text-3xl font-semibold text-ink">Need pricing, delivery timing, or a larger quantity?</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Use the quote flow to request current pricing, confirm availability, or ask for recommended alternatives if this item is not the right fit for the project.
                </p>
                <AddToQuote product={{ slug: product.slug, name: product.name, sku: product.sku }} light={false} withQuantity className="mt-8" />
                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink href={`/quote?product=${encodeURIComponent(product.slug)}`}>Get a Quote</ButtonLink>
                  <a
                    href={whatsappLink(whatsappMessageFor(`/products/${product.slug}`, `${product.name} (${product.sku})`))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Ask on WhatsApp
                  </a>
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
