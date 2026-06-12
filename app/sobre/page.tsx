import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Travels } from "@/components/sections/travels";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Sobre — Larissa Wand",
  description: "Por dentro do trabalho da Larissa Wand em Galway, na Irlanda — alto contraste, criaturas míticas e o oceano.",
};

export default function SobrePage() {
  return (
    <>
      <Navbar />
      <main>
        <About hideCta full pageTitle />
        <Travels />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
