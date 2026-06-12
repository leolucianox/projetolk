"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n";

/** Compact page title at the very top of the secondary pages (/work, /studio). */
export function PageHero({ page }: { page: "work" | "studio" }) {
  const content = useContent();
  const title = page === "work" ? content.work.pageTitle : content.studio.pageTitle;

  return (
    <section className="snap-section mx-auto w-full max-w-[1680px] px-5 pb-2 pt-28 md:px-10 md:pt-32">
      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="title-large text-left text-[clamp(2rem,5vw,3.5rem)]"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
