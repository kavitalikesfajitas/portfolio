declare module "*.mdx" {
  import type { ComponentType } from "react";

  const MDXComponent: ComponentType;
  export default MDXComponent;

  // Metadata exported from MDX files
  export const metadata: {
    title?: string;
    heroImage?: string;
    role?: string;
    tech?: string[];
    [key: string]: unknown;
  };
}
