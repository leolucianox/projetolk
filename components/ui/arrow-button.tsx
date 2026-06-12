import { CornerDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The recurring "↳ LABEL" marker used across the site (Talents / Explore / Join).
 * `variant="corner"` → small down-left corner arrow (lists, cards).
 * `variant="up-right"` → up-right arrow (nav CTAs).
 */
export function ArrowButton({
  label,
  variant = "corner",
  className,
  iconClassName,
}: {
  label: string;
  variant?: "corner" | "up-right";
  className?: string;
  iconClassName?: string;
}) {
  const Icon = variant === "up-right" ? ArrowUpRight : CornerDownLeft;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
        className,
      )}
    >
      <Icon
        className={cn("size-3.5 shrink-0", iconClassName)}
        strokeWidth={1.75}
      />
      {label}
    </span>
  );
}
