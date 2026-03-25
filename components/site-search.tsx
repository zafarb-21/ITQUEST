"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { SearchItem } from "@/lib/site-data";
import { siteSearchItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type SiteSearchProps = {
  open: boolean;
  onClose: () => void;
};

const typeLabels: Record<SearchItem["type"], string> = {
  service: "Service",
  product: "Product",
  solution: "Solution",
  page: "Page",
};

export function SiteSearch({ open, onClose }: SiteSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    setQuery("");
    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? siteSearchItems
        .map((item) => {
          const haystack = [item.title, item.description, ...item.keywords].join(" ").toLowerCase();
          if (!haystack.includes(normalizedQuery)) return null;

          const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
          const prefixMatch = item.title.toLowerCase().startsWith(normalizedQuery);
          const typeWeight =
            item.type === "service" ? 0 : item.type === "product" ? 1 : item.type === "solution" ? 2 : 3;

          return {
            item,
            score: (prefixMatch ? 0 : titleMatch ? 1 : 2) * 10 + typeWeight,
          };
        })
        .filter((entry): entry is { item: SearchItem; score: number } => Boolean(entry))
        .sort((left, right) => left.score - right.score || left.item.title.localeCompare(right.item.title))
        .slice(0, 10)
        .map((entry) => entry.item)
    : [];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-slate-950/78 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="mx-auto flex min-h-full w-full max-w-6xl items-start px-4 pb-10 pt-24 md:px-6">
            <motion.div
              className="w-full rounded-[2rem] border border-white/10 bg-slate-950/96 shadow-[0_24px_90px_rgba(2,10,24,0.48)]"
              initial={{ opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-white/10 px-5 py-5 md:px-7">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-cyan-300">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") onClose();
                      }}
                      placeholder="Search services, products, solutions, pages..."
                      className="w-full border-none bg-transparent pr-4 text-base text-white outline-none placeholder:text-white/35 md:text-lg"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/72 transition hover:border-cyan-300/25 hover:text-white"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-5 py-5 md:px-7 md:py-6">
                {!normalizedQuery ? (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Search the site</p>
                    <p className="max-w-2xl text-sm leading-7 text-white/[0.68]">
                      Explore services, products, industry solutions, and core pages without leaving the current view.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {["Networking", "CCTV", "Access Control", "Products", "Healthcare", "Quote"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setQuery(item)}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/[0.75] transition hover:border-cyan-300/25 hover:bg-white/[0.07] hover:text-white"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <motion.div
                        key={`${result.type}-${result.title}-${result.href}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut", delay: index * 0.03 }}
                      >
                        <Link
                          href={result.href}
                          onClick={onClose}
                          className="block rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-4 transition hover:border-cyan-300/25 hover:bg-white/[0.07]"
                        >
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                              {typeLabels[result.type]}
                            </span>
                            <h2 className="text-lg font-semibold text-white">{result.title}</h2>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-white/[0.66]">{result.description}</p>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-6">
                    <p className="text-sm font-semibold text-white">No results found</p>
                    <p className="mt-2 text-sm leading-7 text-white/[0.66]">
                      Try broader terms such as a service type, product category, industry, or page name.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type SearchTriggerProps = {
  onClick: () => void;
  mobile?: boolean;
};

export function SearchTrigger({ onClick, mobile = false }: SearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/10 text-white/78 transition hover:border-cyan-300/25 hover:text-white",
        mobile ? "h-11 w-11 bg-white/5" : "h-11 w-11 bg-white/[0.04]",
      )}
      aria-label="Search the site"
    >
      <Search className="h-4 w-4" />
    </button>
  );
}
