---
id: CHECKLIST-DOCS-GOV-01
title: Docs Governance Execution Checklist (DGA → DTAA → DTV)
status: ready
authority: MPGC
entry_surface: repository
doc_type: governance
version: 1.0.0
effective: 2026-01-05
---

# CHECKLIST-DOCS-GOV-01 — Docs Governance Execution

**Gate Order**: DGA → DTAA → DTV → Freeze OK  
**Default Scope**: `docs/docs/specification/**` (100%)  
**Evidence Root**: `artifacts/audits/docs-gov/<RUN_ID>/`

---

## 0. Governing References (MUST READ)

| Ref | Document | Purpose |
|:---|:---|:---|
| CONST-001 | Entry Authority | Repo > Docs > Website |
| CONST-003 | Frozen Header Spec | Meaning & preconditions |
| CONST-005 | Authoring Constitution | Semantic change forbidden; change classes |
| CONST-006 | Doc Type Outlines | Layer boundaries; entry contracts; F1–F4 |
| METHOD-DGA-01 | Narrative Audit | Drift fingerprints |
| METHOD-DTAA-01 | Truth Alignment | Semantic purity |
| METHOD-DTV-01 | Truth Verification | Evidence binding |
| SOP-DTAA-06 | Remediation SOP | Patch logging |

> **Rule**: Any checklist step that cannot cite one of the above is invalid.

---

# Phase 0 — Run Initialization (REQUIRED)

## 0.1 Create RUN_ID
- [ ] Format: `DOCS-GOV-RUN-YYYY-MM-DD-XX`
- [ ] Output: `inputs/RUN_CONTEXT.md`
- **PASS**: RUN_ID used consistently in all outputs

## 0.2 Freeze Input State
- [ ] Record git commit hash
- [ ] Record branch
- [ ] Record protocol version (v1.0.0)
- [ ] Record docs target scope
- [ ] Output: `inputs/RUN_CONTEXT.md`
- **PASS**: Reproducible checkout possible

## 0.3 Create Evidence Directory Skeleton
- [ ] Create `inputs/` `outputs/` `logs/`
- **PASS**: Directories exist

---

# Phase 1 — DGA Gate (Narrative & Entry Alignment) [Hard Gate]

## 1.1 Track A — Structural Compliance Scan

### 1.1.1 Frontmatter Validity
- [ ] Check: every doc has `doc_type`, `entry_surface`, `authority`, `status`
- [ ] Rule: values consistent with location
- **PASS**: 100% present & valid
- **FAIL**: Flag to `outputs/DGA_FLAGS_FRONTMATTER.md`
- **Ref**: CONST-006 §3; METHOD-DGA-01 §2.1

### 1.1.2 Mandatory Sections Present
- [ ] Check: required sections exist per doc_type
- **PASS**: missing=0
- **FAIL**: Log missing sections
- **Output**: `outputs/DGA_FLAGS_SECTIONS.md`
- **Ref**: CONST-006 §2; METHOD-DGA-01 §2.1

### 1.1.3 Forbidden Narrative Patterns (F1–F4)
- [ ] F1: Implementation Prescription (Step 1/2/3; build guides)
- [ ] F2: Capability Packaging (features/benefits)
- [ ] F3: Endorsement Drift (tiering, certification claims)
- [ ] F4: Authority Inversion (definitions in prose)
- **PASS**: 0 hard hits
- **FAIL**: Produce drift findings with excerpt
- **Outputs**: `outputs/DGA_SCAN_REPORT.md`, `outputs/DGA_DRIFT_FINDINGS.md`
- **Ref**: CONST-006 §4; METHOD-DGA-01 §3

## 1.2 Track B — Narrative Adjudication (Manual)

### 1.2.1 Layer Boundary Check
- [ ] L1/L2/L3/L4 boundaries respected
- **PASS**: No layer-overreach
- **FAIL**: Verdict MOVE/REWORD/REMOVE
- **Ref**: CONST-006 §1; METHOD-DGA-01 §2.2

