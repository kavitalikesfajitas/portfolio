module.exports = {
  extends: ["@commitlint/config-conventional"],
  // ignores dependabot commits
  ignores: [(message) => /^chore\(deps\): bump .+$/m.test(message)],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "hotfix",
        "debug",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
        "wip",
      ],
    ],
  },
};
