"use client";

import { useEffect, useState } from "react";
import { BASKET_EVENT, BASKET_KEY, type BasketItem, readBasket } from "@/lib/basket";

/** The visitor's quote basket, kept in sync across components and tabs. Empty on the server and on the first render. */
export function useBasket(): BasketItem[] {
  const [items, setItems] = useState<BasketItem[]>([]);
  useEffect(() => {
    const sync = () => setItems(readBasket());
    const onStorage = (event: StorageEvent) => {
      if (event.key === BASKET_KEY) sync();
    };
    sync();
    window.addEventListener(BASKET_EVENT, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(BASKET_EVENT, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return items;
}
