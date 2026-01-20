# METHOD-LINKMAP-01 — Four-Entry Link Integrity Audit

> **Governance Method**
>
> Version: 1.0.0
> Status: DRAFT
> Authority: Documentation Governance
> Effective: 2026-01-20
>
> Note: This method document is governance-only; it does not participate in CONST-002 content frontmatter authority enums.

---

## 1. Purpose

Ensure all internal and cross-surface hyperlinks across the four entry points remain:

1. **Resolvable** — No 404/route breaks
2. **Stable** — Canonical targets; pinned where appropriate
3. **Semantically correct** — Under the four-entry boundary model:
   - **Website** = Discovery & Positioning
   - **Docs** = Specification & Reference
   - **Repo** = Source of Truth (SSOT)
   - **Validation Lab** = Evidence & Adjudication

This method prevents:
- Dead links / broken routes
- Cross-surface authority leakage
- Semantic collisions (Flow vs LG vs Ruleset terminology drift)
- "Certification / endorsement / ranking" misreads

---

## 2. Scope

### 2.1 Default Audit Scope

| Phase | Scope | Priority |
|:---|:---|:---:|
| **Phase 2A** | `docs/docs/evaluation/**` | 🔴 Critical |
| Phase 2B | All `docs/docs/**` | 🟡 High |
| Phase 2C | Website + Lab cross-surface | 🟢 Medium |

### 2.2 Link Classification

| Kind | Target | Example |
|:---|:---|:---|
| `DOCS_INTERNAL` | Relative/site-absolute docs links | `./x`, `/docs/...` |
| `WEBSITE` | `mplp.io` domain | `https://www.mplp.io/...` |
| `LAB` | `lab.mplp.io` or Lab repo | `https://lab.mplp.io/...` |
| `REPO` | GitHub source host | `github.com/Coregentis/...` |
| `EXTERNAL` | Other domains | Standards, references |

---

## 3. Required Outputs

### 3.1 Link Map Export

File: `governance/exports/docs-link-map.json`

Schema:
```json
{
  "source_path": "string",
  "source_doc_id": "string",
  "link_text": "string",
  "target_url": "string",
  "target_kind": "DOCS_INTERNAL|WEBSITE|LAB|REPO|EXTERNAL",
  "target_expected_role": "discovery|spec|ssot|evidence|reference",
  "check_status": "PASS|FAIL|SKIP",
  "http_status": "number",
  "notes": "string"
}
```

### 3.2 Audit Report

File: `governance/audits/AUDIT-LINKMAP-<YYYY-MM-DD>.md`

Required content:
- Scope, toolchain, commands
- Summary counts (total, by kind, failures)
- Failure list with source lines
- Approved exceptions

---

## 4. Execution Procedure

### Step 1 — Build-Time Internal Link Validation

```bash
pnpm -C docs build
```

**PASS criteria:** Build SUCCESS + 0 broken links

### Step 2 — External Link Resolution

Check WEBSITE/LAB/REPO/EXTERNAL links resolve (HTTP 200–399).

**Allowed exceptions:**
- Rate-limited (429) — add to allowlist
- Known blocked domains — SKIP with rationale

### Step 3 — Semantic Boundary Scan

#### 3.1 Forbidden Claims (Hard FAIL)

| Pattern | Reason |
|:---|:---|
| `certified`, `certification` | Non-certifying boundary |
| `endorsed`, `official mark` | Non-endorsement boundary |
| `ranking`, `score`, `badge` | Non-ranking boundary |
| `Lab is authoritative` | Use "Truth Source" instead |
| `upload and run`, `hosted execution` | No execution hosting |

#### 3.2 Required Anchors (Soft FAIL)

If page references `verdict_hash`, `pack_root_hash`, or `ruleset-*`:
- MUST include at least one LAB link in same section

### Step 4 — Generate Link Map

Extract all links and emit `docs-link-map.json`.

---

## 5. Gates

| Gate ID | Name | Criteria |
|:---|:---|:---|
| **Gate-LINK-01** | Docs Internal Integrity | Build PASS, broken links = 0 |
| **Gate-LINK-02** | Cross-Surface Resolution | External links resolve (200–399) |
| **Gate-LINK-03** | Four-Entry Semantic | Forbidden patterns = 0 |

---

## 6. Exception Handling

Allowlist: `governance/allowlists/ALLOW-LINKMAP-01.yaml`

Required fields:
- `target_url`
- `reason`
- `scope`
- `expires_at` (recommended)

No permanent exceptions without governance approval.

---

## 7. Non-Normative Note

This method governs **projection integrity** only. It does not define protocol semantics or adjudication rules.

---

## Document Status

| Property | Value |
|:---|:---|
| Document Type | Governance Method |
| Status | DRAFT |
| Supersedes | None |
| References | CONST-001, CONST-006, CHECKLIST-DOCS-GOV-01 |

---

**© 2026 MPGC — MPLP Protocol Governance Committee**
