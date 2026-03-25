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
  "Learn about ITQUEST AFRICA, a premium Zimbabwe-based technology company delivering networking, digital systems, hardware supply, and smart infrastructure solutions.",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ITQUEST AFRICA"
        title="A modern African technology company built around credibility, performance, and long-term value"
        description="ITQUEST AFRICA exists to deliver reliable, modern, and scalable technology solutions for businesses, institutions, and connected environments. The company brings infrastructure, digital systems, hardware sourcing, and smart innovation together under one premium solutions brand."
        primaryCta={{ href: "/quote", label: "Request a Consultation" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
        aside={
          <div className="section-panel p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Leadership Perspective</p>
            <p className="mt-4 text-2xl font-semibold text-white">
              Technology should feel dependable, strategic, and ready for growth.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/[0.68]">
              The brand perspective is grounded in engineering discipline, business context, and a commitment
              to polished delivery standards that reflect serious organizational needs.
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
                <h2 className="mt-6 text-4xl font-semibold text-white">A connected vision for Zimbabwe and beyond</h2>
                <p className="mt-5 text-base leading-8 text-white/[0.72]">
                  ITQUEST AFRICA was shaped around a clear gap in the market: organizations need technology
                  partners that combine technical capability with business polish, structured delivery, and a
                  broader view of where digital infrastructure is heading. Too often, networking, digital
                  systems, hardware procurement, and emerging smart solutions are treated as disconnected
                  services. ITQUEST AFRICA brings them together as one cohesive offer.
                </p>
                <p className="mt-5 text-base leading-8 text-white/[0.72]">
                  The result is a company positioned for modern African growth: credible in corporate
                  environments, practical in execution, and ambitious enough to support future regional
                  expansion with the right brand standard from the outset.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-6">
                <div className="surface-card p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Mission</p>
                  <p className="mt-4 text-xl font-semibold text-white">
                    To deliver reliable, modern, and scalable technology solutions that empower businesses,
                    institutions, and communities through connectivity, digital systems, and smart innovation.
                  </p>
                </div>
                <div className="surface-card p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Vision</p>
                  <p className="mt-4 text-xl font-semibold text-white">
                    To become one of Africa’s most trusted technology solution brands for connected infrastructure,
                    digital transformation, and intelligent systems.
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
              title="Principles that shape every client engagement"
              description="The brand standard is built on technical discipline, trustworthy communication, and a focus on solutions that remain useful beyond initial deployment."
              light
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {aboutValues.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.06}>
                  <div className="surface-card-light p-7">
                    <div className="inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300">
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
                title: "Executive-level presentation",
                description:
                  "Clients should feel that the company can sit comfortably in serious procurement, institutional, and growth-stage conversations.",
              },
              {
                title: "Integrated capability",
                description:
                  "Infrastructure, sourcing, digital systems, and smart monitoring are framed as connected parts of one modern technology strategy.",
              },
              {
                title: "Future-facing without looking experimental",
                description:
                  "The company’s innovation posture is practical and commercially mature, allowing IoT and smart systems to feel credible from day one.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="surface-card p-7">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-white/[0.68]">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Looking for a technology partner with premium standards?"
        description="Speak with ITQUEST AFRICA about infrastructure planning, digital systems, product sourcing, or a future-ready smart solutions roadmap."
      />
    </>
  );
}
