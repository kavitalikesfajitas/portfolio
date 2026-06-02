import type { NextConfig } from "next";
import path from "node:path";
import url from "node:url";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: workspaceRoot, // Specify the monorepo root as turbo directory
  },
  /** Because this is a monorepo, we need to set workspace root
   *  as the root of the repo. This is what allows tailwind config to
   *  work within the monorepo, and what will allow us to import other packages
   *  within the next app.
   */
  outputFileTracingRoot: workspaceRoot,
  allowedDevOrigins: ["local.dammitineedajob.com", "localhost"],
  reactCompiler: true,
  experimental: {
    esmExternals: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "."),
    };
    return config;
  },
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
