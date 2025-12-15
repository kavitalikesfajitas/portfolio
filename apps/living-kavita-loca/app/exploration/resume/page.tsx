// app/page.tsx
// Assumes Tailwind is already set up in your project.

const projects = [
  {
    title: "Contentful GraphQL Proxy",
    role: "Lead Engineer / Architect",
    summary:
      "A high-performance GraphQL layer in front of Contentful that caches, normalizes, and instruments content delivery for PDPs.",
    bullets: [
      "Redis caching, schema stitching, and resilient failover.",
      "Reduced P95 latency by 40–60% across key experiences.",
      "Structured logging + metrics for hit rate and error budgets.",
    ],
    tech: "TypeScript · Node.js · GraphQL · Redis · AWS",
  },
  {
    title: "Templated PDP Platform",
    role: "Lead Frontend Engineer",
    summary:
      "A Next.js platform where content teams compose PDP layouts using CMS-driven templates—without shipping new code.",
    bullets: [
      "Modular slot-based layout system powered by CMS config.",
      "SSG + ISR tuned for both performance and freshness.",
      "Guardrails codified with design + product partners.",
    ],
    tech: "Next.js · React · GraphQL · Tailwind · Vercel/AWS",
  },
  {
    title: "Authentication Gateway for Internal Apps",
    role: "Full-Stack Engineer",
    summary:
      "Centralized Okta-based auth + session management patterned for SPAs and Node backends.",
    bullets: [
      "Secure cookie flows + CSRF protection for shared domains.",
      "Common middleware + utilities extracted as a starter kit.",
      "Docs + example apps to standardize implementation.",
    ],
    tech: "Okta · OAuth/OIDC · Node · Next.js",
  },
  {
    title: "Monorepo & DX Modernization",
    role: "Lead Engineer",
    summary:
      "Yarn/Turborepo monorepo with shared configs, UI packages, and build tooling for multi-service teams.",
    bullets: [
      "Standardized TS builds, linting, and formatting.",
      "Turbo + remote caching to speed up CI and local dev.",
      "Starter templates + docs to reduce onboarding friction.",
    ],
    tech: "TypeScript · Yarn 4 · Turborepo · GitHub Actions",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Noise overlay (optional, can remove if you don't have∂noise.png) */}
      <div className="pointer-events-none fixed inset-0 opacity-30 mix-blend-soft-light noise" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
        <div className="flex w-full max-w-6xl items-center justify-between px-8 py-5 text-[0.75rem] uppercase tracking-[0.18em] text-neutral-300">
          {/* Left brand */}
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-neutral-500" />
            <span className="text-neutral-400">living kavita loca</span>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-8">
            <li>
              <a href="#top" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#work" className="hover:text-white transition-colors">
                Work
              </a>
            </li>
            <li>
              <a href="#css-lab" className="hover:text-white transition-colors">
                CSS Lab
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20"
      >
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.16),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.24),_transparent_60%)]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* LOGO + LIPS */}
          <div className="relative mb-10">
            <div className="rounded-[32px] bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.25),_#000_65%)] px-10 py-10">
              <img
                src="/images/living-kavita-loca.png"
                alt="living kavita loca"
                className="w-[260px] md:w-[320px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.85)]"
              />
            </div>

            {/* Lips overlaid on right */}
            <div className="absolute right-[-110px] top-1/2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-full bg-rose-500/50 blur-3xl" />
              <img
                src="/images/lips-soft.png"
                alt="glossy lips"
                className="relative z-10 w-[260px] md:w-[300px] drop-shadow-[0_0_45px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          {/* NAME + ROLE */}
          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl">Kavita C</h1>
            <p className="text-sm md:text-base text-rose-200">
              Software Engineer / Web Architect
            </p>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm">
            <a
              href="#work"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-rose-400 to-rose-700 px-10 py-3 font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_35px_rgba(248,113,113,0.9)] transition-transform duration-150 hover:translate-y-0.5"
            >
              <span className="relative z-10">See Work</span>
              <span className="pointer-events-none absolute inset-0 translate-y-[-60%] bg-white/30 opacity-40 blur-md transition group-hover:translate-y-[-120%]" />
            </a>

            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-3 font-semibold uppercase tracking-[0.18em] text-black shadow-[0_0_20px_rgba(0,0,0,0.6)] transition-transform duration-150 hover:translate-y-0.5"
            >
              About Me
            </a>
          </div>

          {/* Scroll hint */}
          <div className="mt-10 text-[0.65rem] uppercase tracking-[0.3em] text-neutral-500">
            Scroll to enter the glam
          </div>
        </div>
      </section>

      {/* WORK / PROJECTS */}
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
              A small set of systems I&apos;ve architected or led: GraphQL
              content layers, Next.js platforms, and developer tooling that
              balances performance and aesthetics.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/70 p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)] transition hover:border-pink-500/60 hover:shadow-[0_25px_80px_rgba(236,72,153,0.45)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl opacity-0 transition group-hover:opacity-100" />
                <h3 className="mb-2 font-serif text-2xl">{project.title}</h3>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-400">
                  {project.role}
                </p>
                <p className="mb-4 text-sm text-neutral-200">
                  {project.summary}
                </p>
                <ul className="mb-5 space-y-1 text-xs text-neutral-300">
                  {project.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-neutral-500">
                  {project.tech}
                </p>
              </article>
            ))}
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
            Open to roles, collaborations, and architecture chats—especially if
            it involves Next.js, GraphQL, or untangling complex systems.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm">
            <a
              href="mailto:you@yourdomain.com"
              className="underline decoration-pink-500/70 underline-offset-4 hover:decoration-pink-400"
            >
              you@yourdomain.com∂
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
