import React from "react";
import clsx from "clsx";

type ChatGptGenPageProps = React.ComponentProps<"div">;

export function ChatGptGenPage({ className, ...rest }: ChatGptGenPageProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        {/* Top Nav */}
        <header className="mb-16 flex items-center justify-between text-sm uppercase tracking-[0.18em]">
          <span className="font-medium">Kavita C</span>
          <nav className="space-x-6">
            <a href="#projects" className="hover:underline">
              Projects
            </a>
            <a href="#expertise" className="hover:underline">
              Expertise
            </a>
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mb-20">
          <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
            Software Engineer – Web Platforms &amp; Developer Experience
          </h1>
          <p className="mb-6 text-base leading-relaxed text-neutral-700 md:text-lg">
            I design and build scalable web systems with a focus on performance,
            reliability, and developer experience.
          </p>
          <p className="mb-8 text-sm text-neutral-600">
            Currently working on high-traffic React/Next.js applications,
            GraphQL APIs, and cloud-native infrastructure.
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <a
              href="https://github.com/your-username"
              className="border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/your-handle"
              className="border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="/resume.pdf"
              className="border border-neutral-900 px-4 py-2 hover:bg-neutral-900 hover:text-white"
            >
              Resume
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-20">
          <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Selected Work
          </h2>

          <div className="space-y-10">
            {/* Project 1 */}
            <article className="border-t border-neutral-200 pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Contentful GraphQL Proxy
                </h3>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Lead Engineer / Architect
                </span>
              </div>
              <p className="mb-3 text-sm text-neutral-700">
                Designed and implemented a GraphQL proxy layer in front of
                Contentful to decouple front-end teams from CMS schema changes
                and improve performance across product detail experiences.
              </p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>
                  Built a Node/TypeScript GraphQL service to aggregate and
                  normalize Contentful content.
                </li>
                <li>
                  Added Redis-based caching to reduce repeated CMS calls and
                  lower P95 latency.
                </li>
                <li>
                  Introduced observability with logs and metrics for cache hit
                  rate, latency, and error tracking.
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                TypeScript · GraphQL · Node.js · Redis · Docker · AWS
              </p>
            </article>

            {/* Project 2 */}
            <article className="border-t border-neutral-200 pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">Templated PDP Platform</h3>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Lead Frontend Engineer
                </span>
              </div>
              <p className="mb-3 text-sm text-neutral-700">
                Architected a Next.js platform for product detail pages using a
                template-driven approach, enabling content teams to launch new
                layouts without engineering involvement.
              </p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>
                  Implemented a modular layout system powered by CMS
                  configuration.
                </li>
                <li>
                  Optimized for performance with static generation and
                  incremental revalidation.
                </li>
                <li>
                  Partnered with design and product to define reusable UI
                  patterns and guardrails.
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                Next.js · React · TypeScript · Tailwind CSS · GraphQL
              </p>
            </article>

            {/* Project 3 */}
            <article className="border-t border-neutral-200 pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Authentication Gateway for Internal Apps
                </h3>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Full-Stack Engineer
                </span>
              </div>
              <p className="mb-3 text-sm text-neutral-700">
                Built a centralized authentication and session management flow
                to simplify secure access to internal web tools.
              </p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>
                  Integrated Okta with SPA + API flows, including token exchange
                  and secure cookie handling.
                </li>
                <li>
                  Implemented CSRF-safe session cookies for clients and backends
                  on the same domain.
                </li>
                <li>
                  Documented patterns and templates for adoption by other teams.
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                Node.js · Next.js · Okta · OAuth/OIDC · HTTP-only Cookies
              </p>
            </article>

            {/* Project 4 */}
            <article className="border-t border-neutral-200 pt-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium">
                  Modernization of Internal React Tools
                </h3>
                <span className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Lead Engineer
                </span>
              </div>
              <p className="mb-3 text-sm text-neutral-700">
                Migrated existing React tools to a modern TypeScript + monorepo
                setup to improve developer experience and maintainability.
              </p>
              <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-neutral-700">
                <li>
                  Introduced a Yarn/Turborepo monorepo with shared UI and config
                  packages.
                </li>
                <li>
                  Standardized build tooling and code quality across services.
                </li>
                <li>
                  Reduced build times and simplified onboarding for new
                  engineers.
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                TypeScript · React · Yarn · Turborepo · CI/CD
              </p>
            </article>
          </div>
        </section>

        {/* Expertise */}
        <section id="expertise" className="mb-20">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Expertise
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.16em]">
                Web Applications
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>React, Next.js, TypeScript</li>
                <li>Component-driven architecture</li>
                <li>Accessibility &amp; performance</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.16em]">
                APIs &amp; Platforms
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>GraphQL design &amp; proxies</li>
                <li>Node.js services &amp; caching</li>
                <li>Logging, metrics, tracing</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium uppercase tracking-[0.16em]">
                Developer Experience
              </h3>
              <ul className="space-y-1 text-sm text-neutral-700">
                <li>Monorepos (Yarn/Turborepo)</li>
                <li>CI/CD with GitHub Actions</li>
                <li>Shared design systems &amp; libs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-20">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">
            About
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-neutral-700">
            I’m a software engineer focused on building reliable, scalable web
            platforms that feel good to use and maintain. I care a lot about
            clean architecture, observability, and giving teams the tools they
            need to move quickly without breaking things.
          </p>
          <p className="text-sm leading-relaxed text-neutral-700">
            Recently, my work has centered around Next.js platforms, GraphQL
            content proxies, and developer tooling in multi-team environments.
            Outside of code, I love traveling, snowboarding, and fine-tuning the
            systems that run my day-to-day life.
          </p>
        </section>

        {/* Contact */}
        <section id="contact" className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Contact
          </h2>
          <p className="mb-4 text-sm text-neutral-700">
            Interested in collaborating, chatting about architecture, or need
            help on a project?
          </p>
          <div className="space-y-1 text-sm text-neutral-700">
            <p>
              Email:{" "}
              <a
                href="mailto:you@yourdomain.com"
                className="underline underline-offset-4"
              >
                you@yourdomain.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/your-handle"
                className="underline underline-offset-4"
              >
                your-handle
              </a>
            </p>
          </div>
        </section>

        <footer className="border-t border-neutral-200 pt-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Kavita C
        </footer>
      </div>
    </main>
  );
}
