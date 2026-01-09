# WG-05: Link Health Record (2026-01-09)

**Status**: `COMPLIANT` ✅  
**Governance Tag**: `WG-05-WEBSITE`  
**Tracking**: Link Health  
**Audit Date**: 2026-01-09  

---

## Record Metadata

| Field | Value |
|-------|-------|
| **Scope** | Website → Docs only (mplp.io → docs.mplp.io) |
| **Coverage** | 25 unique documentation URLs |
| **Invariant** | `broken = 0`, `redirects = 0` |
| **Change Trigger** | Docs IA changes MUST sync Website link inventory (CI Gate enforced) |
| **Tooling** | `scripts/check-doc-links.mjs` + `docs-link-gate.yml` |
| **Evidence** | `docs-link-report.json` (artifact retained 90 days) |

---

## Audit Results

**Validation Date**: 2026-01-09  
**Scanner Version**: check-doc-links.mjs v1.0  
**Methodology**: Static source scan + HTTP validation  

### Summary

- **Total URLs Checked**: 25
- **Broken Links (404/5xx)**: 0 ✅
- **Redirects (301/302)**: 0 ✅
- **HTTP 200 Success**: 25/25 (100%)

### Invariants Satisfied

1. ✅ Zero broken links (`broken = 0`)
2. ✅ Zero redirects (`redirects = 0`)
3. ✅ All links point to canonical, stable URLs
4. ✅ All links return HTTP 200

---

## Issues Resolved (2026-01-09)

### Root Cause

Website linked to Docusaurus directories lacking `index.md` files:
- `/specification/modules` → 301 → 404
- `/evaluation/tests` → 301 → 404
- `/guides/examples` → 301 → 404
- `/guides/sdk` → 301 → 404

**Technical Explanation**:
- Docusaurus redirects `/path` → `/path/` (301)
- Directories without index return 404 for `/path/`

### Resolution Strategy

**Principle**: Link to actual landing pages, not directory phantoms.

| Directory | Before | After | Rationale |
|-----------|--------|-------|-----------|
| `modules` | `/specification/modules` | `/specification/modules/module-interactions` | Canonical module overview |
| `testsOverview` | `/evaluation/tests` | `/evaluation/tests/test-architecture-overview` | Test architecture entry point |
| `quickstart` | `/guides/examples` | `/guides/examples/single-agent-flow` | Minimal reproducible path |
| `sdkDocs` | `/guides/sdk` | `/guides/sdk/ts-sdk-guide` | Primary language as entry |

**Code Changes**: `lib/site-config.ts` (4 lines)

```diff
- modules: "https://docs.mplp.io/docs/specification/modules",
+ modules: "https://docs.mplp.io/docs/specification/modules/module-interactions",

- testsOverview: "https://docs.mplp.io/docs/evaluation/tests",
+ testsOverview: "https://docs.mplp.io/docs/evaluation/tests/test-architecture-overview",

- quickstart: "https://docs.mplp.io/docs/guides/examples",
+ quickstart: "https://docs.mplp.io/docs/guides/examples/single-agent-flow",

- sdkDocs: "https://docs.mplp.io/docs/guides/sdk",
+ sdkDocs: "https://docs.mplp.io/docs/guides/sdk/ts-sdk-guide",
```

**Commit**: `2c92370` - "fix: align all documentation links with actual docs structure"

---

## Governance Enforcement

### CI Gate Policy

**Workflow**: `.github/workflows/docs-link-gate.yml`

**Failure Conditions**:
- `broken > 0` → **FAIL** (blocks PR merge)
- `redirects > 0` → **FAIL** (blocks PR merge)

**Rationale**:
- Broken links violate user experience and SEO
- Redirects indicate stale URLs; update to canonical targets
- Zero-tolerance ensures link stability

**Triggers**:
- All PRs modifying `app/`, `components/`, `lib/`
- Push to `main`
- Manual dispatch

**Artifacts**:
- `docs-link-report.json` uploaded per run (90-day retention)
- Enables audit trail and regression analysis

### Three-Entry Principle Alignment

**Website (Discovery)** → **Docs (Specification)**:
- Website provides stable entry contracts
- Docs owns canonical paths
- Website does NOT duplicate specification content

