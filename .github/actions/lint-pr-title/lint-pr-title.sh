#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${PR_TITLE:-}" ]]; then
  echo "::error::Missing required PR_TITLE input."
  exit 1
fi

if [[ -z "${COMMITLINT_CONFIG:-}" ]]; then
  echo "::error::Missing required COMMITLINT_CONFIG input."
  exit 1
fi

if [[ ! -f "${COMMITLINT_CONFIG}" ]]; then
  echo "::error::Commitlint config not found at '${COMMITLINT_CONFIG}'."
  exit 1
fi

echo "Linting PR title with commitlint config '${COMMITLINT_CONFIG}'..."

if ! printf '%s\n' "${PR_TITLE}" | yarn commitlint --config "${COMMITLINT_CONFIG}"; then
  echo "::error::${ERROR_MESSAGE}"
  exit 1
fi

echo "PR title passes commitlint."
