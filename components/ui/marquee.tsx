"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Looping text ribbon. Same seamless technique as AutoSlider. Used for the
 * "WHERE CREATIVITY MEETS OPPORTUNITY" ribbons — the contact-banner ribbon runs
 * a touch slower than the image slider above it.
 */
export function Marquee({
  text,
  duration = 60,
  className,
  separator = "•",
  repeat = 6,
}: {
  text: string;
  duration?: number;
  className?: string;
  separator?: string;
  repeat?: number;
}) {
  const group = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: repeat }).map((_, i) => (
        <span key={i} className="whitespace-nowrap pr-[0.35em]">
          {text}
          {separator && <span className="px-[0.35em] opacity-40">{separator}</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {group}
        {group}
      </motion.div>
    </div>
  );
}
