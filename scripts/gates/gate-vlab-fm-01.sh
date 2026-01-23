#!/usr/bin/env bash
# GATE-VLAB-FM-01: Validation Lab Frontmatter Presence
# Ensures all Validation Lab .md files have constitutional frontmatter

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

echo "=== GATE-VLAB-FM-01: Validation Lab Frontmatter Validation ==="

VLAB_DIR="Validation_Lab"

if [ ! -d "$VLAB_DIR" ]; then
  echo "✅ GATE-VLAB-FM-01 SKIP: Validation Lab directory not found"
  exit 0
fi

# Exclude patterns per CONST-002 §1.1
EXCLUDE_PATTERNS=(
  "node_modules"
  ".next"
  "test-results"
  "coverage"
  "artifacts"
  "releases/archive"
  "seals"
)

# Find all .md files excluding archives
md_files=$(find "$VLAB_DIR" -name "*.md" -type f)

# Filter out excluded patterns
filtered_files=""
for file in $md_files; do
  exclude=false
  for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    if [[ "$file" =~ $pattern ]]; then
      exclude=true
      break
    fi
  done
  
  if [ "$exclude" = false ]; then
    filtered_files="${filtered_files}${file}\n"
  fi
done

missing_count=0
missing_files=""
wrong_entry_count=0
wrong_entry_files=""

for file in $(echo -e "$filtered_files"); do
  [ -z "$file" ] && continue
  
  # Check if file starts with ---
  first_line=$(head  -1 "$file")
  if [ "$first_line" != "---" ]; then
    missing_files="${missing_files}${file}: missing frontmatter\n"
    ((missing_count++))
    continue
  fi
  
  # Check if frontmatter has entry_surface: validation_lab
  if ! grep -q "^entry_surface: validation_lab" "$file"; then
    wrong_entry_files="${wrong_entry_files}${file}: wrong or missing entry_surface\n"
    ((wrong_entry_count++))
  fi
done

total_errors=$((missing_count + wrong_entry_count))

if [ $total_errors -gt 0 ]; then
  echo "❌ GATE-VLAB-FM-01 FAIL: $total_errors validation failures"
  
  if [ $missing_count -gt 0 ]; then
    echo ""
    echo "Files missing frontmatter ($missing_count):"
    echo -e "$missing_files"
  fi
  
  if [ $wrong_entry_count -gt 0 ]; then
    echo ""
    echo "Files with wrong entry_surface ($wrong_entry_count):"
    echo -e "$wrong_entry_files"
  fi
  
  exit 1
fi

echo "✅ GATE-VLAB-FM-01 PASS: All Validation Lab files have constitutional frontmatter"
exit 0
