"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { servicePillars } from "@/lib/site-data";

export function ServicesPageContent() {
  return (
    <section className="section-pad">
      <Container className="space-y-12 md:space-y-14">
        {servicePillars.map((service, index) => {
          const Icon = service.icon;
          const moduleGradient = [
            "from-cyan-300/[0.12] via-transparent to-transparent",
            "from-blue-400/[0.12] via-transparent to-transparent",
            "from-sky-300/[0.12] via-transparent to-transparent",
            "from-cyan-200/[0.12] via-transparent to-transparent",
          ][index % 4];

          return (
            <Reveal key={service.slug} delay={index * 0.05}>
              <motion.article
                className="service-module group section-panel relative overflow-hidden p-8 md:p-10 lg:p-12"
                whileHover={{
                  y: -8,
                  boxShadow: "0 34px 88px rgba(2,12,28,0.38)",
                  borderColor: "rgba(90,216,255,0.24)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${moduleGradient} opacity-90`} />
                <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-cyan-300/[0.08] blur-3xl transition duration-500 group-hover:bg-cyan-300/[0.16]" />
                <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-70" />
                <div className="relative grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-9">
                  <div className="pr-2">
                    <motion.div
                      className="inline-flex rounded-3xl border border-white/10 bg-white/[0.08] p-5 text-cyan-300 shadow-[0_18px_38px_rgba(2,12,28,0.18)]"
                      whileHover={{
                        scale: 1.06,
                        rotate: -4,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        borderColor: "rgba(90,216,255,0.28)",
                      }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
                    >
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{
                          duration: 3.6,
                          delay: index * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                    </motion.div>
                    <h2 className="mt-6 text-3xl font-semibold text-white">{service.title}</h2>
                    <p className="mt-5 text-base leading-8 text-white/[0.72]">{service.description}</p>
                  </div>
                  <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_290px]">
                    <motion.div
                      className="rounded-[1.65rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md"
                      whileHover={{
                        y: -4,
                        borderColor: "rgba(90,216,255,0.2)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">What We Offer</p>
                      <ul className="mt-6 grid gap-4 text-sm leading-7 text-white/[0.76] md:grid-cols-2">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <motion.li
                            key={bullet}
                            className="flex gap-3 rounded-2xl px-2 py-2 transition-colors hover:bg-white/[0.04]"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.42, ease: "easeOut", delay: bulletIndex * 0.05 }}
                          >
                            <motion.span
                              className="mt-2 h-2 w-2 rounded-full bg-cyan-300"
                              whileHover={{ scale: 1.5, boxShadow: "0 0 14px rgba(90,216,255,0.55)" }}
                            />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                    <motion.div
                      className="rounded-[1.65rem] border border-cyan-300/[0.16] bg-cyan-300/[0.08] p-6"
                      whileHover={{
                        y: -4,
                        borderColor: "rgba(90,216,255,0.3)",
                        backgroundColor: "rgba(34,192,240,0.12)",
                        boxShadow: "0 22px 46px rgba(34,192,240,0.12)",
                      }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">Ideal For</p>
                      <p className="mt-5 text-sm leading-7 text-white/[0.76]">
                        Businesses, institutions, and premium residential clients looking for dependable
                        delivery, better technology visibility, and a partner that can guide both today’s
                        requirement and tomorrow’s expansion.
                      </p>
                      <div className="mt-7 flex flex-wrap gap-3">
                        <ButtonLink href="/quote">{service.cta}</ButtonLink>
                        <ButtonLink href="/contact" variant="secondary">
                          Ask a Question
                        </ButtonLink>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
