"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Touch-friendly replacement for hover. When enabled, tracks which registered
 * item is closest to the vertical centre of the viewport and returns its index.
 * Lets a list "light up" the centred row as the user scrolls on mobile.
 */
export function useActiveOnScroll(enabled: boolean) {
  const items = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const setItemRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      items.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    if (!enabled) {
      setActiveIndex(null);
      return;
    }
    let frame = 0;
    const compute = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let best: number | null = null;
      let bestDist = Infinity;
      items.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActiveIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  return { setItemRef, activeIndex };
}
