import { whatsappHref } from "@/lib/site-data";

// Nov 13 2026 redesign: WhatsApp is how Zimbabwean customers get in touch, so it is one tap away on every page (bottom left;
// the site assistant sits bottom right).
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with ITQUEST on WhatsApp"
      className="group fixed bottom-6 left-5 z-[60] inline-flex h-14 items-center gap-2 rounded-full bg-[#25d366] px-4 text-[#fff] shadow-[0_14px_34px_-10px_rgba(18,140,70,0.6)] transition hover:-translate-y-0.5 md:left-6"
    >
      <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor" aria-hidden>
        <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.5.7 4.9 2 7L3 29l6.4-2c2 1.1 4.3 1.7 6.6 1.7 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-2.1 0-4.1-.6-5.9-1.7l-.4-.2-3.8 1.2 1.2-3.7-.3-.4a10.4 10.4 0 0 1-1.7-5.8C5.1 10 10 5.3 16 5.3S26.9 10 26.9 15.8 22 26.4 16 26.4zm6-7.8c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.8 8.8 0 0 1-2.6-1.6 9.6 9.6 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.1 1.1-1.1 2.7 1.2 3.1 1.3 3.3 2.3 3.5 5.6 4.9c.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5s.3-1.3.2-1.5-.3-.2-.6-.4z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
