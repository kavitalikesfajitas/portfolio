import sharedLintStagedConfig from "../../.lintstagedrc.mjs";

/** @type {import('lint-staged').Configuration} */
export default {
  ...sharedLintStagedConfig,
  "**/*.{js,ts,mts,tsx,mjs}": [
    "eslint --fix --config eslint.config.mjs --max-warnings 0",
    "prettier --write",
  ],
};
