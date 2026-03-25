import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { IndustryCard } from "@/components/industry-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { futureIoTCategories, smartSenseFeatures, smartSenseUseCases } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "IoT & Smart Systems",
  "Explore ITQUEST AFRICA SmartSense and practical IoT solutions for environmental monitoring, smart offices, and connected infrastructure in Zimbabwe.",
);

export default function IoTPage() {
  return (
    <>
      <PageHero
        eyebrow="IoT / Smart Systems"
        title="Connected systems positioned as practical business infrastructure, not gimmicks"
        description="ITQUEST AFRICA’s IoT direction is commercially grounded: monitoring, alerts, visibility, and future automation where these capabilities create operational value. The goal is smarter environments, stronger oversight, and better response to risk."
        primaryCta={{ href: "/quote", label: "Request an IoT Consultation" }}
        secondaryCta={{ href: "/contact", label: "Talk to Our Team" }}
        aside={
          <div className="section-panel p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Flagship Concept</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">ITQUEST SmartSense</h2>
            <p className="mt-4 text-sm leading-7 text-white/[0.68]">
              Monitoring and alert intelligence for server rooms, clinics, storage environments, offices,
              refrigeration sites, and other critical equipment spaces.
            </p>
          </div>
        }
      />

      <section className="section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="SmartSense"
              title="A market-ready monitoring platform for sensitive environments"
              description="SmartSense combines compact sensor hardware, remote dashboard visibility, and threshold-based alerting to improve awareness around temperature, humidity, power conditions, and access-related events."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {smartSenseFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Reveal key={feature.title} delay={index * 0.05}>
                  <div className="surface-card p-7">
                    <div className="inline-flex rounded-2xl bg-white/[0.08] p-4 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/[0.68]">{feature.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Use Cases"
              title="Practical deployment contexts with immediate operational relevance"
              description="The value of connected monitoring is strongest when applied to real environments where visibility, thresholds, and response times matter."
              light
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {smartSenseUseCases.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <IndustryCard item={item} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="Future Roadmap"
                  title="A broader connected systems pipeline for modern African environments"
                  description="SmartSense is the first flagship concept, but the longer-term vision extends into broader monitoring, automation, and infrastructure visibility categories."
                />
                <div className="grid gap-5 md:grid-cols-2">
                  {futureIoTCategories.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <Reveal key={item.title} delay={index * 0.05}>
                        <div className="surface-card p-6">
                          <div className="inline-flex rounded-2xl bg-white/[0.08] p-3 text-cyan-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                          <p className="mt-3 text-sm leading-7 text-white/[0.68]">{item.description}</p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="section-panel p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Consultation Focus</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Explore what a smart systems layer could solve</h3>
                <p className="mt-4 text-sm leading-7 text-white/[0.68]">
                  The right IoT strategy begins with business risk, environment sensitivity, and visibility gaps.
                  ITQUEST AFRICA can help map a commercially sensible first deployment.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <ButtonLink href="/quote">Request a Quote</ButtonLink>
                  <ButtonLink href="/contact" variant="secondary">
                    Book a Consultation
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to introduce intelligent monitoring into your environment?"
        description="Discuss SmartSense, future smart office concepts, or a broader connected systems roadmap with ITQUEST AFRICA."
      />
    </>
  );
}
