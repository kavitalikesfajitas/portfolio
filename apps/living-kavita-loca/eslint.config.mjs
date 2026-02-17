import nextEslintConfig from "@kavita-likes-fajitas/eslint-config/next";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  {
    ignores: ["public/old-site/*"],
  },
  ...nextEslintConfig,
];

export default eslintConfig;
