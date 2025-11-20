"use client";

import { NavForMain } from "./main/NavForMain";
import { Hero } from "./main/Hero";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";
import { SoftFadeSkeleton } from "@kavita-likes-fajitas/ui-library/Skeletons/SoftFadeSkeleton";
import { useMeasure, useWindowSize } from "@react-hookz/web";
import { useRef, useMemo } from "react";

export default function Home() {
  const isMobile = useIsMobile();
  const mainRef = useRef<HTMLElement>(null);
  const [heroMeasurements, heroRef] = useMeasure<HTMLDivElement>();
  const [navMeasurements, navRef] = useMeasure<HTMLDivElement>();
  const { height: windowHeight } = useWindowSize();

  const remainingHeight = useMemo(() => {
    if (!mainRef.current || !heroMeasurements || !navMeasurements) return 0;

    const heroHeight = heroMeasurements.height || 0;
    const navHeight = navMeasurements.height || 0;

    // Get the main element's margin-top
    const mainStyles = window.getComputedStyle(mainRef.current);
    const marginTop = parseInt(mainStyles.marginTop) || 0;

    return (windowHeight || 0) - marginTop - heroHeight - navHeight;
  }, [windowHeight, heroMeasurements, navMeasurements]);

  if (isMobile === undefined) {
    return <SoftFadeSkeleton />;
  }
  return (
    <>
      <main
        ref={mainRef}
        className="bg-gray-950 text-white relative flex flex-col mt-20 md:mt-32 lg:mt-40"
      >
        <Hero ref={heroRef} />
        <NavForMain ref={navRef} isMobile={isMobile} />

        <div
          className="bg-gray-900"
          style={{
            height: remainingHeight > 0 ? `${remainingHeight}px` : "auto",
          }}
        >
          {/* Content that takes up remaining screen height */}
        </div>

        <section className="min-h-screen px-6 py-24 bg-gray-950">
          <h2 className="text-3xl font-bold mb-6">More Content</h2>
          <p className="text-lg opacity-80 mb-4">
            Now the page scrolls — My nav can animate.
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
