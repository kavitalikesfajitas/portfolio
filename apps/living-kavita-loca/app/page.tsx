import { ScrapbookImg } from "@kavita-likes-fajitas/ui-library/ScrapbookImg";
import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
        {/* subtle background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.18),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.22),_transparent_55%)]" />

        {/* noise overlay (if you add a texture) */}
        <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light noise" />

        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          {/* LEFT: your torn paper logo */}
          <div className="relative md:flex-1">
            <img
              src="/images/living-kavita-loca.png"
              alt="Living Kavita Loca wordmark"
              className="max-w-xs md:max-w-sm drop-shadow-[0_18px_40px_rgba(0,0,0,0.7)]"
            />

            {/* optional tiny label in the corner */}
            <span className="absolute -bottom-6 left-1 text-[0.6rem] uppercase tracking-[0.25em] text-neutral-400">
              portfolio • css • experiments
            </span>
          </div>

          {/* RIGHT: lips + text */}
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-1 md:items-start md:text-left">
            {/* glowing lips */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-rose-500/40 blur-3xl" />
              <img
                src="/images/lips-glossy.png"
                alt="Glossy open mouth"
                className="relative z-10 h-40 w-40 animate-float-slow drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
                Kavita C
              </p>
              <h1 className="font-serif text-3xl md:text-4xl">
                Software Engineer, CSS trouble-maker.
              </h1>
              <p className="max-w-md text-sm text-neutral-300 md:text-base">
                I build performant web platforms and obsess over the details:
                torn-paper edges, glossy gradients, and layouts that hit like
                album covers.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(248,113,113,0.7)] transition-transform duration-200 hover:translate-y-0.5"
              >
                <span className="relative z-10">See work</span>
                <span className="pointer-events-none absolute inset-0 translate-y-[-60%] bg-white/30 opacity-40 blur-md transition group-hover:translate-y-[-120%]" />
              </a>

              <a
                href="#style-lab"
                className="inline-flex items-center justify-center rounded-full border border-neutral-500 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-100 transition hover:border-pink-400 hover:text-pink-300"
              >
                CSS / Style Lab
              </a>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] uppercase tracking-[0.3em] text-neutral-500">
          Scroll
        </div>
      </section>
    </main>
  );
}
