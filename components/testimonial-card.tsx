import type { Testimonial } from "@/lib/site-data";

type TestimonialCardProps = {
  testimonial: Testimonial;
  light?: boolean;
};

export function TestimonialCard({ testimonial, light = false }: TestimonialCardProps) {
  return (
    <article className={light ? "surface-card-light p-8" : "surface-card p-8"}>
      <p className={light ? "text-base leading-8 text-slate-700" : "text-base leading-8 text-white/[0.78]"}>
        “{testimonial.quote}”
      </p>
      <div className="mt-8">
        <h3 className={light ? "text-base font-semibold text-slate-950" : "text-base font-semibold text-white"}>
          {testimonial.name}
        </h3>
        <p className={light ? "mt-1 text-sm text-slate-500" : "mt-1 text-sm text-white/50"}>
          {testimonial.role} · {testimonial.company}
        </p>
      </div>
    </article>
  );
}
