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
        title="Integrated technology services designed for operational confidence and growth"
        description="ITQUEST AFRICA brings infrastructure, security, support, digital capability, cloud setup, hardware sourcing, and smart technology together under one premium service model. Each service area is structured to support serious organizations with clear operational needs and long-term ambitions."
        primaryCta={{ href: "/quote", label: "Request a Quote" }}
        secondaryCta={{ href: "/contact", label: "Talk to Our Team" }}
      />

      <ServicesPageContent />

      <CtaBanner
        title="Need a tailored technology scope instead of a generic package?"
        description="Share your environment, priorities, and operational requirements. ITQUEST AFRICA will help define the right combination of infrastructure, security, support, digital systems, cloud services, and supply support."
      />
    </>
  );
}
