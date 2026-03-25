import type { Metadata } from "next";
import { Clock3, Mail, MapPin, PhoneCall } from "lucide-react";
import { ContactForms } from "@/components/contact-forms";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-data";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Contact ITQUEST AFRICA for networking, digital systems, hardware sourcing, and IoT consultations in Zimbabwe.",
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak with a team focused on modern infrastructure, digital systems, and connected growth"
        description="Whether you are planning a network deployment, sourcing infrastructure, building a digital platform, or exploring smart systems, our team is ready to help."
        primaryCta={{ href: "/quote", label: "Request a Quote" }}
        secondaryCta={{ href: "/services", label: "Explore Services" }}
      />

      <section className="section-light section-pad">
        <Container>
          <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
            <Reveal>
              <aside className="space-y-5">
                {[
                  { icon: Mail, title: "Email", value: siteConfig.email },
                  { icon: PhoneCall, title: "Phone", value: siteConfig.phone },
                  { icon: Clock3, title: "Business Hours", value: siteConfig.hours },
                  { icon: MapPin, title: "Location", value: siteConfig.location },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal key={item.title} delay={index * 0.05}>
                      <div className="surface-card-light p-6">
                        <div className="inline-flex rounded-2xl bg-slate-950 p-4 text-cyan-300">
                          <Icon className="h-5 w-5" />
                        </div>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
                        <p className="mt-3 text-lg font-semibold text-slate-950">{item.value}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </aside>
            </Reveal>
            <Reveal delay={0.08}>
              <ContactForms light />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