### 1.2.2 Entry Surface Contract Check
- [ ] Docs ≠ Website ≠ Repo narrative
- **PASS**: No marketing/certification narrative
- **FAIL**: Verdict MOVE/REWORD
- **Output**: `outputs/DGA_ADJUDICATION_TABLE.md`
- **Ref**: CONST-006 §3; METHOD-DGA-01 §2.2

> **Gate Exit**: No unresolved FINDING; all pages PASS or have REWORD/MOVE plan

---

# Phase 2 — DTAA Gate (Semantic Purity) [Hard Gate]

## 2.1 Authority / Frozen Legality
- [ ] Informative docs: no frozen header (use Authority Block)
- [ ] Normative docs: meet CONST-003 preconditions
- **PASS**: 100% legal
- **Output**: `outputs/DTAA_FLAGS_AUTHORITY.md`
- **Ref**: CONST-003 §4, §7.1; CONST-005

## 2.2 Semantic Violations Scan
- [ ] No new definitions in prose
- [ ] No new layers/modules/flows
- [ ] No normative claims without evidence
- **PASS**: 0 violations
- **Output**: `outputs/DTAA_SCAN_REPORT.md`
- **Ref**: METHOD-DTAA-01; CONST-005

## 2.3 Normative Language Control (MUST/SHALL)
- [ ] MUST/SHALL only if schema-derived + anchored
- [ ] Informative: downgrade or add disclaimer
- **PASS**: 0 unanchored MUST/SHALL
- **Outputs**: `outputs/DTAA_POINTER_MAP.md`, `outputs/DTAA_POINTERS_PATCHLOG.md`
- **Ref**: METHOD-DTAA-01; SOP-DTAA-06

> **Gate Exit**: Semantic violations=0; authority legality=100%

---

# Phase 3 — DTV Gate (Truth Verification) [Hard Gate]

## 3.1 Pointer Existence Verification
- [ ] Every evidence block: schema file exists
- [ ] JSON Pointer resolves
- **PASS**: resolved=100%
- **Output**: `outputs/DTV_POINTER_VALIDITY.md`
- **Ref**: METHOD-DTV-01 §2.1

## 3.2 Example Validity Verification
- [ ] JSON/YAML examples validate against schema
- **PASS**: FAIL=0 or marked non-normative
- **Output**: `outputs/DTV_EXAMPLE_VALIDITY.md`
- **Ref**: METHOD-DTV-01 §2.2

## 3.3 Implementation Reference Validity
- [ ] SDK/code references exist
- [ ] Version matches
- **PASS**: All resolvable or disclaimed
- **Output**: `outputs/DTV_IMPLEMENTATION_REF_VALIDITY.md`
- **Ref**: METHOD-DTV-01 §2.3

> **Gate Exit**: Pointer 100%; examples 100%; refs verifiable

---

# Phase 4 — Remediation & Re-run

## 4.1 Remediation Order
1. [ ] Fix DGA findings (MOVE/REWORD)
2. [ ] Fix DTAA (authority, anchoring)
3. [ ] Fix DTV (pointer/example validity)
4. [ ] Re-run Phase 1–3
- **Output**: `outputs/REMEDIATION_LOG.md`
- **Ref**: SOP-DTAA-06; CONST-005 §9

---

# Phase 5 — Freeze Declaration

## 5.1 Generate Freeze Record
- [ ] Output: `outputs/DOCS_GOV_FREEZE_DECLARATION.md`
- [ ] Include: scope, counts, artifact list, metrics
- **Ref**: CONST-003; CONST-005; METHOD-DTAA-01

## 5.2 Sign-off
| Role | Date | Signature |
|:---|:---|:---|
| Auditor | | |
| Reviewer (MPGC) | | |

---

# Appendix — Verdict Vocabulary

| Verdict | Meaning |
|:---|:---|
| **PASS** | Compliant |
| **REWORD** | Minor drift, fix in place |
| **MOVE** | Wrong location |
| **REMOVE** | Irreparable |
| **ESCALATE** | MPGC required |

---

**Document Status**: Ready for Execution
**References**: CONST-001~006, METHOD-DGA-01, METHOD-DTAA-01, METHOD-DTV-01, SOP-DTAA-06
