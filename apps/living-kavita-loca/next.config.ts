import path from "path";
import url from "node:url";
import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createMDX from "@next/mdx";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

// For PR previews, set basePath to /pr-{number}
const prNumber = process.env.PR_NUMBER;
const isPrPreview = prNumber !== undefined && prNumber !== "";
const basePath = isPrPreview ? `/pr-${prNumber}` : "";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig: NextConfig = {
    basePath,
    assetPrefix: basePath,
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
    // Enable MDX file extensions
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    turbopack: {
      root: workspaceRoot, // Specify the monorepo root as turbo directory
    },
    allowedDevOrigins: ["local.living-kavita-loca.com", "localhost"],
    output: "export",
    trailingSlash: true,
    reactStrictMode: true,
    reactCompiler: true,
    experimental: {
      esmExternals: true,
    },
    /** Because this is a monorepo, we need to set workspace root
     *  as the root of the repo. This is what allows tailwind config to
     *  work within in the monorepo, and what will allow us to import other packages
     *  within the next app.
     */
    outputFileTracingRoot: workspaceRoot,
    images: {
      // temporarily setting this because we are not using vercel right now
      unoptimized: true,
    },

    // Rewrite /old-site/ to its index.html in dev mode.
    // In production, CloudFront's rewrite_uri function handles this.
    ...(isDev && {
      rewrites: async () => [
        {
          source: "/old-site",
          destination: "/old-site/index.html",
        },
        {
          source: "/old-site/",
          destination: "/old-site/index.html",
        },
      ],
    }),
  };

  return withMDX(nextConfig);
};
