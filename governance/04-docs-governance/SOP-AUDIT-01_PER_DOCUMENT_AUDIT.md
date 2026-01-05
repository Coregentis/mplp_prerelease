# SOP-AUDIT-01 — Per-Document Governance Audit Execution

**Version**: 1.0.0
**Authority**: MPGC
**Reference**: CHECKLIST-DOCS-GOV-01 v2.1.0
**Status**: ACTIVE

---

## Purpose

This SOP defines the **mandatory execution steps** for auditing any individual document in the MPLP specification corpus. Any AI or human auditor MUST follow this SOP exactly. **Deviation is not permitted.**

---

## Scope

| Batch | Directory | Priority | Track |
|:---:|:---|:---|:---|
| 1 | `architecture/` | 🔴 Critical | Track 1 (100%) |
| 2 | `architecture/cross-cutting-kernel-duties/` | 🔴 Critical | Track 1 (100%) |
| 3 | `golden-flows/` | 🔴 Critical | Track 1 (100%) |
| 4 | `evaluation/`, `semantic-alignment-overview.md` | 🟠 High | Track 1 (100%) |
| 5 | `modules/` | 🟡 Medium | Track 0 + Track 1b |

---

## Auditor Constraints

> [!CAUTION]
> **You are NOT an author. You are an AUDIT EXECUTOR.**

### Permitted Actions
- ✅ Extract metadata
- ✅ Scan for drift patterns
- ✅ Classify assertions
- ✅ Issue Verdicts (PASS/REWORD/MOVE/REMOVE)

### Forbidden Actions
- ❌ Modify document content
- ❌ Explain or interpret MPLP
- ❌ Optimize language or style
- ❌ Give PASS without filling all tables
- ❌ Skip any sentence
- ❌ Use phrases like "I think", "seems reasonable", "basically correct"

---

## Execution Steps (Mandatory Sequence)

### Step 0 — Initialize Audit Record

Create output file: `<RUN_ID>__AUDIT_<filename>.md`

Record:
```yaml
file: <filename>
path: <full path>
audit_date: YYYY-MM-DD
auditor: AI / <name>
checklist_version: v2.1.0
```

---

### Step 1 — Extract Metadata

From frontmatter, extract and record:

| Field | Value | Valid? |
|:---|:---|:---:|
| doc_type | | |
| claimed_layer | | |
| entry_surface | | |
| authority | | |
| status | | |

**Gate**: If any required field is missing → FAIL immediately.

---

### Step 2 — DGA Structural Check

#### 2.1 Mandatory Sections

Check presence of required sections per doc_type (ref: CONST-006):

| Section | Present? |
|:---|:---:|
| Purpose / Scope | |
| Authoritative Reference | |
| Evidence Block | |
| (doc_type specific) | |

#### 2.2 Drift Fingerprint Scan (F1-F4)

| Fingerprint | Pattern | Found? | Location | Verdict |
|:---|:---|:---:|:---|:---|
| F1 | "step by step", "deploy", "install" | | | |
| F2 | "MPLP provides", "features", "benefits" | | | |
| F3 | "certified", "compliant", "must pass" | | | |
| F4 | "MPLP defines", "we define" | | | |

> [!IMPORTANT]
> Any F1-F4 hit in prose (not example/diagram) → REWORD or FAIL

#### 2.3 Subject/Action Grammar Test

For each major paragraph, check:

| Paragraph | Subject | Is MPLP? | Action | MPLP as executor? | Verdict |
|:---|:---|:---:|:---|:---:|:---|
| P1 | | | | | |
| P2 | | | | | |
| ... | | | | | |

**Rule**: 
- Subject MUST be: protocol / specification / schema / invariant / constraint
- Subject MUST NOT be: MPLP / system / framework / platform / runtime
- Action executor MUST NOT be MPLP (MPLP constrains, does not execute)

> [!CAUTION]
> If Subject = "MPLP" or Action implies "MPLP does X" → FAIL

---

