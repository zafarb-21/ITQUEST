import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { whatsappHref } from "@/lib/site-data";
import { ExampleQuote } from "@/sections/example-quote";

// Nov 13 2026 redesign (Concept A): a plain-spoken promise, an example quote, and two ways to reach us. No autoplay video
// (the old 20 MB hero.mp4 was slow and costly on Zimbabwean mobile data).
const facts = [
  ["24 h", "quote turnaround"],
  ["USD / ZiG", "invoicing"],
  ["Site visit", "before every install"],
];

export function HomeHero() {
  return (
    <section className="pb-14 pt-32 md:pb-20 md:pt-40">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="eyebrow">Harare · Networks · Security · AI</span>
            <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.25rem]">
              Reliable IT for Zimbabwean businesses, <span className="text-brand-600">done properly.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Networks, CCTV and access control, hardware supply and web systems, installed by engineers and supported
              after go-live. Now with AI agents that answer your calls and chats.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/quote" className="px-6 py-3.5 text-[15px]">
                Get a quote in 24 h
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="whatsapp" className="px-6 py-3.5 text-[15px]">
                Chat on WhatsApp
              </ButtonLink>
            </div>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
              {facts.map(([value, label]) => (
                <div key={label}>
                  <dt className="text-xl font-bold text-ink">{value}</dt>
                  <dd className="text-sm text-slate-500">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <ExampleQuote />
        </div>
      </Container>
    </section>
  );
}
