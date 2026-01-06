# WG_DRIFT_FINDINGS — WEB-GOV-RUN-2026-01-06-01

> **Track A: Drift Evidence Log**
> Date: 2026-01-06

---

## F1 — Implementation Prescription Drift

| File | Line | Evidence | Verdict | Remediation |
|:---|:---:|:---|:---|:---|
| `app/page.tsx` | 444 | `npm install @mplp/sdk-ts` | 🔴 MOVE | Remove code block, link to docs quickstart |
| `app/adoption/page.tsx` | 113 | `pip install mplp-sdk` | MOVE | Remove, link to docs |
| `app/adoption/page.tsx` | 128 | `npm install @mplp/sdk-ts` | MOVE | Remove, link to docs |
| `app/governance/governed-stack/page.tsx` | 182-199 | "Step 1/Step 2" structure | REWORD | Rephrase as conceptual overview |

---

## F2 — Capability Packaging Drift

| File | Line | Evidence | Verdict | Remediation |
|:---|:---:|:---|:---|:---|
| `app/page.tsx` | 548 | "MPLP provides the structural foundation" | REWORD | → "MPLP proposes a structural approach" |
| `app/why-mplp/page.tsx` | 16 | "MPLP provides a standardized lifecycle" | REWORD | → "MPLP positions a lifecycle model" |
| `app/references/page.tsx` | 110,147 | "MPLP provides a protocol-level vocabulary" | REWORD | → "MPLP describes / offers" |

---

## F3 — Endorsement Drift

| File | Line | Evidence | Verdict | Remediation |
|:---|:---:|:---|:---|:---|
| `app/compliance/page.tsx` | — | Page title "Protocol Compliance" | REWORD | → "Conformance Model (Informative)" |
| `app/compliance/page.tsx` | 27 | "MPLP compliance levels" | REWORD | → "MPLP conformance model" |

**Note**: ISO/NIST pages already have non-endorsement disclaimers ✅

---

## F4 — Authority Inversion Drift

| File | Line | Evidence | Verdict | Remediation |
|:---|:---:|:---|:---|:---|
| `app/page.tsx` | 16 | "MPLP defines the canonical lifecycle semantics" | 🔴 REWORD | → "MPLP is an open protocol for..." |
| `app/page.tsx` | 94 | "MPLP defines how agents are created, operated, audited, and decommissioned" | 🔴 REWORD | → "MPLP positions a lifecycle model for AI agent systems. See docs for specification." |
| `app/architecture/page.tsx` | 50 | "MPLP defines a strict four-layer architecture" | REWORD | → "MPLP describes..." + ADD positioning disclaimer |
| `app/why-mplp/page.tsx` | 96 | "MPLP defines a clear lifecycle" | REWORD | → "MPLP proposes a clear lifecycle model" |
| `app/enterprise/page.tsx` | 214 | "MPLP defines three structural primitives" | REWORD | → "MPLP describes..." |
| `app/faq/page.tsx` | 50 | "MPLP defines the canonical lifecycle" | REWORD | → "MPLP describes..." |

---

## Summary by Page (Phase 1)

### `app/page.tsx` (Homepage)
- **F1**: 1 hit (npm install)
- **F2**: 1 hit (provides)
- **F4**: 2 hits (defines)
- **Verdict**: 🔴 P0 — Requires immediate remediation

### `app/compliance/page.tsx`
- **F3**: 2 hits (compliance terminology)
- **Verdict**: 🔴 P0 — Rename to /conformance, add Non-Certification Notice

### `app/why-mplp/page.tsx`
- **F2**: 1 hit (provides)
- **F4**: 1 hit (defines)
- **Verdict**: 🟡 P1 — REWORD

### `app/architecture/page.tsx`
- **F4**: 1 hit (defines)
- **Verdict**: 🟡 P1 — ADD positioning disclaimer

---

**Track A Complete — Proceed to Track B Manual Adjudication**
