/**
 * Product specifications: an ordered list of label/value rows (Product.specs, JSON). The admin types them as one
 * "Label: value" pair per line; the product page shows them as a table.
 */
export type SpecRow = { label: string; value: string };

const MAX_ROWS = 40;

export function parseSpecsText(text: string): SpecRow[] {
  const rows: SpecRow[] = [];
  for (const raw of String(text || "").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const i = line.indexOf(":");
    if (i <= 0) continue;
    const label = line.slice(0, i).trim().slice(0, 60);
    const value = line.slice(i + 1).trim().slice(0, 240);
    if (label && value) rows.push({ label, value });
    if (rows.length >= MAX_ROWS) break;
  }
  return rows;
}

export function specsToText(specs: unknown): string {
  return normalizeSpecs(specs)
    .map((row) => `${row.label}: ${row.value}`)
    .join("\n");
}

/** Whatever is stored in the database -> clean rows (bad entries dropped). */
export function normalizeSpecs(specs: unknown): SpecRow[] {
  if (!Array.isArray(specs)) return [];
  const rows: SpecRow[] = [];
  for (const item of specs) {
    if (!item || typeof item !== "object") continue;
    const { label, value } = item as Record<string, unknown>;
    if (typeof label === "string" && typeof value === "string" && label.trim() && value.trim()) {
      rows.push({ label: label.trim().slice(0, 60), value: value.trim().slice(0, 240) });
    }
    if (rows.length >= MAX_ROWS) break;
  }
  return rows;
}

/** Product photos are links to the manufacturer's own media (https only). */
export function cleanImageUrl(value: unknown): string | null {
  const url = typeof value === "string" ? value.trim() : "";
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" || url.length > 1000) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
