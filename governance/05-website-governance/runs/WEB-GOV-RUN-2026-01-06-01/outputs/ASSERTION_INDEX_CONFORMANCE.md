# WG-03 Assertion Index — Conformance Page (`app/compliance/page.tsx`)

> **WEB-GOV-RUN-2026-01-06-01**
> Page: Conformance (currently `/compliance`)
> Category: W-B (Conformance/Evaluation)

---

## Assertion Types

| Type | Description |
|:---|:---|
| **D** | Definitional — defines what conformance is |
| **C** | Capability — claims MPLP provides/supports |
| **A** | Authority — claims about certification/endorsement |
| **T** | Tier/Level — describes conformance levels |

---

## Assertion Inventory

| ID | Line | Assertion (Excerpt) | Type | Evidence | Gate | Verdict |
|:---|:---:|:---|:---:|:---|:---:|:---|
| CP-A01 | 14 | "Protocol Compliance | MPLP Standard" | A | Page title | F3 | 🔴 REWORD → "Conformance Model" |
| CP-A02 | 15 | "MPLP compliance defines schema-valid artifacts..." | D | Meta description | F3, WG-01 | 🔴 REWORD |
| CP-A03 | 27 | "MPLP compliance levels and verification requirements" | T | JSON-LD | F3 | 🔴 REWORD |
| CP-A04 | 49 | "compliance requires verifiable interoperability at the Schema (L1), Governance (L2), and Behavioral (L3) levels" | T | Subtitle | F3, WG-01 | 🔴 REWORD |
| CP-A05 | 60-77 | L1 Schema tier description with checkmarks | T | Content | F3 | ⚠️ REWORD + link-out |
| CP-A06 | 81-102 | L2 Governance tier description | T | Content | F3 | ⚠️ REWORD + link-out |
| CP-A07 | 106-127 | L3 Behavioral tier description | T | Content | F3 | ⚠️ REWORD + link-out |
| CP-A08 | 136 | "Run the MPLP Golden Test Suite to generate a compliance report" | A | CTA | F3 | 🔴 REWORD |
| CP-A09 | 154-160 | "Related Positioning" links | — | Links | — | ✅ PASS |

---

## Summary

| Verdict | Count |
|:---|:---:|
| 🔴 REWORD | 5 |
| ⚠️ REWORD + link-out | 3 |
| ✅ PASS | 1 |

---

## Remediation

### URL Rename
- `/compliance` → `/conformance`

### Non-Certification Notice (Required Header)
```markdown
> **Non-Certification & Non-Endorsement Notice**
> This page provides an informational overview of the MPLP conformance model.
> It does not constitute certification, endorsement, or official verification.
> For normative conformance requirements, see [docs.mplp.io](https://docs.mplp.io).
```

### Tier/Level Section Handling
**Option A (Recommended)**: Remove L1/L2/L3 detailed descriptions from website entirely, replace with:
> "The MPLP specification describes a three-level conformance model. See [Conformance Model Specification](https://docs.mplp.io) for normative definitions."

**Option B**: Keep high-level summaries but:
1. Remove all checkmarks (✓) — implies certification
2. Add "Informative only" label to each tier card
3. Mandatory link-out: "See docs for requirements"

### CTA Fix
| Before | After |
|:---|:---|
| "Run the MPLP Golden Test Suite to generate a compliance report" | "Explore verification evidence in the documentation" |
