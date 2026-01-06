# Website Governance

> **MPLP Website Governance System**
>
> Version: 1.0.0
> Status: ACTIVE
> Authority: MPGC

---

## Overview

This directory contains the governance framework for MPLP Website (mplp.io), ensuring website content remains:
- **Discovery & Positioning only** (Authority: None)
- **Entry-aligned** (Website ≠ Docs ≠ Repo)
- **Non-normative** (no protocol definitions)
- **Non-endorsing** (no certification claims)

---

## Gate Order

```
WG-01 → WG-02 → WG-03 → WG-04 → Freeze OK
```

| Gate | Question | Method |
|:---|:---|:---|
| **WG-01** | Entry Contract: Discovery & Positioning only? | Track A scan |
| **WG-02** | Drift Fingerprints (F1-F4) checked? | Track B adjudication |
| **WG-03** | Assertion Index for high-risk pages? | Manual review |
| **WG-04** | Outbound Authority linking correct? | Link verification |

---

## Hard Gates

| Gate ID | Name | Rule | Failure Action |
|:---|:---|:---|:---|
| **WG-01** | Entry Contract | Website = Discovery & Positioning only | REWORD / MOVE / REMOVE |
| **WG-02** | Drift Fingerprints | F1–F4 must be adjudicated | Per-fingerprint verdict |
| **WG-03** | Assertion Index | High-risk pages: every assertion indexed | FAIL if no evidence type |
| **WG-04** | Outbound Authority | Normative claims → link to docs/repo | REWORD + link-out |

---

## Drift Fingerprints (from CONST-006)

| ID | Pattern | Verdict |
|:---|:---|:---|
| **F1** | Implementation Prescription | MOVE to docs |
| **F2** | Capability Packaging | REWORD |
| **F3** | Endorsement Drift | REMOVE or strict disclaimer |
| **F4** | Authority Inversion | REWORD to positioning |

---

## High-Risk Page Categories

| Category | Description | Risk |
|:---|:---|:---|
| **W-A** | Entry & Authority Boundary | WG-01 |
| **W-B** | Conformance/Evaluation Narrative | F3 |
| **W-C** | Architecture/Layer Narrative | F4 |
| **W-D** | How-to / Adoption Steps | F1 |
| **W-E** | External Standard Mapping | F4 |

---

## Execution Evidence

Audit run records are stored in:
```
governance/05-website-governance/runs/
```

| Run ID | Date | Scope | Status |
|:---|:---|:---|:---|
| WEB-GOV-RUN-2026-01-06-01 | 2026-01-06 | Phase 1 Core Pages | In Progress |

---

## Constitutional References

| Document | Scope |
|:---|:---|
| [CONST-001](../01-constitutional/CONST-001_ENTRY_MODEL_SPEC.md) | Entry Model: Website Authority = None |
| [CONST-005](../01-constitutional/CONST-005_AUTHORING_CONSTITUTION.md) | Forbidden claims, capability/endorsement rules |
| [CONST-006](../01-constitutional/CONST-006_DOC_TYPE_OUTLINES_AND_DEPTH_RULES.md) | Drift fingerprints (F1-F4) |

---

**© 2026 MPGC — MPLP Protocol Governance Committee**
