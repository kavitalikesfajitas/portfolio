# portfolio

## Monorepo Structure: Yarn Workspaces & Turbo

This project uses **Yarn Workspaces** to manage dependencies and streamline development across multiple packages in a single repository. Workspaces allow all packages in the `packages/` directory to share dependencies efficiently, reducing duplication and simplifying version management.

**Turbo** (Turborepo) is used as the build system and task runner. It enables fast, incremental builds and orchestrates tasks (like build, lint, and test) across all packages, ensuring only affected packages are rebuilt when changes are made.

- **Yarn Workspaces**: Handles dependency hoisting and workspace linking.
- **Turbo**: Provides caching and parallel execution for tasks, improving CI/CD performance.

For more details, see the [`package.json`](./package.json) and [`turbo.json`](./turbo.json) configuration files.

## Development Setup

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

### Node Modules versus PnP

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
- **nvs-preorder app component**: Creates a new React component in `apps/nvs-preorder`

### Usage

Interactive prompt (recommended):

```bash
yarn turbo gen
```

You will be prompted to select which custom generator to use:

- **root - package**: Creates a new package in `packages/<name>`
- **nvs-preorder app component**: Creates a new React component in `apps/nvs-preorder`

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

## File Structure and Barrel Pattern

We follow a **barrel file format** throughout the monorepo to ensure clean, maintainable imports and proper encapsulation. This pattern is especially critical for packages that need to be published.

### Key Principles

1. **Nearest Index Export Rule**: Everything that needs to be accessible from outside a package or folder must be exported through the nearest `index.ts` or `index.tsx` file

2. **Folder-Level Barrel Files**: Every folder should have its own `index.ts` or `index.tsx` file that exports the public API for that folder

3. **Avoid Monolithic Barrel Files**: **Please ** do not put everything in the main barrel file at the package root. Instead, create a hierarchical structure where each folder manages its own exports

4. **Published Package Requirement**: This pattern is especially important for packages that need to be published, as it provides a clean public API and prevents internal implementation details from being exposed

### Example Structure

```
packages/my-package/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.tsx          # exports Button component
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   ├── Modal.test.tsx
│   │   │   └── index.tsx          # exports Modal component
│   │   └── index.tsx              # exports { Button } from './Button'; exports { Modal } from './Modal';
│   ├── utils/
│   │   ├── helpers.ts
│   │   ├── constants.ts
│   │   └── index.tsx              # exports public utilities
│   └── index.tsx                  # main package export - exports from ./components and ./utils
└── package.json
```

### Benefits

- **Clean Imports**: Consumers can import from clean paths like `@kavita-likes-fajitas/my-package/components`
- **Encapsulation**: Internal implementation details remain private
- **Tree Shaking**: Bundlers can better optimize unused code
- **Maintainability**: Easy to reorganize internal structure without breaking external APIs
- **TypeScript Support**: Proper type resolution and IntelliSense
