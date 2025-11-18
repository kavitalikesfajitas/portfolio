"use client";
import "./portfolio.css";
import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Nike Virtual Studios",
    role: "Senior Software Engineer – Web Platform",
    period: "2023 — Present",
    blurb:
      "Led architecture for Contentful GraphQL proxy, performance-focused PDP templates, and multi-tenant platform tooling.",
    tags: ["Next.js", "GraphQL", "Redis", "AWS", "DX"],
  },
  {
    title: "NYC LinkFacts",
    role: "Lead Frontend Engineer",
    period: "2020 — 2022",
    blurb:
      "React web app surfacing LinkNYC metrics from Slackbot-driven JSON uploads and private Google Drive assets.",
    tags: ["React", "Python", "Slackbot", "S3/CloudFront"],
  },
  {
    title: "Field Tech Mobile App",
    role: "Full-stack Engineer",
    period: "2019 — 2020",
    blurb:
      "React/Redux + Python app for field techs to restart hardware, check status, and update Zendesk tickets on the go.",
    tags: ["React Native", "Redux", "Python", "Auth0"],
  },
];

const sideProjects = [
  {
    title: "Living Kavita Loca",
    blurb:
      "A playful, experimental portfolio playground exploring lips, ragged edges, and extra-extra UI animations.",
    tags: ["CSS Art", "Framer Motion", "SVG Filters"],
  },
  {
    title: "Design System Experiments",
    blurb:
      "Icon + typography explorations, bundled as TS packages with Tailwind configs and rollup/tsdown builds.",
    tags: ["TypeScript", "Design Systems", "Tailwind"],
  },
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-[#050309] text-slate-50 pb-24">
      {/* Content wrapper – adjust top padding if you have a sticky header */}
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pt-28 md:px-8 lg:px-12">
        {/* Intro / Hero row */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          {/* Left: text */}
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-pink-200/90">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
              Portfolio
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Shipping
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-pink-300 via-rose-200 to-fuchsia-200 bg-clip-text text-transparent">
                  playful,
                </span>
                <span className="pointer-events-none absolute inset-x-0 bottom-[-0.35rem] h-2 rounded-full bg-pink-500/30 blur-sm" />
              </span>
              high-impact experiences.
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-slate-300/85 sm:text-base">
              I’m a software engineer who lives at the intersection of{" "}
              <span className="font-medium text-pink-200">
                performance, polish, and a little bit of chaos
              </span>
              . I design & build interfaces, proxies, and tooling that make
              complex systems feel simple—and a little dramatic.
            </p>

            <div className="flex flex-wrap gap-2 text-xs sm:text-[0.8rem]">
              <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-slate-200">
                Next.js & TypeScript
              </span>
              <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-slate-200">
                GraphQL & Node
              </span>
              <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-slate-200">
                Design Systems & CSS
              </span>
              <span className="rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-1 text-slate-200">
                Performance & DX
              </span>
            </div>
          </div>

          {/* Right: lips / decorative card */}
          <motion.div
            className="relative mx-auto flex w-full max-w-sm items-center justify-center"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Glow blob */}
            <div className="absolute inset-0 -z-10 blur-3xl">
              <div className="mx-auto h-full w-full rounded-[999px] bg-gradient-to-br from-pink-500/40 via-fuchsia-500/40 to-red-500/30 opacity-70" />
            </div>

            {/* Card with ragged-ish border */}
            <div className="relative w-full rounded-[28px] border border-pink-200/20 bg-gradient-to-b from-[#140812] via-[#08040a] to-[#030109] p-[1px] shadow-[0_18px_55px_rgba(0,0,0,0.75)]">
              <div className="ragged-card rounded-[26px] bg-[#050109]/90 px-7 py-8">
                <p className="text-xs uppercase tracking-[0.2em] text-pink-200/80">
                  Signature
                </p>
                <p className="mt-1 text-sm font-medium text-slate-100/95">
                  Lips & glitchy edges
                </p>

                <div className="mt-6 flex items-center justify-center">
                  {/* Replace this with your actual lips SVG / image */}
                  <div className="relative h-32 w-40">
                    <div className="absolute inset-0 translate-y-1 blur-md">
                      <div className="h-full w-full rounded-[999px] bg-gradient-to-br from-pink-400 to-rose-500 opacity-80" />
                    </div>
                    <div className="relative flex h-full w-full items-center justify-center rounded-[999px] bg-gradient-to-br from-pink-300 via-rose-400 to-red-400">
                      <span className="text-5xl leading-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]">
                        👄
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-[0.78rem] leading-relaxed text-slate-300/90">
                  Animations, ragged borders, and lipstick-loud typography are
                  kind of my love language.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Featured work */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Featured Work
            </h2>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Selected projects
            </p>
          </div>

          <div className="grid gap-5 md:gap-6">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="group relative overflow-hidden rounded-[20px] border border-slate-800/80 bg-gradient-to-br from-slate-950/90 via-slate-950/60 to-fuchsia-950/30 px-4 py-4 sm:px-6 sm:py-5"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.35 }}
              >
                {/* subtle hover border / glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[20px] border border-pink-400/0 transition duration-300 group-hover:border-pink-400/40 group-hover:shadow-[0_0_40px_rgba(236,72,153,0.35)]" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-semibold text-slate-50 sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-pink-200/85">
                      {project.role}
                    </p>
                    <p className="text-xs text-slate-400">{project.period}</p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1.5 text-[0.7rem] sm:mt-0 sm:justify-end">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-1 text-slate-200/95"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-300/90 sm:mt-4">
                  {project.blurb}
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Side projects / experiments */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Experiments & Side Quests
              </h2>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                In progress
              </p>
            </div>

            <div className="space-y-4">
              {sideProjects.map((project) => (
                <div
                  key={project.title}
                  className="group rounded-2xl border border-slate-800/80 bg-slate-950/80 p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-sm font-semibold text-slate-50 sm:text-base">
                      {project.title}
                    </h3>
                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-pink-200/80">
                      WIP
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300/90">
                    {project.blurb}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[0.7rem]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-700/70 bg-slate-900/90 px-2.5 py-1 text-slate-200/95"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column – quick facts */}
          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-950/80 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Quick facts
              </p>
              <ul className="mt-3 space-y-2.5 text-sm text-slate-200/95">
                <li>
                  <span className="text-slate-400">Current focus:</span>{" "}
                  performance, DX, and making platform tooling actually fun to
                  use.
                </li>
                <li>
                  <span className="text-slate-400">Love languages:</span>{" "}
                  GraphQL schemas, polished CSS, and great error messages.
                </li>
                <li>
                  <span className="text-slate-400">Vibes:</span> dark UI,
                  lipstick-loud accents, and slightly chaotic animations.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-pink-500/40 bg-pink-500/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-pink-100">
                Available for
              </p>
              <p className="mt-3 text-sm text-pink-50/95">
                Speaking about frontend architecture & DX, design system
                consulting, and collaborations that need both{" "}
                <span className="font-semibold">engineering brains</span> and{" "}
                <span className="font-semibold">a little bit of sparkle</span>.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
