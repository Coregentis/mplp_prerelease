#!/usr/bin/env bash

# GATE-DOCS-NO-COMPLIANCE-01: Docs Compliance Terminology Enforcement
# Docs cannot use high-risk "Compliance" terminology that implies certification.
# Allowlist: "No ... certified" / "not ... certification" (negative contexts).

FAILED=0
LOGFILE=$(mktemp)

echo "🔍 Running GATE-DOCS-NO-COMPLIANCE-01..."

# High-risk terms (case-insensitive) - only affirmative claims
TERMS="Compliance level|Compliance suite"

# Search Docs source files (excluding node_modules, .git, build)
find docs/src docs/docs -name "*.tsx" -o -name "*.md" -o -name "*.mdx" 2>/dev/null | while read -r file; do
    if grep -iE "$TERMS" "$file" > /dev/null 2>&1; then
        echo "❌ GATE-DOCS-NO-COMPLIANCE-01 FAIL: $file contains high-risk compliance terminology." | tee -a "$LOGFILE"
        grep -inE "$TERMS" "$file" | head -3 | tee -a "$LOGFILE"
    fi
done

if [[ -s "$LOGFILE" ]]; then
    rm "$LOGFILE"
    exit 1
fi

rm "$LOGFILE"
echo "✅ GATE-DOCS-NO-COMPLIANCE-01 PASS"
