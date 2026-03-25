import { ArrowRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { companyStats, trustSignals } from "@/lib/site-data";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-32">
      <div className="absolute inset-0 grid-backdrop opacity-40" />
      <div className="absolute left-0 top-0 h-[34rem] w-[34rem] rounded-full bg-cyan-400/[0.14] blur-3xl" />
      <div className="absolute right-0 top-24 h-[28rem] w-[28rem] rounded-full bg-blue-500/[0.18] blur-3xl" />
      <Container className="relative section-pad">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_500px] lg:items-center">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow">Premium Technology Solutions · Zimbabwe</span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                Engineering the Future of <span className="text-gradient">Connectivity</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/[0.72] md:text-xl">
                ITQUEST AFRICA designs, supplies, and supports modern technology infrastructure for
                businesses, institutions, and homes, from enterprise networking and digital platforms to
                electronics distribution and intelligent smart systems.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/quote">Request a Quote</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore Services
                </ButtonLink>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/[0.68]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="section-panel relative overflow-hidden p-6 md:p-7">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,192,240,0.18),transparent_32%)]" />
              <div className="relative space-y-5">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Unified Capability</p>
                      <h2 className="mt-2 text-2xl font-semibold text-white">Infrastructure to Innovation</h2>
                    </div>
                    <Sparkles className="h-7 w-7 text-cyan-300" />
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {companyStats.map((stat) => (
                      <div key={stat.value} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
                        <p className="mt-2 text-sm leading-6 text-white/[0.65]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="surface-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white">Technology Pillars</p>
                      <ArrowRight className="h-4 w-4 text-cyan-300" />
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        "Networking Infrastructure",
                        "Web & Digital Systems",
                        "Hardware Supply",
                        "Smart IoT Monitoring",
                      ].map((item, index) => (
                        <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3">
                          <span className="text-sm text-white/[0.74]">{item}</span>
                          <span className="text-xs font-semibold text-cyan-300">0{index + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="surface-card p-5">
                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.1] p-4">
                      <Shield className="h-6 w-6 text-cyan-300" />
                      <p className="mt-3 text-lg font-semibold text-white">Credible delivery for serious projects</p>
                      <p className="mt-3 text-sm leading-7 text-white/[0.68]">
                        Structured, professional execution built for institutions, modern enterprises, and
                        high-value environments.
                      </p>
                    </div>
                    <div className="mt-5 rounded-2xl border border-white/10 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/45">Flagship IoT</p>
                      <p className="mt-2 text-base font-semibold text-white">ITQUEST SmartSense</p>
                      <p className="mt-2 text-sm leading-6 text-white/[0.65]">
                        Monitoring and alerts for server rooms, clinics, storage spaces, and critical
                        operational environments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
