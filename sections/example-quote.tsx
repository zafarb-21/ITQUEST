"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Nov 13 2026 redesign: the hero's example quote, switchable between three common jobs. Examples of scope, not prices.
const examples = [
  {
    key: "office",
    tab: "Office",
    title: "12-desk office network",
    lines: [
      ["Structured cabling, 14 points", "Included"],
      ["Business Wi-Fi, 2 access points", "Included"],
      ["Firewall + backup internet", "Included"],
      ["3 months support", "Included"],
      ["Typical timeline", "3–5 days"],
    ],
    cta: "Price my office",
  },
  {
    key: "cctv",
    tab: "CCTV",
    title: "8-camera CCTV for a shop",
    lines: [
      ["8 HD cameras, day and night", "Included"],
      ["Recorder with 30 days storage", "Included"],
      ["Viewing on your phone", "Included"],
      ["Power backup for the recorder", "Included"],
      ["Typical timeline", "2–3 days"],
    ],
    cta: "Price my cameras",
  },
  {
    key: "ai",
    tab: "AI agent",
    title: "WhatsApp + website AI agent",
    lines: [
      ["Trained on your prices and policies", "Included"],
      ["English and Shona replies", "Included"],
      ["Bookings and orders handed to staff", "Included"],
      ["Weekly report of customer questions", "Included"],
      ["Typical setup", "1–2 weeks"],
    ],
    cta: "Join the pilot",
  },
];

export function ExampleQuote() {
  const [i, setI] = useState(0);
  const ex = examples[i];
  return (
    <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(13,27,46,0.35)] sm:p-8">
      <div role="tablist" aria-label="Example quotes" className="flex gap-1 rounded-xl bg-paper p-1">
        {examples.map((e, n) => (
          <button
            key={e.key}
            role="tab"
            type="button"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={cn(
              "flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition",
              n === i ? "bg-white text-ink shadow-sm" : "text-slate-500 hover:text-ink",
            )}
          >
            {e.tab}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-500">Example quote</p>
      <p key={ex.key + "t"} className="mt-1 animate-[fadeUp_.35s_ease] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {ex.title}
      </p>
      <ul key={ex.key} className="mt-5 animate-[fadeUp_.35s_ease]">
        {ex.lines.map(([item, value]) => (
          <li key={item} className="flex items-center justify-between gap-4 border-t border-ink/10 py-3.5 text-[15px]">
            <span className="flex items-center gap-2.5 text-slate-700">
              <Check className="h-4 w-4 flex-none text-brand-600" aria-hidden />
              {item}
            </span>
            <span className="whitespace-nowrap font-semibold text-ink">{value}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/quote"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-[15px] font-semibold text-[#fff] transition hover:bg-brand-900"
      >
        {ex.cta} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
      <p className="mt-3 text-center text-xs text-slate-500">Examples of what a quote covers. Yours is priced after a site visit.</p>
    </div>
  );
}
