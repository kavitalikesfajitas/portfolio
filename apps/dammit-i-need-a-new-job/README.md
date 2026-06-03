# Dammit. I Need A New Job.

A tiny Next.js app for tracking the chaos of job hunting while experimenting with a better way to discover roles.

## What This Is

This is the first pass at a standalone job-search side project inside the portfolio monorepo. Right now it includes:

- A responsive landing page
- A persisted days-since-laid-off counter
- Job-search themed status stats
- Local image assets and custom icons
- App-level tests, typecheck, lint, and build scripts

## Local Development

Run from the repo root:

```bash
yarn install
yarn workspace dammit-i-need-a-new-job dev
```

The dev server runs at:

```txt
https://localhost:3002
```

## Commands

```bash
# Typecheck this app and its dependencies
yarn turbo typecheck --filter="dammit-i-need-a-new-job..."

# Lint this app and its dependencies
yarn turbo lint --filter="dammit-i-need-a-new-job..."

# Run tests with coverage
yarn turbo test-ci --filter="dammit-i-need-a-new-job..."

# Build for production
yarn turbo build --filter="dammit-i-need-a-new-job..."
```

## Implementation Notes

- The counter uses `@react-hookz/web` and persists to local storage.
- The counter is configured to avoid SSR hydration issues.
- PNG imports are typed with the app-level image declaration file.
- The existential crisis stat is intentionally infinite.
- Typecheck depends on the local icon package build because this app imports generated icon output.

## Vercel

This app is intended to deploy as a standalone Vercel project from:

```txt
apps/dammit-i-need-a-new-job
```

Suggested Vercel settings:

```txt
Framework Preset: Next.js
Root Directory: apps/dammit-i-need-a-new-job
Install Command: yarn install --immutable
Build Command: yarn build
Output Directory: .next
```
