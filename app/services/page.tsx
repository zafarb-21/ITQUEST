import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ServicesPageContent } from "@/components/services-page-content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata(
  "Services",
  "Explore ITQUEST AFRICA services across infrastructure, security, support, cloud, digital systems, hardware sourcing, and smart technology in Zimbabwe.",
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your business runs on, from one team"
        description="Networks, security, support, websites, cloud, hardware, AI and IoT. Pick a service to see what's included, or tell us the problem and we'll recommend the fix."
        primaryCta={{ href: "/quote", label: "Request a Quote" }}
        secondaryCta={{ href: "/contact", label: "Talk to Our Team" }}
      />

      <ServicesPageContent />

      <CtaBanner
        title="Not sure which service fits?"
        description="Describe what's going wrong or what you want to build. An engineer will reply within a working day with a plan and a quote."
      />
    </>
  );
}
