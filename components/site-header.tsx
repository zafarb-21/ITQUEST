"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { SearchTrigger, SiteSearch } from "@/components/site-search";
import { navItems, whatsappHref } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const solid = pathname !== "/" || scrolled || open || searchOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition duration-500",
          solid ? "py-3" : "py-5",
        )}
      >
        <Container>
          <motion.div
            className={cn(
              "flex items-center justify-between rounded-2xl border px-4 py-3 transition duration-500 md:px-5",
              solid
                ? "border-ink/10 bg-paper/95 backdrop-blur-xl"
                : "border-transparent bg-transparent",
            )}
            animate={{
              boxShadow: solid ? "0 18px 40px -24px rgba(13, 27, 46, 0.25)" : "0 0 0 rgba(13, 27, 46, 0)",
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrandMark />
            <nav className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-3.5 py-2 text-[15px] font-medium text-slate-600 transition hover:text-ink",
                      active && "text-ink underline decoration-brand-500 decoration-2 underline-offset-8",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <SearchTrigger onClick={() => setSearchOpen(true)} />
              <ButtonLink href={whatsappHref()} variant="whatsapp">
                WhatsApp
              </ButtonLink>
              <ButtonLink href="/quote">Get a quote</ButtonLink>
            </div>
            <div className="flex items-center gap-2 lg:hidden">
              <SearchTrigger
                mobile
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setOpen(true);
                }}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <SiteSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
