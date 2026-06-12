"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Seamless, continuously-scrolling marquee of cards. The slide set is rendered
 * in COPIES identical groups and the track is translated by exactly one group
 * width (-100% / COPIES) on a linear loop → no visible seam, no JS measuring.
 *
 * With 4 copies the rendered track is 4× one group wide while it only travels a
 * single group per cycle, so the viewport stays fully covered (no blank gap at
 * the loop boundary) on screens up to ~3× a single group width — i.e. ultrawide
 * and 4K included. Hero and the contact banner share this, with the same `duration`.
 */
const COPIES = 4;

export function AutoSlider({
  children,
  duration = 45,
  gap = 16,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-max items-start"
        animate={{ x: ["0%", `-${100 / COPIES}%`] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {Array.from({ length: COPIES }).map((_, i) => (
          <div key={i} className="flex shrink-0" style={{ gap, paddingRight: gap }}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
