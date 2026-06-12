"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

export function Process() {
  const { process } = useContent();

  return (
    <section id="process" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2 className="title-large text-[clamp(2.5rem,6vw,4.5rem)]">{process.title}</h2>
          <p className="max-w-sm text-[11px] font-semibold uppercase leading-[1.7] tracking-[0.05em] text-black/55">
            {process.desc}
          </p>
        </div>

        <div className="grid gap-y-10 md:grid-cols-4 md:gap-8">
          {process.steps.map((step, i) => (
            <motion.div
              key={step.no}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-t border-black/15 pt-5"
            >
              <span className="text-[11px] font-semibold tracking-[0.12em] text-[var(--color-rust)]">
                {step.no}
              </span>
              <h3 className="title-large mt-4 text-[clamp(1.4rem,1.8vw,1.9rem)]">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.6] text-black/60">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
