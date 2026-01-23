#!/usr/bin/env bash

# GATE-CONST-FROZEN-01: Enforcement of Protocol Frozen Eligibility
# Checks frontmatter for status: frozen and verifies its legitimacy per CONST-003.

FAILED=0
LOGFILE=$(mktemp)

echo "🔍 Running GATE-CONST-FROZEN-01..."

# Search only source markdown files (excluding node_modules, .git, and dist)
find . -name "*.md" -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "./dist/*" | while read -r file; do
    # Extract frontmatter (between the first and second ---)
    FM=$(sed -n '/^---$/,/^---$/p' "$file")
    
    if echo "$FM" | grep -q "^status: frozen$"; then
        # Check if doc_type: normative
        if ! echo "$FM" | grep -q "^doc_type: normative$"; then
            echo "❌ GATE-CONST-FROZEN-01 FAIL: $file has status: frozen in frontmatter but doc_type is not normative." | tee -a "$LOGFILE"
        fi

        # Check if authority: protocol
        if ! echo "$FM" | grep -q "^authority: protocol$"; then
            echo "❌ GATE-CONST-FROZEN-01 FAIL: $file has status: frozen in frontmatter but authority is not protocol (Governance Frozen is not allowed)." | tee -a "$LOGFILE"
        fi

        # Check if entry_surface: documentation
        if ! echo "$FM" | grep -q "^entry_surface: documentation$"; then
            echo "❌ GATE-CONST-FROZEN-01 FAIL: $file has status: frozen in frontmatter but entry_surface is not documentation." | tee -a "$LOGFILE"
        fi
        
        # Check for Frozen Header (> **Frozen Specification**)
        if ! grep -q "> \*\*Frozen Specification\*\*" "$file"; then
            echo "❌ GATE-CONST-FROZEN-01 FAIL: $file has status: frozen in frontmatter but is missing the mandatory Frozen Header block." | tee -a "$LOGFILE"
        fi
    fi
done

if [[ -s "$LOGFILE" ]]; then
    rm "$LOGFILE"
    exit 1
fi

rm "$LOGFILE"
echo "✅ GATE-CONST-FROZEN-01 PASS"
