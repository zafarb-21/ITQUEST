import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Zbot HQ (the ITQUEST Sales agent on Victor's PC) calls the site with a long shared secret:
 * Authorization: Bearer <HQ_SITE_TOKEN>. Fails closed when the secret is missing or shorter than 32 characters.
 */
export function checkHqToken(authorization: string | null | undefined, secret: string | undefined = process.env.HQ_SITE_TOKEN) {
  if (!secret || secret.trim().length < 32) return false;
  const match = /^Bearer\s+(.+)$/i.exec((authorization ?? "").trim());
  if (!match) return false;
  const given = createHash("sha256").update(match[1].trim()).digest();
  const wanted = createHash("sha256").update(secret.trim()).digest();
  return timingSafeEqual(given, wanted);
}