### Step 3 — DTAA Semantic Check

#### 3.1 New Concept Introduction

Scan for:
- Definitions not anchored to schema
- New layers/modules/flows not in schema
- Normative claims without evidence pointer

| Finding | Location | Anchored? | Action |
|:---|:---|:---:|:---|
| | | | |

**Rule**: Any unanchored definition → FAIL

#### 3.2 Normative Language Control

Scan for MUST/SHALL/REQUIRED/SHOULD:

| Statement | Keyword | Anchored to | Verdict |
|:---|:---|:---|:---|
| | | | |

**Rule**: 
- Normative doc: MUST/SHALL must point to invariant/schema
- Informative doc: MUST/SHALL must be downgraded or disclaimed

---

### Step 4 — DTV Assertion Index (CRITICAL)

> [!IMPORTANT]
> This step is MANDATORY for all high-risk pages. Every factual statement must be classified.

Extract ALL sentences that are:
- **Numeric**: quantities, percentages, limits, thresholds
- **Normative**: MUST, SHALL, REQUIRED, SHOULD, MAY
- **Definitional**: "X is", "X means", "X refers to", "defined as"

For each assertion:

| # | Assertion | Type | Evidence Type | Source | Pointer | Verifiable | Action |
|:---|:---|:---|:---|:---|:---|:---:|:---|
| A1 | | N/D/Def | Schema/Invariant/Constitutional/Method/Impl/Test/Interpretive | | | | |
| A2 | | | | | | | |
| ... | | | | | | | |

**Evidence Types**:
- **Schema**: schemas/v2/*.schema.json
- **Invariant**: invariants/*.yaml
- **Constitutional**: governance/01-constitutional/CONST-*
- **Method**: governance/*/METHOD-*
- **Implementation**: packages/npm/sdk-ts, packages/pypi/mplp-sdk
- **Test**: artifacts/evidence/*
- **Interpretive**: No anchor (must be disclaimed)

**Actions**:
- `anchor`: Add/verify pointer
- `downgrade`: Change to non-normative language
- `disclaimer`: Add interpretive disclaimer
- `remove`: Delete assertion

> [!CAUTION]
> Any assertion without Evidence Type → FAIL
> Any unverifiable assertion without disclaimer → FAIL

---

### Step 5 — Final Verdict

Based on all checks, issue ONE verdict:

| Verdict | Meaning | Next Action |
|:---|:---|:---|
| **PASS** | All checks passed, all tables complete | Proceed to freeze |
| **REWORD** | Drift or grammar issues, fixable | Generate patch, re-audit |
| **MOVE** | Wrong layer, wrong doc_type | Relocate content |
| **REMOVE** | Unfixable violation | Delete content |

**Verdict Rules**:
- PASS requires ALL tables filled with zero failures
- PASS is NOT allowed if ANY cell is empty or marked "⚠️"
- REWORD must include specific line numbers and replacement text

---

## Output Format

Each document audit produces:

```
<RUN_ID>__AUDIT_<filename>.md
├── §1 Metadata
├── §2 DGA Check
│   ├── 2.1 Sections
│   ├── 2.2 Drift Fingerprints
│   └── 2.3 Subject/Action Test
├── §3 DTAA Check
│   ├── 3.1 New Concepts
│   └── 3.2 Normative Language
├── §4 Assertion Index
├── §5 Verdict
└── §6 Remediation (if REWORD/MOVE/REMOVE)
```

---

## Batch Completion Gate

A batch (directory) is complete when:
- 100% of files have audit records
- 0 files have FAIL verdict without remediation plan
- All REWORD patches generated
- Aggregate summary produced

---

## References

- CHECKLIST-DOCS-GOV-01 v2.1.0
- HIGH_RISK_PAGES_REGISTRY.md
- CONST-006_DOC_TYPE_OUTLINES_AND_DEPTH_RULES.md
- PATTERN-LIBRARY-DOCS-01.md

---

**SOP Status**: ACTIVE
