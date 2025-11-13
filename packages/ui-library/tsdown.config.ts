import { defineConfig } from "tsdown";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
export default defineConfig([
    {
        entry: [
            "src/**/index.ts",
            "src/**/index.tsx",
            "src/**/*.css",
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
        tsconfig: new URL('tsconfig.json', import.meta.url).pathname,
        plugins: [
            postcss({
                extract: "styles.css", // dist/styles.css
                config: {
                    path: "./postcss.config.mjs",
                    ctx: {},
                },
                minimize: true,
                sourceMap: true,
                inject: false,
            }),
            url({
                include: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.gif", "**/*.svg", "**/*.webp", "**/*.ico"],
                limit: 0, // Always emit files (don't inline as base64)
                fileName: "[name][extname]", // Keep original filename
                destDir: "./dist/public",
            }),
        ],

    },
]);

