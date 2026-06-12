"use client";

import { Placeholder } from "@/components/ui/placeholder";
import { cn } from "@/lib/cn";

/**
 * Portrait slide used by the hero and contact sliders. Non-interactive: at rest
 * it is a clean image; on hover the photo eases out (slight zoom-out) and the
 * title fades in at the top-left. No link, no CTA.
 */
export function SlideCard({
  name,
  tone,
  img,
  className,
}: {
  name: string;
  tone: string;
  img?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative block h-[260px] w-[184px] shrink-0 self-start overflow-hidden sm:h-[300px] sm:w-[212px] lg:h-[339px] lg:w-[240px]",
        className,
      )}
    >
      <Placeholder
        tone={tone}
        src={img}
        alt={name}
        className="h-full w-full scale-[1.06] transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100"
      />
      {/* darkening veil so the title stays legible on hover */}
      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />

      <h4 className="absolute left-4 top-4 translate-y-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {name}
      </h4>
    </div>
  );
}
