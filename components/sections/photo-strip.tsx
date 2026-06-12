"use client";

import { motion } from "framer-motion";
import { Placeholder } from "@/components/ui/placeholder";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { useContent } from "@/lib/i18n";

/**
 * Title-less dark photo grid — the same cards as the homepage "Lens" section,
 * reused at the foot of the /work page.
 */
export function PhotoStrip() {
  const lb = useLightbox();
  const { lens } = useContent();
  const lightboxItems = lens.photos.map((p) => ({
    img: p.img,
    title: p.title,
    caption: `${p.category} · ${p.caption}`,
  }));

  return (
    <section className="bg-[#111110] py-16 text-white md:py-20">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {lens.photos.map((pho, i) => (
            <motion.button
              key={pho.title}
              onClick={() => lb.openAt(i)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.05 }}
              className="group relative block overflow-hidden text-left"
              style={{ aspectRatio: "4 / 5" }}
            >
              <Placeholder
                tone={pho.tone}
                src={pho.img}
                alt={pho.title}
                className="h-full w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 translate-y-1 p-4 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h5 className="text-xs font-semibold uppercase tracking-[0.06em]">{pho.title}</h5>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-white/55">
                  {pho.category} · {pho.caption}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox items={lightboxItems} index={lb.index} onClose={lb.close} onIndex={lb.setIndex} />
    </section>
  );
}
