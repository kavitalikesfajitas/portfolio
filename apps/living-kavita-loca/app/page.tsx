"use client";
import Image from "next/image";
import clsx from "clsx";
import { CenterStickyNav } from "./components/ui/Nav/StickyNav";
import { useIsMobile } from "@kavita-likes-fajitas/ui-library/shadcn/hooks/useBreakpoint";
import { Nav } from "./components/ui/Nav";
import ScrollytellingSection, {
  HTMLOverlaySlide,
} from "./components/ScrollytellingSection";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main className="bg-gray-950 text-white relative">
        {/* HERO (full screen) */}
        <Hero />

        {/* SCROLLYTELLING SECTION */}
        <ScrollytellingSection
          backgroundColor="rgb(3 7 18)" // gray-950
          chapters={[
            { id: "intro", y: 0 },
            { id: "about", y: 0.25 },
            { id: "skills", y: 0.5 },
            { id: "work", y: 0.75 },
          ]}
          scrollPagesLength={6}
        >
          <HTMLOverlaySlide
            alignment="left"
            top={0.1}
            title="Welcome"
            body="Scroll down to explore my portfolio and discover my journey."
          />

          <HTMLOverlaySlide
            alignment="right"
            top={0.3}
            title="About Me"
            body="I'm a passionate developer focused on creating beautiful and functional experiences."
          />

          <HTMLOverlaySlide
            alignment="left"
            top={0.55}
            title="My Skills"
            body="Full-stack development • UI/UX Design • Creative Problem Solving"
          />

          <HTMLOverlaySlide
            alignment="center"
            top={0.8}
            title="Let's Work Together"
            body="Ready to bring your ideas to life."
          />
        </ScrollytellingSection>

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
