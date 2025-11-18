"use client";
import { ScrapbookFrame } from "@kavita-likes-fajitas/ui-library/SVGFilters/Scrapbook";
import { PixelationSVG } from "@kavita-likes-fajitas/ui-library/SVGFilters/Pixelation";
import {
  HeroLips,
  Lips,
} from "@kavita-likes-fajitas/ui-library/Navigation/Lips";

export default function Playground() {
  return (
    <>
      <Lips src="/images/lips-glossy.png" />
      <main className="min-h-screen bg-[#050309] text-slate-50 pb-24">
        <section className="relative mx-auto max-w-3xl bg-gray-900 text-slate-50 p-8">
          <h2 className="text-2xl font-semibold mb-4">Swoosh 404</h2>
          <p className="text-sm leading-relaxed">
            To support the release of the product, I helped design…
          </p>
        </section>

        <div>What the actual fuck</div>
      </main>
    </>
  );
}
