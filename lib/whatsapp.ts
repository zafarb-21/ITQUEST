/**
 * WhatsApp click-to-chat (wa.me). The number is ITQUEST AFRICA's Zimbabwe line; the message is prefilled so Sales knows
 * which page the visitor came from. No WhatsApp API or account is involved: the visitor's own WhatsApp opens.
 */
export const WHATSAPP_NUMBER = "263774369288";
export const WHATSAPP_DISPLAY = "+263 77 436 9288";

export function whatsappLink(message = "", number = WHATSAPP_NUMBER) {
  const digits = number.replace(/\D/g, "");
  const text = message.trim().slice(0, 500);
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

export function whatsappMessageFor(pathname: string, productName?: string) {
  if (productName) return `Hello ITQUEST AFRICA, I'd like a price for ${productName}.`;
  if (pathname.startsWith("/quote")) return "Hello ITQUEST AFRICA, I have a question about a quote.";
  if (pathname.startsWith("/products")) return "Hello ITQUEST AFRICA, I'm looking at your products and have a question.";
  return "Hello ITQUEST AFRICA, I'd like to ask about your services.";
}
