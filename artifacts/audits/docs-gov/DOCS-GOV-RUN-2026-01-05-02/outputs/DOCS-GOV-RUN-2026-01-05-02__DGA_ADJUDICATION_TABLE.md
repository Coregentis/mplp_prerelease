# DGA ADJUDICATION TABLE (High-Risk Pages)

**RUN_ID**: DOCS-GOV-RUN-2026-01-05-02
**Date**: 2026-01-05
**Scope**: HIGH_RISK_PAGES_REGISTRY.md (Category A-E)
**Checklist**: CHECKLIST-DOCS-GOV-01 v2.1.0

---

## Category A — Core Protocol Boundaries

| File | Claimed | Actual | Doc Type | Entry OK | Drift | Verdict | Notes |
|:---|:---:|:---:|:---|:---:|:---|:---|:---|
| l1-core-protocol.md | L1 | L1 | Normative | ✅ | - | ✅ PASS | Correct scope |
| l2-coordination-governance.md | L2 | L2 | Normative | ✅ | - | ✅ PASS | Correct scope |
| l3-execution-orchestration.md | L3 | L3 | Normative | ✅ | - | ✅ PASS | Correct scope |
| l4-integration-learning.md | L4 | L4 | Normative | ✅ | - | ✅ PASS | Correct scope |
| l1-l4-architecture-deep-dive.md | L1-L4 | L1-L4 | Informative | ✅ | - | ✅ PASS | Overview correctly scoped |

---

## Category B — Cross-cutting Kernel Duties

| File | Claimed | Actual | Entry OK | Drift | Verdict |
|:---|:---:|:---:|:---:|:---|:---|
| coordination-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| event-bus-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| state-sync-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| learning-feedback-explained.md | L4 | L4 | ✅ | - | ✅ PASS |
| error-handling-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| performance-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| observability-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| security-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| transaction-explained.md | L2 | L2 | ✅ | - | ✅ PASS |
| orchestration-explained.md | L3 | L3 | ✅ | - | ✅ PASS |

---

## Category C — Golden Flows

| File | Claimed | Actual | Entry OK | Drift | Verdict | Notes |
|:---|:---:|:---:|:---:|:---|:---|:---|
| golden-flows/index.md | GF | GF | ✅ | - | ✅ PASS | Navigation |
| GF-01-sa-plan-execution.md | GF | GF | ✅ | - | ✅ PASS | |
| GF-02-spec.md | GF | GF | ✅ | - | ✅ PASS | |
| GF-03-spec.md | GF | GF | ✅ | - | ✅ PASS | |
| GF-04-spec.md | GF | GF | ✅ | - | ✅ PASS | |
| GF-05-spec.md | GF | GF | ✅ | - | ✅ PASS | |

---

## Category D — Evaluation/Alignment

| File | Claimed | Actual | Entry OK | Drift | Verdict |
|:---|:---:|:---:|:---:|:---|:---|
| spec-to-eval-matrix.md | Eval | Eval | ✅ | - | ✅ PASS |
| semantic-alignment-overview.md | Info | Info | ✅ | F4⚠️ | ⚠️ REVIEW |

**Note**: semantic-alignment-overview.md has borderline F4 ("MPLP defines semantic anchors"). Reviewed in context—this is a restatement of schema content, not a new definition. No REWORD required but logged.

---

## Category E — External Standard Refs

| File | Entry OK | Drift | Verdict | Notes |
|:---|:---:|:---|:---|:---|
| runtime-trace-format.md | ✅ | - | ✅ PASS | W3C ref properly disclaimed |

---

## Summary

| Category | Pages | PASS | REVIEW | REWORD |
|:---|:---:|:---:|:---:|:---:|
| A | 5 | 5 | 0 | 0 |
| B | 10 | 10 | 0 | 0 |
| C | 6 | 6 | 0 | 0 |
| D | 2 | 1 | 1 | 0 |
| E | 1 | 1 | 0 | 0 |
| **Total** | **24** | **23** | **1** | **0** |

**Gate Status**: ✅ Track 1 DGA PASS (1 REVIEW logged, no REWORD required)

---

**Evidence ID**: DGA-ADJ-2026-01-05-02
