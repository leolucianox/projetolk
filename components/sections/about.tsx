"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowButton } from "@/components/ui/arrow-button";
import { Placeholder } from "@/components/ui/placeholder";
import { useContent } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function About({
  hideCta = false,
  full = false,
  pageTitle = false,
}: { hideCta?: boolean; full?: boolean; pageTitle?: boolean } = {}) {
  const [active, setActive] = useState(0);
  const { studio } = useContent();
  const gallery = [
    { img: studio.images.portrait, tone: studio.images.portraitTone },
    ...studio.images.altPortraits,
  ];
  const paragraphs = full ? studio.paragraphs : studio.summary;

  return (
    <section
      id="studio"
      className={cn(
        // Title sits at the top of the section; Lenis snaps the section top just
        // under the navbar so the heading leads and the content fills below.
        "snap-section-center flex min-h-screen flex-col justify-start py-20 md:py-24",
      )}
    >
      <div className="mx-auto w-full max-w-[1680px] px-5 md:px-10">
        {/* Section heading — part of the framed, centred block on both pages. */}
        {pageTitle ? (
          // /sobre: the page-level "Sobre" title, with the title→content spacing
          // matched to the /trabalhos page so it reads as a page header.
          <h2 className="title-large mb-8 text-[clamp(2rem,5vw,3.5rem)] md:mb-10">
            {studio.pageTitle}
          </h2>
        ) : (
          <h2 className="title-large mb-6 text-[clamp(2.25rem,5vw,4rem)] md:mb-8">
            {studio.title}
          </h2>
        )}

        {/* Body */}
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
          {/* Left — main portrait */}
          <div className="relative h-[54vh] overflow-hidden md:h-[66vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Placeholder
                  tone={gallery[active].tone}
                  src={gallery[active].img}
                  alt="Larissa Wand"
                  className="h-full w-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — bio (top-aligned with the image) + thumbnails */}
          <div className="flex flex-col md:pl-8">
            <div className="space-y-5 text-[13px] font-medium uppercase leading-[1.7] tracking-[0.02em] text-black/75">
              {paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {!hideCta && (
              <a href="/sobre" className="group mt-8 inline-block w-fit">
                <ArrowButton label={studio.cta} />
              </a>
            )}

            <div className="mt-auto grid grid-cols-4 gap-3 pt-10">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  className={cn(
                    "relative overflow-hidden transition-all duration-300",
                    active === i ? "opacity-100 ring-2 ring-black" : "opacity-55 hover:opacity-85",
                  )}
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Placeholder tone={g.tone} src={g.img} alt="" className="h-full w-full" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
