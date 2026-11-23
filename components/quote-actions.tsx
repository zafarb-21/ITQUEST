"use client";

import { CheckCircle2, MessageSquare } from "lucide-react";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

type Props = {
  token: string;
  number: string;
  total: string;
  state: "open" | "accepted" | "expired" | "closed";
  acceptedBy: string | null;
};

/** Accept the quote / ask a question, on the customer's private quote page. */
export function QuoteActions({ token, number, total, state, acceptedBy }: Props) {
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [accepted, setAccepted] = useState(state === "accepted");
  const [isPending, startTransition] = useTransition();

  function post(body: Record<string, unknown>, onOk?: () => void) {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/quote/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = (await response.json()) as { ok: boolean; message: string };
        setResult(json);
        if (response.ok && json.ok) onOk?.();
      } catch {
        setResult({ ok: false, message: "Couldn't reach the server. Please try again, or reply to the quote email." });
      }
    });
  }

  return (
    <div className="space-y-6">
      {accepted ? (
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-800">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-semibold">Quote {number} is accepted{acceptedBy ? ` by ${acceptedBy}` : ""}.</p>
          </div>
          <p className="mt-2 text-sm">Thank you. Our team will contact you about the next steps and the invoice.</p>
        </div>
      ) : state === "open" ? (
        <form
          className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-6 shadow-card"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            post({ action: "accept", name: String(form.get("name") || ""), confirm: form.has("confirm") }, () => setAccepted(true));
          }}
        >
          <h3 className="text-xl font-semibold text-slate-950">Accept this quote</h3>
          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Your full name</span>
            <input name="name" className="input-field" autoComplete="name" required minLength={2} />
          </label>
          <label className="mt-4 flex items-start gap-3 text-sm text-slate-700">
            <input type="checkbox" name="confirm" className="mt-1 h-4 w-4 rounded border-slate-300" required />
            <span>
              I accept quotation {number} for {total}, as set out in the PDF.
            </span>
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="mt-5 inline-flex rounded-full bg-gradient-to-r from-brand-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {isPending ? "Sending..." : "Accept the quote"}
          </button>
        </form>
      ) : (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-6 py-5 text-amber-900">
          <p className="font-semibold">{state === "expired" ? "This quote has expired." : "This quote is closed."}</p>
          <p className="mt-2 text-sm">Prices and stock change: ask us below or on WhatsApp for an updated quotation.</p>
        </div>
      )}

      <form
        id="ask"
        className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-6 shadow-card"
        onSubmit={(event) => {
          event.preventDefault();
          const el = event.currentTarget;
          const form = new FormData(el);
          post({ action: "ask", message: String(form.get("message") || "") }, () => el.reset());
        }}
      >
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 text-brand-700" />
          <h3 className="text-xl font-semibold text-slate-950">Ask a question or request a change</h3>
        </div>
        <textarea name="message" className="input-field mt-4 min-h-28 resize-y" maxLength={2000} placeholder="e.g. Can you deliver by the 15th? Could you quote 10 units instead of 8?" />
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:opacity-60"
        >
          {isPending ? "Sending..." : "Send to Sales"}
        </button>
      </form>

      {result ? (
        <div
          role="status"
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm",
            result.ok ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700",
          )}
        >
          {result.message}
        </div>
      ) : null}
    </div>
  );
}
