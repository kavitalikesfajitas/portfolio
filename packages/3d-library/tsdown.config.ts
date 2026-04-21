import { defineConfig } from "tsdown";
import { readFileSync } from "fs";

// Plugin to load shader files as text
const shaderPlugin = {
  name: "shader-loader",
  load(id: string) {
    if (id.endsWith(".frag") || id.endsWith(".vert")) {
      const code = readFileSync(id, "utf-8");
      return {
        code: `export default ${JSON.stringify(code)}`,
        map: null,
      };
    }
  },
};

export default defineConfig([
  {
    entry: [
      "src/**/index.ts",
      "src/**/index.tsx",
      "!src/**/*.{test,spec}.ts",
      "!src/**/*.{test,spec}.tsx",
      "!src/**/*.stories.{ts,tsx,mdx}",
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
    plugins: [shaderPlugin],
  },
]);
