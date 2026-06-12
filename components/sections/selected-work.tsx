"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Placeholder } from "@/components/ui/placeholder";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { useContent } from "@/lib/i18n";
import type { Work } from "@/lib/data";

function WorkCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="group block w-full text-left">
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
        <Placeholder
          tone={work.tone}
          src={work.img}
          alt={work.title}
          className="h-full w-full transition-all duration-500 group-hover:scale-105 group-hover:blur-[6px] group-hover:brightness-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[44%] scale-90 opacity-0 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
            style={{ aspectRatio: "1 / 1" }}
          >
            <Placeholder tone={work.miniTone} src={work.miniImg} alt="" className="h-full w-full" />
          </div>
        </div>
        {/* tap hint on mobile */}
        <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-white opacity-100 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0 lg:hidden">
          View
        </span>
      </div>

      <h5 className="mt-3 text-sm font-semibold uppercase tracking-[0.04em] transition-colors duration-300 group-hover:text-black/40">
        {work.title}
      </h5>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-black/45">
        {work.caption}
      </div>
    </button>
  );
}

function SeeAllCard({ label }: { label: string }) {
  return (
    <a href="/trabalhos" className="group flex flex-col">
      <span
        className="flex items-center justify-center border border-black/15"
        style={{ aspectRatio: "4 / 5" }}
      >
        <ArrowRight
          className="size-9 text-black/40 transition-all duration-500 group-hover:translate-x-2 group-hover:text-black"
          strokeWidth={1.25}
        />
      </span>
      <h5 className="mt-3 max-w-[12rem] text-sm font-semibold uppercase leading-snug tracking-[0.04em] transition-colors duration-300 group-hover:text-black/40">
        {label}
      </h5>
    </a>
  );
}

export function SelectedWork() {
  const lb = useLightbox();
  const { work } = useContent();
  const items = work.selected;
  const lightboxItems = items
    .filter((w): w is Work => w !== null)
    .map((w) => ({ img: w.img, title: w.title, caption: w.caption }));
  let workIdx = -1; // running index into real works for lightbox mapping

  return (
    <section
      id="work"
      className="snap-section flex min-h-screen flex-col justify-center py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between">
          <h2 className="title-large text-[clamp(2.5rem,6vw,4.5rem)]">{work.title}</h2>
          <p className="max-w-sm text-[11px] font-semibold uppercase leading-[1.7] tracking-[0.05em] text-black/55">
            {work.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {items.map((item, i) => {
            if (i === items.length - 1) {
              return (
                <motion.div
                  key="see-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6 }}
                >
                  <SeeAllCard label={work.seeAll} />
                </motion.div>
              );
            }
            if (item === null) {
              return <div key={`empty-${i}`} className="hidden md:block" />;
            }
            workIdx += 1;
            const idx = workIdx;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <WorkCard work={item} onOpen={() => lb.openAt(idx)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </section>
  );
}
