import type { ReactNode } from "react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  aside?: ReactNode;
  light?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  aside,
  light = false,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden pt-32", light && "section-light")}>
      <div className={cn("absolute inset-0", light ? "grid-backdrop-light" : "grid-backdrop opacity-40")} />
      <Container className="relative section-pad">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-end">
          <div className="max-w-3xl">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className={cn("mt-6 text-4xl font-semibold leading-tight md:text-6xl", light ? "text-slate-950" : "text-white")}>
              {title}
            </h1>
            <p className={cn("mt-6 max-w-2xl text-lg leading-8", light ? "text-slate-600" : "text-white/70")}>{description}</p>
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {primaryCta ? <ButtonLink href={primaryCta.href}>{primaryCta.label}</ButtonLink> : null}
                {secondaryCta ? (
                  <ButtonLink href={secondaryCta.href} variant={light ? "primary" : "secondary"}>
                    {secondaryCta.label}
                  </ButtonLink>
                ) : null}
              </div>
            )}
          </div>
          {aside ? <div className="relative">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
