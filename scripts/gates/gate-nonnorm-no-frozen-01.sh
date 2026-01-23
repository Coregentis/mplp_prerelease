#!/usr/bin/env bash

# GATE-NONNORM-NO-FROZEN-01: Non-Normative Frozen Term Enforcement
# Website cannot use "Freeze/Frozen" for governance immutability (should use Seal/Sealed).

FAILED=0
LOGFILE=$(mktemp)

echo "🔍 Running GATE-NONNORM-NO-FROZEN-01..."

# Blacklisted patterns (governance freeze, site freeze)
TERMS="Site Freeze|Governance freeze|governance freeze tag"

# Search Website source files
find MPLP_website/app -name "*.tsx" -not -path "*/node_modules/*" | while read -r file; do
    if grep -iE "$TERMS" "$file" > /dev/null 2>&1; then
        echo "❌ GATE-NONNORM-NO-FROZEN-01 FAIL: $file contains non-normative Frozen terminology." | tee -a "$LOGFILE"
        grep -inE "$TERMS" "$file" | head -3 | tee -a "$LOGFILE"
    fi
done

if [[ -s "$LOGFILE" ]]; then
    rm "$LOGFILE"
    exit 1
fi

rm "$LOGFILE"
echo "✅ GATE-NONNORM-NO-FROZEN-01 PASS"
