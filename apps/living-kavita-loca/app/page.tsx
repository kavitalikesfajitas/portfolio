"use client";

import { NavForMain } from "./main/NavForMain";
import { Hero } from "./main/Hero";
import { useIsMobile } from "@kavita-likes-fajitas/shadcn-ui-lib/hooks/useBreakpoint";
import { SoftFadeSkeleton } from "@kavita-likes-fajitas/ui-library/Skeletons/SoftFadeSkeleton";
import clsx from "clsx";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return <SoftFadeSkeleton />;
  }
  return (
    <>
      <main className="bg-gray-950 text-white relative flex flex-col mt-20 md:mt-32 lg:mt-40 min-h-[200vh]">
        <Hero />
        <NavForMain isMobile={isMobile} />

        <div className={clsx("bg-gray-900", "flex grow")}>
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
