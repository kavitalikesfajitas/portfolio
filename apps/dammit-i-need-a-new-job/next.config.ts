import type { NextConfig } from "next";
import { execFileSync } from "node:child_process";
import path from "node:path";
import url from "node:url";
import createMDX from "@next/mdx";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const appRoot = path.dirname(url.fileURLToPath(import.meta.url));

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default async (phase: string) => {
  // Fetch a logo for every company in COMPANY_BOARD_TOKENS before a production
  // build. The script exits non-zero if any company in the list has no logo
  // (and none on disk to fall back to), which makes execFileSync throw and
  // fails the build. Skipped in dev so the server starts fast and offline.
  if (phase === PHASE_PRODUCTION_BUILD) {
    execFileSync(process.execPath, ["scripts/fetch-company-logos.ts"], {
      cwd: appRoot,
      stdio: "inherit",
    });
  }

  const nextConfig: NextConfig = {
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
    images: {
      unoptimized: false,
    },
  };
  return withMDX(nextConfig);
};
