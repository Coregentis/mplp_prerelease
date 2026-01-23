# DTAA Phase 5B: Semantic Review

**Date**: 2026-01-05
**Reference**: METHOD-DTAA-01 §5B
**Scope**: 5 High-Risk specification/ Pages

---

## Summary

| Metric | Count |
|:---|:---:|
| **Pages Reviewed** | 5 |
| **Semantic Violations** | 0 |
| **REWORD Required** | 5 (schema pointers) |
| **REMOVE Required** | 0 |
| **ESCALATE Required** | 0 |

---

## 1. l1-l4-architecture-deep-dive.md

**Lines**: 682
**Doc Type**: Informative (declared line 3)
**Authority**: None (declared line 5)

### Findings

1. **Non-Normative Declaration**: ✅ Present (lines 17-20)
   - "This document is informative only"
   - Document correctly declares itself as non-normative

2. **MUST/SHALL Statements (§6)**:
   - Line 391: "VSL MUST ensure that PSG updates are atomic"
   - Line 448: "runtime MUST preserve the causal ordering of events"
   - Line 526: "AEL MUST enforce strict resource limits"
   
   **Assessment**: These appear in §6 "Normative Requirements" section, which creates **potential confusion** since the document declares itself non-normative. However, these are **restating schema/design constraints**, not introducing new obligations.

3. **New Semantics Check**: ❌ None found
   - No new terms beyond glossary
   - No new layers (L0/L5)
   - No new modules or flows

### Required Action

- **Verdict**: ⚠️ REWORD
- **Action**: Either (a) add schema pointers to §6 MUST statements, or (b) reword §6 to remove MUST language since doc is declared non-normative
- **Evidence**: DTAA-P5B-2026/page1

---

## 2. l2-coordination-governance.md

**Lines**: 408
**Doc Type**: Normative (declared line 3)
**Authority**: Protocol (declared line 5)
**Frozen Header**: ✅ Present (lines 22-29)

### Findings

1. **Frozen Declaration**: ✅ Correct format per CONST-003
   - "Protocol Version: 1.0.0"
   - "Authority: MPGC"

2. **MUST/SHALL Statements**:
   - Line 50: "Implementations MUST adhere to the lifecycle rules"
   - Lines 297-299: "Plan MUST reference...", "Trace MUST reference...", "Confirm MUST reference..."
   - Lines 313-315: "Collab MUST have...", "role_id MUST be valid UUIDs"
   - Line 336: "All Implementations MUST"

   **Assessment**: All MUST statements **correctly reference invariants** by name (e.g., `sa_plan_context_binding`, `map_session_requires_multiple_participants`). This is schema-derived restatement.

3. **New Semantics Check**: ❌ None found
   - All content traceable to schemas/invariants

### Required Action

- **Verdict**: ⚠️ REWORD (minor)
- **Action**: Add explicit schema pointers (JSON Pointer format) alongside invariant names for maximum traceability
- **Evidence**: DTAA-P5B-2026/page2

---

## 3. integration/integration-spec.md

**Lines**: (estimated 200+)
**Doc Type**: TBD (needs frozen header)
**Authority**: TBD

### Findings

1. **Frozen Declaration**: ❌ Missing (flagged in DTAA_FLAGS_HEADERS)

2. **MUST Statement**:
   - Line 172: "Events MUST pass Integration invariants"
   
   **Assessment**: References "Integration invariants" but needs pointer to specific invariant file.

3. **New Semantics Check**: ❌ None found

### Required Action

- **Verdict**: ⚠️ REWORD
- **Action**: Add frozen header + schema pointer
- **Evidence**: DTAA-P5B-2026/page3

---

## 4. observability/module-event-matrix.md

**Lines**: (estimated 200+)
**Doc Type**: Reference (matrix format)
**Authority**: TBD

### Findings

1. **MUST Statement**:
   - Line 200: "Every MPLP-conformant module MUST emit"
   
   **Assessment**: Defining event emission requirements. Needs schema pointer to event taxonomy.

2. **New Semantics Check**: ❌ None found
   - Matrix content derived from event taxonomy schema

### Required Action

- **Verdict**: ⚠️ REWORD
- **Action**: Add schema pointer to event-taxonomy or mplp-event.schema.json
- **Evidence**: DTAA-P5B-2026/page4

---

## 5. observability/runtime-trace-format.md

**Lines**: (estimated 150+)
**Doc Type**: Reference
**Authority**: TBD

### Findings

1. **MUST Statement**:
   - Line 122: "implementations MUST" (W3C trace context export)
   
   **Assessment**: References external standard (W3C). This is **interoperability guidance**, not new protocol obligation.

2. **New Semantics Check**: ❌ None found

### Required Action

- **Verdict**: ⚠️ REWORD
- **Action**: Clarify that W3C export MUST is for interoperability, not protocol requirement; or add external_standards ref
- **Evidence**: DTAA-P5B-2026/page5

---

## Phase 5B Conclusion

| Page | Semantic Violation | New Definitions | Verdict |
|:---|:---:|:---:|:---:|
| l1-l4-architecture-deep-dive.md | ❌ No | ❌ No | ⚠️ REWORD |
| l2-coordination-governance.md | ❌ No | ❌ No | ⚠️ REWORD |
| integration-spec.md | ❌ No | ❌ No | ⚠️ REWORD |
| module-event-matrix.md | ❌ No | ❌ No | ⚠️ REWORD |
| runtime-trace-format.md | ❌ No | ❌ No | ⚠️ REWORD |

**Key Finding**: No documents introduce new protocol semantics. All flagged issues are **pointer/header deficiencies**, not semantic violations.

**Recommendation**: Proceed to Phase 6 (Header + Pointer remediation) without escalation.

---

**Evidence ID**: DTAA-P5B-2026-01-05
**Auditor**: DTAA v1.0
