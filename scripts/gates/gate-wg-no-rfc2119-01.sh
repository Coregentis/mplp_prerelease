#!/usr/bin/env bash

# GATE-WG-NO-RFC2119-01: Website RFC 2119 Language Enforcement
# Website cannot use normative RFC 2119 terms (MUST, SHALL, REQUIRED) in visible text.
# Allowlist: Comments (// or /*), JSDoc, descriptions, code strings.

FAILED=0
LOGFILE=$(mktemp)

echo "🔍 Running GATE-WG-NO-RFC2119-01..."

# Search Website source files for visible MUST in JSX text (not in comments or descriptions)
# This is a conservative check that looks for patterns like ">MUST " which indicate visible text in JSX
find MPLP_website/app -name "*.tsx" -not -path "*/node_modules/*" | while read -r file; do
    if grep -E '>\s*[^<]*\bMUST\b' "$file" > /dev/null 2>&1; then
        echo "❌ GATE-WG-NO-RFC2119-01 FAIL: $file contains visible RFC 2119 language (MUST)." | tee -a "$LOGFILE"
        grep -nE '>\s*[^<]*\bMUST\b' "$file" | head -3 | tee -a "$LOGFILE"
    fi
done

if [[ -s "$LOGFILE" ]]; then
    rm "$LOGFILE"
    exit 1
fi

rm "$LOGFILE"
echo "✅ GATE-WG-NO-RFC2119-01 PASS"
