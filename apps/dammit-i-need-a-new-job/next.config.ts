import type { NextConfig } from "next";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import url from "node:url";
import createMDX from "@next/mdx";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { COMPANY_BOARD_TOKENS } from "./app/companies/companyBoards.ts";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const appRoot = path.dirname(url.fileURLToPath(import.meta.url));
const logosDir = path.join(appRoot, "public", "images", "logos");
const logoManifestPath = path.join(logosDir, "manifest.json");

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

function companiesMissingLogos(): string[] {
  let tokensOnDisk: Set<string>;
  let manifest: Record<string, string>;
  try {
    tokensOnDisk = new Set(
      readdirSync(logosDir)
        .filter((entry) => entry !== "manifest.json")
        .map((entry) => entry.replace(/\.[^.]+$/, "")),
    );
    manifest = JSON.parse(readFileSync(logoManifestPath, "utf8")) as Record<
      string,
      string
    >;
  } catch {
    return [...COMPANY_BOARD_TOKENS];
  }

  return COMPANY_BOARD_TOKENS.filter(
    (token) => !tokensOnDisk.has(token) || !manifest[token],
  );
}

export default async (phase: string) => {
  // Production builds should verify that every curated company has a logo, but
  // warm builds should not hit logo services. Skipped in dev so the server
  // starts fast and offline.
  if (phase === PHASE_PRODUCTION_BUILD) {
    const missing = companiesMissingLogos();
    if (missing.length > 0) {
      console.log(`Fetching logos - missing for: ${missing.join(", ")}`);
      execFileSync(process.execPath, ["scripts/fetch-company-logos.ts"], {
        cwd: appRoot,
        stdio: "inherit",
      });
    }
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
