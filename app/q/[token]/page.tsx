import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { QuoteActions } from "@/components/quote-actions";
import { WhatsAppIcon } from "@/components/whatsapp-button";
import { getQuoteByToken, money, QUOTE_VALID_DAYS } from "@/lib/customer-quotes";
import { getPrismaClient } from "@/lib/prisma";
import { quoteState } from "@/lib/quote-status";
import { whatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your quotation",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

/** Nov 2026: the customer's private quote page (the link in the quote email). */
export default async function QuotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const quote = await getQuoteByToken(token);
  if (!quote || quote.status !== "SENT") {
    notFound();
  }

  if (!quote.viewedAt) {
    await getPrismaClient().salesQuote.updateMany({ where: { publicToken: token, viewedAt: null }, data: { viewedAt: new Date() } });
  }

  const state = quoteState({ ...quote, requestStatus: quote.quoteRequest?.status }, QUOTE_VALID_DAYS);
  const sent = quote.sentAt ?? quote.createdAt;
  const validUntil = new Date(sent.getTime() + QUOTE_VALID_DAYS * 86400000);
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const total = money(quote.totalUsd);
  const items = quote.quoteRequest?.items ?? [];

  return (
    <section className="section-light section-pad pt-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="surface-card-light p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Quotation {quote.number}</p>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">Hello {quote.customerName.split(/\s+/)[0]}, here is your quote</h1>
            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Total</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-950">{total}</dd>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Sent</dt>
                <dd className="mt-2 text-base font-semibold text-slate-800">{fmt(sent)}</dd>
              </div>
              <div className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Valid until</dt>
                <dd className="mt-2 text-base font-semibold text-slate-800">{fmt(validUntil)}</dd>
              </div>
            </dl>
            {items.length ? (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-slate-950">What you asked for</h2>
                <ul className="mt-3 divide-y divide-slate-200 rounded-[1.25rem] border border-slate-200 bg-white">
                  {items.map((item) => (
                    <li key={`${item.productNameSnapshot}-${item.skuSnapshot}`} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                      <span className="text-slate-800">
                        {item.productNameSnapshot}
                        {item.skuSnapshot ? <span className="ml-2 text-slate-400">{item.skuSnapshot}</span> : null}
                      </span>
                      <span className="font-semibold text-slate-700">x {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`/q/${token}/pdf`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900"
              >
                <FileText className="h-4 w-4" />
                Open the quotation (PDF)
              </a>
              <a
                href={whatsappLink(`Hello ITQUEST AFRICA, about quotation ${quote.number}: `)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-500">
              The PDF has the full line items, terms and payment details. This page is private to you: please don&apos;t share the link.
            </p>
          </div>
          <QuoteActions token={token} number={quote.number} total={total} state={state} acceptedBy={quote.acceptedBy} />
        </div>
      </Container>
    </section>
  );
}
