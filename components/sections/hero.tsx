"use client";

import { motion } from "framer-motion";
import { AutoSlider } from "@/components/ui/auto-slider";
import { SlideCard } from "@/components/ui/slide-card";
import { useContent } from "@/lib/i18n";

const ease: [number, number, number, number] = [0.76, 0, 0.24, 1];

function RevealLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { hero, heroSlides } = useContent();

  return (
    <section
      id="hero"
      className="snap-section relative flex min-h-screen flex-col overflow-hidden pt-28 md:pt-36"
    >
      {/* Top band */}
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <motion.h6
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[17rem] text-[11px] font-semibold uppercase leading-[1.6] tracking-[0.06em] text-black/70"
          >
            {hero.intro}
          </motion.h6>

          <h1 className="title-display text-left text-[clamp(3rem,3vw,9rem)]">
            <RevealLine delay={0.05}>{hero.top[0]}</RevealLine>
            <RevealLine delay={0.18}>{hero.top[1]}</RevealLine>
          </h1>
        </div>
      </div>

      {/* Slider band — grows to fill the viewport */}
      <div className="flex flex-1 items-center py-8 md:py-12">
        <AutoSlider duration={50} gap={10} className="w-full">
          {heroSlides.map((s, i) => (
            <SlideCard key={`${s.name}-${i}`} name={s.name} tone={s.tone} img={s.img} />
          ))}
        </AutoSlider>
      </div>

      {/* Bottom band — pinned to the very bottom of the screen */}
      <div className="mx-auto w-full max-w-[1680px] px-5 pb-10 md:px-10 md:pb-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <a
            href="#styles"
            className="group hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70 md:inline-flex"
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-black/40" />
              <span className="relative size-2 rounded-full bg-black" />
            </span>
            {hero.scroll}
          </a>

          <h2 className="title-display text-left text-[clamp(3rem,3vw,9rem)]">
            <RevealLine delay={0.3}>{hero.bottom[0]}</RevealLine>
            <RevealLine delay={0.42}>{hero.bottom[1]}</RevealLine>
          </h2>
        </div>
      </div>
    </section>
  );
}
