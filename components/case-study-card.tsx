import type { CaseStudy } from "@/lib/site-data";

type CaseStudyCardProps = {
  study: CaseStudy;
  light?: boolean;
  /** Nov 2026: typical engagements use their own labels (they are not past projects) */
  labels?: [string, string, string];
};

export function CaseStudyCard({ study, light = false, labels = ["Challenge", "Solution", "Impact"] }: CaseStudyCardProps) {
  return (
    <article className={light ? "surface-card-light p-8" : "surface-card p-8"}>
      <span className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"}>
        {study.sector}
      </span>
      <h3 className={light ? "mt-4 text-2xl font-semibold text-slate-950" : "mt-4 text-2xl font-semibold text-ink"}>
        {study.title}
      </h3>
      <div className="mt-6 space-y-5">
        <CaseStudyRow label={labels[0]} value={study.challenge} light={light} />
        <CaseStudyRow label={labels[1]} value={study.solution} light={light} />
        <CaseStudyRow label={labels[2]} value={study.impact} light={light} />
      </div>
    </article>
  );
}

function CaseStudyRow({ label, value, light }: { label: string; value: string; light: boolean }) {
  return (
    <div className="rounded-2xl border border-ink/10 px-4 py-4">
      <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" : "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"}>
        {label}
      </p>
      <p className={light ? "mt-2 text-sm leading-7 text-slate-700" : "mt-2 text-sm leading-7 text-slate-600"}>{value}</p>
    </div>
  );
}
