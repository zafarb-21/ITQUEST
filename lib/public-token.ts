import { randomBytes } from "node:crypto";

/**
 * Private links for customers (no login): a quote page /q/<token> and a request status page /r/<token>.
 * 24 random bytes, base64url (32 characters): unguessable, and safe in a URL.
 */
export function newPublicToken() {
  return randomBytes(24).toString("base64url");
}

export function isPublicToken(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{32}$/.test(value);
}
