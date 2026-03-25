import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "header" | "footer" | "compact";
};

const sizeMap = {
  header: {
    gap: "gap-3 sm:gap-4",
    iconWrap: "h-11 w-11 rounded-2xl",
    icon: "h-6 w-6",
    word: "text-sm sm:text-[0.95rem]",
    wordGap: "gap-[0.34em] sm:gap-[0.36em]",
    africaGap: "ml-[0.44em] sm:ml-[0.48em]",
    sub: "text-[9px] sm:text-[10px] tracking-[0.22em]",
    subtitleVisibility: "hidden sm:block",
  },
  footer: {
    gap: "gap-4",
    iconWrap: "h-12 w-12 rounded-2xl",
    icon: "h-6 w-6",
    word: "text-[0.98rem]",
    wordGap: "gap-[0.36em]",
    africaGap: "ml-[0.48em]",
    sub: "text-[10px] tracking-[0.22em]",
    subtitleVisibility: "block",
  },
  compact: {
    gap: "gap-3",
    iconWrap: "h-10 w-10 rounded-xl",
    icon: "h-5 w-5",
    word: "text-xs",
    wordGap: "gap-[0.28em]",
    africaGap: "ml-[0.38em]",
    sub: "text-[8px] tracking-[0.2em]",
    subtitleVisibility: "hidden",
  },
} as const;

export function BrandMark({ className, size = "header" }: BrandMarkProps) {
  const styles = sizeMap[size];

  return (
    <Link href="/" className={cn("group inline-flex items-center", styles.gap, className)}>
      <span
        className={cn(
          "relative flex items-center justify-center border border-white/12 bg-white/[0.04] text-white shadow-[0_16px_34px_rgba(2,12,28,0.18)] transition duration-300",
          "group-hover:border-cyan-300/30 group-hover:bg-white/[0.07] group-hover:shadow-[0_18px_40px_rgba(34,192,240,0.18)]",
          styles.iconWrap,
        )}
      >
        <span className="absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_center,rgba(90,216,255,0.14),transparent_65%)] opacity-80 transition duration-300 group-hover:opacity-100" />
        <LogoIcon className={cn("relative", styles.icon)} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "font-heading font-medium uppercase text-white transition duration-300 group-hover:drop-shadow-[0_0_18px_rgba(90,216,255,0.12)]",
            styles.word,
          )}
        >
          <Wordmark letterGap={styles.wordGap} africaGap={styles.africaGap} />
        </span>
        <span
          className={cn(
            "uppercase text-white/55 transition duration-300 group-hover:text-white/65",
            styles.sub,
            styles.subtitleVisibility,
          )}
        >
          Engineering the Future of Connectivity
        </span>
      </span>
    </Link>
  );
}

function Wordmark({
  letterGap,
  africaGap,
}: {
  letterGap: string;
  africaGap: string;
}) {
  return (
    <span className={cn("inline-flex items-center whitespace-nowrap", letterGap)}>
      <span className="inline-flex items-center justify-center">I</span>
      <span className="inline-flex items-center justify-center">T</span>
      <span className="inline-flex items-center justify-center">Q</span>
      <span className="inline-flex items-center justify-center">U</span>
      <span
        aria-label="E"
        className="inline-flex h-[0.8em] w-[0.52em] translate-y-[0.01em] flex-col justify-between text-cyan-300 transition duration-300 group-hover:text-cyan-200"
      >
        <span className="h-[1.5px] w-full rounded-full bg-current shadow-[0_0_12px_rgba(90,216,255,0.22)] transition duration-300 group-hover:shadow-[0_0_16px_rgba(90,216,255,0.4)]" />
        <span className="h-[1.5px] w-full rounded-full bg-current shadow-[0_0_12px_rgba(90,216,255,0.22)] transition duration-300 group-hover:shadow-[0_0_16px_rgba(90,216,255,0.4)]" />
        <span className="h-[1.5px] w-full rounded-full bg-current shadow-[0_0_12px_rgba(90,216,255,0.22)] transition duration-300 group-hover:shadow-[0_0_16px_rgba(90,216,255,0.4)]" />
      </span>
      <span className="inline-flex items-center justify-center">S</span>
      <span className="inline-flex items-center justify-center">T</span>
      <span className={cn("inline-flex items-center justify-center", africaGap)}>AFRICA</span>
    </span>
  );
}

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7 8.5h7l6 5.5-6 5.5H7"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-80"
      />
      <path
        d="M7 19.5V8.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        className="opacity-80"
      />
      <circle cx="7" cy="8.5" r="1.4" className="fill-white" />
      <circle cx="14" cy="8.5" r="1.4" className="fill-cyan-300 drop-shadow-[0_0_10px_rgba(90,216,255,0.6)]" />
      <circle cx="20" cy="14" r="1.4" className="fill-white" />
      <circle cx="14" cy="19.5" r="1.4" className="fill-white" />
      <circle cx="7" cy="19.5" r="1.4" className="fill-white" />
    </svg>
  );
}
