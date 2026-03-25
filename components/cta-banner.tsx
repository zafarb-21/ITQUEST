"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";

type CtaBannerProps = {
  title: string;
  description: string;
};

export function CtaBanner({ title, description }: CtaBannerProps) {
  return (
    <section className="section-pad">
      <Container>
        <motion.div
          className="section-panel relative overflow-hidden px-8 py-10 md:px-10 md:py-12"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(34,192,240,0.18),transparent_55%)]" />
          <motion.div
            className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-cyan-300/[0.12] blur-3xl"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="eyebrow">Start a Project</span>
              <h2 className="mt-5 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/[0.68]">{description}</p>
            </div>
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <ButtonLink href="/quote">Get a Quote</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Talk to Our Team
              </ButtonLink>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
