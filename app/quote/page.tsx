import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { QuoteInquiryForm } from "@/components/forms/quote-inquiry-form";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Request a Quote",
  "Request a tailored quote from ITQUEST AFRICA for infrastructure, security systems, digital platforms, AI-driven systems, support services, hardware sourcing, cloud setup, or smart IoT solutions in Zimbabwe.",
);

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Consultation / Request Quote"
        title="Share your requirements and receive a more tailored next step"
        description="Use this form to outline your environment, priorities, and project timing. ITQUEST AFRICA will use that context to frame a more relevant response for infrastructure, security, support, digital systems, supply, cloud, or smart monitoring work."
      />

      <section className="section-pad">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_minmax(0,1.1fr)]">
            <Reveal>
              <div className="section-panel p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">What to include</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">The clearer the brief, the better the response</h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Your industry, site type, or business context",
                    "Whether you need infrastructure, security, digital systems, cloud setup, support services, hardware, or smart monitoring",
                    "Expected scale, quantities, or locations involved",
                    "Timing, urgency, and any critical constraints",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-cyan-300" />
                      <span className="text-sm leading-7 text-white/[0.72]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <QuoteInquiryForm sourcePage="/quote" variant="full" />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
