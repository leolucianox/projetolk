"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";

/**
 * Gentle proximity snap: once the user settles near a section it is nudged so
 * its top (the heading) sits just under the navbar, with the section filling the
 * screen below. `proximity` + a distance threshold + debounce keep it light — it
 * never traps free scrolling, and tall sections (photo grids) only catch at the
 * top, then scroll freely through the rest.
 */
function ScrollSnap() {
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "proximity", // only acts after you stop — never fights an active scroll
      distanceThreshold: "40%", // catches the nearest section top once you settle near it
      debounce: 250, // short pause after scrolling stops, then it eases into place
      duration: 0.8,
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
    });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".snap-section, .snap-section-center",
      ),
    );
    // Align to the section top so the heading lands near the top of the screen
    // (each section carries enough top padding to clear the fixed navbar).
    snap.addElements(sections, { align: "start" });

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
