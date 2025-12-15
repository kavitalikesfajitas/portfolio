export const projects = [
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
    imageSrc: "/images/opensea-swoosh-id.png",

    badge: "/logos/nike.svg",
    tech: "TypeScript · Node.js · GraphQL · Redis · AWS",
  },
  {
    title: "OpenSea Swoosh ID",
    role: "Lead Engineer / Architect",
    summary:
      "Creating a way to dynamically render the Nike Swoosh Membership card on OpenSea using an SVG endpoint",
    bullets: [
      "Redis caching, schema stitching, and resilient failover.",
      "Reduced P95 latency by 40–60% across key experiences.",
      "Structured logging + metrics for hit rate and error budgets.",
    ],
    imageSrc: "/images/opensea-swoosh-id.png",

    badge: "/logos/nike.svg",
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
    imageSrc: "/images/our_force_1_header.jpg",
    tech: "Next.js · React · GraphQL · Tailwind · Vercel/AWS",
    badge: "/logos/nike.svg",
  },
  {
    imageSrc: "/images/our_force_1_header.jpg",
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
    badge: "/logos/nike.svg",
  },
  {
    title: "Monorepo & DX Modernization",
    role: "Lead Engineer",
    imageSrc: "/images/our_force_1_header.jpg",
    summary:
      "Yarn/Turborepo monorepo with shared configs, UI packages, and build tooling for multi-service teams.",
    bullets: [
      "Standardized TS builds, linting, and formatting.",
      "Turbo + remote caching to speed up CI and local dev.",
      "Starter templates + docs to reduce onboarding friction.",
    ],
    tech: "TypeScript · Yarn 4 · Turborepo · GitHub Actions",
    badge: "/logos/nike.svg",
  },
];
