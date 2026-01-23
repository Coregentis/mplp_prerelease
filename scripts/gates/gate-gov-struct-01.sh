#!/usr/bin/env bash

# GATE-GOV-STRUCT-01: Enforcement of 7-Layer Governance Structure
# Root of governance/ MUST only contain approved layers.

GOV_DIR="governance"
APPROVED_LAYERS=("01-constitutional" "02-methods" "03-distribution" "04-records" "05-specialized" "06-operations" "99-archive")
APPROVED_FILES=("README.md" "EXECUTION_ORDER.md" "GOVERNANCE_FREEZE_RECORD_SDKR_08_V1.md")

FAILED=0

echo "🔍 Running GATE-GOV-STRUCT-01..."

for item in $(ls -1 "$GOV_DIR"); do
    found=0
    # Check if directory is approved
    for approved in "${APPROVED_LAYERS[@]}"; do
        if [[ "$item" == "$approved" ]]; then
            found=1
            break
        fi
    done
    
    # Check if file is approved
    for approved in "${APPROVED_FILES[@]}"; do
        if [[ "$item" == "$approved" ]]; then
            found=1
            break
        fi
    done

    if [[ $found -eq 0 ]]; then
        echo "❌ GATE-GOV-STRUCT-01 FAIL: Unapproved item found in governance root: $item"
        FAILED=1
    fi
done

if [[ $FAILED -eq 1 ]]; then
    exit 1
fi

echo "✅ GATE-GOV-STRUCT-01 PASS"
