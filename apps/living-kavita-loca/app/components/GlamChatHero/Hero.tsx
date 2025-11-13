export default function Hero() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 bg-black text-white">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.24),_transparent_60%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* === TOP BLOCK: PAPER + LIPS === */}
          <div className="relative mb-10">
            {/* background square / subtle vignette */}
            <div className="rounded-[32px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.2),_#000000_65%)] px-10 py-10">
              <img
                src="/images/living-kavita-loca.png"
                alt="living kavita loca"
                className="w-[260px] md:w-[320px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
              />
            </div>

            {/* lips, aligned to middle right of the paper */}
            <div className="absolute right-[-110px] top-1/2 -translate-y-1/2">
              {/* glow halo */}
              <div className="absolute inset-0 rounded-full bg-rose-500/50 blur-3xl" />

              {/* BIG lips image */}
              <img
                src="/images/lips-glossy.png"
                alt="glossy lips"
                className="relative z-10 w-[230px] md:w-[260px] drop-shadow-[0_0_45px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* === NAME + ROLE === */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl">Kavita C</h1>
            <p className="text-sm md:text-base text-rose-200">
              Software Engineer / Web Architect
            </p>
          </div>

          {/* === BUTTONS === */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
            {/* primary */}
            <a
              href="#work"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-10 py-3 font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(248,113,113,0.9)] transition-transform duration-150 hover:translate-y-0.5"
            >
              <span className="relative z-10">See Work</span>
              <span className="pointer-events-none absolute inset-0 translate-y-[-60%] bg-white/30 opacity-40 blur-md transition group-hover:translate-y-[-120%]" />
            </a>

            {/* secondary */}
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-3 font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-transform duration-150 hover:translate-y-0.5"
            >
              About Me
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
