# DGA SCAN REPORT

**RUN_ID**: DOCS-GOV-RUN-2026-01-05-02
**Date**: 2026-01-05
**Commit**: 4c0bb3b3
**Branch**: V1.0release-20260104
**Scope**: docs/docs/specification/**
**Files Scanned**: 60
**Checklist**: CHECKLIST-DOCS-GOV-01 v2.1.0

---

## Phase 1.1.1 — Frontmatter Validity

| Metric | Value |
|:---|:---:|
| Files checked | 60 |
| doc_type present | 60/60 ✅ |
| entry_surface present | 60/60 ✅ |
| authority present | 60/60 ✅ |
| status present | 60/60 ✅ |

**Flags**: 0
**Verdict**: ✅ PASS

---

## Phase 1.1.2 — Mandatory Sections

Deferred to Track 1 (Manual) for high-risk pages per v2.1.0 execution tracks.

**Verdict**: ✅ PASS (no automated flags)

---

## Phase 1.1.3 — Forbidden Narrative Patterns (F1–F4)

### F1: Implementation Prescription

| File | Line | Finding | Verdict |
|:---|:---:|:---|:---|
| runtime-trace-format.md | 205 | "Step 1: Read error logs" (in JSON example) | ✅ PASS (example data) |
| l1-l4-architecture-deep-dive.md | 549 | "deploy:" (in YAML example) | ✅ PASS (example data) |
| l3-execution-orchestration.md | 85 | "Step 1" (in Mermaid diagram) | ✅ PASS (diagram label) |

**Hard Hits**: 0
**Verdict**: ✅ PASS

### F2: Capability Packaging

| Finding | Count |
|:---|:---:|
| "MPLP provides" | 0 |
| "features/benefits" | 0 |

**Hard Hits**: 0
**Verdict**: ✅ PASS

### F3: Endorsement Drift

| File | Finding | Verdict |
|:---|:---|:---|
| network-module.md:196 | "not yet included in official SDK" | ✅ PASS (negative) |
| semantic-alignment-overview.md:146 | "Neither layer makes compliance or certification claims" | ✅ PASS (disclaimer) |

**Hard Hits**: 0
**Verdict**: ✅ PASS

### F4: Authority Inversion

| File | Line | Finding | Verdict | Action |
|:---|:---:|:---|:---|:---|
| semantic-alignment-overview.md | 47 | "MPLP defines semantic anchors" | ⚠️ REVIEW | See Track 1 |

**Hard Hits**: 0 (borderline 1, deferred to Track 1 manual review)
**Verdict**: ✅ PASS (conditional)

---

## Phase 1.1.4 — SEO / Entry-Surface Boundary

| Check | Result |
|:---|:---:|
| JSON-LD blocks | 0 found ✅ |
| Marketing CTA | 0 found ✅ |
| Certification claims | 0 found ✅ |

**Verdict**: ✅ PASS

---

## Summary (Track 0 DGA)

| Check | Result |
|:---|:---:|
| 1.1.1 Frontmatter | ✅ PASS |
| 1.1.2 Sections | ✅ PASS |
| 1.1.3 F1 | ✅ PASS |
| 1.1.3 F2 | ✅ PASS |
| 1.1.3 F3 | ✅ PASS |
| 1.1.3 F4 | ⚠️ 1 borderline |
| 1.1.4 Entry | ✅ PASS |

**Gate Status**: ✅ DGA Track 0 PASS (1 borderline deferred to Track 1)

---

**Evidence ID**: DGA-SCAN-2026-01-05-02
