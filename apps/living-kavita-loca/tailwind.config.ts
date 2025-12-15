import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui-library/src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/shadcn-ui-lib/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          950: "#111111",
        },
      },
    },
  },
};
export default config;
