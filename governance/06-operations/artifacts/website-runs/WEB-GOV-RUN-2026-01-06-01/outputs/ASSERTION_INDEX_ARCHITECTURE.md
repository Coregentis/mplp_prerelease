---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "ASSERTION_INDEX_ARCHITECTURE"
---

# WG-03 Assertion Index — Architecture Page (`app/architecture/page.tsx`)

> **WEB-GOV-RUN-2026-01-06-01**
> Page: Architecture
> Category: W-C (Layer Narrative)

---

## Assertion Inventory

| ID | Line | Assertion (Excerpt) | Type | Evidence | Gate | Verdict |
|:---|:---:|:---|:---:|:---|:---:|:---|
| AR-A01 | 16-17 | "Defines the layered protocol architecture of MPLP" | D | Meta description | F4 | ⚠️ REWORD |
| AR-A02 | 50 | "MPLP defines a strict four-layer architecture (L1–L4)" | D | Subtitle | WG-01, F4 | 🔴 REWORD |
| AR-A03 | 58 | "A layered separation of protocol semantics, governance, execution, and integration" | — | Section copy | — | ✅ PASS (descriptive) |
| AR-A04 | 67-78 | L1 Core Protocol description | D | Content | F4 | ⚠️ ADD "positioning only" |
| AR-A05 | 82-97 | L2 Coordination description | D | Content | F4 | ⚠️ ADD "positioning only" |
| AR-A06 | 101-116 | L3 Execution description | D | Content | F4 | ⚠️ ADD "positioning only" |
| AR-A07 | 120-136 | L4 Integration description | D | Content | F4 | ⚠️ ADD "positioning only" |
| AR-A08 | 144 | "Protocol-level responsibilities that apply across L1–L3" | D | Section copy | — | ✅ PASS |
| AR-A09 | 148-152 | Duties list | — | Content | — | ✅ PASS (informative) |

---

## Summary

| Verdict | Count |
|:---|:---:|
| 🔴 REWORD | 1 |
| ⚠️ REWORD / ADD | 5 |
| ✅ PASS | 3 |

---

## Remediation

### Positioning Disclaimer (Required - First Screen)

Add below PageHeader:
```markdown
> **Positioning Summary**
> This page provides a high-level overview of the MPLP architecture model.
> For normative layer definitions and schema specifications, see [docs.mplp.io](https://docs.mplp.io).
> Source of truth: [Repository](https://github.com/Coregentis/MPLP-Protocol).
```

### Subject/Action Grammar Fixes

| ID | Before | After |
|:---|:---|:---|
| AR-A01 | "Defines the layered protocol architecture" | "Describes the layered architecture model" |
| AR-A02 | "MPLP defines a strict four-layer architecture" | "The MPLP specification describes a four-layer architecture model" |

### Layer Card Treatment

Each L1/L2/L3/L4 card should:
1. Add footer: `Positioning only — see docs for specification`
2. Link to corresponding docs page
