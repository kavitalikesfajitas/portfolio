# @kavita-likes-fajitas/ui-library

A UI component library built with React, TypeScript, and Tailwind CSS, featuring shadcn/ui components and custom components.

## Installation

```bash
yarn add @kavita-likes-fajitas/ui-library
```

## Important: Import Patterns

⚠️ **shadcn components use a different import pattern than regular components.**

### Shadcn Components

Shadcn components must be imported using their **full path** within the library:

```typescript
// ✅ Correct - Import shadcn UI components with full path
import { NavigationMenu } from '@kavita-likes-fajitas/ui-library/shadcn/components/ui/navigation-menu';

// ✅ Correct - Import shadcn hooks with full path
import { useBreakpoint } from '@kavita-likes-fajitas/ui-library/shadcn/hooks/useBreakpoint';

// ❌ Incorrect - Will not work
import { NavigationMenu } from '@kavita-likes-fajitas/ui-library';
```

### Shadcn Utilities

Utility functions (like `cn`) from shadcn are exported from the package root:

```typescript
// ✅ Correct - Import utilities from package root
import { cn } from '@kavita-likes-fajitas/ui-library';
```

### Regular Components

Regular custom components use the standard subpath import pattern:

```typescript
// ✅ Correct - Import custom components with component name only
import { TornPaperEffect } from '@kavita-likes-fajitas/ui-library/TornPaperEffect';
```

## Why the Difference?

The different import patterns exist because:

1. **Shadcn components** follow the shadcn/ui convention of maintaining their directory structure for imports, allowing for better organization and avoiding naming conflicts
2. **Regular components** use a simpler subpath pattern for convenience and brevity

This is configured in the `package.json` exports field:

```json
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./shadcn/*": {
      "import": "./dist/shadcn/*.js",
      "types": "./dist/shadcn/*.d.ts"
    },
    "./*": {
      "import": "./dist/*/index.js",
      "types": "./dist/*/index.d.ts"
    }
  }
}
```

## Available Components

### Shadcn Components

- **NavigationMenu** - Accessible navigation menu component
  ```typescript
  import { NavigationMenu } from '@kavita-likes-fajitas/ui-library/shadcn/components/ui/navigation-menu';
  ```

### Shadcn Hooks

- **useBreakpoint** - Hook for responsive breakpoint detection
  ```typescript
  import { useBreakpoint } from '@kavita-likes-fajitas/ui-library/shadcn/hooks/useBreakpoint';
  ```

### Custom Components

- **TornPaperEffect** - Custom torn paper visual effect component
  ```typescript
  import { TornPaperEffect } from '@kavita-likes-fajitas/ui-library/TornPaperEffect';
  ```

## Styles

Some components may require importing their styles:

```typescript
import '@kavita-likes-fajitas/ui-library/styles/shadcn/global.css';
```

## Development

```bash
# Build the library
yarn build

# Watch mode for development
yarn dev

# Run tests
yarn test

# Type checking
yarn typecheck

# Lint
yarn lint
```

## Peer Dependencies

This library requires the following peer dependencies:

- `react` ^19.1.0
- `react-dom` ^19.1.0
- `tailwindcss` ^4
- `@tailwindcss/postcss` ^4
- `clsx` ^2.1.1

## License

See LICENSE file for details.

