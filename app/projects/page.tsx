import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { Container } from "@/components/container";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { caseStudies } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "Typical Projects",
  "Typical ITQUEST AFRICA project scopes: office network upgrades, business websites, structured cabling and SmartSense monitoring, with the challenge, approach and outcome for each.",
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Typical projects"
        title="The kinds of jobs we take on, and how we run them"
        description="These are example project scopes, not client stories: the common problems we solve and how each job is planned, installed and handed over. Ask us about yours."
        primaryCta={{ href: "/contact", label: "Discuss a Project" }}
        secondaryCta={{ href: "/quote", label: "Request a Proposal" }}
      />

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Example scopes"
              title="Networks, websites, cabling and monitoring"
              description="Each card shows a typical starting point, what we would do, and what you would get."
              light
            />
          </Reveal>
          <div className="grid gap-6 xl:grid-cols-2">
            {caseStudies.map((study, index) => (
              <Reveal key={study.title} delay={index * 0.06}>
                <CaseStudyCard study={study} light />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Have a job like one of these?"
        description="Tell us about it on WhatsApp or through the quote form, and an engineer will come back to you within a working day."
      />
    </>
  );
}
