"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/brand";
import { RollText } from "@/components/ui/roll-text";
import { LangToggle } from "@/components/ui/lang-toggle";
import { useContent } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { nav } = useContent();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-5 md:px-10 md:py-7">
        <a href="/" aria-label="Larissa Wand — início" className="shrink-0">
          <Wordmark />
        </a>

        {/* Desktop menu — larger type, wider spacing */}
        <nav className="hidden items-center gap-10 lg:flex">
          <ul className="flex items-center gap-10 text-[13px] font-semibold uppercase tracking-[0.14em]">
            {nav.map((item) => (
              <li key={item.label} className="group">
                <a href={item.href} className="leading-none">
                  <RollText text={item.label} duration="duration-[450ms]" />
                </a>
              </li>
            ))}
          </ul>

          <span className="h-4 w-px bg-black/20" />

          <LangToggle />
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(true)}
          className="text-[12px] font-semibold uppercase tracking-[0.12em] lg:hidden"
        >
          Menu
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-base px-5 py-5 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                onClick={() => setOpen(false)}
                className="text-[12px] font-semibold uppercase tracking-[0.12em]"
              >
                Close
              </button>
            </div>

            <ul className="mt-16 flex flex-col gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
                >
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.96, opacity: 0.6 }}
                    className="title-large block py-1 text-[clamp(2rem,11vw,3.5rem)]"
                  >
                    {item.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex items-center gap-4 border-t border-black/10 pt-6">
              <LangToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