**Boundary Integrity**:
- ✅ Website links to Docs (correct relationship)
- ✅ Links use stable entry points (not ephemeral IA details)
- ❌ Website does NOT embed spec content
- ❌ Docs does NOT host marketing/positioning

This link health governance **strengthens** the three-entry model.

---

## URL Inventory (Validated 2026-01-09)

<details>
<summary>All 25 canonical documentation URLs (expand)</summary>

### Architecture & Specification (9)
- `https://docs.mplp.io/docs/specification/architecture`
- `https://docs.mplp.io/docs/specification/architecture/l1-l4-architecture-deep-dive`
- `https://docs.mplp.io/docs/specification/architecture/l1-core-protocol`
- `https://docs.mplp.io/docs/specification/architecture/l4-integration-infra`
- `https://docs.mplp.io/docs/specification/architecture/cross-cutting-kernel-duties`
- `https://docs.mplp.io/docs/specification/modules/module-interactions`
- `https://docs.mplp.io/docs/specification/modules/context-module`
- `https://docs.mplp.io/docs/specification/profiles/sa-profile`
- `https://docs.mplp.io/docs/specification/profiles/map-profile`

### Guides & Examples (7)
- `https://docs.mplp.io/docs/guides`
- `https://docs.mplp.io/docs/guides/runtime/runtime-glue-overview`
- `https://docs.mplp.io/docs/guides/runtime/ael`
- `https://docs.mplp.io/docs/guides/runtime/vsl`
- `https://docs.mplp.io/docs/guides/runtime/psg`
- `https://docs.mplp.io/docs/guides/examples/single-agent-flow`
- `https://docs.mplp.io/docs/guides/sdk/ts-sdk-guide`

### Evaluation & Testing (6)
- `https://docs.mplp.io/docs/evaluation/conformance`
- `https://docs.mplp.io/docs/evaluation/golden-flows`
- `https://docs.mplp.io/docs/evaluation/tests/test-architecture-overview`
- `https://docs.mplp.io/docs/evaluation/governance`
- `https://docs.mplp.io/docs/evaluation/governance/versioning-policy`
- `https://docs.mplp.io/docs/evaluation/governance/contributing`

### Introduction & Reference (3)
- `https://docs.mplp.io/docs/introduction/mplp-v1.0-protocol-overview`
- `https://docs.mplp.io/docs/introduction/posix-analogy-mapping`
- `https://docs.mplp.io/docs/reference/entrypoints`

</details>

---

## Next Steps (Recommended)

### Short-Term
- [x] Deploy CI Gate to Website repo
- [ ] Monitor gate pass rate for 2 weeks
- [ ] Document any Docs IA changes that triggered gate failures

### Long-Term (Strategic)
1. **Docs Redirect Layer** (Recommended)
   - Add `@docusaurus/plugin-client-redirects` to Docs
   - Preserve old paths (e.g., `/docs/standards/*` → `/docs/evaluation/standards/*`)
   - Protects external citations, SEO, and AI caches

2. **Route Contract Versioning**
   - Document stable entry points in governance
   - Define SLA for URL stability (e.g., 12-month deprecation cycle)
   - Version the Website ↔ Docs URL mapping

3. **Manifest-Driven Links** (Optional)
   - Docs build generates `route-manifest.json`
   - Website consumes manifest at build time
   - Eliminates manual path synchronization

---

## Verification (Reproducible)

```bash
# Clone Website repo
cd MPLP_website

# Run link checker
node scripts/check-doc-links.mjs

# Verify invariants
cat docs-link-report.json | jq '{checked, broken, redirects}'
# Expected: {"checked": 25, "broken": 0, "redirects": 0}
```

---

## Governance Signoff

**Working Group**: WG-05-WEBSITE  
**Audit Performed By**: Automated tooling (`check-doc-links.mjs`)  
**Approval Date**: 2026-01-09  
**Next Review**: On Docs IA changes or quarterly  

**Compliance Status**: `COMPLIANT` ✅

---

**File Metadata**  
Path: `MPLP_website/LINK_HEALTH_RECORD.md`  
Format: Markdown  
Retention: Permanent (governance artifact)
