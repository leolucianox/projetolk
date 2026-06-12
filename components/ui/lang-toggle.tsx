"use client";

import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const OPTIONS = ["pt", "en"] as const;

/** Segmented PT | EN toggle. The active language is highlighted. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/25 p-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
        className,
      )}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt}
          onClick={() => setLang(opt)}
          aria-pressed={lang === opt}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors duration-300",
            lang === opt ? "bg-black text-base" : "text-black/45 hover:text-black/80",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
