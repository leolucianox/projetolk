"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RollText } from "@/components/ui/roll-text";
import { Placeholder } from "@/components/ui/placeholder";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useActiveOnScroll } from "@/hooks/use-active-on-scroll";
import { useContent } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function TattooStyles() {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [hovered, setHovered] = useState<number | null>(null);
  const { setItemRef, activeIndex } = useActiveOnScroll(isMobile);
  const { styles } = useContent();
  const tattooStyles = styles.items;

  // image preview follows hover (desktop) or the centred row (mobile)
  const previewIndex = isMobile ? activeIndex : hovered;

  return (
    <section
      id="styles"
      className="snap-section relative flex min-h-screen flex-col justify-center py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <h2 className="title-large mb-7 text-center text-[clamp(2rem,5vw,3.5rem)] md:mb-9">
          {styles.eyebrow}
        </h2>

        <div className="relative" onMouseLeave={() => setHovered(null)}>
          {/* Floating preview (desktop) — tracks the hovered row */}
          <div className="pointer-events-none absolute inset-y-0 left-[16%] z-10 hidden lg:block">
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute w-[190px] -translate-y-1/2 shadow-2xl"
                  style={{
                    aspectRatio: "4 / 5",
                    top: `${((hovered + 0.5) / tattooStyles.length) * 100}%`,
                  }}
                >
                  <Placeholder
                    tone={tattooStyles[hovered].tone}
                    src={tattooStyles[hovered].img}
                    alt={tattooStyles[hovered].title}
                    className="h-full w-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Rows */}
          <ul className="border-t border-black/15">
            {tattooStyles.map((s, i) => {
              const active = previewIndex === i;
              return (
                <li key={s.no} ref={setItemRef(i)} className="border-b border-black/15">
                  <a
                    href={s.href ?? "#work"}
                    className="group grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2 md:py-2.5"
                    onMouseEnter={() => setHovered(i)}
                  >
                    <span
                      className={cn(
                        "justify-self-start text-[11px] font-semibold tracking-[0.08em] text-black/70 transition-opacity duration-300 group-hover:opacity-40",
                        isMobile && previewIndex !== null && !active && "opacity-40",
                      )}
                    >
                      {s.no}
                    </span>

                    <h3
                      className={cn(
                        // No `title-large` here: its line-height:1.05 would win over the
                        // utility below and clip descenders (g, ç) inside RollText's
                        // overflow box. We set the Manrope face + a roomy line-height here.
                        "justify-self-center text-center text-[clamp(1.5rem,3.8vw,2.7rem)] leading-[1.35] transition-colors duration-300 group-hover:text-black/25",
                        isMobile && previewIndex !== null && !active && "text-black/30",
                      )}
                      // Style names keep the original Manrope face (not Baby Doll)
                      style={{
                        fontFamily: "var(--font-manrope), Manrope, ui-sans-serif, system-ui, sans-serif",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      <RollText text={s.title} className="pb-[0.12em]" />
                    </h3>

                    <span
                      className={cn(
                        "justify-self-end whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.1em] text-black/55 transition-opacity duration-300 group-hover:opacity-40",
                        isMobile && previewIndex !== null && !active && "opacity-40",
                      )}
                    >
                      {s.tag}
                    </span>
                  </a>

                  {/* Inline preview (mobile) — expands for the centred row */}
                  <motion.div
                    className="overflow-hidden lg:hidden"
                    initial={false}
                    animate={{ height: active ? 220 : 0, opacity: active ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="pb-4">
                      <Placeholder
                        tone={s.tone}
                        src={s.img}
                        alt={s.title}
                        className="h-[200px] w-full"
                      />
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
