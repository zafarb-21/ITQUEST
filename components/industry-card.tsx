import type { IndustryItem } from "@/lib/site-data";

type IndustryCardProps = {
  item: IndustryItem;
  light?: boolean;
};

export function IndustryCard({ item, light = false }: IndustryCardProps) {
  const Icon = item.icon;

  return (
    <article className={light ? "surface-card-light p-7" : "surface-card p-7"}>
      <div className={light ? "inline-flex rounded-2xl bg-slate-950 px-4 py-4 text-cyan-300" : "inline-flex rounded-2xl bg-white/[0.08] px-4 py-4 text-cyan-300"}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className={light ? "mt-6 text-xl font-semibold text-slate-950" : "mt-6 text-xl font-semibold text-white"}>{item.title}</h3>
      <p className={light ? "mt-4 text-sm leading-7 text-slate-600" : "mt-4 text-sm leading-7 text-white/[0.68]"}>{item.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {item.needs.map((need) => (
          <span
            key={need}
            className={
              light
                ? "rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600"
                : "rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/[0.65]"
            }
          >
            {need}
          </span>
        ))}
      </div>
    </article>
  );
}
