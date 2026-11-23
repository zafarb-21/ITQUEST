"use client";

import { ClipboardList } from "lucide-react";
import Link from "next/link";
import { useBasket } from "@/components/use-basket";
import { basketCount } from "@/lib/basket";

/** In the header: how many products are waiting in the quote basket (hidden when it's empty). */
export function BasketChip() {
  const items = useBasket();
  if (!items.length) return null;
  const n = basketCount(items);
  return (
    <Link
      href="/quote"
      className="inline-flex h-11 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 text-sm font-semibold text-ink transition hover:bg-slate-50"
      aria-label={`Quote basket: ${items.length} product${items.length === 1 ? "" : "s"}`}
    >
      <ClipboardList className="h-4 w-4" />
      <span>{items.length}</span>
      <span className="sr-only">products, {n} units</span>
    </Link>
  );
}
