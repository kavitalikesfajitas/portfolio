# CI/CD Overview

This document explains how CI is organized in this repository and what each custom GitHub Action is responsible for.

## Goals

- Keep pull request checks fast and focused.
- Reuse workflow logic across PR and main-branch pipelines.
- Prevent hanging jobs and conflicting infrastructure runs.
- Keep custom action behavior explicit and documented.

## Workflow Layout

Main entry workflows in `.github/workflows`:

- `ci-pr-audit.yml`: Pull request quality gates (commitlint + PR body checks).
- `ci-pr-packages.yml`: PR checks for package changes.
- `ci-pr-living-kavita-loca.yml`: PR checks/build for the app and optional preview deployment + PR comment.
- `ci-pr-terraform.yml`: PR Terraform validation.
- `ci-deploy.yml`: Main branch deployment orchestration (packages -> terraform -> app deploy).
- `ci-pr-preview-cleanup.yml`: Removes preview artifacts after PR close.

Reusable workflows:

- `ci-packages.yml`: Typecheck, lint, tests, and build for package scopes.
- `ci-living-kavita-loca.yml`: App typecheck/lint/tests/build and optional deploy (preview/production).
- `ci-terraform.yml`: Terraform fmt/validate/plan/apply.
- `ci-pr-reusable-commit-lint.yml`: Conventional commit checks for PR commit range.
- `ci-pr-body-audit-reusable.yml`: PR template/body validation.

Action smoke test:

- `ci-lint-pr-title-action.yml`: Verifies `.github/actions/lint-pr-title` behavior in a real workflow runtime.

## Custom Composite Actions

- `.github/actions/yarn-monorepo-install`
  - Standard monorepo install entry point for CI.
  - Supports Yarn `node-modules` and `pnp` linkers.
  - Can set up Node via `node-version-file` (usually `.nvmrc`).
  - Handles Yarn/npm/install-state caches.

- `.github/actions/upsert-pr-comment`
  - Creates or updates a PR comment using an identifier marker.
  - Intentionally non-paginated: scans only the first page of PR comments.
  - Best for workflows that maintain a small number of bot comments.

- `.github/actions/lint-pr-title`
  - Validates PR titles against commitlint config.
  - Used both in PR audit flow and dedicated smoke test workflow.

- `.github/actions/match-changed-paths`
  - Lightweight path matching between two refs using `git diff --name-only`.
  - Returns a boolean-style output for conditional job/step behavior.

- `.github/actions/setup-chrome`
  - I created this because alot of companies use self-hosted runners, and those self-hosted runners do not always have this installed already
  - Installs/restores Chrome on runner for browser-oriented jobs.
  - Includes Linux cache restore/install and macOS install path.

## Reliability Conventions

- Concurrency controls are enabled to avoid duplicate in-flight work and Terraform state lock conflicts.
- Longer jobs use `timeout-minutes` to prevent indefinite hangs.
- Most workflows scope triggers with `paths` filters to avoid unnecessary CI runs.
- Reusable workflows + composite actions reduce drift and duplicated logic.

## Intentional Constraints

- `upsert-pr-comment` does not paginate comment listing by design.
- `yarn-monorepo-install` expects `.yarnrc.yml` to be present in the selected working directory.

## Updating CI

When adding CI logic:

1. Prefer updating reusable workflows before creating new top-level workflows.
2. Prefer a custom action when step logic is repeated across workflows.
3. Add/refresh action usage notes in action doc comments.
4. Keep this file in sync with major CI behavior changes.
