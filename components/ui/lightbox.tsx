"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = { img: string; title?: string; caption?: string };

export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  return {
    index,
    openAt: (i: number) => setIndex(i),
    close: () => setIndex(null),
    setIndex,
  };
}

/**
 * Fullscreen image viewer. Tap a gallery image to open. Supports keyboard
 * (Esc / arrows), on-screen arrows, and swipe-to-navigate on touch — the
 * portfolio's mobile counterpart to desktop hover.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onClose]);

  const current = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* top bar */}
          <div className="flex items-center justify-between px-5 py-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70 md:px-8">
            <span>
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              className="flex items-center gap-2 transition-colors hover:text-white"
              aria-label="Close"
            >
              Close <X className="size-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* image */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={current.img}
                alt={current.title ?? ""}
                onClick={(e) => e.stopPropagation()}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="max-h-full max-w-full cursor-grab touch-pan-y object-contain shadow-2xl active:cursor-grabbing"
              />
            </AnimatePresence>

            {/* arrows (desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              className="absolute left-3 hidden size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:flex"
              aria-label="Previous"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              className="absolute right-3 hidden size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:flex"
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* caption */}
          {(current.title || current.caption) && (
            <div className="px-5 py-6 text-center text-white md:px-8">
              {current.title && (
                <h4 className="text-sm font-semibold uppercase tracking-[0.08em]">{current.title}</h4>
              )}
              {current.caption && (
                <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/50">{current.caption}</p>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
