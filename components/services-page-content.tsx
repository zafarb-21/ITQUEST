"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { servicePillars, whatsappHref, type ServiceItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

// Nov 13 2026 redesign: one page that is quick to scan. A sticky list of services (chips on a phone) follows the reader, each
// service is a compact card, and the deeper detail opens on demand instead of making the page 27,000 px tall.
export function ServicesPageContent() {
  const [active, setActive] = useState(servicePillars[0]?.slug ?? "");
  const groups = useMemo(() => {
    const m = new Map<string, ServiceItem[]>();
    for (const s of servicePillars) m.set(s.category, [...(m.get(s.category) ?? []), s]);
    return [...m.entries()];
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    servicePillars.forEach((s) => {
      const el = document.getElementById(s.slug);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const chip = document.querySelector(`[data-chip="${active}"]`);
    chip?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <section className="pb-16 md:pb-24">
      <div className="sticky top-[76px] z-30 border-y border-ink/10 bg-paper/95 backdrop-blur lg:hidden">
        <div className="flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none]">
          {servicePillars.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              data-chip={s.slug}
              className={cn(
                "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                active === s.slug ? "border-ink bg-ink text-[#fff]" : "border-ink/15 bg-white text-slate-600",
              )}
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      <Container className="mt-8 grid gap-10 lg:mt-4 lg:grid-cols-[260px_minmax(0,1fr)]">
        <nav aria-label="Services" className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            {groups.map(([category, items]) => (
              <div key={category}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{category}</p>
                <ul className="space-y-0.5">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={`#${s.slug}`}
                        className={cn(
                          "block rounded-lg border-l-2 px-3 py-1.5 text-sm transition",
                          active === s.slug ? "border-brand-600 bg-white font-semibold text-ink" : "border-transparent text-slate-600 hover:text-ink",
                        )}
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="rounded-2xl border border-ink/10 bg-white p-4">
              <p className="text-sm font-semibold text-ink">Not sure what you need?</p>
              <p className="mt-1 text-sm">Describe the problem; we&apos;ll suggest the fix.</p>
              <ButtonLink href={whatsappHref("Hi ITQUEST, I'm not sure which service I need. Here's my situation:")} variant="whatsapp" className="mt-3 w-full">
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </nav>

        <div className="space-y-5">
          {servicePillars.map((s) => (
            <ServiceCardFull key={s.slug} service={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCardFull({ service: s }: { service: ServiceItem }) {
  const [open, setOpen] = useState(false);
  const Icon = s.icon;
  const hasMore = Boolean(s.featureCards?.length || s.benefits?.length);
  return (
    <article id={s.slug} className="scroll-mt-40 rounded-3xl border border-ink/10 bg-white p-6 transition hover:border-brand-300 md:p-8 lg:scroll-mt-28">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-brand-50 text-brand-700">
            <Icon className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{s.category}</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-[1.75rem]">{s.title}</h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-7">{s.description}</p>
          </div>
        </div>
        <div className="flex flex-none gap-2">
          <ButtonLink href="/quote">Get a quote</ButtonLink>
          <ButtonLink href={whatsappHref(`Hi ITQUEST, I'd like to ask about ${s.title}.`)} variant="whatsapp">
            WhatsApp
          </ButtonLink>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">What we offer</p>
          <ul className="mt-3 space-y-2">
            {s.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[15px] text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-600" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        {s.useCases?.length ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Where it&apos;s used</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.useCases.map((u) => (
                <span key={u} className="rounded-full bg-paper px-3 py-1.5 text-sm text-slate-700">{u}</span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {hasMore ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            {open ? "Less detail" : "More detail"}
            <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} aria-hidden />
          </button>
          <div className={cn("grid transition-all duration-300", open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              {s.featureCards?.length ? (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {s.featureCards.map((f) => {
                    const FI = f.icon;
                    return (
                      <div key={f.title} className="rounded-2xl border border-ink/10 bg-paper/60 p-4">
                        <FI className="h-5 w-5 text-brand-700" aria-hidden />
                        <h3 className="mt-3 text-base font-semibold">{f.title}</h3>
                        <p className="mt-1 text-sm leading-6">{f.description}</p>
                      </div>
                    );
                  })}
                </div>
              ) : null}
              {s.benefits?.length ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                      <ArrowRight className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </article>
  );
}
