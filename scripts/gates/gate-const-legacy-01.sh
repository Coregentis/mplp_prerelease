#!/usr/bin/env bash
# GATE-CONST-LEGACY-01: Legacy Value Zero Tolerance
# Ensures 0 occurrences of legacy doc_type values

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "=== GATE-CONST-LEGACY-01: Legacy Value Validation ==="

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

# Legacy values (CONST-002 v1.1 §2.3)
LEGACY_VALUES=("specification")

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

# Check for legacy values
legacy_count=0
legacy_files=""

for legacy_val in "${LEGACY_VALUES[@]}"; do
  found=$(eval "$FIND_CMD" | xargs grep -l "^doc_type: $legacy_val" 2>/dev/null || true)
  
  if [ -n "$found" ]; then
    for file in $found; do
      legacy_files="${legacy_files}${file}: doc_type=$legacy_val → MUST migrate to 'normative'\n"
      ((legacy_count++))
    done
  fi
done

if [ $legacy_count -gt 0 ]; then
  echo "❌ GATE-CONST-LEGACY-01 FAIL: $legacy_count legacy doc_type values found"
  echo -e "$legacy_files"
  echo ""
  echo "Legacy 'specification' must be migrated to 'normative' per CONST-002 §2.3"
  exit 1
fi

echo "✅ GATE-CONST-LEGACY-01 PASS: No legacy values found"
exit 0
