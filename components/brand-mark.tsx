import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "header" | "footer" | "compact";
};

// Nov 13 2026 redesign: the letterhead wordmark ("ITQUEST / AFRICA (PVT) LTD.") with the motto under it, as on the letterhead.
const sizeMap = {
  header: { logo: "h-9 sm:h-11", motto: "hidden sm:block text-[9px] tracking-[0.2em]" },
  footer: { logo: "h-12", motto: "block text-[10px] tracking-[0.2em]" },
  compact: { logo: "h-8", motto: "hidden" },
} as const;

export function BrandMark({ className, size = "header" }: BrandMarkProps) {
  const s = sizeMap[size];
  return (
    <Link href="/" className={cn("group inline-flex flex-col gap-1.5", className)} aria-label="ITQUEST AFRICA, home">
      <Image
        src="/itquest-logo.png"
        alt="ITQUEST AFRICA (PVT) LTD."
        width={596}
        height={188}
        priority={size === "header"}
        unoptimized
        className={cn("w-auto", s.logo)}
      />
      <span className={cn("uppercase text-slate-500 transition group-hover:text-slate-700", s.motto)}>
        Engineering the Future of Connectivity
      </span>
    </Link>
  );
}
