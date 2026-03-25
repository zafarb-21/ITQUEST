import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import { PageHero } from "@/components/page-hero";
import { ServicesPageContent } from "@/components/services-page-content";
import { buildMetadata } from "@/lib/metadata";

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

      <ServicesPageContent />

      <CtaBanner
        title="Need a tailored technology scope instead of a generic package?"
        description="Share your environment, priorities, and operational requirements. ITQUEST AFRICA will help define the right combination of infrastructure, digital systems, and supply support."
      />
    </>
  );
}
