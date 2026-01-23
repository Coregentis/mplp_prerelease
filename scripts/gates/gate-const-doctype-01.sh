#!/usr/bin/env bash
# GATE-CONST-DOCTYPE-01: Doc Type Enum Validation
# Validates that all doc_type values are in the constitutional enum

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "=== GATE-CONST-DOCTYPE-01: Doc Type Validation ==="

# Define scan directories per CONST-002 §1.1
SCAN_DIRS=(
  "docs"
  "governance/02-schema-verification"
  "governance/04-docs-governance"
  "governance/05-website-governance"
  "Validation_Lab"
)

# Exclude patterns
EXCLUDE_DIRS=(
  "*/node_modules/*"
  "Validation_Lab/artifacts/*"
  "Validation_Lab/releases/archive/*"
  "*/seals/*"
)

# Valid enum values (CONST-002 v1.1 §2.1)
VALID_VALUES=("normative" "informative" "reference" "governance" "guide" "attestation")

# Build find command
FIND_CMD="find"
for dir in "${SCAN_DIRS[@]}"; do
  if [ -d "$dir" ]; then
    FIND_CMD="$FIND_CMD $dir"
  fi
done
FIND_CMD="$FIND_CMD -name '*.md' -o -name '*.mdx'"

# Add excludes
for exclude in "${EXCLUDE_DIRS[@]}"; do
  FIND_CMD="$FIND_CMD ! -path '$exclude'"
done

# Find files with doc_type frontmatter
files_with_doc_type=$(eval "$FIND_CMD" | xargs grep -l "^doc_type:" 2>/dev/null || true)

invalid_count=0
invalid_files=""

for file in $files_with_doc_type; do
  # Extract doc_type value (first occurrence)
  value=$(grep "^doc_type:" "$file" | head -1 | sed 's/^doc_type:[[:space:]]*//' | tr -d '"' | tr -d "'")
  
  # Check if valid
  is_valid=false
  for valid in "${VALID_VALUES[@]}"; do
    if [ "$value" = "$valid" ]; then
      is_valid=true
      break
    fi
  done
  
  if [ "$is_valid" = false ]; then
    invalid_files="${invalid_files}${file}: doc_type=$value\n"
    ((invalid_count++))
  fi
done

if [ $invalid_count -gt 0 ]; then
  echo "❌ GATE-CONST-DOCTYPE-01 FAIL: $invalid_count invalid doc_type values found"
  echo -e "$invalid_files"
  echo ""
  echo "Valid values: ${VALID_VALUES[*]}"
  exit 1
fi

echo "✅ GATE-CONST-DOCTYPE-01 PASS: All doc_type values are valid"
exit 0
