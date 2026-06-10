import type { StorybookConfig } from "@storybook/react-vite";
import type { Plugin } from "vite";

const PR_NUMBER = process.env.PR_NUMBER;

/**
 * Next/RSC packages ship `"use client"` at the top of ESM files. Rollup warns
 * loudly when bundling them for Storybook; the directive is meaningless here.
 */
function stripReactServerDirectives(): Plugin {
  const directive = /^\s*["']use (client|server)["'];?\s*\n?/m;
  return {
    name: "storybook-strip-react-server-directives",
    enforce: "pre",
    transform(code, id) {
      if (!id.includes("node_modules")) {
        return null;
      }
      const next = code.replace(directive, "");
      if (next === code) {
        return null;
      }
      return { code: next, map: null };
    },
  };
}
const BUILD_BASE_PATH = PR_NUMBER ? `/preview/PR-${PR_NUMBER}/` : "/";

// Story file patterns - add new patterns here
// Paths are relative to .storybook/ folder: ../../../ goes to repo root
const stories = [
  "../../../packages/**/src/**/*.stories.@(ts|tsx)",
  "../../*/src/**/*.stories.@(ts|tsx)", // other apps in apps/
  "../../*/app/**/*.stories.@(ts|tsx)", // app router components
];

// Static directories - map public folders to URL paths so storybook components have access static files in public directories.
// Paths are relative to this file (.storybook/main.ts), so ../.. goes to apps/
const staticDirs: StorybookConfig["staticDirs"] = [
  "../../living-kavita-loca/public",
  { from: "../../../packages/fonts/fonts", to: "/fonts" },
  // "../../../packages/3d-library/public",
  // Add more public directories as needed in the future, please be specific to the app/package that needs it.
  // Example: "../../<app-name>/public" or "../../../packages/<package-name>/public"
];

const config: StorybookConfig = {
  stories,
  staticDirs,
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  managerHead: (head) => {
    if (BUILD_BASE_PATH !== "/") {
      return `${head}<base href="${BUILD_BASE_PATH}">`;
    }
    return head;
  },
  async viteFinal(config, { configType }) {
    config.base = BUILD_BASE_PATH;
    config.plugins = [stripReactServerDirectives(), ...(config.plugins ?? [])];

    const rollupOptions = { ...config.build?.rollupOptions };
    const previousOnWarn = rollupOptions.onwarn;
    rollupOptions.onwarn = (warning, defaultHandler) => {
      const text = `${warning.message ?? ""}`;
      if (
        /"use client"|'use client'|"use server"|'use server'|Module level directive/i.test(
          text,
        )
      ) {
        return;
      }
      if (previousOnWarn) {
        previousOnWarn(warning, defaultHandler);
      } else {
        defaultHandler(warning);
      }
    };
    config.build = { ...config.build, rollupOptions };

    config.esbuild = {
      ...config.esbuild,
      jsx: "automatic",
    };
    // Components that import Next client code (e.g. `next/link`) reference
    // `process.env.*` at module scope. Storybook runs on @storybook/react-vite,
    // so there's no Node `process` global in the browser bundle and those refs
    // throw "process is not defined". Provide a process.env shim: the specific
    // NODE_ENV gets a real value, and any other `process.env.X` (Next's internal
    // feature flags) resolves to undefined instead of crashing.
    config.define = {
      ...config.define,
      "process.env.NODE_ENV": JSON.stringify(
        configType === "PRODUCTION" ? "production" : "development",
      ),
      "process.env": "{}",
    };
    return config;
  },
};

export default config;
