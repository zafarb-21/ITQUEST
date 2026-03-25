import { ContactInquiryForm } from "@/components/forms/contact-inquiry-form";
import { QuoteInquiryForm } from "@/components/forms/quote-inquiry-form";
import Link from "next/link";

type ContactFormsProps = {
  light?: boolean;
};

export function ContactForms({ light = false }: ContactFormsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <ContactInquiryForm light={light} sourcePage="/contact" />
      <div className="space-y-4">
        <QuoteInquiryForm light={light} sourcePage="/contact" variant="compact" />
        <div className={light ? "rounded-[1.5rem] border border-slate-200 bg-white px-6 py-5 text-sm text-slate-600" : "rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-6 py-5 text-sm text-white/[0.65]"}>
          Need more room to describe scope, quantities, or timelines?{" "}
          <Link href="/quote" className={light ? "font-semibold text-brand-700 underline-offset-4 hover:underline" : "font-semibold text-cyan-300 underline-offset-4 hover:underline"}>
            Use the full quote form
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
