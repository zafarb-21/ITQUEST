"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { companyStats, trustSignals } from "@/lib/site-data";

const heroParticles = [
  { size: 10, left: "8%", top: "18%", delay: 0.2, duration: 9 },
  { size: 8, left: "18%", top: "68%", delay: 1.1, duration: 11 },
  { size: 12, left: "40%", top: "22%", delay: 0.7, duration: 10 },
  { size: 9, left: "57%", top: "58%", delay: 1.4, duration: 12 },
  { size: 14, left: "72%", top: "24%", delay: 0.4, duration: 9.5 },
  { size: 8, left: "86%", top: "62%", delay: 1.7, duration: 10.5 },
];

const networkLines = [
  { left: "14%", top: "26%", width: 180, rotate: 14 },
  { left: "28%", top: "62%", width: 210, rotate: -10 },
  { left: "64%", top: "30%", width: 160, rotate: 24 },
];

export function HomeHero() {
  const panelTransition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <section className="relative overflow-hidden pt-32">
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grid-animated absolute inset-0 opacity-70" />
      <div className="hero-scanline absolute inset-0 opacity-40" />
      <div className="hero-depth-layer absolute -left-24 top-8 h-[38rem] w-[38rem] rounded-full" />
      <div className="absolute left-[22%] top-14 h-[22rem] w-[22rem] rounded-full bg-cyan-300/[0.16] blur-[140px]" />
      <div className="absolute right-[-6rem] top-20 h-[30rem] w-[30rem] rounded-full bg-blue-500/[0.2] blur-[150px]" />
      <div className="absolute bottom-[-8rem] right-[16%] h-[24rem] w-[24rem] rounded-full bg-cyan-400/[0.08] blur-[130px]" />

      {networkLines.map((line) => (
        <motion.div
          key={`${line.left}-${line.top}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent"
          style={{
            left: line.left,
            top: line.top,
            width: `${line.width}px`,
            transform: `rotate(${line.rotate}deg)`,
            transformOrigin: "left center",
          }}
          animate={{ opacity: [0.25, 0.7, 0.25] }}
          transition={{
            duration: 5.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {heroParticles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="hero-particle absolute rounded-full border border-cyan-200/35 bg-cyan-300/20 shadow-[0_0_22px_rgba(90,216,255,0.32)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.22, 0.85, 0.22],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      <Container className="relative section-pad">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_500px] lg:items-start">
          <Reveal>
            <div className="relative max-w-3xl">
              <motion.div
                className="relative mb-6 w-full max-w-[36rem] overflow-hidden rounded-[1.35rem] border border-white/8 bg-transparent shadow-[0_18px_42px_rgba(2,10,22,0.18)] sm:mb-6 sm:max-w-[38rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              >
                <video
                  className="block h-auto w-full object-contain"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-cyan-300/10" />
              </motion.div>
              <motion.div
                className="hero-headline-glow absolute -left-8 top-10 h-52 w-52 rounded-full"
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
              <span className="eyebrow">Premium Technology Solutions · Zimbabwe</span>
              <h1 className="relative mt-6 text-5xl font-semibold leading-[0.98] text-white drop-shadow-[0_10px_30px_rgba(8,17,31,0.65)] md:text-7xl">
                Engineering the Future of <span className="text-gradient">Connectivity</span>
              </h1>
              <p className="relative mt-7 max-w-2xl text-lg leading-8 text-white/[0.82] md:text-xl">
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
            <motion.div
              className="section-panel hero-panel-float relative overflow-hidden p-6 md:p-7 lg:mt-2"
                animate={{ y: [0, -12, 0], rotate: [0, -0.7, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,192,240,0.22),transparent_30%)]" />
                <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                <motion.div
                  className="absolute -right-8 top-6 h-36 w-36 rounded-full bg-cyan-300/[0.14] blur-3xl"
                  animate={{ opacity: [0.18, 0.34, 0.18], scale: [1, 1.12, 1] }}
                  transition={{ duration: 5.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="relative space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.12,
                      },
                    },
                  }}
                >
                  <motion.div
                    className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-[0_24px_50px_rgba(2,12,28,0.3)]"
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={panelTransition}
                    whileHover={{ y: -6, borderColor: "rgba(90,216,255,0.24)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/45">Unified Capability</p>
                        <h2 className="mt-2 text-2xl font-semibold text-white">Infrastructure to Innovation</h2>
                      </div>
                      <Sparkles className="h-7 w-7 text-cyan-300" />
                    </div>
                    <div className="mt-7 grid gap-4 sm:grid-cols-2">
                      {companyStats.map((stat) => (
                        <motion.div
                          key={stat.value}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md"
                          whileHover={{
                            y: -4,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            borderColor: "rgba(90,216,255,0.22)",
                          }}
                          transition={{ duration: 0.22, ease: "easeOut" }}
                        >
                          <p className="text-sm font-semibold text-cyan-300">{stat.value}</p>
                          <p className="mt-2 text-sm leading-6 text-white/[0.65]">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <div className="grid gap-5 md:grid-cols-[1.12fr_0.88fr]">
                    <motion.div
                      className="surface-card p-6"
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={panelTransition}
                      whileHover={{
                        y: -6,
                        borderColor: "rgba(90,216,255,0.2)",
                        boxShadow: "0 22px 56px rgba(2,12,28,0.34)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/45">Interaction Layer</p>
                          <p className="mt-2 text-base font-semibold text-white">Technology Pillars</p>
                        </div>
                        <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                          <ArrowRight className="h-4 w-4 text-cyan-300" />
                        </motion.div>
                      </div>
                      <div className="mt-5 space-y-3">
                        {[
                          "Networking Infrastructure",
                          "Web & Digital Systems",
                          "Hardware Supply",
                          "Smart IoT Monitoring",
                        ].map((item, index) => (
                          <motion.div
                            key={item}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              ...panelTransition,
                              delay: 0.28 + index * 0.08,
                            }}
                            whileHover={{
                              x: 8,
                              borderColor: "rgba(90,216,255,0.28)",
                              backgroundColor: "rgba(255,255,255,0.08)",
                            }}
                            className="group flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition-colors"
                          >
                            <span className="text-sm text-white/[0.78] transition group-hover:text-white">{item}</span>
                            <span className="text-xs font-semibold text-cyan-300 transition group-hover:translate-x-1">
                              0{index + 1}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      className="surface-card p-6"
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={panelTransition}
                      whileHover={{
                        y: -6,
                        borderColor: "rgba(90,216,255,0.22)",
                        boxShadow: "0 24px 60px rgba(2,12,28,0.36)",
                      }}
                    >
                      <motion.div
                        className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.1] p-4"
                        whileHover={{
                          backgroundColor: "rgba(34,192,240,0.16)",
                          borderColor: "rgba(90,216,255,0.34)",
                        }}
                      >
                        <Shield className="h-6 w-6 text-cyan-300" />
                        <p className="mt-3 text-lg font-semibold text-white">Credible delivery for serious projects</p>
                        <p className="mt-3 text-sm leading-7 text-white/[0.68]">
                          Structured, professional execution built for institutions, modern enterprises, and
                          high-value environments.
                        </p>
                      </motion.div>
                      <motion.div
                        className="hero-smartsense-card relative mt-5 overflow-hidden rounded-2xl border border-white/10 p-4"
                        whileHover={{
                          y: -4,
                          borderColor: "rgba(90,216,255,0.3)",
                          boxShadow: "0 16px 42px rgba(34,192,240,0.18)",
                        }}
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(90,216,255,0.12),transparent_45%)]" />
                        <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
                        <p className="relative text-xs uppercase tracking-[0.2em] text-cyan-200/80">Flagship IoT</p>
                        <p className="relative mt-2 text-lg font-semibold text-white">ITQUEST SmartSense</p>
                        <p className="relative mt-3 text-sm leading-6 text-white/[0.68]">
                          Monitoring and alerts for server rooms, clinics, storage spaces, and critical
                          operational environments.
                        </p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
