import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { PageHero } from "@/components/sections/page-hero";
import { WorkGallery } from "@/components/sections/work-gallery";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Trabalhos — Larissa Wand",
  description: "O arquivo completo dos trabalhos de tatuagem da Larissa Wand — blackwork, traço fino, pontilhismo e ilustrativo de alto contraste.",
};

export default function TrabalhosPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero page="work" />
        <WorkGallery />
        <PhotoStrip />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
