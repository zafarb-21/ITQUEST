import { CheckCircle2, Globe, Lightbulb, MapPinned, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { IndustryCard } from "@/components/industry-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { buildMetadata } from "@/lib/metadata";
import {
  caseStudies,
  featuredServices,
  faqs,
  industries,
  reasonsToChoose,
  smartSenseFeatures,
  testimonials,
  trustStrip,
} from "@/lib/site-data";
import { HomeHero } from "@/sections/home-hero";

export const metadata: Metadata = buildMetadata(
  "Premium Technology Solutions in Zimbabwe",
  "ITQUEST AFRICA delivers premium infrastructure, security systems, managed IT support, digital platforms, AI-driven systems, hardware sourcing, and IoT solutions for modern businesses and institutions in Zimbabwe.",
);

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="section-pad pt-0">
        <Container>
          <div className="section-panel px-6 py-5 md:px-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustStrip.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="mt-2 text-sm text-white/55">
                    Trusted by businesses, institutions, and modern enterprises seeking dependable technology delivery.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Company Introduction"
              title="A premium technology partner for connected growth in Zimbabwe"
              description="ITQUEST AFRICA is a modern technology company focused on delivering reliable connectivity, digital systems, and smart infrastructure for a fast-changing world. We help organizations and individuals build stronger networks, modernize their digital presence, source quality IT hardware, and adopt intelligent connected solutions designed for efficiency, scale, and long-term value."
            />
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Regionally minded, locally grounded",
                description:
                  "Built for Zimbabwe first, with the standard, positioning, and service ambition of a future-facing African brand.",
              },
              {
                icon: ShieldCheck,
                title: "Credibility through execution",
                description:
                  "Every touchpoint is designed to feel considered, structured, and aligned with serious business expectations.",
              },
              {
                icon: MapPinned,
                title: "Technology with operational purpose",
                description:
                  "We focus on infrastructure and systems that improve continuity, visibility, usability, and confidence.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="surface-card p-7">
                    <div className="inline-flex rounded-2xl bg-white/[0.08] p-4 text-cyan-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-white/[0.68]">{item.description}</p>
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
              eyebrow="Service Pillars"
              title="Integrated solutions across infrastructure, security systems, digital platforms, hardware, and connected intelligence"
              description="A curated look at the infrastructure, security, support, and digital capabilities that define ITQUEST AFRICA's premium service model."
              light
            />
          </Reveal>
          <div className="grid gap-6 xl:grid-cols-2">
            {featuredServices.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.08}>
                <ServiceCard service={service} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why ITQUEST AFRICA"
              title="Serious technology delivery for organizations that need more than a basic setup"
              description="The difference is not only in what we provide, but in how each solution is framed: engineered with clarity, aligned to business reality, and prepared for what comes next."
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reasonsToChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.06}>
                  <div className="surface-card p-7">
                    <div className="flex items-center gap-4">
                      <div className="rounded-2xl bg-white/[0.08] p-4 text-cyan-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/[0.68]">{item.description}</p>
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
              eyebrow="Industries Served"
              title="Technology support shaped around the realities of modern African organizations"
              description="From private businesses to institutions and premium residential environments, each sector has distinct operational needs. ITQUEST AFRICA frames its work around those realities."
              light
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <IndustryCard item={item} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="section-panel relative overflow-hidden px-8 py-10 md:px-10">
            <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(34,192,240,0.18),transparent_58%)]" />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_460px]">
              <Reveal>
                <div>
                  <span className="eyebrow">Flagship IoT Offering</span>
                  <h2 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
                    ITQUEST <span className="text-gradient">SmartSense</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-white/[0.72]">
                    A smart monitoring and alert platform for businesses, clinics, server rooms, cold
                    storage spaces, offices, and critical environments. SmartSense combines compact
                    sensor hardware with cloud visibility and mobile alerts to monitor temperature,
                    humidity, power conditions, unauthorized access events, and environmental risk in
                    real time.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      "Server rooms",
                      "Pharmacy storage",
                      "Office equipment rooms",
                      "Retail refrigeration",
                      "Clinics and labs",
                      "Network equipment areas",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                        <span className="text-sm text-white/[0.72]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <ButtonLink href="/iot">Explore SmartSense</ButtonLink>
                    <ButtonLink href="/quote" variant="secondary">
                      Request an IoT Consultation
                    </ButtonLink>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="grid gap-4">
                  {smartSenseFeatures.slice(0, 4).map((feature) => {
                    const Icon = feature.icon;

                    return (
                      <div key={feature.title} className="surface-card p-5">
                        <div className="flex items-start gap-4">
                          <div className="rounded-2xl bg-white/[0.08] p-3 text-cyan-300">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-white/[0.65]">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Selected Project Narratives"
              title="Capability previews shaped as credible, enterprise-grade case studies"
              description="The project story matters. These examples demonstrate how ITQUEST AFRICA positions practical infrastructure, digital transformation, and smart monitoring outcomes."
              action={
                <ButtonLink href="/projects" variant="primary">
                  View All Projects
                </ButtonLink>
              }
              light
            />
          </Reveal>
          <div className="grid gap-6 xl:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Reveal key={study.title} delay={index * 0.08}>
                <CaseStudyCard study={study} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Client Perspective"
              title="A tone of service that feels structured, credible, and premium"
              description="These sample testimonials reflect the kind of experience ITQUEST AFRICA is designed to deliver: clear communication, technical competence, and confidence from first contact to final outcome."
            />
          </Reveal>
          <div className="grid gap-6 xl:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Frequently Asked Questions"
              title="Straight answers for organizations evaluating their next technology investment"
              description="The site is designed to convert serious interest into qualified conversations. These answers keep the positioning clear without adding clutter."
              light
            />
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_minmax(0,1.1fr)]">
            <Reveal>
              <div className="surface-card-light p-8">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-slate-950 p-4 text-cyan-300">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-950">Need a tailored recommendation?</h3>
                </div>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  Whether the priority is networking, web systems, equipment sourcing, or SmartSense,
                  the next step is a focused conversation around requirements, scale, and timing.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/contact">Talk to Our Team</ButtonLink>
                  <ButtonLink href="/quote" variant="secondary">
                    Request a Quote
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <FaqAccordion items={faqs} light />
            </Reveal>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Ready to build a smarter technology foundation?"
        description="From connectivity and digital systems to hardware supply and intelligent monitoring, ITQUEST AFRICA is positioned to deliver technology with premium clarity and business confidence."
      />
    </>
  );
}
