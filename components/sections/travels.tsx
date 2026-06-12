"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Placeholder } from "@/components/ui/placeholder";
import { useContent } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { City } from "@/lib/data";

type Filter = "all" | "past" | "future";

export function Travels() {
  const { travels } = useContent();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = (f: Filter): City[] =>
    f === "all" ? travels.cities : travels.cities.filter((c) => c.type === f);

  const list = filtered(filter);
  const [activeKey, setActiveKey] = useState(travels.cities[0].city);
  const active = list.find((c) => c.city === activeKey) ?? list[0];

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: travels.filters.all },
    { id: "past", label: travels.filters.past },
    { id: "future", label: travels.filters.future },
  ];

  const selectFilter = (f: Filter) => {
    setFilter(f);
    setActiveKey(filtered(f)[0].city);
  };

  return (
    <section
      id="travels"
      className="snap-section flex min-h-screen flex-col justify-center bg-[#111110] py-20 text-white md:py-24"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h4 className="eyebrow mb-5 text-white/50">{travels.eyebrow}</h4>
            <h2 className="title-large text-[clamp(2.5rem,6.5vw,5rem)]">
              {travels.title[0]} <br className="hidden md:block" /> {travels.title[1]}
            </h2>
          </div>
          <p className="max-w-sm text-[11px] font-semibold uppercase leading-[1.7] tracking-[0.05em] text-white/55">
            {travels.intro}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => selectFilter(f.id)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                filter === f.id
                  ? "border-white bg-white text-[#111110]"
                  : "border-white/20 text-white/70 hover:border-white/50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Body — image panel + interactive city list */}
        <div className="grid gap-8 md:grid-cols-[1.05fr_1fr] md:gap-12">
          {/* Image panel — grows to match the list height, never below the base size */}
          <div className="relative min-h-[42vh] overflow-hidden md:min-h-[56vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.city}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Placeholder tone={active.tone} src={active.img} alt={active.city} className="h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <span
                    className={cn(
                      "mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                      active.type === "future"
                        ? "bg-[var(--color-rust)] text-white"
                        : "bg-white text-[#111110]",
                    )}
                  >
                    {active.type === "future" ? travels.futureTag : travels.pastTag} · {active.year}
                  </span>
                  <h3 className="title-large text-[clamp(1.75rem,4vw,2.8rem)] leading-none">
                    {active.city}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-white/60">
                    {active.country}
                  </p>
                  <p className="mt-3 max-w-md text-[12px] font-medium uppercase leading-[1.6] tracking-[0.02em] text-white/75">
                    {active.note}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* City list */}
          <ul className="flex flex-col self-center border-t border-white/15">
            {list.map((c) => {
              const isActive = c.city === active.city;
              return (
                <li key={c.city} className="border-b border-white/15">
                  <button
                    onMouseEnter={() => setActiveKey(c.city)}
                    onClick={() => setActiveKey(c.city)}
                    className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 py-3.5 text-left md:py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        className={cn(
                          "text-[clamp(1.1rem,2.4vw,1.7rem)] font-medium uppercase leading-none transition-colors duration-300",
                          isActive ? "text-white" : "text-white/45 group-hover:text-white/80",
                        )}
                      >
                        {c.city}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-white/40">
                        {c.country}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.12em]",
                        c.type === "future" ? "text-[var(--color-orange)]" : "text-white/50",
                      )}
                    >
                      {c.type === "future" ? travels.futureTag : travels.pastTag}
                      <span className="text-white/30">{c.year}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
