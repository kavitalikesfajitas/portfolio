import baseConfig from "./base.mjs";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...baseConfig,
  // ESLint recommended rules for JavaScript files only - for our mjs config files
  {
    files: ["**/*.js", "**/*.mjs"],
    ...js.configs.recommended,
  },
  // TypeScript ESLint recommended rules for TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/consistent-type-definitions": "off",
      "no-debugger": 2,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-extra-non-null-assertion": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
    },
  },
  // Prettier config (disables conflicting rules)
  prettier,
  // Ignore patterns
  {
    ignores: [
      "setupTests.ts",
      "**/__mocks__/**",
      "**/__tests__/**",
      "**/dist/**",
      "**/coverage/**",
    ],
  },
];

export default config;
