/**
 * @filename: .lintstagedrc.mjs
 * @type {import('lint-staged').Configuration}
 */
export default {
  "**/package.json.hbs": "prettier --write --parser json",
  "**/*.{css,md,html,json,scss,yaml}": ["prettier --write"],
};
