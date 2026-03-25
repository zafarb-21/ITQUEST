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
  "Projects & Case Studies",
  "Review polished case study narratives from ITQUEST AFRICA covering network modernization, digital presence transformation, structured connectivity, and smart monitoring concepts.",
);

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects / Case Studies"
        title="Project narratives that demonstrate capability, structure, and business relevance"
        description="These examples are framed to show how ITQUEST AFRICA approaches real technology environments: by understanding the challenge, aligning the solution, and delivering a measurable operational advantage."
        primaryCta={{ href: "/contact", label: "Discuss a Project" }}
        secondaryCta={{ href: "/quote", label: "Request a Proposal" }}
      />

      <section className="section-light section-pad">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Capability Showcase"
              title="From network modernization to digital transformation and monitoring visibility"
              description="The purpose of these case studies is not volume. It is to communicate a mature delivery posture and the ability to frame technology projects in credible, outcome-oriented language."
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
        title="Planning a serious project that needs clear technical direction?"
        description="Whether the goal is network reliability, a stronger digital presence, or a smarter monitoring environment, ITQUEST AFRICA is ready to shape the next step."
      />
    </>
  );
}
