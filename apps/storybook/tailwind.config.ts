import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Storybook config
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    // Stories and components in packages
    "../../packages/**/src/**/*.stories.{js,ts,jsx,tsx}",
    "../../packages/**/src/**/*.{js,ts,jsx,tsx,mdx}",
    // Other apps
    "../../apps/**/src/**/*.stories.{js,ts,jsx,tsx}",
    "../../apps/**/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../apps/**/app/**/*.stories.{js,ts,jsx,tsx}",
    "../../apps/**/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
