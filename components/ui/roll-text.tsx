import { cn } from "@/lib/cn";

/**
 * Vertical "roll up" text. Rolls when the nearest ancestor with the `group`
 * class is hovered — so a whole row (services item, footer link) can drive it.
 * Two stacked copies: the first lifts out the top, the second rises in from
 * below. Pure CSS transition → buttery and dependency-free.
 */
export function RollText({
  text,
  className,
  duration = "duration-500",
}: {
  text: string;
  className?: string;
  duration?: string;
}) {
  const ease = "ease-[cubic-bezier(0.76,0,0.24,1)]";
  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <span className={cn("block transition-transform group-hover:-translate-y-[110%]", duration, ease)}>
        {text}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-0 block translate-y-[110%] transition-transform group-hover:translate-y-0",
          duration,
          ease,
        )}
      >
        {text}
      </span>
    </span>
  );
}
