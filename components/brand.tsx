import { cn } from "@/lib/cn";
import { brand } from "@/lib/data";

/**
 * Text wordmark for the Larissa Wand brand. A tight, letter-spaced Manrope set
 * with a small accent dot — distinctive without needing a logo file.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.15em] text-[15px] font-extrabold uppercase leading-none tracking-[0.28em] md:text-[16px]",
        className,
      )}
    >
      {brand.name}
      <span className="text-[var(--color-rust)]">.</span>
    </span>
  );
}
