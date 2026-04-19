#!/usr/bin/env bash
# Builds the markdown body for the PR audit comment.
# Expects ERRORS and WARNINGS env vars from the validate step.
# Outputs: body (multiline, via $GITHUB_OUTPUT).
set -euo pipefail

HAS_ERRORS=$([[ -n "$(echo "$ERRORS" | tr -d '[:space:]')" ]] && echo true || echo false)
HAS_WARNINGS=$([[ -n "$(echo "$WARNINGS" | tr -d '[:space:]')" ]] && echo true || echo false)

if [[ "$HAS_ERRORS" == "false" && "$HAS_WARNINGS" == "false" ]]; then
  BODY="## ✅ PR Template Validation Passed\n\nAll issues have been resolved! Your PR description now meets all requirements."
else
  BODY=""
  if [[ "$HAS_ERRORS" == "true" ]]; then
    BODY+="## 🚫 PR Template Validation Failed\n${ERRORS}\n"
  fi
  if [[ "$HAS_WARNINGS" == "true" ]]; then
    BODY+="## ⚠️ PR Template Warnings\n${WARNINGS}\n"
  fi
fi

{
  echo "body<<EOFBODY"
  echo -e "$BODY"
  echo "EOFBODY"
} >> "$GITHUB_OUTPUT"
