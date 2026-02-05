import path from "path";
import url from "node:url";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

// For PR previews, set basePath to /pr-{number}
const isPrPreview = process.env.PR_NUMBER !== undefined;
const basePath = isPrPreview ? `/pr-${process.env.PR_NUMBER}` : "";

const nextConfig: NextConfig = {
  basePath,
  assetPrefix: basePath,
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
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "."),
    };
    return config;
  },
  images: {
    // temporarily setting this because we are not using vercel right now
    unoptimized: true,
  },

  /* config options here */
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
