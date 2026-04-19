#!/usr/bin/env bash
set -euo pipefail

TITLE="${PR_TITLE:?PR_TITLE env var is required}"
PATTERN="${TITLE_REGEX:?TITLE_REGEX env var is required}"
FLAGS="${TITLE_REGEX_FLAGS:-g}"
ERROR_MSG="${ERROR_MESSAGE:-Add Jira ID to your title}"

if node -e "
  const title = process.argv[1];
  const regex = new RegExp(process.argv[2], process.argv[3]);
  process.exit(regex.test(title) ? 0 : 1);
" "$TITLE" "$PATTERN" "$FLAGS"; then
  echo "PR title matches pattern."
else
  echo "::error::${ERROR_MSG}"
  echo ""
  echo "PR title: \"${TITLE}\""
  echo "Expected pattern: ${PATTERN}"
  exit 1
fi
