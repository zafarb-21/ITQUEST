"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { MobileMenu } from "@/components/mobile-menu";
import { navItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = pathname !== "/" || scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition duration-300",
          solid ? "py-3" : "py-5",
        )}
      >
        <Container>
          <div
            className={cn(
              "flex items-center justify-between rounded-full border px-4 py-3 transition duration-300 md:px-5",
              solid
                ? "border-white/10 bg-slate-950/[0.82] shadow-glow backdrop-blur-xl"
                : "border-white/10 bg-white/[0.04] backdrop-blur-md",
            )}
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
                      "rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:text-white",
                      active && "bg-white/[0.08] text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <ButtonLink href="/contact" variant="ghost">
                Talk to Our Team
              </ButtonLink>
              <ButtonLink href="/quote">Request a Quote</ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
