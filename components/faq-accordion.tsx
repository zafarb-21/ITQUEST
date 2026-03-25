"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: FaqItem[];
  light?: boolean;
};

export function FaqAccordion({ items, light = false }: FaqAccordionProps) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const open = active === index;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-[1.5rem] border",
              light ? "border-slate-200 bg-white" : "border-white/10 bg-white/[0.04]",
            )}
          >
            <button
              type="button"
              onClick={() => setActive(open ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className={light ? "text-base font-semibold text-slate-950" : "text-base font-semibold text-white"}>
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 transition duration-300",
                  light ? "text-slate-500" : "text-white/60",
                  open && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <div className="px-6 pb-5">
                    <p className={light ? "text-sm leading-7 text-slate-600" : "text-sm leading-7 text-white/[0.68]"}>{item.answer}</p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
