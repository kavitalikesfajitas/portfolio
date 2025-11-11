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
  allowedDevOrigins: ["local.living-kavita-loca.com"],
  output: "export",
  /* config options here */
};

export default nextConfig;
