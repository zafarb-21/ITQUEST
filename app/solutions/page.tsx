import type { Metadata } from "next";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { IndustryCard } from "@/components/industry-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "Solutions & Industries",
  "See how ITQUEST AFRICA supports SMEs, corporates, education, healthcare, hospitality, retail, and residential environments with tailored technology solutions.",
);

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Technology that fits how your sector works"
        description="Offices, schools, clinics, lodges, shops and homes each need different things. Here's what we usually set up for each."
        primaryCta={{ href: "/contact", label: "Discuss Your Sector" }}
        secondaryCta={{ href: "/quote", label: "Request a Proposal" }}
      />

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Industries We Serve"
              title="Pick your sector"
              description="The common needs we see in each, and the systems that solve them."
              light
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <IndustryCard item={item} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad">
        <Container>
          <div className="grid gap-6 xl:grid-cols-3">
            {[
              {
                title: "SMEs and Corporates",
                description:
                  "Typical needs include secure connectivity, dependable hardware, branch-ready infrastructure, and digital platforms that strengthen credibility and customer acquisition.",
              },
              {
                title: "Education and Healthcare",
                description:
                  "These sectors require continuity, organized network environments, accessible digital interfaces, and in some cases environmental monitoring for sensitive spaces.",
              },
              {
                title: "Hospitality, Retail, and Residential",
                description:
                  "Client expectations center on reliable user experience, property-wide connectivity, smart visibility, and hardware choices that support daily operations without unnecessary complexity.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <div className="surface-card p-7">
                  <h2 className="text-2xl font-semibold text-ink">{item.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Don't see your sector?"
        description="Tell us how your business runs and we'll suggest the right mix of network, security, hardware and software."
      />
    </>
  );
}
