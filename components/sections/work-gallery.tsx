"use client";

import { motion } from "framer-motion";
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
          className="h-full w-full transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
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

export function WorkGallery() {
  const lb = useLightbox();
  const { work } = useContent();
  const items = work.all;
  const lightboxItems = items.map((w) => ({ img: w.img, title: w.title, caption: w.caption }));

  return (
    <section className="pb-16 pt-6 md:pb-20 md:pt-8">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <WorkCard work={item} onOpen={() => lb.openAt(i)} />
            </motion.div>
          ))}
        </div>
      </div>

      <Lightbox items={lightboxItems} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </section>
  );
}
