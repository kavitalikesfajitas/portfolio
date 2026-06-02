import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui-library/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shadcn-ui-lib/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
