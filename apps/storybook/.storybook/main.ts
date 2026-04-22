import type { StorybookConfig } from "@storybook/react-vite";

const PR_NUMBER = process.env.PR_NUMBER;
const BUILD_BASE_PATH = PR_NUMBER ? `/preview/PR-${PR_NUMBER}/` : "/";

// Story file patterns - add new patterns here
// Paths are relative to .storybook/ folder: ../../../ goes to repo root
const stories = [
  "../../../packages/**/src/**/*.stories.@(ts|tsx)",
  "../../*/src/**/*.stories.@(ts|tsx)", // other apps in apps/
];

// Static directories - map public folders to URL paths so storybook components have access static files in public directories.
// Paths are relative to this file (.storybook/main.ts), so ../.. goes to apps/
const staticDirs: StorybookConfig["staticDirs"] = [
  "../../living-kavita-loca/public",
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
  async viteFinal(config) {
    config.base = BUILD_BASE_PATH;
    config.esbuild = {
      ...config.esbuild,
      jsx: "automatic",
    };
    config.define = {
      ...config.define,
    };
    return config;
  },
};

export default config;
