"use client";

import { motion } from "framer-motion";
import { AutoSlider } from "@/components/ui/auto-slider";
import { SlideCard } from "@/components/ui/slide-card";
import { Marquee } from "@/components/ui/marquee";
import { useContent } from "@/lib/i18n";

export function Booking() {
  const { booking, bookingSlides } = useContent();

  return (
    <section
      id="booking"
      className="snap-section flex min-h-screen flex-col justify-center overflow-hidden pb-12"
    >
      {/* Rust headline block */}
      <div className="bg-[var(--color-rust)] px-5 pb-40 pt-24 text-center text-white md:pb-48 md:pt-28">
        <motion.h5
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-6 text-white/80"
        >
          {booking.eyebrow}
        </motion.h5>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="title-large mx-auto text-[clamp(2.5rem,6.5vw,5rem)] leading-[1.05]"
        >
          {booking.title[0]} <br /> {booking.title[1]}
        </motion.h2>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-9 inline-block rounded-full bg-black px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 hover:scale-[1.04]"
        >
          {booking.cta}
        </motion.a>
      </div>

      {/* Slider — straddles the rust block, same speed as the hero */}
      <div className="-mt-28 md:-mt-32">
        <AutoSlider duration={50} gap={10}>
          {bookingSlides.map((s, i) => (
            <SlideCard key={`${s.name}-${i}`} name={s.name} tone={s.tone} img={s.img} />
          ))}
        </AutoSlider>
      </div>

      {/* Ribbon — a touch slower than the slider */}
      <Marquee
        text={booking.marquee}
        duration={75}
        separator=""
        className="mt-10 text-[clamp(1.75rem,6vw,4.5rem)] font-medium uppercase leading-none tracking-[-0.02em]"
      />
    </section>
  );
}
