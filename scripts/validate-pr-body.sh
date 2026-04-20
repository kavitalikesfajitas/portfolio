#!/usr/bin/env bash
# Validates a PR description against the team's template requirements.
# Expects PR_BODY_B64 env var (base64-encoded PR body).
# Outputs: errors, warnings (multiline, via $GITHUB_OUTPUT).
set -euo pipefail

# Decode body to a file; normalize line endings (remove CR)
: > pr_body.txt
printf "%s" "$PR_BODY_B64" | base64 -d > pr_body.txt || \
  printf "%s" "$PR_BODY_B64" | base64 --decode > pr_body.txt
sed -i 's/\r$//' pr_body.txt || true

ERRORS=""
WARNINGS=""
REQUIRE_JIRA="${REQUIRE_JIRA:-false}"

# Extract a markdown section by its H2 heading
extract_section() {
  local heading="$1"
  awk -v h="$heading" '
    BEGIN{found=0}
    $0 ~ "^##[[:space:]]+" h "[[:space:]]*$" {found=1; next}
    found && $0 ~ "^##[[:space:]]+" {exit}
    found {print}
  ' pr_body.txt
}

# Remove fence markers & HTML comments; strip whitespace
normalize_for_empty_check() {
  sed '/^```/d' \
  | sed '/^<!--/,/-->$/d' \
  | tr -d '[:space:]'
}

# ── Checks ──────────────────────────────────────────────────────────

if [ ! -s pr_body.txt ] || [ -z "$(tr -d '[:space:]' < pr_body.txt)" ]; then
  ERRORS+="\n❌ **PR description is empty. Please fill out the template or add a brief description for your changes.**"
else
  # Optional Jira ticket check controlled by the action consumer.
  if [[ "$REQUIRE_JIRA" == "true" ]]; then
    if grep -q "JIRA_TICKET_HERE" pr_body.txt; then
      ERRORS+="\n❌ **JIRA ticket placeholder (JIRA_TICKET_HERE) has not been replaced.**"
    elif ! grep -qE '[A-Z]{2,10}-[0-9]+' pr_body.txt; then
      WARNINGS+="\n⚠️ **No JIRA ticket detected in PR body.**"
    fi
  fi

  # What It Does
  if ! grep -qE '^##[[:space:]]+What It Does[[:space:]]*$' pr_body.txt; then
    WARNINGS+="\n⚠️ **Missing '## What It Does' section.**"
  else
    SECTION_CONTENT="$(extract_section 'What It Does')"
    if [ -z "$(printf "%s" "$SECTION_CONTENT" | normalize_for_empty_check)" ]; then
      ERRORS+="\n❌ **'What It Does' section is empty.**"
    fi
  fi

  # How To Test
  if ! grep -qE '^##[[:space:]]+How To Test[[:space:]]*$' pr_body.txt; then
    WARNINGS+="\n⚠️ **Missing '## How To Test' section.**"
  else
    SECTION_CONTENT="$(extract_section 'How To Test')"
    if [ -z "$(printf "%s" "$SECTION_CONTENT" | normalize_for_empty_check)" ]; then
      ERRORS+="\n❌ **'How To Test' section is empty.**"
    fi
  fi
fi

# ── Outputs ─────────────────────────────────────────────────────────

{
  echo "errors<<EOF"
  echo -e "$ERRORS"
  echo "EOF"
  echo "warnings<<EOF"
  echo -e "$WARNINGS"
  echo "EOF"
} >> "$GITHUB_OUTPUT"

if [ -n "$ERRORS" ]; then
  exit 1
fi
