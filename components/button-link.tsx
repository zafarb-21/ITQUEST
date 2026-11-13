import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp" | "accent" | "onDark";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const external = /^https?:/.test(href);
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-200",
        variant === "primary" && "bg-ink text-[#fff] hover:-translate-y-0.5 hover:bg-brand-900",
        variant === "secondary" && "border border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-ink/30",
        variant === "ghost" && "text-slate-600 hover:bg-ink/5 hover:text-ink",
        variant === "whatsapp" && "wa-dot border border-ink/15 bg-white text-ink hover:-translate-y-0.5 hover:border-ink/30",
        variant === "accent" && "bg-brand-200 text-ink hover:-translate-y-0.5 hover:bg-brand-100",
        variant === "onDark" && "border border-white/25 bg-transparent text-[#fff] hover:-translate-y-0.5 hover:bg-white/10",
        className,
      )}
    >
      {children}
    </Link>
  );
}
