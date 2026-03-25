"use client";

import type { ReactNode } from "react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type ContactInquiryFormProps = {
  light?: boolean;
  sourcePage: string;
};

type SubmitState = {
  ok: boolean;
  message: string;
} | null;

export function ContactInquiryForm({ light = false, sourcePage }: ContactInquiryFormProps) {
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
      kind: "contact" as const,
      fullName: String(formData.get("fullName") || ""),
      company: String(formData.get("company") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
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
          message: result.message || "Unable to send your enquiry right now.",
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
    <form onSubmit={handleSubmit} className={cn(light ? "surface-card-light p-8" : "surface-card p-8")} noValidate>
      <div className="mb-6">
        <p className={light ? "text-xs font-semibold uppercase tracking-[0.2em] text-brand-700" : "text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"}>
          Contact Form
        </p>
        <h3 className={light ? "mt-3 text-2xl font-semibold text-slate-950" : "mt-3 text-2xl font-semibold text-white"}>
          Start the conversation
        </h3>
        <p className={light ? "mt-3 text-sm leading-7 text-slate-600" : "mt-3 text-sm leading-7 text-white/[0.68]"}>
          Tell us about your project, environment, or infrastructure requirement and our team will respond with the right next step.
        </p>
      </div>
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
      </div>
      <Field label="Project details" error={errors.message} className="mt-4">
        <textarea className="input-field min-h-36 resize-none" name="message" placeholder="How can we help?" />
      </Field>
      <SubmissionNotice light={light} state={submitState} />
      <button
        type="submit"
        disabled={isPending}
        className="mt-5 inline-flex rounded-full bg-gradient-to-r from-brand-400 to-blue-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
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
