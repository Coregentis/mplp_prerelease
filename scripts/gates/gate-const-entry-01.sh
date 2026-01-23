#!/usr/bin/env bash
# GATE-CONST-ENTRY-01: Entry Surface Enum Validation
# Validates that all entry_surface values are in the constitutional enum

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "=== GATE-CONST-ENTRY-01: Entry Surface Validation ==="

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

# Valid enum values
VALID_VALUES=("website" "documentation" "repository" "validation_lab")

# Build find command with excludes
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

# Find files with entry_surface frontmatter
files_with_entry_surface=$(eval "$FIND_CMD" | xargs grep -l "^entry_surface:" 2>/dev/null || true)

invalid_count=0
invalid_files=""

for file in $files_with_entry_surface; do
  # Extract entry_surface value (first occurrence)
  value=$(grep "^entry_surface:" "$file" | head -1 | sed 's/^entry_surface:[[:space:]]*//' | tr -d '"' | tr -d "'")
  
  # Check if valid
  is_valid=false
  for valid in "${VALID_VALUES[@]}"; do
    if [ "$value" = "$valid" ]; then
      is_valid=true
      break
    fi
  done
  
  if [ "$is_valid" = false ]; then
    invalid_files="${invalid_files}${file}: entry_surface=$value\n"
    ((invalid_count++))
  fi
done

if [ $invalid_count -gt 0 ]; then
  echo "❌ GATE-CONST-ENTRY-01 FAIL: $invalid_count invalid entry_surface values found"
  echo -e "$invalid_files"
  echo ""
  echo "Valid values: ${VALID_VALUES[*]}"
  exit 1
fi

echo "✅ GATE-CONST-ENTRY-01 PASS: All entry_surface values are valid"
exit 0
