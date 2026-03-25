import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.08] text-sm font-semibold tracking-[0.24em] text-white shadow-glow">
        IQ
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-sm font-extrabold uppercase tracking-[0.34em] text-white">
          ITQUEST AFRICA
        </span>
        <span className="text-[10px] uppercase tracking-[0.24em] text-white/55">
          Engineering the Future of Connectivity
        </span>
      </span>
    </Link>
  );
}
