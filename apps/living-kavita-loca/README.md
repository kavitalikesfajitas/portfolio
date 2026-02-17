# Living Kavita Loca

A portfolio site built with [Next.js](https://nextjs.org) (App Router), part of a Turborepo monorepo. Uses static export, MDX for content, and custom UI components.

## Tech Stack

- **Next.js 16** — App Router, static export, React Compiler
- **React 19** / **TypeScript**
- **Tailwind CSS 4** — dark theme, mobile-first
- **MDX** — work item content with frontmatter
- **Motion** (Framer Motion) — scroll-based animations
- **shadcn/ui** — shared component library
- **Vitest** + **React Testing Library** — testing
- **Turbopack** — dev server

## Getting Started

```bash
yarn dev
```

Opens at [https://localhost:3001](https://localhost:3001) (HTTPS via `--experimental-https`).

### Other Scripts

| Script                    | Description                            |
| ------------------------- | -------------------------------------- |
| `yarn build`              | Static export build                    |
| `yarn lint`               | Run ESLint                             |
| `yarn typecheck`          | TypeScript type checking               |
| `yarn test`               | Run tests (watch mode)                 |
| `yarn test-ci`            | Run tests with coverage                |
| `yarn generate:component` | Scaffold a new component via Turborepo |

## Project Structure

```
app/
├── components/
│   └── Nav/                  # Navigation (dropdown, logo, variants)
├── main/
│   └── components/
│       ├── Bio/              # About section
│       ├── Hero/             # Homepage hero with scroll animations
│       └── NavForMain/       # Homepage-specific sticky nav
├── work/
│   ├── [slug]/               # Dynamic work detail pages
│   └── workItems.ts          # Centralized work items config
├── utils/
│   └── assetPath.ts          # BasePath-aware asset helper
├── layout.tsx                # Root layout with Footer
├── page.tsx                  # Homepage
├── not-found.tsx             # Custom 404
└── globals.css
content/
└── work/                     # MDX files for work items
public/
├── images/                   # Image assets
├── logos/                    # Logo files
└── old-site/                 # Legacy site (static build)
```

## Pages

- **`/`** — Homepage with hero (scroll animations), bio, and sticky nav
- **`/work/[slug]`** — Work detail pages rendered from MDX in `content/work/`, with hero images/videos, tech badges, and styled content
- **`/old-site/`** — Legacy version of the site served as static files

## Adding Work Items

Work item content lives as MDX files in `content/work/`. Each file uses frontmatter for metadata (`title`, `heroImage`, `role`, `tech`, etc.) and MDX for the body.

**Routes are generated automatically at build time** — `generateStaticParams()` in `app/work/[slug]/page.tsx` reads the `content/work/` directory, picks up every `.mdx` file, and creates a static page for each one. Just drop in a new `.mdx` file and the route exists on the next build.

**Navigation requires a manual update** — the nav dropdown is driven by `WORK_ITEMS` in `app/work/workItems.ts`. After adding a new MDX file, add a corresponding entry there so it shows up in the menu.

## Monorepo Packages

This app consumes shared packages from the monorepo:

- `@kavita-likes-fajitas/shadcn-ui-lib` — shadcn/ui components
- `@kavita-likes-fajitas/ui-library` — custom components (Footer, Navigation, TechBadge, Button)
- `@kavita-likes-fajitas/fonts` — custom font loading (Midnight Gelactic, Helvetica Neue, Lobster)
- `@kavita-likes-fajitas/tailwind-config` — shared Tailwind styles
- `@kavita-likes-fajitas/typescript-config` — shared TypeScript config
- `@kavita-likes-fajitas/eslint-config` — shared ESLint config

## Environment Variables

| Variable    | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `PR_NUMBER` | Set at build time to configure `basePath` for PR deploy previews (`/pr-{number}`) |

## Old Site

The previous version of the site is preserved as a static build under `public/old-site/`. It was built separately, and the production output (`index.html`, `client.min.js`, and associated assets/images) was copied directly into the public folder so it can be served as-is at `/old-site/index.html`.

These files are excluded from ESLint in `eslint.config.mjs` since they are pre-built artifacts.

Since the old site is archived and rarely changes, the build artifacts are committed directly rather than built in CI. If it ever needed to be part of the pipeline, a step like this could be added to `ci-living-kavita-loca.yml` before the main build:

```yaml
- name: 🏛️ Build old site and copy to public directory
  run: |
    git clone https://github.com/kavitalikesfajitas/website.git /tmp/old-site
    cd /tmp/old-site/client
    npm install
    npm run build
    cp -r dist/livingkavitaloca/ ${{ github.workspace }}/apps/living-kavita-loca/public/old-site/
```
