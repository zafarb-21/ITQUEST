"use client";

import { usePathname } from "next/navigation";
import { WHATSAPP_DISPLAY, whatsappLink, whatsappMessageFor } from "@/lib/whatsapp";

/** WhatsApp chat with ITQUEST AFRICA, bottom-left (the site assistant sits bottom-right). Opens the visitor's own WhatsApp. */
export function WhatsAppButton() {
  const pathname = usePathname() || "/";
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      href={whatsappLink(whatsappMessageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-[63] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(2,10,24,0.35)] transition hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(37,211,102,0.35)]"
      aria-label={`Chat with ITQUEST AFRICA on WhatsApp (${WHATSAPP_DISPLAY})`}
      title={`WhatsApp ${WHATSAPP_DISPLAY}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.74A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.67c-2.03 0-4.02-.55-5.75-1.58l-.41-.25-3.96 1.03 1.06-3.86-.27-.4a10.6 10.6 0 0 1-1.64-5.6c0-5.88 4.8-10.67 10.98-10.67 5.87 0 10.63 4.79 10.63 10.67 0 5.88-4.77 10.66-10.64 10.66Zm5.84-7.98c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.16-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}
