# Portfolio Storybook

Storybook app for developing and documenting UI components across the monorepo (e.g. `ui-library`, future packages under `packages/`).

## Running locally

From the monorepo root:

```bash
yarn workspace @kavita-likes-fajitas/storybook dev
```

Or from this directory:

```bash
yarn dev
```

Storybook will start at [http://localhost:6006](http://localhost:6006).

## Building

```bash
yarn workspace @kavita-likes-fajitas/storybook build
```

The static build is written to `dist/`.

To preview the built site:

```bash
yarn workspace @kavita-likes-fajitas/storybook preview
```

## Adding stories

Stories are co-located with components. Add a `*.stories.tsx` next to the component (often under `packages/ui-library/src/`):

```
packages/ui-library/src/
  Button/
    ThemedButton.tsx
    ThemedButton.stories.tsx
```

### Story file template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./MyComponent";

const meta = {
  title: "UI / MyComponent",
  component: MyComponent,
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## Configuration

### Story globs

Edit `.storybook/main.ts` and adjust the `stories` array. Paths are relative to `.storybook/`:

```ts
const stories = [
  "../../../packages/**/src/**/*.stories.@(ts|tsx)",
  "../../*/src/**/*.stories.@(ts|tsx)", // other apps in apps/
];
```

### Static directories

To expose public assets (images, fonts, etc.) to the preview, add entries to `staticDirs` in `.storybook/main.ts`. Paths are relative to `.storybook/`:

```ts
const staticDirs: StorybookConfig["staticDirs"] = [
  "../../living-kavita-loca/public",
  // "../../<app-name>/public"
  // "../../../packages/<package-name>/public"
];
```

Files from `living-kavita-loca/public` are served from the URL root in Storybook—for example `public/favicon.ico` → `/favicon.ico`.
