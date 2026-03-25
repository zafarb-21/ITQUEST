import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

type CtaBannerProps = {
  title: string;
  description: string;
};

export function CtaBanner({ title, description }: CtaBannerProps) {
  return (
    <section className="section-pad">
      <Container>
        <div className="section-panel relative overflow-hidden px-8 py-10 md:px-10 md:py-12">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(34,192,240,0.18),transparent_55%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Start a Project</span>
              <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/[0.68]">{description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/quote">Get a Quote</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Talk to Our Team
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
