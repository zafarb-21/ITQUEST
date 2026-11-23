import { siteConfig } from "./site-data";

/** The public address used in customer links (emails). SITE_URL on Vercel wins, e.g. https://www.itquestafrica.com */
export function siteBaseUrl() {
  const raw = (process.env.SITE_URL || siteConfig.url || "").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
}

export const quotePageUrl = (token: string) => `${siteBaseUrl()}/q/${token}`;
export const statusPageUrl = (token: string) => `${siteBaseUrl()}/r/${token}`;
