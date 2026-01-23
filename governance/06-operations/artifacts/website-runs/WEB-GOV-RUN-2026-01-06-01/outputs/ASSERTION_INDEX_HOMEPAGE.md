---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "ASSERTION_INDEX_HOMEPAGE"
---

# WG-03 Assertion Index — Homepage (`app/page.tsx`)

> **WEB-GOV-RUN-2026-01-06-01**
> Page: Homepage
> Category: W-A (Entry & Authority), W-D (How-to)

---

## Assertion Types

| Type | Description |
|:---|:---|
| **D** | Definitional — defines what MPLP is/does |
| **C** | Capability — claims MPLP provides/supports/guarantees |
| **N** | Numeric/Quantitative — statistics, counts, measurements |
| **A** | Authority — claims about status, roadmap, certifications |

---

## Assertion Inventory

| ID | Line | Assertion (Excerpt) | Type | Evidence | Gate | Verdict |
|:---|:---:|:---|:---:|:---|:---:|:---|
| HP-A01 | 16 | "MPLP defines the canonical lifecycle semantics for AI agent systems" | D | Metadata description | WG-01, F4 | 🔴 REWORD |
| HP-A02 | 94 | "MPLP defines how agents are created, operated, audited, and decommissioned" | D | Hero copy | WG-01, F4 | 🔴 REWORD |
| HP-A03 | 98 | "Not a framework. Not a runtime. Not a platform." | — | Positioning | — | ✅ PASS |
| HP-A04 | 255 | "MPLP sits above agent frameworks and below applications" | D | Architecture section | WG-01, F4 | ⚠️ REWORD |
| HP-A05 | 346 | "Modules are not features. They are lifecycle constraints." | C | Modules section | — | ✅ PASS (positioning) |
| HP-A06 | 434 | "Governing an agent takes minutes, not months." | C | Quickstart section | — | ✅ PASS (positioning) |
| HP-A07 | 444 | `npm install @mplp/sdk-ts` | — | Code block | WG-01, F1 | 🔴 MOVE |
| HP-A08 | 454-459 | `Trace.record({ event: "intent.created", ... })` | — | Code block | WG-01, F1 | 🔴 MOVE |
| HP-A09 | 519 | "Golden Flows are not examples — they are the normative conformance tests" | D | Golden Flows section | WG-01, F4 | ⚠️ REWORD |
| HP-A10 | 548 | "MPLP provides the structural foundation for building observable and auditable agent systems" | C | Ecosystem section | F2 | ⚠️ REWORD |
| HP-A11 | 566 | "Plan → Confirm → Trace: audit-ready evidence" | — | Governance card | — | ✅ PASS (positioning) |
| HP-A12 | 636 | "Build agent systems that remain reliable, observable, and governable" | C | CTA section | — | ✅ PASS (positioning) |

---

## Summary

| Verdict | Count |
|:---|:---:|
| 🔴 REWORD/MOVE | 5 |
| ⚠️ REWORD | 3 |
| ✅ PASS | 4 |

---

## Remediation (Subject/Action Grammar)

| ID | Before | After |
|:---|:---|:---|
| HP-A01 | "MPLP defines the canonical lifecycle semantics..." | "The MPLP specification describes a lifecycle governance model for AI agent systems." |
| HP-A02 | "MPLP defines how agents are created..." | "The MPLP protocol describes how agent lifecycles may be governed. See docs for specification." |
| HP-A04 | "MPLP sits above agent frameworks..." | "The MPLP specification defines a layer that sits above frameworks..." |
| HP-A07/08 | Code blocks | REMOVE — link to docs quickstart: "Start with the 5-Min Quickstart →" |
| HP-A09 | "they are the normative conformance tests" | "they represent protocol-level verification scenarios. See docs for normative definitions." |
| HP-A10 | "MPLP provides the structural foundation..." | "The MPLP specification proposes a structural approach..." |
