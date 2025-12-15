import path from "path";
import url from "node:url";
import type { NextConfig } from "next";

const workspaceRoot = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  "..",
  "..",
);

const nextConfig: NextConfig = {
  turbopack: {
    root: workspaceRoot, // Specify the monorepo root as turbo directory
  },
  allowedDevOrigins: ["local.living-kavita-loca.com", "localhost"],
  output: "export",
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
  headers: async () => {
    return [
      {
        source: "/:all*(svg|jpg|png|otf|mp4|js|ttf|woff2|css|jpeg|json)",
        locale: false,
        headers: [
          // Ref: https://confluence.nike.com/display/AKAMAI/Cache+Options+in+Akamai?preview=/369667718/369667596/Header_Handling.pdf
          {
            key: "Edge-Control",
            value: "!no-store,cache-maxage=1d,downstream-ttl=10m",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
