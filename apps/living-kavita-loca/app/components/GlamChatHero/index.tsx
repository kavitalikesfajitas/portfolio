import React from "react";
import clsx from "clsx";

type GlamChatHeroProps = React.ComponentProps<"div">;

export function GlamChatHero({ className, ...rest }: GlamChatHeroProps) {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-25 mix-blend-soft-light noise" />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background gradient glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.15),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.24),_transparent_55%)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-12 px-6 py-16 md:flex-row md:items-center md:gap-16">
          {/* Left: torn paper + tagline */}
          <div className="space-y-8 md:flex-1">
            {/* Torn paper wordmark */}
            <div className="inline-block paper-mask bg-white px-10 py-8 text-black shadow-[0_0_35px_rgba(0,0,0,0.6)]">
              <p className="font-serif text-[2.7rem] leading-[0.95] md:text-[3.3rem]">
                living
                <br />
                kavita
                <br />
                loca
              </p>
            </div>

            {/* Hero text */}
            <div className="max-w-md space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
                Kavita C
              </p>
              <h1 className="font-serif text-3xl md:text-4xl">
                Software Engineer &amp; Web Architect with a taste for
                high-gloss, high-performance systems.
              </h1>
              <p className="text-sm text-neutral-300 md:text-base">
                I build opinionated web platforms, GraphQL layers, and
                design-driven interfaces. Performance, DX, and a little drama.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(244,63,94,0.7)] transition hover:translate-y-0.5 hover:shadow-[0_0_35px_rgba(244,63,94,0.9)]"
              >
                See work
              </a>
              <a
                href="#style-lab"
                className="inline-flex items-center justify-center rounded-full border border-neutral-500/70 px-8 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-100 transition hover:border-neutral-100 hover:bg-neutral-900/60"
              >
                CSS / Style Lab
              </a>
            </div>
          </div>

          {/* Right: glossy lips + aura */}
          <div className="relative md:flex-1 md:flex md:justify-center">
            {/* Glow halo */}
            <div className="absolute -right-4 top-10 h-72 w-72 rounded-full bg-rose-500/40 blur-3xl" />
            <div className="absolute right-0 top-40 h-40 w-40 rounded-full bg-fuchsia-500/40 blur-3xl" />

            {/* Lips image */}
            <div className="relative">
              <img
                src="/images/lips-glossy.png"
                alt="Glossy open mouth illustration"
                className="relative z-10 h-64 w-64 animate-float-slow object-contain drop-shadow-[0_0_35px_rgba(0,0,0,0.8)]"
              />
              {/* subtle ring */}
              <div className="absolute inset-[-20px] rounded-full border border-rose-300/20" />
            </div>
          </div>
        </div>

        {/* bottom hint */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-400 md:flex">
          <span className="h-px w-8 bg-neutral-500/60" />
          Scroll to see what the glam is hiding
          <span className="h-px w-8 bg-neutral-500/60" />
        </div>
      </section>

      {/* WORK SECTION */}
      <section
        id="work"
        className="relative border-t border-neutral-800 bg-gradient-to-b from-black via-neutral-950 to-black py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
                Selected Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Platforms with a pulse.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-neutral-300">
              GraphQL content layers, templated PDP platforms, and internal
              tools that balance performance, observability, and aesthetics.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Card 1 */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl opacity-0 transition group-hover:opacity-100" />
              <h3 className="mb-2 font-serif text-2xl">
                Contentful GraphQL Proxy
              </h3>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Lead Engineer / Architect
              </p>
              <p className="mb-4 text-sm text-neutral-200">
                A unified GraphQL layer in front of Contentful that caches,
                normalizes, and instruments content delivery for high-traffic
                PDP experiences.
              </p>
              <ul className="mb-5 space-y-1 text-xs text-neutral-300">
                <li>• Redis caching, schema stitching, failover strategies.</li>
                <li>
                  • P95 latency reductions of 40–60% across critical pages.
                </li>
                <li>
                  • Structured logging and metrics for hit rate + error budgets.
                </li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                Typescript · Node · GraphQL · Redis · AWS
              </p>
            </article>

            {/* Card 2 */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]">
              <div className="pointer-events-none absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl opacity-0 transition group-hover:opacity-100" />
              <h3 className="mb-2 font-serif text-2xl">
                Templated PDP Platform
              </h3>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Lead Frontend Engineer
              </p>
              <p className="mb-4 text-sm text-neutral-200">
                A Next.js platform where content teams compose PDP layouts with
                CMS-driven templates—without shipping new code.
              </p>
              <ul className="mb-5 space-y-1 text-xs text-neutral-300">
                <li>
                  • Modular, slot-based layout system powered by CMS config.
                </li>
                <li>• SSG + ISR tuned for both performance and freshness.</li>
                <li>
                  • Guardrails + patterns co-designed with product & design.
                </li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                Next.js · React · GraphQL · Tailwind · Vercel/AWS
              </p>
            </article>

            {/* Card 3 */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]">
              <h3 className="mb-2 font-serif text-2xl">
                Authentication Gateway for Internal Apps
              </h3>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Full-Stack Engineer
              </p>
              <p className="mb-4 text-sm text-neutral-200">
                Centralized Okta-based auth + session management patterned for
                SPAs and Node backends, wrapped as a starter kit for teams.
              </p>
              <ul className="mb-5 space-y-1 text-xs text-neutral-300">
                <li>
                  • Secure cookie flows + CSRF protection on shared domains.
                </li>
                <li>
                  • Common auth middleware and utilities for new projects.
                </li>
                <li>• Documentation + example apps for fast adoption.</li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                Okta · OAuth/OIDC · Node · Next.js
              </p>
            </article>

            {/* Card 4 */}
            <article className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]">
              <h3 className="mb-2 font-serif text-2xl">
                Monorepo &amp; DX Modernization
              </h3>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                Lead Engineer
              </p>
              <p className="mb-4 text-sm text-neutral-200">
                Yarn/Turborepo monorepo with shared configs, UI, and build
                tooling to make multi-service work less painful and more fun.
              </p>
              <ul className="mb-5 space-y-1 text-xs text-neutral-300">
                <li>
                  • Standardized TS builds, linting, formatting, release flow.
                </li>
                <li>
                  • Turbo + remote caching for faster CI and local iteration.
                </li>
                <li>• Onboarding docs + starter templates for new services.</li>
              </ul>
              <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                Typescript · Yarn 4 · Turborepo · GitHub Actions
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* STYLE LAB – where you flex CSS skills */}
      <section
        id="style-lab"
        className="relative border-t border-neutral-800 bg-black py-20"
      >
        <div className="mx-auto max-w-5xl px-6">
          <header className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
                CSS / Style Lab
              </p>
              <h2 className="font-serif text-3xl md:text-4xl">
                Experiments in polish.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-neutral-300">
              A small playground of micro-interactions, textures, and layouts
              that showcase how I approach front-end craft.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            {/* Torn chip / badge stack */}
            <div className="space-y-6">
              <div className="inline-block paper-mask bg-white px-6 py-4 text-black shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                <p className="font-serif text-xl leading-tight">
                  handcrafted <br /> css details
                </p>
              </div>

              <p className="text-sm text-neutral-300">
                Custom masks for torn edges, layered gradients for subtle glow,
                and motion tuned to feel intentional rather than noisy.
              </p>

              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.16em] text-neutral-200">
                <span className="rounded-full border border-neutral-700 px-4 py-2">
                  mask-image
                </span>
                <span className="rounded-full border border-neutral-700 px-4 py-2">
                  custom keyframes
                </span>
                <span className="rounded-full border border-neutral-700 px-4 py-2">
                  grain overlays
                </span>
                <span className="rounded-full border border-neutral-700 px-4 py-2">
                  editorial grids
                </span>
              </div>
            </div>

            {/* Button + hover demo */}
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Interaction samples
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Glossy button */}
                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_25px_rgba(248,113,113,0.7)] transition-transform duration-200 hover:translate-y-0.5">
                  <span className="relative z-10">Primary CTA</span>
                  <span className="pointer-events-none absolute inset-0 translate-y-[-60%] bg-white/30 opacity-40 blur-md transition group-hover:translate-y-[-120%]" />
                </button>

                {/* Ghost pill */}
                <button className="inline-flex items-center justify-center rounded-full border border-neutral-500 px-8 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-100 transition hover:border-pink-400 hover:text-pink-300">
                  Ghost Link
                </button>
              </div>

              {/* Neon underline link */}
              <a
                href="#"
                className="relative inline-flex text-sm text-neutral-200"
              >
                <span className="relative z-10">
                  Hover me for a neon underline.
                </span>
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-pink-500 via-rose-400 to-fuchsia-500 transition-transform duration-300 hover:scale-x-100" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="border-t border-neutral-800 bg-neutral-950 py-14"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-400/80">
            Contact
          </p>
          <h2 className="font-serif text-2xl md:text-3xl">
            Want some glam in your stack?
          </h2>
          <p className="max-w-md text-sm text-neutral-300">
            Open to roles, collaborations, and architecture chats. Especially if
            it involves Next.js, GraphQL, or turning a messy system into
            something elegant.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm">
            <a
              href="mailto:you@yourdomain.com"
              className="underline decoration-pink-500/70 underline-offset-4 hover:decoration-pink-400"
            >
              you@yourdomain.com
            </a>
            <span className="text-neutral-600">/</span>
            <a
              href="https://www.linkedin.com/in/your-handle"
              className="underline decoration-neutral-500/70 underline-offset-4 hover:decoration-pink-400"
            >
              LinkedIn
            </a>
            <span className="text-neutral-600">/</span>
            <a
              href="https://github.com/your-username"
              className="underline decoration-neutral-500/70 underline-offset-4 hover:decoration-pink-400"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900 bg-black py-4 text-center text-[0.65rem] uppercase tracking-[0.2em] text-neutral-600">
        © {new Date().getFullYear()} Kavita C – living kavita loca
      </footer>
    </main>
  );
}
