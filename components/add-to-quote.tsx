"use client";

import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useBasket } from "@/components/use-basket";
import { addToBasket, readBasket, writeBasket } from "@/lib/basket";
import { cn } from "@/lib/utils";

type AddToQuoteProps = {
  product: { slug: string; name: string; sku: string };
  light?: boolean;
  withQuantity?: boolean;
  className?: string;
};

/** "Add to quote": collects products into one quote request (the basket on /quote). */
export function AddToQuote({ product, light = true, withQuantity = false, className }: AddToQuoteProps) {
  const items = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const inBasket = items.find((x) => x.slug === product.slug);

  function add() {
    writeBasket(addToBasket(readBasket(), { ...product, quantity }));
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className={cn("inline-flex flex-wrap items-center gap-2", className)}>
      {withQuantity ? (
        <label className="inline-flex items-center gap-2 text-sm">
          <span className={light ? "text-slate-500" : "text-slate-500"}>Qty</span>
          <input
            type="number"
            min={1}
            max={10000}
            value={quantity}
            onChange={(event) => setQuantity(Math.max(1, Math.floor(Number(event.target.value) || 1)))}
            className={cn("w-20 rounded-full border px-3 py-2 text-sm", light ? "border-slate-200 bg-white text-slate-900" : "border-ink/15 bg-white text-ink")}
            aria-label={`Quantity of ${product.name}`}
          />
        </label>
      ) : null}
      <button
        type="button"
        onClick={add}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5",
          light ? "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100" : "border-ink/15 bg-white text-ink hover:border-slate-300 hover:bg-slate-50",
        )}
      >
        {justAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {justAdded ? "Added" : inBasket ? `In quote (${inBasket.quantity})` : "Add to quote"}
      </button>
    </div>
  );
}
