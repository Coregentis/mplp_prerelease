#!/usr/bin/env bash

# GATE-GOV-LINKMAP-01: Governance Link Integrity Check (Final)
# Ensures internal relative links within the governance directory are valid.
# Skips generated reports and artifacts.

GOV_DIR="governance"
FAILED=0

echo "🔍 Running GATE-GOV-LINKMAP-01..."

# Robustly find all markdown files
find "$GOV_DIR" -name "*.md" -type f | while read -r source_file; do
    # Skip generated reports or artifacts
    if [[ "$source_file" =~ \.report\.md$ ]] || [[ "$source_file" =~ /artifacts/ ]]; then
        continue
    fi
    
    dir=$(dirname "$source_file")
    links=$(grep -oE '\[[^]]*\]\(([^)]+)\)' "$source_file" | sed -E 's/.*\(//;s/\)//')
    
    while read -r link; do
        if [[ -z "$link" ]]; then continue; fi
        
        link_no_anchor="${link%%#*}"
        if [[ -z "$link_no_anchor" ]]; then continue; fi

        if [[ ! "$link_no_anchor" =~ \.(md|mdx|json|yaml|txt)$ ]]; then continue; fi
        if [[ "$link_no_anchor" =~ ^(http|file:|/) ]]; then continue; fi
        
        target_path="$dir/$link_no_anchor"
        
        if [[ ! -e "$target_path" ]]; then
            echo "❌ GATE-GOV-LINKMAP-01 FAIL: Broken link in $source_file -> $link"
            echo "   (Target not found: $target_path)"
            FAILED=1
        fi
    done <<< "$links"
    
    if [[ $FAILED -eq 1 ]]; then exit 1; fi
done || FAILED=1

if [[ $FAILED -eq 1 ]]; then
    exit 1
fi

echo "✅ GATE-GOV-LINKMAP-01 PASS"
