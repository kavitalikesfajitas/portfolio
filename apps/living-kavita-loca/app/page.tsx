"use client";
import Image from "next/image";
import clsx from "clsx";
import { CenterStickyNav } from "./components/ui/Nav/StickyNav";
import { useIsMobile } from "@kavita-likes-fajitas/ui-library/shadcn/hooks/useBreakpoint";
import { Nav } from "./components/ui/Nav";
import ScrollytellingSection, {
  HTMLOverlaySlide,
} from "./components/ScrollytellingSection";
import { PortfolioScrollytellingExample } from "./components/ScrollytellingSection/portfolio-example";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="bg-gray-950 text-white relative">
        {/* HERO (full screen) */}
        <Hero />

        <PortfolioScrollytellingExample />
        {/* SCROLLABLE CONTENT BELOW */}
        <section className="min-h-screen px-6 py-24 bg-gray-950">
          <h2 className="text-3xl font-bold mb-6">More Content</h2>
          <p className="text-lg opacity-80 mb-4">
            Now the page scrolls — your nav can animate.
          </p>

          <div className="space-y-10 max-w-2xl">
            <p>Placeholder content…</p>
            <p>More placeholder…</p>
            <p>Scrolling enabled…</p>
          </div>
        </section>
      </main>
    </>
  );
}

const Hero = () => {
  return (
    <section className="flex flex-col lg:items-center  min-h-screen relative">
      <div className="relative inline-block scale-[0.6] md:scale-[0.5] lg:scale-75">
        <img
          src="/images/logo.png"
          alt="living kavita loca"
          className="flex self-center self-justify-center"
        />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2">
          <img
            src="/images/lips-glossy.png"
            alt="living kavita loca"
            className="lips relative z-10 scale-50 translate-x-3/8"
          />
        </div>
      </div>
    </section>
  );
};

export function StickyNav() {
  const isMobile = useIsMobile();
  return (
    <CenterStickyNav isMobile={isMobile}>
      <Nav isMobile={isMobile} />
    </CenterStickyNav>
  );
}
