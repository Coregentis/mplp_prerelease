# WEB-GOV SSoT Baseline

**Status**: FROZEN  
**Authority**: WEB-GOV-001  
**Date**: 2026-01-06  
**Run ID**: WEB-GOV-RUN-2026-01-06-01  
**Commit**: (to be added after commit)

---

## Scope

This baseline establishes the **Single Source of Truth (SSoT)** for all external URLs used in the MPLP website codebase.

### Governed URLs

All external links to the following domains MUST be referenced through `lib/site-config.ts`:

- `https://docs.mplp.io` → `DOCS_URLS.*`
- `https://github.com/Coregentis/MPLP-Protocol` → `REPO_URLS.*`

### SSoT Location

- **File**: `MPLP_website/lib/site-config.ts`
- **Exports**: `DOCS_URLS`, `REPO_URLS`
- **Type Safety**: `DocsKey`, `RepoKey`

---

## Rules

### ✅ MUST

1. All docs links MUST use `DOCS_URLS.<key>`
2. All repo links MUST use `REPO_URLS.<key>`
3. External links MUST include `target="_blank" rel="noopener noreferrer"`
4. New doc pages MUST add corresponding `DOCS_URLS` key before linking

### ❌ MUST NOT

1. MUST NOT hardcode `https://docs.mplp.io` anywhere except `lib/site-config.ts`
2. MUST NOT hardcode `https://github.com/Coregentis/MPLP-Protocol` anywhere except `lib/site-config.ts`
3. MUST NOT bypass SSoT with string concatenation or template literals (except when extending existing keys)

---

## Evidence

### Gate Verification

```bash
npm run verify:web-gov:warn
# ✅ PASS: No hardcoded URLs found

npm run verify:web-gov
# ✅ PASS: No hardcoded URLs found (STRICT mode)
```

### Build Status

- ✅ TypeScript compilation: PASS
- ✅ Next.js build: 53 pages
- ✅ Zero violations

### Migration Summary

| Batch | Scope | Files | URLs Migrated |
|-------|-------|-------|---------------|
| 1 | `components/home/*` | 6 | 28 |
| 2 | `components/notices/*` | 4 | 6 |
| 3 | `components/seo/*` | 2 | 4 |
| 4 | `app/*` + layout/governance | 12 | 42 |
| **Total** | | **24** | **~80** |

---

## Non-Goals

This baseline does NOT:

- Define protocol semantics (see `CONST-001`)
- Replace constitutional authority (Repo > Docs > Website)
- Govern internal routing or Next.js patterns

---

## Canonical Host

Per Vercel configuration:

- **Production**: `https://www.mplp.io` (canonical)
- **Redirect**: `mplp.io` → 308 → `www.mplp.io`
- **Config**: `siteConfig.url = "https://www.mplp.io"`

All website metadata, JSON-LD, and OpenGraph MUST use `www` as canonical host.

---

## Enforcement

- **CI**: `npm run verify:web-gov` (strict mode)
- **Pre-commit**: Recommended
- **Violations**: BLOCK merge
