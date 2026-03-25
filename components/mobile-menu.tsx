"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-xl md:hidden"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-white/10 bg-slate-950 px-6 py-6"
          >
            <button
              type="button"
              onClick={onClose}
              className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mt-8 space-y-2">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block rounded-2xl px-4 py-3 text-base font-medium text-white/75 transition hover:bg-white/5 hover:text-white",
                      active && "bg-white/[0.08] text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto pt-8">
              <ButtonLink href="/quote" className="w-full" >
                Request a Quote
              </ButtonLink>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
