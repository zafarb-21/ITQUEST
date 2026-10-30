export function formatCatalogPrice(product: {
  pricingMode: string;
  currentPrice: number | null;
  currency: string;
}) {
  if (product.pricingMode === "REQUEST_QUOTE" || product.currentPrice === null) {
    return "Request quote";
  }

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
    maximumFractionDigits: 0,
  }).format(product.currentPrice);

  if (product.pricingMode === "STARTING_AT") {
    return `From ${formattedAmount}`;
  }

  return formattedAmount;
}

export function formatStockStatus(stockStatus: string) {
  return stockStatus.replaceAll("_", " ").toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
}
