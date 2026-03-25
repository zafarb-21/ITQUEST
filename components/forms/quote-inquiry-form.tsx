"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type QuoteInquiryFormProps = {
  light?: boolean;
  sourcePage: string;
  variant?: "compact" | "full";
};

type SubmitState = {
  ok: boolean;
  message: string;
} | null;

export function QuoteInquiryForm({
  light = false,
  sourcePage,
  variant = "compact",
}: QuoteInquiryFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<SubmitState>(null);
  const [isPending, startTransition] = useTransition();

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
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
      sourcePage,
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
      setSubmitState({
        ok: true,
        message: result.message,
      });
    });
  }

  return (
    <form onSubmit={handleSubmit} className={cn(light ? "surface-card-light p-8" : "surface-card p-8 md:p-10")} noValidate>
      {variant === "compact" ? (
        <CompactIntro light={light} />
      ) : null}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />
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
          <input className="input-field" type="text" name="projectType" placeholder="Project type" />
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
        {variant === "full" ? (
          <>
            <Field label="Budget range" error={errors.budget}>
              <input className="input-field" type="text" name="budget" placeholder="Budget range (optional)" />
            </Field>
            <Field label="Primary service needed" error={errors.primaryService}>
              <input className="input-field" type="text" name="primaryService" placeholder="Primary service needed" />
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
          "mt-5 inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70",
          light
            ? "bg-gradient-to-r from-brand-400 to-blue-500 text-slate-950"
            : "border border-white/[0.12] bg-white/[0.07] text-white hover:border-cyan-300/35",
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
      <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"}>
        Quote Request
      </p>
      <h3 className={light ? "mt-3 text-2xl font-semibold text-slate-950" : "mt-3 text-2xl font-semibold text-white"}>
        Request a tailored proposal
      </h3>
      <p className={light ? "mt-3 text-sm leading-7 text-slate-600" : "mt-3 text-sm leading-7 text-white/[0.68]"}>
        For networking, hardware sourcing, digital platforms, or smart systems, share the scope and we will frame an appropriate response.
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
            : "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
          : light
            ? "border-rose-200 bg-rose-50 text-rose-700"
            : "border-rose-500/20 bg-rose-500/10 text-rose-200",
      )}
    >
      {state.message}
    </div>
  );
}
