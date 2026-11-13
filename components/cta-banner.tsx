import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { whatsappHref } from "@/lib/site-data";

type CtaBannerProps = {
  title: string;
  description: string;
};

// Nov 13 2026 redesign: a calm closing panel (server component, no animation library) with the two ways in.
export function CtaBanner({ title, description }: CtaBannerProps) {
  return (
    <section className="section-pad">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink px-7 py-10 md:px-12 md:py-14">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-[#fff] md:text-4xl">{title}</h2>
              <p className="mt-3 text-base leading-7 !text-slate-300 md:text-lg">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/quote" variant="accent" className="px-6 py-3.5 text-[15px]">
                Get a quote
              </ButtonLink>
              <ButtonLink href={whatsappHref()} variant="onDark" className="wa-dot px-6 py-3.5 text-[15px]">
                WhatsApp us
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
