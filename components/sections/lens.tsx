"use client";

import { motion } from "framer-motion";
import { Placeholder } from "@/components/ui/placeholder";
import { Marquee } from "@/components/ui/marquee";
import { Lightbox, useLightbox } from "@/components/ui/lightbox";
import { useContent } from "@/lib/i18n";

export function Lens() {
  const lb = useLightbox();
  const { lens } = useContent();
  const lightboxItems = lens.photos.map((p) => ({
    img: p.img,
    title: p.title,
    caption: `${p.category} · ${p.caption}`,
  }));

  return (
    <section
      id="lens"
      className="snap-section relative flex min-h-screen flex-col justify-center bg-[#111110] py-20 text-white md:py-24"
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h4 className="eyebrow mb-5 text-white/50">{lens.eyebrow}</h4>
            <h2 className="title-large text-[clamp(2.5rem,6.5vw,5rem)]">
              {lens.title[0]} <br className="hidden md:block" /> {lens.title[1]}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {lens.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Ribbon */}
      <Marquee
        text={lens.marquee}
        duration={80}
        separator=""
        className="mb-12 text-[clamp(1.75rem,5vw,3.5rem)] font-medium uppercase leading-none tracking-[-0.01em] text-white/12"
      />

      {/* Gallery */}
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
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
