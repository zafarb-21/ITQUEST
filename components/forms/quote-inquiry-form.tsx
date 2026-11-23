"use client";

import { PackageCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState, useTransition } from "react";
import { useBasket } from "@/components/use-basket";
import { addToBasket, readBasket, removeFromBasket, setQuantity, writeBasket } from "@/lib/basket";
import type { CatalogProduct } from "@/lib/catalog";
import { serviceOptions } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type QuoteInquiryFormProps = {
  light?: boolean;
  sourcePage: string;
  variant?: "compact" | "full";
  selectedProduct?: Pick<CatalogProduct, "name" | "slug" | "sku" | "summary"> | null;
};

type SubmitState = {
  ok: boolean;
  message: string;
  statusUrl?: string;
} | null;

export function QuoteInquiryForm({
  light = false,
  sourcePage,
  variant = "compact",
  selectedProduct = null,
}: QuoteInquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const [isPending, startTransition] = useTransition();
  // Nov 2026: the full form on /quote sends the whole quote basket; a ?product= link adds that product to it
  const useBasketList = variant === "full";
  const basket = useBasket();
  useEffect(() => {
    if (!useBasketList || !selectedProduct) return;
    const current = readBasket();
    if (!current.some((x) => x.slug === selectedProduct.slug)) {
      writeBasket(addToBasket(current, { slug: selectedProduct.slug, name: selectedProduct.name, sku: selectedProduct.sku, quantity: 1 }));
    }
  }, [useBasketList, selectedProduct]);
  const showSelected = selectedProduct && !useBasketList;
  const defaultMessage = showSelected
    ? `Please quote ${selectedProduct.name} (${selectedProduct.sku}). Estimated quantity: 1. Please share current availability, lead time, and recommended alternatives if needed.`
    : "";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState(null);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      kind: "quote" as const,
      fullName: String(formData.get("fullName") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      projectType: String(formData.get("projectType") || ""),
      industry: String(formData.get("industry") || ""),
      location: String(formData.get("location") || ""),
      timeline: String(formData.get("timeline") || ""),
      budget: String(formData.get("budget") || ""),
      primaryService: String(formData.get("primaryService") || ""),
      preferredContactMethod: String(formData.get("preferredContactMethod") || ""),
      selectedProductSlug: String(formData.get("selectedProductSlug") || ""),
      selectedProductName: String(formData.get("selectedProductName") || ""),
      selectedProductSku: String(formData.get("selectedProductSku") || ""),
      selectedProductQuantity: String(formData.get("selectedProductQuantity") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      sourcePage,
      items: useBasketList ? readBasket() : [],
    };

    startTransition(async () => {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: Record<string, string>;
        statusUrl?: string;
      };

      if (!response.ok || !result.ok) {
        setErrors(result.errors ?? {});
        setSubmitState({
          ok: false,
          message: result.message || "Unable to send your quote request right now.",
        });
        return;
      }

      form.reset();
      if (useBasketList) writeBasket([]);
      setSubmitState({
        ok: true,
        message: result.message,
        statusUrl: result.statusUrl,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className={cn(light ? "surface-card-light p-8" : "surface-card p-8 md:p-10")} noValidate>
      {variant === "compact" ? (
        <CompactIntro light={light} />
      ) : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
      {useBasketList && basket.length ? (
        <div className={cn("mb-6 rounded-[1.5rem] border px-5 py-5", light ? "border-slate-200 bg-slate-50" : "border-ink/10 bg-white")}>
          <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"}>
            Products in this request
          </p>
          <ul className="mt-3 space-y-2">
            {basket.map((item) => (
              <li key={item.slug} className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className={light ? "truncate text-sm font-semibold text-slate-950" : "truncate text-sm font-semibold text-ink"}>{item.name}</p>
                  {item.sku ? <p className={light ? "text-xs text-slate-500" : "text-xs text-slate-500"}>{item.sku}</p> : null}
                </div>
                <input
                  type="number"
                  min={1}
                  max={10000}
                  value={item.quantity}
                  onChange={(event) => writeBasket(setQuantity(readBasket(), item.slug, Math.max(1, Math.floor(Number(event.target.value) || 1))))}
                  className="input-field w-24 py-2"
                  aria-label={`Quantity of ${item.name}`}
                />
                <button
                  type="button"
                  onClick={() => writeBasket(removeFromBasket(readBasket(), item.slug))}
                  className={light ? "rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700" : "rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-ink"}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
          <Link href="/products" className={light ? "mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline" : "mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline"}>
            + Add more products
          </Link>
        </div>
      ) : null}
      {showSelected ? (
        <div className={cn("mb-6 rounded-[1.5rem] border px-5 py-5", light ? "border-slate-200 bg-slate-50" : "border-ink/10 bg-white")}>
          <div className="flex items-start gap-4">
            <div className={cn("rounded-2xl p-3", light ? "bg-brand-50 text-brand-700" : "bg-brand-50 text-brand-700")}>
              <PackageCheck className="h-5 w-5" />
            </div>
            <div>
              <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"}>
                Selected Product
              </p>
              <h3 className={light ? "mt-2 text-xl font-semibold text-slate-950" : "mt-2 text-xl font-semibold text-ink"}>{selectedProduct.name}</h3>
              <p className={light ? "mt-1 text-sm font-medium text-slate-500" : "mt-1 text-sm font-medium text-slate-600"}>{selectedProduct.sku}</p>
              <p className={light ? "mt-3 text-sm leading-7 text-slate-600" : "mt-3 text-sm leading-7 text-slate-600"}>{selectedProduct.summary}</p>
            </div>
          </div>
          <input type="hidden" name="selectedProductSlug" value={selectedProduct.slug} />
          <input type="hidden" name="selectedProductName" value={selectedProduct.name} />
          <input type="hidden" name="selectedProductSku" value={selectedProduct.sku} />
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" error={errors.fullName}>
          <input className="input-field" type="text" name="fullName" placeholder="Full name" />
        </Field>
        <Field label="Company / Organization" error={errors.company}>
          <input className="input-field" type="text" name="company" placeholder="Company / Organization" />
        </Field>
        <Field label="Email address" error={errors.email}>
          <input className="input-field" type="email" name="email" placeholder="Email address" />
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <input className="input-field" type="tel" name="phone" placeholder="Phone number" />
        </Field>
        <Field label="Project type" error={errors.projectType}>
          <input
            className="input-field"
            type="text"
            name="projectType"
            placeholder="Project type"
            defaultValue={selectedProduct || (useBasketList && basket.length) ? "Product sourcing" : ""}
          />
        </Field>
        <Field label="Industry / Sector" error={errors.industry}>
          <input className="input-field" type="text" name="industry" placeholder="Industry / Sector" />
        </Field>
        <Field label="Location" error={errors.location}>
          <input className="input-field" type="text" name="location" placeholder="Location" />
        </Field>
        <Field label="Estimated timeline" error={errors.timeline}>
          <input className="input-field" type="text" name="timeline" placeholder="Estimated timeline" />
        </Field>
        {showSelected ? (
          <Field label="Quantity required" error={errors.selectedProductQuantity}>
            <input className="input-field" type="number" name="selectedProductQuantity" min={1} defaultValue="1" />
          </Field>
        ) : null}
        <Field
          label={variant === "full" ? "Primary service needed" : "Service of interest"}
          error={errors.primaryService}
          className={variant === "compact" || showSelected ? "md:col-span-2" : undefined}
        >
          <select className="input-field appearance-none" name="primaryService" defaultValue="">
            <option value="">Select a service</option>
            {serviceOptions.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>
        {variant === "full" ? (
          <>
            <Field label="Budget range" error={errors.budget}>
              <input className="input-field" type="text" name="budget" placeholder="Budget range (optional)" />
            </Field>
            <Field label="Preferred contact method" error={errors.preferredContactMethod} className="md:col-span-2">
              <input className="input-field" type="text" name="preferredContactMethod" placeholder="Preferred contact method" />
            </Field>
          </>
        ) : null}
      </div>
      <Field label="Project details" error={errors.message} className="mt-4">
        <textarea
          className={cn("input-field resize-none", variant === "full" ? "min-h-44" : "min-h-36")}
          name="message"
          defaultValue={defaultMessage}
          placeholder={
            variant === "full"
              ? "Describe the project scope, technical needs, quantities, or operating challenges"
              : "Project details, quantities, or infrastructure needs"
          }
        />
      </Field>
      <SubmissionNotice light={light} state={submitState} />
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "mt-5 inline-flex rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70",
          light
            ? "bg-ink text-[#fff] hover:bg-brand-900"
            : "bg-ink text-[#fff] hover:bg-brand-900",
        )}
      >
        {isPending ? "Submitting..." : variant === "full" ? "Submit Quote Request" : "Request Quote"}
      </button>
    </form>
  );
}

function CompactIntro({ light }: { light: boolean }) {
  return (
    <div className="mb-6">
      <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700"}>
        Quote Request
      </p>
      <h3 className={light ? "mt-3 text-2xl font-semibold text-slate-950" : "mt-3 text-2xl font-semibold text-ink"}>
        Request a tailored proposal
      </h3>
      <p className={light ? "mt-3 text-sm leading-7 text-slate-600" : "mt-3 text-sm leading-7 text-slate-600"}>
        For networking, surveillance, access control, AI systems, hardware sourcing, digital platforms, or smart technology, share the scope and we will frame an appropriate response.
      </p>
    </div>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="sr-only">{label}</span>
      {children}
      {error ? <span className="mt-2 block text-xs font-medium text-rose-400">{error}</span> : null}
    </label>
  );
}

function SubmissionNotice({
  light,
  state,
}: {
  light: boolean;
  state: SubmitState;
}) {
  if (!state) return null;

  return (
    <div
      className={cn(
        "mt-4 rounded-2xl border px-4 py-3 text-sm",
        state.ok
          ? light
            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-700"
          : light
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-rose-500/20 bg-rose-500/10 text-rose-200",
      )}
    >
      {state.message}
      {state.statusUrl ? (
        <>
          {" "}
          <Link href={state.statusUrl} className="font-semibold underline">
            Follow your request
          </Link>
          {" "}(we&apos;ve emailed you this link too).
        </>
      ) : null}
    </div>
  );
}
