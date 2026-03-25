"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, MessageSquare, SendHorizonal, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { serviceOptions } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Recommendation = {
  title: string;
  href: string;
};

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  recommendations?: Recommendation[];
};

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  service: string;
  notes: string;
};

type SubmitState = {
  ok: boolean;
  message: string;
} | null;

const suggestedPrompts = [
  "What services do you offer?",
  "Do you provide CCTV systems?",
  "Can I request a quote?",
  "Do you offer domain registration?",
];

const welcomeMessage: ChatMessage = {
  id: "assistant-welcome",
  role: "assistant",
  content:
    "Ask about ITQUEST AFRICA services, products, smart systems, or the best next step for your project.",
};

function createMessage(role: ChatMessage["role"], content: string, recommendations?: Recommendation[]): ChatMessage {
  return {
    id: `${role}-${crypto.randomUUID()}`,
    role,
    content,
    recommendations,
  };
}

export function SiteAssistant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormState>({
    name: "",
    email: "",
    company: "",
    service: "",
    notes: "",
  });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [chatState, setChatState] = useState<SubmitState>(null);
  const [leadState, setLeadState] = useState<SubmitState>(null);
  const [isChatPending, startChatTransition] = useTransition();
  const [isLeadPending, startLeadTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const container = messagesRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open, showLeadCapture, leadState]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  async function handleSend(submittedText?: string) {
    const text = (submittedText ?? input).trim();
    if (!text || isChatPending) return;

    const nextMessages = [...messages, createMessage("user", text)];
    setMessages(nextMessages);
    setInput("");
    setChatState(null);

    startChatTransition(async () => {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
            sourcePage: pathname,
          }),
        });

        const result = (await response.json()) as {
          ok: boolean;
          reply?: string;
          message?: string;
          recommendedServices?: Recommendation[];
          showLeadCapture?: boolean;
        };

        if (!response.ok || !result.ok || !result.reply) {
          setChatState({
            ok: false,
            message:
              result.message ||
              "The assistant could not respond right now. Please try again or contact the team directly.",
          });
          setMessages((current) => [
            ...current,
            createMessage(
              "assistant",
              "I can still help you take the next step. Use Request a Quote for custom project needs or Talk to Our Team for direct support.",
            ),
          ]);
          return;
        }

        const reply = result.reply;

        setMessages((current) => [
          ...current,
          createMessage("assistant", reply, result.recommendedServices),
        ]);
        setShowLeadCapture(Boolean(result.showLeadCapture));
        setChatState(null);

        if (result.showLeadCapture) {
          setLeadErrors({});
          setLeadState(null);
          setLeadForm((current) => ({
            ...current,
            service: current.service || result.recommendedServices?.[0]?.title || "",
            notes: current.notes || text,
          }));
        }
      } catch {
        setChatState({
          ok: false,
          message:
            "The assistant is temporarily unavailable. Please use Request a Quote or Talk to Our Team for immediate help.",
        });
        setMessages((current) => [
          ...current,
          createMessage(
            "assistant",
            "The assistant is temporarily unavailable. You can still request a quote or talk to our team for direct assistance.",
          ),
        ]);
      }
    });
  }

  function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadErrors({});
    setLeadState(null);

    startLeadTransition(async () => {
      const response = await fetch("/api/assistant/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          sourcePage: pathname,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !result.ok) {
        setLeadErrors(result.errors ?? {});
        setLeadState({
          ok: false,
          message: result.message || "Your details could not be submitted right now.",
        });
        return;
      }

      setLeadState({
        ok: true,
        message: result.message,
      });
      setShowLeadCapture(false);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Thank you. Your details have been captured, and the ITQUEST AFRICA team can follow up with the right next step.",
        ),
      ]);
      setLeadForm({
        name: "",
        email: "",
        company: "",
        service: "",
        notes: "",
      });
    });
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.section
            className="fixed inset-x-4 bottom-24 z-[65] sm:inset-x-auto sm:right-6 sm:w-[420px]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-label="ITQUEST AFRICA Assistant"
          >
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_24px_80px_rgba(2,10,24,0.48)] backdrop-blur-xl">
              <div className="border-b border-white/10 bg-white/[0.03] px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                        ITQUEST AFRICA Assistant
                      </h2>
                      <p className="mt-1 text-sm text-white/[0.62]">
                        Ask about services, solutions, and support
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/72 transition hover:border-cyan-300/25 hover:text-white"
                    aria-label="Close assistant"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div ref={messagesRef} className="max-h-[65vh] space-y-4 overflow-y-auto px-5 py-5">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn("flex gap-3", message.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {message.role === "assistant" ? (
                      <div className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                        <Sparkles className="h-4 w-4" />
                      </div>
                    ) : null}
                    <div className={cn("max-w-[84%]", message.role === "user" && "order-first")}>
                      <div
                        className={cn(
                          "rounded-[1.4rem] border px-4 py-3 text-sm leading-7",
                          message.role === "assistant"
                            ? "border-white/10 bg-white/[0.05] text-white/[0.86]"
                            : "border-cyan-300/20 bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500 text-slate-950 shadow-[0_12px_30px_rgba(34,192,240,0.2)]",
                        )}
                      >
                        {message.content}
                      </div>
                      {message.recommendations?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.recommendations.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 transition hover:border-cyan-300/25 hover:bg-white/[0.08]"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {message.role === "user" ? (
                      <div className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/78">
                        <User className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                ))}

                {messages.length === 1 ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Suggested prompts
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {suggestedPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void handleSend(prompt)}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-left text-xs text-white/[0.78] transition hover:border-cyan-300/25 hover:bg-white/[0.08] hover:text-white"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {chatState ? (
                  <div
                    className={cn(
                      "rounded-[1.25rem] border px-4 py-3 text-sm",
                      chatState.ok
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                        : "border-rose-500/20 bg-rose-500/10 text-rose-200",
                    )}
                  >
                    {chatState.message}
                  </div>
                ) : null}

                {showLeadCapture ? (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Project enquiry
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/[0.68]">
                      Share your details and ITQUEST AFRICA can follow up with the right solution path.
                    </p>
                    <form onSubmit={handleLeadSubmit} className="mt-4 space-y-3" noValidate>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block">
                          <span className="sr-only">Name</span>
                          <input
                            className="input-field"
                            type="text"
                            value={leadForm.name}
                            onChange={(event) =>
                              setLeadForm((current) => ({ ...current, name: event.target.value }))
                            }
                            placeholder="Your name"
                          />
                          {leadErrors.name ? (
                            <span className="mt-2 block text-xs font-medium text-rose-400">{leadErrors.name}</span>
                          ) : null}
                        </label>
                        <label className="block">
                          <span className="sr-only">Email</span>
                          <input
                            className="input-field"
                            type="email"
                            value={leadForm.email}
                            onChange={(event) =>
                              setLeadForm((current) => ({ ...current, email: event.target.value }))
                            }
                            placeholder="Email address"
                          />
                          {leadErrors.email ? (
                            <span className="mt-2 block text-xs font-medium text-rose-400">{leadErrors.email}</span>
                          ) : null}
                        </label>
                      </div>
                      <label className="block">
                        <span className="sr-only">Company</span>
                        <input
                          className="input-field"
                          type="text"
                          value={leadForm.company}
                          onChange={(event) =>
                            setLeadForm((current) => ({ ...current, company: event.target.value }))
                          }
                          placeholder="Company / Organization"
                        />
                        {leadErrors.company ? (
                          <span className="mt-2 block text-xs font-medium text-rose-400">{leadErrors.company}</span>
                        ) : null}
                      </label>
                      <label className="block">
                        <span className="sr-only">Service of interest</span>
                        <select
                          className="input-field appearance-none"
                          value={leadForm.service}
                          onChange={(event) =>
                            setLeadForm((current) => ({ ...current, service: event.target.value }))
                          }
                        >
                          <option value="">Select a service</option>
                          {serviceOptions.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                        {leadErrors.service ? (
                          <span className="mt-2 block text-xs font-medium text-rose-400">{leadErrors.service}</span>
                        ) : null}
                      </label>
                      <label className="block">
                        <span className="sr-only">Notes</span>
                        <textarea
                          className="input-field min-h-24 resize-none"
                          value={leadForm.notes}
                          onChange={(event) =>
                            setLeadForm((current) => ({ ...current, notes: event.target.value }))
                          }
                          placeholder="Project notes or environment details (optional)"
                        />
                      </label>
                      {leadState ? (
                        <div
                          className={cn(
                            "rounded-[1.25rem] border px-4 py-3 text-sm",
                            leadState.ok
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                              : "border-rose-500/20 bg-rose-500/10 text-rose-200",
                          )}
                        >
                          {leadState.message}
                        </div>
                      ) : null}
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="submit"
                          disabled={isLeadPending}
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {isLeadPending ? "Submitting..." : "Share Details"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowLeadCapture(false)}
                          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white/78 transition hover:border-cyan-300/25 hover:text-white"
                        >
                          Maybe later
                        </button>
                      </div>
                    </form>
                  </div>
                ) : null}

                {isChatPending ? (
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/[0.7]">
                      Thinking about the best ITQUEST AFRICA answer...
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="border-t border-white/10 bg-white/[0.02] px-5 py-4">
                <div className="mb-3 flex flex-wrap gap-2">
                  <Link
                    href="/quote"
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.12]"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78 transition hover:border-cyan-300/25 hover:text-white"
                  >
                    Talk to Our Team
                  </Link>
                </div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSend();
                  }}
                  className="flex items-center gap-3"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about services, products, or support..."
                    className="input-field flex-1 py-3"
                  />
                  <button
                    type="submit"
                    disabled={isChatPending || !input.trim()}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-400 via-cyan-400 to-blue-500 text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {!open ? (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-[64] inline-flex h-16 w-16 items-center justify-center rounded-full border border-cyan-300/18 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-cyan-300 shadow-[0_20px_50px_rgba(2,10,24,0.42)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/32 hover:text-white"
            initial={{ opacity: 0, scale: 0.94, y: 14 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -4, 0],
              boxShadow: [
                "0 20px 50px rgba(2, 10, 24, 0.42)",
                "0 26px 60px rgba(34, 192, 240, 0.18)",
                "0 20px 50px rgba(2, 10, 24, 0.42)",
              ],
            }}
            exit={{ opacity: 0, scale: 0.94, y: 14 }}
            transition={{
              opacity: { duration: 0.24 },
              scale: { duration: 0.24 },
              y: { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
              boxShadow: { duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            aria-label="Open ITQUEST AFRICA Assistant"
          >
            <span className="absolute inset-0 rounded-full border border-cyan-300/10" />
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
}
