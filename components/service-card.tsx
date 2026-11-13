import Link from "next/link";
import type { ServiceItem } from "@/lib/site-data";

type ServiceCardProps = {
  service: ServiceItem;
  light?: boolean;
};

export function ServiceCard({ service, light = false }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className={light ? "surface-card-light p-7 md:p-8" : "surface-card p-7 md:p-8"}>
      <div className={light ? "inline-flex rounded-2xl bg-brand-50 px-4 py-4 text-brand-700" : "inline-flex rounded-2xl bg-brand-50 px-4 py-4 text-brand-700"}>
        <Icon className="h-6 w-6" />
      </div>
      <p className={light ? "mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700/80" : "mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-700"}>
        {service.category}
      </p>
      <h3 className={light ? "mt-6 text-2xl font-semibold text-slate-950" : "mt-6 text-2xl font-semibold text-ink"}>
        {service.title}
      </h3>
      <p className={light ? "mt-4 text-base leading-7 text-slate-600" : "mt-4 text-base leading-7 text-slate-600"}>
        {service.description}
      </p>
      <ul className={light ? "mt-6 space-y-3 text-sm text-slate-700" : "mt-6 space-y-3 text-sm text-slate-600"}>
        {service.bullets.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className={light ? "mt-1.5 h-2 w-2 rounded-full bg-brand-500" : "mt-1.5 h-2 w-2 rounded-full bg-brand-500"} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/quote"
        className={light ? "mt-7 inline-flex text-sm font-semibold text-brand-700 transition hover:text-brand-500" : "mt-7 inline-flex text-sm font-semibold text-brand-700 transition hover:text-brand-600"}
      >
        {service.cta}
      </Link>
    </article>
  );
}
