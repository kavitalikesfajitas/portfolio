/**
 * @filename: .lintstagedrc.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/*.hbs": "prettier --write",
  "**/*.{css,md,html,json,scss,yaml}": ["prettier --write"],
};
