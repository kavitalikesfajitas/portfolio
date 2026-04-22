# Preorder Web Storybook

Storybook app for developing and documenting UI components across the monorepo.

## Running Locally

From the monorepo root:

```bash
yarn workspace preorder-web-storybook dev
```

Or from this directory:

```bash
yarn dev
```

Storybook will start at [http://localhost:6006](http://localhost:6006).

## Building

```bash
yarn workspace preorder-web-storybook build
```

The static build will be output to `dist/`.

To preview the built version:

```bash
yarn workspace preorder-web-storybook preview
```

## Adding Stories

Stories are co-located with their components. Create a `*.stories.tsx` file next to the component you are working on:

```
packages/nvs-design-system/src/
  Button/
    index.tsx
    index.stories.tsx  <-- story file
```

### Story File Template

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { MyComponent } from "./index";

const meta: Meta<typeof MyComponent> = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {
  args: {
    // component props
  },
};
```

## Configuration

### Adding New Story Locations

Edit `.storybook/main.ts` and add patterns to the `stories` array:

```ts
const stories = [
  "../../../packages/**/src/**/*.stories.@(ts|tsx)",
  "../../*/src/**/*.stories.@(ts|tsx)",
  // Add new patterns here, paths are relative to .storybook/
];
```

### Adding Static Directories

To make static assets (images, fonts, etc.) available to stories, add entries to the `staticDirs` array in `.storybook/main.ts`:

```ts
const staticDirs: StorybookConfig["staticDirs"] = [
  "../../nvs-preorder/public",
  // Add more directories here, paths are relative to .storybook/
  // Examples:
  // "../../<app-name>/public"
  // "../../../packages/<package-name>/public"
];
```

Assets are then accessible via their path relative to the public folder root. For example, if `nvs-preorder/public/favicon.ico` exists, it's available at `/favicon.ico` in stories.
