import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/metadata";
import { servicePillars } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "Services",
  "Explore ITQUEST AFRICA services including networking infrastructure, web and digital solutions, IT hardware supply, and practical IoT systems in Zimbabwe.",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Integrated technology services designed for operational confidence and growth"
        description="ITQUEST AFRICA provides a structured blend of connectivity, digital systems, hardware sourcing, and smart technology capability. Each service area is designed to support serious organizations with clear needs and long-term ambitions."
        primaryCta={{ href: "/quote", label: "Request a Quote" }}
        secondaryCta={{ href: "/contact", label: "Talk to Our Team" }}
      />

      <section className="section-pad">
        <Container className="space-y-8">
          {servicePillars.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.slug} delay={index * 0.05}>
                <article className="section-panel overflow-hidden p-8 md:p-10">
                  <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                    <div>
                      <div className="inline-flex rounded-3xl bg-white/[0.08] p-5 text-cyan-300">
                        <Icon className="h-8 w-8" />
                      </div>
                      <h2 className="mt-6 text-3xl font-semibold text-white">{service.title}</h2>
                      <p className="mt-4 text-base leading-8 text-white/[0.68]">{service.description}</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">What We Offer</p>
                        <ul className="mt-5 grid gap-3 text-sm leading-7 text-white/[0.74] md:grid-cols-2">
                          {service.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-[1.5rem] border border-cyan-300/[0.16] bg-cyan-300/[0.08] p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Ideal For</p>
                        <p className="mt-4 text-sm leading-7 text-white/[0.74]">
                          Businesses, institutions, and premium residential clients looking for dependable
                          delivery, better technology visibility, and a partner that can guide both today’s
                          requirement and tomorrow’s expansion.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <ButtonLink href="/quote">{service.cta}</ButtonLink>
                          <ButtonLink href="/contact" variant="secondary">
                            Ask a Question
                          </ButtonLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </Container>
      </section>

      <CtaBanner
        title="Need a tailored technology scope instead of a generic package?"
        description="Share your environment, priorities, and operational requirements. ITQUEST AFRICA will help define the right combination of infrastructure, digital systems, and supply support."
      />
    </>
  );
}
