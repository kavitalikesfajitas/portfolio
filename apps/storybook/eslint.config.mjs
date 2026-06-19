import reactLibraryEslintConfig from "@kavita-likes-fajitas/eslint-config/react-library";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  { ignores: ["dist/**"] },
  ...reactLibraryEslintConfig,
];

export default eslintConfig;
