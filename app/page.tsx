import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TattooStyles } from "@/components/sections/tattoo-styles";
import { SelectedWork } from "@/components/sections/selected-work";
import { Lens } from "@/components/sections/lens";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Booking } from "@/components/sections/booking";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TattooStyles />
        <SelectedWork />
        <Lens />
        <About />
        <Process />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
