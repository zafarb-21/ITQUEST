import type { Metadata } from "next";
import { CheckCircle2, Circle } from "lucide-react";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { getRequestByToken, money } from "@/lib/customer-quotes";
import { REQUEST_STEPS, requestStage } from "@/lib/quote-status";
import { whatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your quote request",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

/** Nov 2026: the customer's private request status page (the link shown after the form and in the "we have it" email). */
export default async function RequestStatusPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const request = await getRequestByToken(token);
  if (!request) {
    notFound();
  }
  const quote = request.salesQuotes[0] ?? null;
  const stage = requestStage(request.status, Boolean(quote));
  const fmt = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <section className="section-light section-pad pt-32">
      <Container>
        <div className="surface-card-light mx-auto max-w-3xl p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Your quote request · {fmt(request.submittedAt)}</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-950 md:text-4xl">{stage.title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600">{stage.detail}</p>

          <ol className="mt-8 grid gap-3 sm:grid-cols-4">
            {REQUEST_STEPS.map((label, index) => {
              const done = index <= stage.step;
              return (
                <li
                  key={label}
                  className={done ? "flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800" : "flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500"}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  {label}
                </li>
              );
            })}
          </ol>

          {quote?.publicToken ? (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-[1.25rem] border border-slate-200 bg-white px-6 py-5">
              <div className="flex-1">
                <p className="text-sm text-slate-500">Quotation {quote.number}</p>
                <p className="text-2xl font-semibold text-slate-950">{money(quote.totalUsd)}</p>
              </div>
              <ButtonLink href={`/q/${quote.publicToken}`}>{quote.acceptedAt ? "View the quote" : "View and accept"}</ButtonLink>
            </div>
          ) : null}

          {request.items.length ? (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-950">What you asked for</h2>
              <ul className="mt-3 divide-y divide-slate-200 rounded-[1.25rem] border border-slate-200 bg-white">
                {request.items.map((item) => (
                  <li key={`${item.productNameSnapshot}-${item.skuSnapshot}`} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                    <span className="text-slate-800">{item.productNameSnapshot}</span>
                    <span className="font-semibold text-slate-700">x {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : request.projectType ? (
            <p className="mt-8 text-sm text-slate-500">Request: {request.projectType}</p>
          ) : null}

          <p className="mt-8 text-sm leading-7 text-slate-500">
            Questions?{" "}
            <a href={whatsappLink("Hello ITQUEST AFRICA, about my quote request: ")} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 hover:underline">
              WhatsApp us
            </a>{" "}
            or reply to our email. This page is private to you.
          </p>
        </div>
      </Container>
    </section>
  );
}
