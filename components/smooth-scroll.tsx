"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";

/**
 * Gentle proximity snap: once the user settles near a full-screen section it is
 * nudged to the vertical centre. `proximity` + a distance threshold + debounce
 * keep it light — it never traps free scrolling, it just tidies the framing.
 */
function ScrollSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "proximity", // only acts after you stop — never fights an active scroll
      distanceThreshold: "42%", // centres the nearest section once you settle near it
      debounce: 250, // short pause after scrolling stops, then it eases into place
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
    });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".snap-section, .snap-section-center",
      ),
    );
    snap.addElements(sections, { align: "center" });

    return () => snap.destroy();
  }, [lenis, pathname]);

  return null;
}

/**
 * Site-wide smooth scrolling powered by Lenis. Wheel/scroll input is eased on
 * desktop; touch keeps native momentum. In-page anchor links scroll smoothly too.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        anchors: true,
      }}
    >
      {children}
      <ScrollSnap />
    </ReactLenis>
  );
}
