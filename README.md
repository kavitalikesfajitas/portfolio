# Kavita's Portfolio

## Overview & Purpose

This repository represents a **learning-focused migration** of my personal website ([livingkavitaloca.com](https://livingkavitaloca.com)) from a [TypeScript/React single-page application](https://github.com/kavitalikesfajitas/website) to a modern Next.js-based portfolio.

### Why This Approach?

While the setup may appear complex for a personal website, it serves multiple learning objectives:

1. **Next.js Static Export Experimentation**: Explore Next.js as a **standalone static site generator** with full control over the export process, moving beyond traditional SPAs
2. **Infrastructure as Code**: Migrate manually-created AWS infrastructure to **Terraform**, enabling version-controlled infrastructure management
3. **Modern Monorepo Architecture**: Implement a production-grade monorepo with Yarn Workspaces and Turborepo for scalable development patterns
4. **CI/CD Best Practices**: Establish automated deployment pipelines with GitHub Actions, OIDC authentication, and infrastructure automation

The infrastructure was originally set up manually via AWS Console for the previous website. This repository imports that existing infrastructure into Terraform, demonstrating real-world migration patterns while maintaining zero downtime. See [`infra/README.md`](./infra/README.md) for complete infrastructure documentation.

**TLDR**: A playground for experimenting with modern web development tools and infrastructure management practices in a real production environment.

**Live site:** [livingkavitaloca.com](https://livingkavitaloca.com)  
_(Currently showcasing the [previous website](https://github.com/kavitalikesfajitas/website) while this portfolio is actively being developed)_

## Tech Stack

- **Framework:** Next.js with React
- **Styling:** Tailwind CSS
- **Build System:** Turborepo
- **Package Manager:** Yarn Workspaces (Berry/PnP)
- **Infrastructure:** Terraform, AWS S3
- **CI/CD:** GitHub Actions

## Infrastructure & Deployment

✅ **Fully operational and deployed!**

- **Infrastructure as Code:** Terraform manages all AWS resources (S3, CloudFront, Route53, ACM, IAM)
- **Production Deployment:** Automated GitHub Actions pipeline with OIDC authentication
- **PR Preview Deployments:** Automatic preview environments for every pull request (~$0.50/month)
- **Static Site Hosting:** CloudFront CDN with S3 origin and automatic cache invalidation
- **Cost Optimized:** ~$5.50/month total (production + previews)

See [`infra/README.md`](./infra/README.md) for complete infrastructure documentation including architecture diagrams, deployment workflows, and cost breakdowns.

## Monorepo Structure

### Yarn Workspaces

The project uses Yarn Workspaces to manage multiple packages from a single repository. This allows for:

- Shared dependencies across packages
- Simplified development workflow
- Consistent versioning

### Turborepo

Turborepo is used for build system orchestration:

- Incremental builds
- Intelligent caching
- Parallel execution of tasks
- **Remote caching** via Vercel (free tier) for shared cache across CI runs and branches

#### Task Dependencies

Most tasks (`lint`, `typecheck`, `test-ci`) run in parallel across all packages. The exception is `@kavita-likes-fajitas/ui-library`, which depends on `@kavita-likes-fajitas/shadcn-ui-lib#build` for `typecheck`, `test-ci`, and `dev`. This is because ui-library imports from shadcn-ui-lib's built output (`dist/`). Since shadcn components are templated and rarely change, this build is almost always a remote cache hit.

For more details, see the [`package.json`](./package.json) and [`turbo.json`](./turbo.json) configuration files.

## Development Setup

### Prerequisites

- Node.js (see `.nvmrc` for version)
- Yarn Berry

### Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Run tests
yarn test-ci

# Build all packages
yarn build
```

### Node Modules vs PnP

This repo uses Yarn Berry (PnP). However, dependencies are resolved via `node_modules/`, instead of `.pnp.cjs` .

To enable proper IntelliSense and autocompletion in your editor:

```bash
# For VSCode
yarn dlx @yarnpkg/sdks vscode

# For WebStorm
yarn dlx @yarnpkg/sdks webstorm
```

In the .yarnrc.yaml file:

```yaml
nmMode: hardlinks-local
# This ensures that node-modules are set up
# with PnP (plug and play)
nodeLinker: node-modules
```

This configuration ensures that the node modules are visible and dependencies resolve correctly.

## Additional Notes

## Turbo Generators: Standardizing Package and Component Creation

We use **Turbo Generators** (Plop) to scaffold standardized packages and components. Please refer to this method first before creating packages/components from scratch to ensure we have consistent patterns across the repo.

### Prerequisites

- Ensure dependencies are installed: `yarn install`
- Run from repo root (`portfolio`)

### Available Generators

- **package**: Creates a new package in `packages/`
  - Types:
    - `ESM Package` (implemented)
    - `React Package` (implemented)
- **living-kavita-loca app component**: Creates a new React component in `apps/living-kavita-loca`

### Usage

Interactive prompt (recommended):

```bash
yarn turbo gen
```

You will be prompted to select which custom generator to use:

- **root - package**: Creates a new package in `packages/<name>`
- **living-kavita-loca app component**: Creates a new React component in `apps/living-kavita-loca`

If you selected package, you will need to provide:

- **Package name** (required)
- **Description** (optional)
- **Package type**: `React` or `ESM` (both currently supported)

### What Gets Created

#### ESM Package

Files are scaffolded from `turbo/generators/templates/package/esm/` into `packages/<name>/`:

- `package.json` (templated)
- `tsconfig.json`
- `eslint.config.mjs`
- `tsdown.config.ts`
- `vitest.config.ts`
- `src/index.ts` - demonstrates the file structure pattern we are standardizing and supporting

#### React Package

Files are scaffolded into `packages/<name>/`:

- `package.json` (templated)
- `tsconfig.json`
- `eslint.config.mjs`
- `tsdown.config.ts`
- `vitest.config.ts`
- `.prettierrc` - for Tailwind linting support
- `tailwind.config.ts`
- `postcss.config.mjs` - for Tailwind support
- `src/HelloWorld/index.tsx` - demonstrates the file structure pattern we are standardizing and supporting
- `src/index.tsx` - demonstrates the barrel file structure pattern

### After Generating

1. Open `packages/<name>/package.json` and update metadata as needed
2. Run initial build and tests:

   ```bash
   yarn --top-level run turbo build --filter=@kavita-likes-fajitas/<name>
   yarn --top-level run turbo test-ci --filter=@kavita-likes-fajitas/<name>
   yarn --top-level run turbo lint --filter=@kavita-likes-fajitas/<name>
   ```

## File Structure

This repo uses a **barrel file pattern** for clean imports. Each folder has an `index.ts` that exports its public API.

```
packages/my-package/src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── index.tsx       # exports Button
│   └── index.tsx           # exports { Button } from './Button'
└── index.tsx               # main package export
```

This keeps imports clean (`@kavita-likes-fajitas/my-package`), enables tree shaking, and provides a stable public API for published packages.

### Benefits

- **Clean Imports**: Consumers can import from clean paths like `@kavita-likes-fajitas/my-package/components`
- **Encapsulation**: Internal implementation details remain private
- **Tree Shaking**: Bundlers can better optimize unused code
- **Maintainability**: Easy to reorganize internal structure without breaking external APIs
- **TypeScript Support**: Proper type resolution and IntelliSense
- **Publishable Packages**: Clean public API without exposing internal implementation details
