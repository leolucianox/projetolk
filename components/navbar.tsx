"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Wordmark } from "@/components/brand";
import { RollText } from "@/components/ui/roll-text";
import { LangToggle } from "@/components/ui/lang-toggle";
import { useContent } from "@/lib/i18n";
import { cn } from "@/lib/cn";

/**
 * Hand-drawn "pen stroke" underline marking the page currently being viewed.
 * Rust-coloured (the contact section's background). Height/position use `em` so
 * it scales with the link size on every resolution.
 */
function ActiveMark({
  strokeWidth = 2.5,
  className,
}: {
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      fill="none"
      className={cn(
        "pointer-events-none absolute left-0 top-full h-[0.34em] w-full overflow-visible",
        className,
      )}
    >
      <path
        d="M1.5 6 C 22 2.5, 44 8, 66 5 C 88 2, 105 7.5, 118.5 4.5"
        stroke="var(--color-rust)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // hidden: tucked above the viewport. Slides up out of view on scroll-down and
  // slides back down into the page on scroll-up — a plain rise/fall, no backdrop.
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { nav } = useContent();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) {
        setHidden(false); // always visible near the very top
      } else if (y > lastY.current + 4) {
        setHidden(true); // scrolling down → slides up out of view
      } else if (y < lastY.current - 4) {
        setHidden(false); // scrolling up → slides back down into view
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When the mobile menu is open the bar must stay in view.
  const tucked = hidden && !open;

  return (
    <>
    <header
      className={cn(
        // Solid site-coloured background so the bar reads over any section as it
        // slides in; blends seamlessly with the page at the top.
        "fixed inset-x-0 top-0 z-50 bg-base transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        tucked ? "-translate-y-full" : "translate-y-0",
      )}
    >
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
                  <span className="relative inline-block">
                    <RollText text={item.label} duration="duration-[450ms]" />
                    {pathname === item.href && <ActiveMark className="mt-[3px]" />}
                  </span>
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
    </header>

      {/* Mobile overlay — rendered as a sibling of the header (not inside it)
          so its `fixed inset-0` covers the viewport. A `fixed` element nested in
          the header would be clipped to the header's box because the header uses
          a transform for its hide/reveal animation. */}
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
                    <span className="relative inline-block">
                      {item.label}
                      {pathname === item.href && (
                        <ActiveMark strokeWidth={4} className="-mt-[0.08em]" />
                      )}
                    </span>
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
    </>
  );
}
