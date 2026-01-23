# DGA Scan Report

**RUN_ID**: DOCS-GOV-RUN-2026-01-05-01
**Date**: 2026-01-05
**Reference**: CHECKLIST-DOCS-GOV-01 Phase 1.1
**Scope**: docs/docs/specification/**

---

## Phase 1.1.1 — Frontmatter Validity

| Metric | Result |
|:---|:---:|
| Files checked | 60 |
| doc_type present | 60/60 ✅ |
| entry_surface present | 60/60 ✅ |
| authority present | 60/60 ✅ |
| status present | 60/60 ✅ |

**Verdict**: ✅ PASS

---

## Phase 1.1.2 — Mandatory Sections

Deferred to manual review (Phase 1.2).

---

## Phase 1.1.3 — Forbidden Narrative Patterns (F1–F4)

### F1: Implementation Prescription

| File | Finding | Verdict |
|:---|:---|:---|
| runtime-trace-format.md | "Step 1: Read error logs" (in JSON example) | ✅ PASS (example data) |
| l3-execution-orchestration.md | "Step 1/Step 2" (in Mermaid diagram) | ✅ PASS (diagram label) |
| trace-module.md | "segment_1: Step 1 execution" (diagram) | ✅ PASS (diagram label) |

**Analysis**: All "Step" instances are in code examples or diagrams, not prescriptive prose.
**Verdict**: ✅ PASS (0 hard F1 hits)

---

### F2: Capability Packaging

| File | Finding | Verdict |
|:---|:---|:---|
| schema-conventions.md | "Extensibility: Clear extension points" | ⚠️ REVIEW (borderline) |
| semantic-alignment-overview.md | "Benefits for Implementers" section | ⚠️ REVIEW (borderline) |

**Analysis**: 
- schema-conventions.md: Describes schema design, not marketing
- semantic-alignment-overview.md: Section heading uses "Benefits" but content is technical

**Verdict**: ⚠️ MINOR (2 borderline, recommend REWORD section title)

---

### F3: Endorsement Drift

| File | Finding | Verdict |
|:---|:---|:---|
| network-module.md | "not yet included in official SDK" | ✅ PASS (negative) |
| semantic-alignment-overview.md | "does not...serve as compliance or certification basis" | ✅ PASS (disclaimer) |

**Analysis**: All F3 matches are negative disclaimers (correct usage).
**Verdict**: ✅ PASS (0 F3 violations)

---

### F4: Authority Inversion

No automated scan performed. Deferred to Phase 1.2 manual review.

---

## Summary

| Check | Result |
|:---|:---:|
| 1.1.1 Frontmatter | ✅ PASS |
| 1.1.3 F1 | ✅ PASS |
| 1.1.3 F2 | ⚠️ MINOR (2 borderline) |
| 1.1.3 F3 | ✅ PASS |
| 1.1.3 F4 | Deferred |

**Gate Status**: Ready for Phase 1.2 (Manual Review)

---

**Evidence ID**: DGA-SCAN-2026-01-05-01
