import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
  light = false,
}: SectionHeadingProps) {
  const hasAction = Boolean(action);

  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-5",
        align === "center" && "mx-auto max-w-3xl items-center text-center",
        hasAction && "md:flex-row md:items-end md:justify-between",
        align === "center" && hasAction && "md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h2
          className={cn(
            "mt-5 text-3xl font-semibold leading-tight md:text-4xl lg:text-[2.85rem]",
            light ? "text-slate-950" : "text-white",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-8 md:text-lg",
              light ? "text-slate-600" : "text-white/70",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
