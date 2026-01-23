---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "WEBSITE_REMEDIATION_LOG"
---

# WEBSITE_REMEDIATION_LOG — WEB-GOV-RUN-2026-01-06-01

> **Change Journal**
> Date: 2026-01-06
> Status: Ready for Execution
> Grammar: Subject/Action v2 ("The MPLP specification describes" not "MPLP is/positions")

---

## Grammar Rules (Mandatory)

| ❌ Forbidden | ✅ Required |
|:---|:---|
| "MPLP defines …" | "The MPLP specification describes …" |
| "MPLP provides …" | "The specification describes …" |
| "MPLP is an open protocol …" | "The MPLP protocol documentation describes …" |
| "MPLP positions …" | (avoid — still suggests agency) |

---

## 🔴 P0 — Critical

### Homepage (`app/page.tsx`)

| ID | Line | Before | After | Gate |
|:---|:---:|:---|:---|:---|
| HP-01 | 16 | "MPLP defines the canonical lifecycle semantics for AI agent systems" | "The MPLP specification describes a lifecycle governance model for agent systems." | WG-01, F4 |
| HP-02 | 94 | "MPLP defines how agents are created, operated, audited, and decommissioned" | "The MPLP protocol describes how agent lifecycles may be governed. See docs for specification." | WG-01, F4 |
| HP-03 | 444-459 | SDK code block (`npm install` + `Trace.record`) | **REMOVE entirely** — keep only: `<Button href="...">Start with the 5-Min Quickstart →</Button>` | WG-01, F1 |
| HP-A09 | 519 | "they are the normative conformance tests" | "they represent protocol-level verification scenarios. See docs for normative definitions." | F4 |
| HP-04 | 548 | "MPLP provides the structural foundation" | "The specification describes a structural approach for observable, auditable agent systems." | F2 |
| HP-05 | Footer | (none) | **ADD** Positioning Notice component (see template below) | WG-04 |

### Conformance Page (`app/compliance/` → `app/conformance/`)

| ID | Action | Details | Gate |
|:---|:---|:---|:---|
| CP-00 | RENAME | Directory: `app/compliance/` → `app/conformance/` | F3 |
| CP-01 | REWORD | Page title: "Protocol Compliance" → "Conformance Model (Informative)" | F3 |
| CP-02 | REWORD | Metadata description: all "compliance" → "conformance" | F3 |
| CP-03 | ADD | **Non-Certification Notice** at page header (see template) | WG-04, F3 |
| CP-04 | OPTION A | **REMOVE** L1/L2/L3 tier detail cards. Replace with: "The MPLP specification describes a three-level conformance model. See [docs](https://docs.mplp.io) for normative definitions." | F3 |
| CP-05 | REWORD | CTA: "Run Test Suite" → "Explore verification evidence in documentation" | F3 |

---

## 🟡 P1 — Important

### Why-MPLP (`app/why-mplp/page.tsx`)

| ID | Line | Before | After | Gate |
|:---|:---:|:---|:---|:---|
| WM-01 | 16 | "MPLP provides a standardized lifecycle" | "The MPLP specification describes a lifecycle model for multi-agent systems." | F2 |
| WM-02 | 89 | "MPLP solves these problems by defining a vendor-neutral standard" | "The MPLP specification proposes a vendor-neutral approach to these challenges. See docs for protocol details." | F2, F4 |
| WM-03 | 96 | "MPLP defines a clear lifecycle" | "The MPLP protocol describes a lifecycle approach: Intent → Plan → Execute → Verify." | F4 |

### Architecture (`app/architecture/page.tsx`)

| ID | Line | Before | After | Gate |
|:---|:---:|:---|:---|:---|
| AR-01 | 17 | "Defines the layered protocol architecture" | "Describes the layered architecture model" | F4 |
| AR-02 | 50 | "MPLP defines a strict four-layer architecture" | "The MPLP specification describes a four-layer architecture model" | F4 |
| AR-03 | Header | (none) | **ADD** Positioning Disclaimer below PageHeader (see template) | WG-04 |

---

## Component Templates

### Positioning Notice (Homepage Footer)

```tsx
<div className="mt-8 pt-4 border-t border-mplp-border/30 text-center">
  <p className="text-xs text-mplp-text-muted/60">
    <strong>Positioning Notice:</strong> This website provides discovery and positioning content only.
    For normative protocol definitions, see{" "}
    <a href="https://docs.mplp.io" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
    Source of truth:{" "}
    <a href="https://github.com/Coregentis/MPLP-Protocol" className="text-mplp-blue-soft hover:underline">GitHub Repository</a>.
  </p>
</div>
```

### Non-Certification Notice (Conformance Page Header)

```tsx
<div className="mb-8 p-4 rounded-xl border border-mplp-warning/30 bg-mplp-warning/5">
  <p className="text-sm text-mplp-text-muted">
    <strong className="text-mplp-warning">Non-Certification & Non-Endorsement Notice:</strong>{" "}
    This page provides an informational overview of the MPLP conformance model.
    It does not constitute certification, endorsement, or official verification.
    For normative conformance requirements, see{" "}
    <a href="https://docs.mplp.io" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
  </p>
</div>
```

### Positioning Disclaimer (Architecture Header)

```tsx
<div className="mb-6 p-3 rounded-lg border border-mplp-border/30 bg-slate-950/30">
  <p className="text-xs text-mplp-text-muted">
    <strong>Positioning Summary:</strong> This page provides a high-level overview of the MPLP architecture model.
    For normative layer definitions, see{" "}
    <a href="https://docs.mplp.io" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
  </p>
</div>
```

---

## Freeze Conditions (Non-Negotiable)

Before signing WEBSITE_FREEZE_DECLARATION_v2:

1. **F1 = 0**: No `npm install`, `pip install`, or code blocks in Phase 1 pages
2. **F3 = 0**: No `compliance/compliant` in Phase 1 pages (all → `conformance/conformant`)
3. **F4 = 0**: No `"MPLP defines …"` in Phase 1 pages (all → `"The MPLP specification describes …"`)
4. **WG-04**: All 4 pages have disclaimer AND at least one link-out per normative paragraph

---

**Status**: ⏳ Awaiting code execution
