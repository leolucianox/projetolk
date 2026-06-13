import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { SmoothScroll } from "@/components/smooth-scroll";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

// Baby Doll — chunky handwritten display face (Denise Bentulan), used for titles.
const babydoll = localFont({
  src: "../fonts/babydoll/BabyDoll.ttf",
  variable: "--font-babydoll",
  display: "swap",
  fallback: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Larissa Wand — Tattoo Artist & Ocean Photographer",
  description:
    "Larissa Wand is a Galway-based tattoo artist with 6+ years making high-contrast, illustrative work at Victor Tattoo and Body Piercing — and an ocean & freediving photographer. Where ink meets water.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${babydoll.variable}`}>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
