import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { aboutValues } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "About",
  "Learn about ITQUEST AFRICA, a Zimbabwe-based technology company delivering networking, digital systems, hardware supply, and smart infrastructure solutions.",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A Zimbabwean technology company that does the job properly"
        description="ITQUEST AFRICA designs, installs and supports the systems businesses run on: networks, security, hardware, websites, AI agents and smart monitoring. Engineers do the work, and we stay after go-live."
        primaryCta={{ href: "/quote", label: "Request a Consultation" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
        aside={
          <div className="section-panel p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Our promise</p>
            <p className="mt-4 text-2xl font-semibold text-ink">
              If we install it, we stand behind it.
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Every job gets a site visit, an itemised quote, tidy labelled work, documentation, and support
              after go-live.
            </p>
          </div>
        }
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_0.9fr]">
            <Reveal>
              <div className="section-panel p-8 md:p-10">
                <span className="eyebrow">Our Story</span>
                <h2 className="mt-6 text-4xl font-semibold text-ink">Why ITQUEST exists</h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Too many businesses deal with one person for the network, another for the cameras, a third for
                  the website, and nobody who answers when something breaks. ITQUEST AFRICA puts it under one team
                  of engineers who plan the work, install it properly and stay reachable afterwards.
                </p>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  We started in networking and telecoms, and we&apos;re adding what our clients ask for next: AI agents
                  that answer customers, and SmartSense monitoring for the rooms that can&apos;t fail.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-6">
                <div className="surface-card p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Mission</p>
                  <p className="mt-4 text-xl font-semibold text-ink">
                    Reliable technology for Zimbabwean businesses, installed properly and supported after go-live.
                  </p>
                </div>
                <div className="surface-card p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Vision</p>
                  <p className="mt-4 text-xl font-semibold text-ink">
                    To be the team African businesses call first for networks, security and AI.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Values"
              title="How we work"
              description="Six commitments you can hold us to, on every job."
              light
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aboutValues.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.06}>
                  <div className="surface-card-light p-7">
                    <div className="inline-flex rounded-2xl bg-brand-50 p-4 text-brand-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950">{value.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{value.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid gap-6 xl:grid-cols-3">
            {[
              {
                title: "One team, end to end",
                description:
                  "Survey, quote, supply, install and support from the same people, so nothing falls between contractors.",
              },
              {
                title: "Clear, itemised quotes",
                description:
                  "Every line priced in USD or ZiG, with timelines, before any work starts. No surprise extras.",
              },
              {
                title: "Here after go-live",
                description:
                  "Every install includes support, with optional care plans so your systems stay healthy.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="surface-card p-7">
                  <h3 className="text-2xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Let's talk about your next job"
        description="Networks, security, hardware, a website or an AI agent: tell us what you need and get an itemised quote within 24 hours."
      />
    </>
  );
}
