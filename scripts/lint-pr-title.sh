#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${PR_TITLE:-}" ]]; then
  echo "::error::Missing required PR_TITLE input."
  exit 1
fi

VALIDATOR="${VALIDATOR:-regex}"
ERROR_MSG="${ERROR_MESSAGE:-PR title validation failed}"

case "$VALIDATOR" in
  regex)
    if [[ -z "${TITLE_REGEX:-}" ]]; then
      echo "::error::Missing required TITLE_REGEX input for validator=regex."
      exit 1
    fi

    FLAGS="${TITLE_REGEX_FLAGS:-g}"

    if node -e "
      const title = process.argv[1];
      const regex = new RegExp(process.argv[2], process.argv[3]);
      process.exit(regex.test(title) ? 0 : 1);
    " "$PR_TITLE" "$TITLE_REGEX" "$FLAGS"; then
      echo "PR title matches regex pattern."
    else
      echo "::error::${ERROR_MSG}"
      echo ""
      echo "PR title: \"${PR_TITLE}\""
      echo "Expected pattern: ${TITLE_REGEX}"
      exit 1
    fi
    ;;
  commitlint)
    if [[ -z "${COMMITLINT_CONFIG:-}" ]]; then
      echo "::error::Missing required COMMITLINT_CONFIG input for validator=commitlint."
      exit 1
    fi

    if [[ ! -f "${COMMITLINT_CONFIG}" ]]; then
      echo "::error::Commitlint config not found at '${COMMITLINT_CONFIG}'."
      exit 1
    fi

    echo "Linting PR title with commitlint config '${COMMITLINT_CONFIG}'..."
    if ! printf '%s\n' "${PR_TITLE}" | yarn commitlint --config "${COMMITLINT_CONFIG}"; then
      echo "::error::${ERROR_MSG}"
      exit 1
    fi
    echo "PR title passes commitlint."
    ;;
  *)
    echo "::error::Invalid validator '${VALIDATOR}'. Expected 'regex' or 'commitlint'."
    exit 1
    ;;
esac
