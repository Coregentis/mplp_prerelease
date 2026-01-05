# DTAA Pointers Patchlog

**Date**: 2026-01-05
**Reference**: SOP-DTAA-06 Phase 6.2b/6.2c
**Purpose**: Record all MUST/SHALL remediation for auditability

---

## Summary

| Category | Files | Changes |
|:---|:---:|:---:|
| A: Normative (add pointer) | 0 | 0 |
| B: Informative (downgrade) | 1 | 4 |
| C: External interop (rewrite) | 1 | 1 |
| **Total** | 2 | 5 |

---

## Patchlog

### File: l1-l4-architecture-deep-dive.md (Informative)

| Line | Original | Changed To | Change Type |
|:---|:---|:---|:---|
| 392 | `## 6. Normative Requirements (MUST/SHALL)` | `## 6. Schema-Derived Constraints (Informative)` | Clarifying |
| 396 | `VSL MUST ensure that PSG updates are atomic` | `VSL is expected to ensure...` + Note block | Clarifying |
| 459 | `runtime MUST preserve the causal ordering` | `runtime is expected to preserve...` + Note block | Clarifying |
| 539 | `AEL MUST enforce strict resource limits` | `AEL is expected to enforce...` + Note block | Clarifying |

**Note**: Added disclaimer block stating these are informative restatements, not protocol obligations.

---

### File: runtime-trace-format.md (Normative but external standard)

| Line | Original | Changed To | Change Type |
|:---|:---|:---|:---|
| 122 | `implementations MUST: [W3C conversion]` | `implementations SHOULD: [W3C conversion]` + Note block | Clarifying |

**Note**: Added disclaimer: "W3C Trace Context integration is for interoperability purposes. This is not a protocol obligation."

---

## Verified Normative Pages (No Changes Needed)

The following normative pages were reviewed and already have proper invariant references:

| File | MUST/SHALL Count | Status |
|:---|:---:|:---|
| l2-coordination-governance.md | 12 | ✅ Already references invariants by name |
| l3-execution-orchestration.md | 6 | ✅ Runtime contract definitions |
| l1-core-protocol.md | 4 | ✅ Event emission requirements |
| l4-integration-infra.md | 3 | ✅ Integration contract |

**Note**: These pages use MUST/SHALL correctly with invariant references. Per SOP-DTAA-06 Rule B1, invariant references are acceptable pointers for normative pages.

---

## Excluded (Category A Deferred)

Full schema pointer insertion (JSON Pointer format) deferred to future iteration. Current approach uses invariant name references which satisfy traceability requirements.

---

**Evidence ID**: DTAA-P6.2bc-2026-01-05
