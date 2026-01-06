# WEBSITE ↔ DOCS Jump Map

**Run ID**: WEB-GOV-RUN-2026-01-06-01  
**Status**: REQUIRED (P1) — READY TO FREEZE  
**Authority**: MPGC  
**Scope**: Phase 1 + Phase 3 Governance Closure  
**Last Updated**: 2026-01-06

---

## Purpose

This document defines the authoritative mapping between:
- **Website** (www.mplp.io) — Discovery & Positioning
- **Docs** (docs.mplp.io) — Normative Definitions
- **Repo** (github.com/Coregentis/MPLP-Protocol) — Source of Truth

Per **CONST-001**, any page that cannot map to both Docs and Repo is considered high-risk.

---

## Mapping Table

| Website Path | Page Role (Website) | Primary Docs Link (Normative) | Repo Truth Link | WG-04 Link-Out | F1-F4 Risk Notes |
|---|---|---|---|---|---|
| `/definition` | Canonical positioning anchor | `DOCS_URLS.overview` | `REPO_URLS.root` | `/definition` + docs + repo | Canonical analogy: POSIX-like. Must remain F2-only. |
| `/architecture` | Positioning summary of architecture model | `DOCS_URLS.architecture` | `REPO_URLS.schemas` | docs + repo (+ definition) | Must keep disclaimer; avoid "defines" language |
| `/modules` | Registry overview | `DOCS_URLS.home` (modules index) | `REPO_URLS.schemas` | docs + repo | No MUST/SHALL; no implementation steps |
| `/kernel-duties` | Cross-cutting duties overview | `DOCS_URLS.l1ToL4` | `REPO_URLS.schemas` | docs + repo | Avoid turning duties into "features" |
| `/golden-flows` | Verification scenario overview | `DOCS_URLS.goldenFlows` | `REPO_URLS.tests` | docs + repo | Evidence-based; no certification language |
| `/conformance` | Informational overview only | `DOCS_URLS.conformance` | `REPO_URLS.tests` | docs + repo + NonCertificationNotice | No tiers/badges; no "pass" marketing |
| `/governance/overview` | Governance positioning | `DOCS_URLS.governance` | `REPO_URLS.governance` | docs + repo | Website does not define governance rules |
| `/references` | Pointer hub | `DOCS_URLS.home` | `REPO_URLS.root` | docs + repo | Must list consolidated/redirected pages |
| `/faq` | FAQ (website-only) | `DOCS_URLS.overview` | `REPO_URLS.root` | docs + repo | FAQ must not restate normative requirements |

---

## Anchor Pages (7 Frozen Navbar Items)

| Anchor # | Path | NextSteps Keys |
|---|---|---|
| 1 | `/architecture` | `docsKey: "architecture"`, `repoKey: "schemas"` |
| 2 | `/modules` | `docsKey: "home"`, `repoKey: "schemas"` |
| 3 | `/kernel-duties` | `docsKey: "l1ToL4"`, `repoKey: "schemas"` |
| 4 | `/golden-flows` | `docsKey: "goldenFlows"`, `repoKey: "tests"` |
| 5 | `/governance/overview` | `docsKey: "governance"`, `repoKey: "governance"` |
| 6 | `/references` | `docsKey: "home"`, `repoKey: "root"` |
| 7 | `/faq` | `docsKey: "overview"`, `repoKey: "root"` |

---

## Additional Pages (Non-Navbar)

| Path | NextSteps Keys | Notes |
|---|---|---|
| `/definition` | `docsKey: "overview"`, `repoKey: "root"` | Canonical anchor; always linked from other pages |
| `/conformance` | `docsKey: "conformance"`, `repoKey: "tests"` | Must include NonCertificationNotice |
| `/why-mplp` | `docsKey: "overview"`, `repoKey: "root"` | Positioning only |
| `/ecosystem` | `docsKey: "sdkDocs"`, `repoKey: "root"` | SDK links |
| `/enterprise` | `docsKey: "overview"`, `repoKey: "root"` | Evaluation guide |

---

## Consolidated/Redirected Pages

Per WG-04, the following pages have been consolidated. They should be listed in `/references` for transparency:

| Original Path | Destination | Reason |
|---|---|---|
| `/adoption` | docs: quickstart | Adoption guidance moved to docs |
| `/compliance` (route) | `/conformance` | Terminology standardization |

---

## Verification Checklist

- [ ] All anchor pages include `NextSteps` component
- [ ] All anchor pages include `CanonicalReferences` component
- [ ] All `docsKey` values resolve to valid `DOCS_URLS` entries
- [ ] All `repoKey` values resolve to valid `REPO_URLS` entries
- [ ] No hardcoded `docs.mplp.io` URLs outside of `site-config.ts`

---

## Governance Gate

This document is a **freezable artifact**. Any new page added to the website must:

1. Have an entry in this mapping table
2. Specify valid `docsKey` and `repoKey`
3. Pass WG-04 link-out requirements
4. Not trigger F1-F4 risk indicators

Failure to comply = page rejected from production.
