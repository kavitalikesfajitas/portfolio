import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: [
      "src/**/index.ts",
      "!src/**/*.{test,spec}.ts",
      "!src/**/*.stories.{ts,mdx}",
      "!src/**/__tests__/**",
    ],
    platform: "neutral",
    outDir: "./dist",
    format: ["esm"],
    clean: true,
    treeshake: true,
    sourcemap: true,
    dts: true,
    tsconfig: new URL("tsconfig.json", import.meta.url).pathname,
    unbundle: true,
    inlineOnly: false,
  },
]);
