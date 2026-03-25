import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500 text-slate-950 shadow-[0_18px_40px_rgba(34,192,240,0.22)] hover:-translate-y-0.5 hover:shadow-[0_22px_46px_rgba(34,192,240,0.28)]",
        variant === "secondary" &&
          "border border-white/15 bg-white/[0.08] text-white hover:-translate-y-0.5 hover:border-brand-300/40 hover:bg-white/[0.12]",
        variant === "ghost" &&
          "text-white/80 hover:bg-white/[0.08] hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
