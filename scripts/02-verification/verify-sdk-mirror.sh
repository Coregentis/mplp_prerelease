#!/bin/bash
# Mirror Hash Gate: Verify SDK schema mirrors match Truth Source
# Usage: ./verify-sdk-mirror.sh
# Exit codes: 0 = PASS, 1 = FAIL

set -e

TRUTH_BASE="schemas/v2"
SDK_BASE="packages/sources/sdk-ts/schemas"

PASSED=0
FAILED=0
FAILURES=""

echo "=== SCV-01 Mirror Hash Gate ==="
echo "Truth Source: $TRUTH_BASE"
echo "SDK Mirror:   $SDK_BASE"
echo ""

# Module schemas
for schema in mplp-collab mplp-confirm mplp-context mplp-core mplp-dialog mplp-extension mplp-network mplp-plan mplp-role mplp-trace; do
    TRUTH="${TRUTH_BASE}/${schema}.schema.json"
    MIRROR="${SDK_BASE}/${schema}.schema.json"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ $schema"
        ((PASSED++))
    else
        echo "❌ $schema DRIFT"
        FAILURES="$FAILURES\n  - $schema"
        ((FAILED++))
    fi
done

# Common schemas
for schema in common-types events identifiers learning-sample metadata trace-base; do
    TRUTH="${TRUTH_BASE}/common/${schema}.schema.json"
    MIRROR="${SDK_BASE}/common/${schema}.schema.json"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ common/$schema"
        ((PASSED++))
    else
        echo "❌ common/$schema DRIFT"
        FAILURES="$FAILURES\n  - common/$schema"
        ((FAILED++))
    fi
done

# Event schemas
for schema in mplp-event-core mplp-graph-update-event mplp-map-event mplp-pipeline-stage-event mplp-runtime-execution-event mplp-sa-event; do
    TRUTH="${TRUTH_BASE}/events/${schema}.schema.json"
    MIRROR="${SDK_BASE}/events/${schema}.schema.json"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ events/$schema"
        ((PASSED++))
    else
        echo "❌ events/$schema DRIFT"
        FAILURES="$FAILURES\n  - events/$schema"
        ((FAILED++))
    fi
done

# Integration schemas
for schema in mplp-ci-event mplp-file-update-event mplp-git-event mplp-tool-event; do
    TRUTH="${TRUTH_BASE}/integration/${schema}.schema.json"
    MIRROR="${SDK_BASE}/integration/${schema}.schema.json"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ integration/$schema"
        ((PASSED++))
    else
        echo "❌ integration/$schema DRIFT"
        FAILURES="$FAILURES\n  - integration/$schema"
        ((FAILED++))
    fi
done

# Learning schemas
for schema in mplp-learning-sample-core mplp-learning-sample-delta mplp-learning-sample-intent; do
    TRUTH="${TRUTH_BASE}/learning/${schema}.schema.json"
    MIRROR="${SDK_BASE}/learning/${schema}.schema.json"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ learning/$schema"
        ((PASSED++))
    else
        echo "❌ learning/$schema DRIFT"
        FAILURES="$FAILURES\n  - learning/$schema"
        ((FAILED++))
    fi
done

# Invariant YAMLs
for inv in integration-invariants learning-invariants map-invariants observability-invariants sa-invariants; do
    TRUTH="${TRUTH_BASE}/invariants/${inv}.yaml"
    MIRROR="${SDK_BASE}/invariants/${inv}.yaml"
    if diff -q "$TRUTH" "$MIRROR" > /dev/null 2>&1; then
        echo "✅ invariants/$inv"
        ((PASSED++))
    else
        echo "❌ invariants/$inv DRIFT"
        FAILURES="$FAILURES\n  - invariants/$inv"
        ((FAILED++))
    fi
done

echo ""
echo "=== Summary ==="
echo "PASSED: $PASSED"
echo "FAILED: $FAILED"

if [ $FAILED -gt 0 ]; then
    echo ""
    echo "❌ SCV-01 GATE FAILED"
    echo "Drifted files:$FAILURES"
    echo ""
    echo "Fix: Run 'cp schemas/v2/<path> packages/sources/sdk-ts/schemas/<path>' for each drifted file"
    exit 1
else
    echo ""
    echo "✅ SCV-01 GATE PASSED"
    echo "All SDK schema mirrors match Truth Source"
    exit 0
fi
