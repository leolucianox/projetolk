"use client";

import { Wordmark } from "@/components/brand";
import { RollText } from "@/components/ui/roll-text";
import { LangToggle } from "@/components/ui/lang-toggle";
import { useContent } from "@/lib/i18n";

export function Footer() {
  const { nav, footer, brand } = useContent();

  return (
    <footer id="footer" className="border-t border-black/8 pb-8 pt-20 md:pt-28">
      <div className="mx-auto max-w-[1680px] px-5 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
          {/* Menu — same items as the navbar */}
          <ul className="flex flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-black/80">
            {nav.map((item) => (
              <li key={item.label} className="group w-fit">
                <a href={item.href} className="leading-none transition-colors duration-300 group-hover:text-black/40">
                  <RollText text={item.label} duration="duration-[450ms]" />
                </a>
              </li>
            ))}
          </ul>

          {/* Contact (center) */}
          <div className="order-last col-span-2 flex flex-col items-center gap-2 text-center text-[clamp(1.1rem,2.2vw,1.7rem)] font-medium uppercase tracking-[0.02em] md:order-none md:col-span-1">
            <a href={brand.whatsappUrl} className="group">
              <RollText text={brand.whatsapp} />
            </a>
            <a href={`mailto:${brand.email}`} className="group transition-colors duration-300 hover:text-black/40">
              <RollText text={brand.email} />
            </a>
            <span>{brand.location}</span>
          </div>

          {/* Social / policies */}
          <ul className="flex flex-col items-end gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-black/80">
            <li className="group w-fit">
              <a href={brand.instagramUrl} target="_blank" rel="noreferrer" className="leading-none transition-colors duration-300 group-hover:text-black/40">
                <RollText text="Instagram" duration="duration-[450ms]" />
              </a>
            </li>
            {footer.policies.map((item) => (
              <li key={item} className="group w-fit">
                <a href="#" className="leading-none transition-colors duration-300 group-hover:text-black/40">
                  <RollText text={item} duration="duration-[450ms]" />
                </a>
              </li>
            ))}
            <li className="mt-2">
              <LangToggle />
            </li>
          </ul>
        </div>

        {/* Bottom row */}
        <div className="mt-20 flex flex-col items-center gap-6 text-[10px] uppercase tracking-[0.1em] text-black/40 md:mt-28 md:flex-row md:justify-between">
          <p className="order-2 md:order-none">© {new Date().getFullYear()} Larissa Wand. {footer.rights}</p>
          <Wordmark className="order-1 text-[12px] tracking-[0.24em] text-black/70 md:order-none" />
          <p className="order-3 md:order-none">{brand.instagram}</p>
        </div>
      </div>
    </footer>
  );
}
