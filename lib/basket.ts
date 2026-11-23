/**
 * The quote basket: products a visitor collects ("Add to quote") and sends as ONE quote request. Kept in the visitor's
 * browser (localStorage) until they submit; the server re-checks every line against the live catalog.
 */
export type BasketItem = { slug: string; name: string; sku: string; quantity: number };

export const BASKET_KEY = "itq_quote_basket";
export const BASKET_EVENT = "itq-basket";
export const MAX_ITEMS = 25;
export const MAX_QTY = 10000;

function cleanText(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Untrusted input (browser storage or a request body) -> valid items; duplicates merged, junk dropped. */
export function normalizeBasket(input: unknown): BasketItem[] {
  if (!Array.isArray(input)) return [];
  const out: BasketItem[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    const slug = cleanText(r.slug, 120).toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) continue;
    const qty = Math.floor(Number(r.quantity));
    const quantity = Number.isFinite(qty) ? Math.min(MAX_QTY, Math.max(1, qty)) : 1;
    const existing = out.find((x) => x.slug === slug);
    if (existing) {
      existing.quantity = Math.min(MAX_QTY, existing.quantity + quantity);
      continue;
    }
    if (out.length >= MAX_ITEMS) break;
    out.push({ slug, name: cleanText(r.name, 160) || slug, sku: cleanText(r.sku, 60), quantity });
  }
  return out;
}

export function addToBasket(items: BasketItem[], item: BasketItem): BasketItem[] {
  return normalizeBasket([...items, item]);
}

export function setQuantity(items: BasketItem[], slug: string, quantity: number): BasketItem[] {
  return normalizeBasket(items.map((x) => (x.slug === slug ? { ...x, quantity } : x)));
}

export function removeFromBasket(items: BasketItem[], slug: string): BasketItem[] {
  return items.filter((x) => x.slug !== slug);
}

export function basketCount(items: BasketItem[]) {
  return items.reduce((n, x) => n + x.quantity, 0);
}

/** Browser only. */
export function readBasket(): BasketItem[] {
  try {
    return normalizeBasket(JSON.parse(window.localStorage.getItem(BASKET_KEY) || "[]"));
  } catch {
    return [];
  }
}

export function writeBasket(items: BasketItem[]) {
  try {
    window.localStorage.setItem(BASKET_KEY, JSON.stringify(normalizeBasket(items)));
  } catch {
    // private mode / storage blocked: the basket just doesn't persist
  }
  window.dispatchEvent(new Event(BASKET_EVENT));
}
