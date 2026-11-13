import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Cpu,
  Globe2,
  Network,
  ShieldCheck,
  Sparkles,
  Thermometer,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { FaqAccordion } from "@/components/faq-accordion";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { faqs, whatsappHref } from "@/lib/site-data";
import { HomeHero } from "@/sections/home-hero";

// Nov 13 2026 redesign (Concept A). The home page says what we do, how a job runs, and how to reach us. The old sample
// testimonials and case studies are gone: ITQUEST shows only what is true.
export const metadata: Metadata = buildMetadata(
  "Reliable IT, Security & AI for Zimbabwean Businesses",
  "Networks, CCTV and access control, IT hardware supply, websites, AI agents and SmartSense IoT monitoring for businesses in Zimbabwe. Designed, installed and supported by engineers.",
);

const services = [
  { icon: Network, title: "Networking", text: "Cabling, Wi-Fi, firewalls and failover internet for offices, schools and clinics.", cta: "Site survey → quote", href: "/services#networking-infrastructure" },
  { icon: ShieldCheck, title: "Security systems", text: "CCTV, access control and alarms with phone viewing and local recording.", cta: "Site survey → quote", href: "/services#cctv-surveillance-systems" },
  { icon: Sparkles, title: "AI Agents", text: "A call agent, website chatbot and WhatsApp agent trained on your business, answering 24/7.", cta: "Pilot programme open", href: "/services#ai-intelligent-systems", featured: true },
  { icon: Cpu, title: "Hardware supply", text: "Laptops, servers, UPS and network gear sourced, configured and delivered.", cta: "Browse products", href: "/products" },
  { icon: Globe2, title: "Web & digital", text: "Fast business websites, booking and payment flows, hosting and business email.", cta: "From setup to care", href: "/services#web-digital-solutions" },
  { icon: Thermometer, title: "SmartSense IoT", text: "Temperature, power and door alerts for server rooms, pharmacies and cold rooms.", cta: "Pilot units available", href: "/iot" },
];

const steps = [
  ["1", "Tell us what you need", "WhatsApp, call or the quote form. We reply the same working day."],
  ["2", "Site visit", "An engineer checks the space, power and existing equipment. No guesswork."],
  ["3", "Clear quote", "Itemised, in USD or ZiG, with a timeline. Valid for 14 days."],
  ["4", "Install & handover", "Tested, labelled and documented, with your team shown how it works."],
  ["5", "Support", "Every install includes support after go-live, then optional care plans."],
];

const agentPoints = [
  "Answers calls, WhatsApp and website chat in English and Shona",
  "Trained on your prices, stock, hours and policies",
  "Books appointments and takes orders, then hands over to your staff",
  "A weekly report of what customers asked",
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="pb-16 md:pb-20">
        <Container>
          <Reveal>
            <h2 className="mb-7 text-3xl font-bold tracking-tight text-ink md:text-4xl">What we do</h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={i * 0.05}>
                  <Link
                    href={s.href}
                    className={
                      s.featured
                        ? "group flex h-full flex-col rounded-2xl bg-ink p-6 text-[#fff] transition hover:-translate-y-1"
                        : "group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-300"
                    }
                  >
                    <span className={s.featured ? "grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-brand-200" : "grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700"}>
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="mt-4 flex items-center gap-2 text-xl font-semibold">
                      <span className={s.featured ? "text-[#fff]" : "text-ink"}>{s.title}</span>
                      {s.featured ? <span className="rounded-full bg-brand-200 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink">New</span> : null}
                    </span>
                    <span className={s.featured ? "mt-2 text-[15px] leading-6 text-slate-300" : "mt-2 text-[15px] leading-6 text-slate-600"}>{s.text}</span>
                    <span className={s.featured ? "mt-auto pt-5 text-sm font-semibold text-brand-200" : "mt-auto pt-5 text-sm font-semibold text-brand-700"}>
                      {s.cta} <ArrowRight className="ml-1 inline h-3.5 w-3.5 transition group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How a job runs" title="From first message to handover, in five clear steps" light />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-5">
            {steps.map(([n, title, text], i) => (
              <Reveal key={n} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-2xl border border-ink/10 bg-paper p-5 md:block">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-ink text-sm font-bold text-[#fff]">{n}</span>
                  <div>
                    <h3 className="text-lg font-semibold md:mt-4">{title}</h3>
                    <p className="mt-1 text-sm leading-6 md:mt-2">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid items-center gap-10 rounded-3xl bg-ink p-8 md:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-brand-200">
                  New · Pilot programme
                </span>
                <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#fff] md:text-[2.75rem] md:leading-[1.1]">
                  AI agents that answer your customers, day and night.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  We build and run AI agents for your phone line, WhatsApp and website, tailored to your business. You get
                  the results; we handle the technology.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={whatsappHref("Hi ITQUEST, I'd like to join the AI agents pilot.")} variant="accent">
                    Join the pilot
                  </ButtonLink>
                  <ButtonLink href="/services#ai-intelligent-systems" variant="onDark">
                    How it works
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="space-y-3">
                {agentPoints.map((p) => (
                  <li key={p} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-[15px] leading-6 text-slate-200">
                    <Sparkles className="mt-0.5 h-4 w-4 flex-none text-brand-200" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <Reveal>
              <div>
                <SectionHeading eyebrow="Questions" title="Straight answers" light />
                <p className="-mt-6 text-base leading-7">
                  Something else? Ask us on WhatsApp, or use the assistant in the corner.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <ButtonLink href={whatsappHref()} variant="whatsapp">Chat on WhatsApp</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqAccordion items={faqs} light />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-ink/10 bg-white p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Ready when you are.</h2>
              <p className="mt-2 text-base">Send us the job. You get an itemised quote within 24 hours.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/quote" className="px-6 py-3.5">Get a quote</ButtonLink>
              <ButtonLink href={whatsappHref()} variant="whatsapp" className="px-6 py-3.5">WhatsApp</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
