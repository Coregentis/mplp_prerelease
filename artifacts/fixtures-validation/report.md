# Phase E — Fixture Schema Validation Report

**Date**: 2026-01-01T17:21:05.049Z  
**Status**: ✅ **PASS**

---

## Summary

| Metric | Value |
|--------|-------|
| Fixtures Total | 22 |
| Fixtures Passed | 22 |
| Fixtures Failed | 0 |
| Fixtures Skipped | 0 |

---

## Gate Rule (Hard)

> **Fixtures must pass schema validation BEFORE invariant testing.**
> 
> This ensures all fixture data is structurally valid per `schemas/v2` truth source.

---

## Validation Results

### ✅ flow-01-single-agent-plan/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ flow-01-single-agent-plan/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ flow-02-single-agent-large-plan/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ flow-02-single-agent-large-plan/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ flow-03-single-agent-with-tools/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ flow-03-single-agent-with-tools/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ flow-04-single-agent-llm-enrichment/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ flow-04-single-agent-llm-enrichment/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ flow-05-single-agent-confirm-required/confirm.json

**Schema**: `mplp-confirm.schema.json`

---

### ✅ flow-05-single-agent-confirm-required/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ flow-05-single-agent-confirm-required/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ flow-05-single-agent-confirm-required/trace.json

**Schema**: `mplp-trace.schema.json`

---

### ✅ map-flow-01-turn-taking/collab.json

**Schema**: `mplp-collab.schema.json`

---

### ✅ map-flow-01-turn-taking/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ map-flow-01-turn-taking/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ map-flow-02-broadcast-fanout/collab.json

**Schema**: `mplp-collab.schema.json`

---

### ✅ map-flow-02-broadcast-fanout/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ map-flow-02-broadcast-fanout/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ sa-flow-01-basic/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ sa-flow-01-basic/plan.json

**Schema**: `mplp-plan.schema.json`

---

### ✅ sa-flow-02-step-evaluation/context.json

**Schema**: `mplp-context.schema.json`

---

### ✅ sa-flow-02-step-evaluation/plan.json

**Schema**: `mplp-plan.schema.json`

---

## Schema Truth Source

All schemas loaded from: `schemas/v2/`

| Fixture Type | Schema File |
|-------------|-------------|
| context.json | mplp-context.schema.json |
| plan.json | mplp-plan.schema.json |
| confirm.json | mplp-confirm.schema.json |
| trace.json | mplp-trace.schema.json |
| collab.json | mplp-collab.schema.json |
