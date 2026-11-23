import assert from "node:assert/strict";
import test from "node:test";
import { addToBasket, basketCount, normalizeBasket, removeFromBasket, setQuantity } from "../lib/basket";
import { validateInquiry } from "../lib/inquiry";
import { isPublicToken, newPublicToken } from "../lib/public-token";
import { cleanCustomerText, quoteState, requestStage } from "../lib/quote-status";
import { cleanImageUrl, normalizeSpecs, parseSpecsText, specsToText } from "../lib/specs";
import { whatsappLink, whatsappMessageFor } from "../lib/whatsapp";

test("basket: junk dropped, duplicates merged, quantities bounded", () => {
  const items = normalizeBasket([
    { slug: "Switch-24", name: "24-port switch", sku: "SW-24", quantity: 2 },
    { slug: "switch-24", quantity: 3 },
    { slug: "../etc/passwd", name: "x", quantity: 1 },
    { slug: "ap-wifi6", name: "Wi-Fi 6 AP", quantity: -4 },
    { slug: "camera", name: "Camera", quantity: 999999 },
    "nope",
    null,
  ]);
  assert.deepEqual(items, [
    { slug: "switch-24", name: "24-port switch", sku: "SW-24", quantity: 5 },
    { slug: "ap-wifi6", name: "Wi-Fi 6 AP", sku: "", quantity: 1 },
    { slug: "camera", name: "Camera", sku: "", quantity: 10000 },
  ]);
  assert.deepEqual(normalizeBasket("not a list"), []);
  assert.equal(normalizeBasket(Array.from({ length: 40 }, (_, i) => ({ slug: `p${i}` }))).length, 25);
});

test("basket: add, change quantity, remove, count", () => {
  let items = addToBasket([], { slug: "nvr-8", name: "8-ch NVR", sku: "NVR8", quantity: 1 });
  items = addToBasket(items, { slug: "nvr-8", name: "8-ch NVR", sku: "NVR8", quantity: 2 });
  assert.equal(items[0].quantity, 3);
  items = setQuantity(items, "nvr-8", 7);
  assert.equal(basketCount(items), 7);
  assert.deepEqual(removeFromBasket(items, "nvr-8"), []);
});

test("inquiry: a basket request needs only a short note and defaults the project type", () => {
  const base = { kind: "quote" as const, fullName: "Rudo N", email: "RUDO@example.com", message: "For our school", items: [{ slug: "camera", name: "Camera", quantity: 8 }] };
  const ok = validateInquiry(base);
  assert.equal(ok.success, true);
  if (ok.success) {
    assert.equal(ok.data.projectType, "Product sourcing");
    assert.equal(ok.data.items[0].quantity, 8);
    assert.equal(ok.data.email, "rudo@example.com");
  }
  const noBasket = validateInquiry({ ...base, items: [] });
  assert.equal(noBasket.success, false);
  const contact = validateInquiry({ ...base, kind: "contact", message: "Hello, I'd like to know more about you." });
  assert.equal(contact.success && contact.data.items.length, 0);
});

test("specs: 'Label: value' lines in, clean rows out, and back", () => {
  const rows = parseSpecsText("Ports: 24 x Gigabit\n\nno colon here\nPoE budget: 400 W\n: empty label\nSpeed: 10G: SFP+");
  assert.deepEqual(rows, [
    { label: "Ports", value: "24 x Gigabit" },
    { label: "PoE budget", value: "400 W" },
    { label: "Speed", value: "10G: SFP+" },
  ]);
  assert.equal(specsToText(rows), "Ports: 24 x Gigabit\nPoE budget: 400 W\nSpeed: 10G: SFP+");
  assert.deepEqual(normalizeSpecs([{ label: "A", value: "1" }, { label: 2 }, "x", null]), [{ label: "A", value: "1" }]);
  assert.deepEqual(normalizeSpecs(null), []);
});

test("product photos: https links only", () => {
  assert.equal(cleanImageUrl("https://dl.ui.com/images/usw-24.png"), "https://dl.ui.com/images/usw-24.png");
  assert.equal(cleanImageUrl("http://example.com/a.png"), null);
  assert.equal(cleanImageUrl("javascript:alert(1)"), null);
  assert.equal(cleanImageUrl(""), null);
});

test("WhatsApp: wa.me link to the Zimbabwe line with a prefilled message", () => {
  assert.equal(whatsappLink(), "https://wa.me/263774369288");
  assert.equal(whatsappLink("Hi & hello"), "https://wa.me/263774369288?text=Hi%20%26%20hello");
  assert.match(whatsappMessageFor("/products/x", "8-ch NVR"), /8-ch NVR/);
  assert.match(whatsappMessageFor("/quote"), /quote/);
});

test("private links: unguessable tokens, strict format", () => {
  const a = newPublicToken();
  const b = newPublicToken();
  assert.notEqual(a, b);
  assert.equal(isPublicToken(a), true);
  assert.equal(isPublicToken("short"), false);
  assert.equal(isPublicToken(`${a.slice(0, 31)}/`), false);
  assert.equal(isPublicToken(undefined), false);
});

test("customer status: stages and quote states", () => {
  assert.equal(requestStage("NEW", false).step, 0);
  assert.equal(requestStage("REVIEWING", false).step, 1);
  assert.equal(requestStage("QUOTED", true).step, 2);
  assert.equal(requestStage("QUOTED", false).step, 1);
  assert.equal(requestStage("WON", true).step, 3);
  const sent = new Date("2026-11-01T10:00:00Z");
  const q = { acceptedAt: null, sentAt: sent, createdAt: sent };
  assert.equal(quoteState(q, 14, new Date("2026-11-10T10:00:00Z")), "open");
  assert.equal(quoteState(q, 14, new Date("2026-11-20T10:00:00Z")), "expired");
  assert.equal(quoteState({ ...q, acceptedAt: sent }, 14, new Date("2026-12-30T10:00:00Z")), "accepted");
  assert.equal(quoteState({ ...q, requestStatus: "LOST" }, 14, new Date("2026-11-02T10:00:00Z")), "closed");
  assert.equal(cleanCustomerText("  hi\u0007 there  "), "hi  there");
  assert.equal(cleanCustomerText(42), "");
});
