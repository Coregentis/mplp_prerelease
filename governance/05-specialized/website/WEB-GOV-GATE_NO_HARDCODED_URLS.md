---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "WEB-GOV-GATE_NO_HARDCODED_URLS"
---

# WEB-GOV Gate: No Hardcoded URLs

**Status**: ACTIVE  
**Authority**: WEB-GOV-001  
**Script**: `scripts/governance/no-hardcoded-urls.mjs`  
**Date**: 2026-01-06

---

## Purpose

This gate enforces that all external URLs to docs.mplp.io and GitHub repo are sourced from `lib/site-config.ts` (SSoT), preventing hardcoded URL drift.

---

## Authority

Per CONST-001 (Three-Entry Model):

- **Website**: Discovery/positioning only
- **Docs**: Normative definitions
- **Repo**: Source of truth

Website MUST NOT hardcode docs/repo URLs to maintain governance separation.

---

## Scope

### Scanned Directories

- `app/`
- `components/`
- `lib/` (excluding `lib/site-config.ts`)

### Patterns Checked

1. `https://docs.mplp.io`
2. `http://docs.mplp.io`
3. `https://github.com/Coregentis/MPLP-Protocol`
4. `http://github.com/Coregentis/MPLP-Protocol`

### Excluded Files

- `lib/site-config.ts` (SSoT definition file)
- `*.test.{ts,tsx,js,jsx}`
- `*.spec.{ts,tsx,js,jsx}`
- `node_modules/**`

---

## Modes

### Shadow Mode (Warning Only)

**Command**: `npm run verify:web-gov:warn`  
**Environment**: `WEB_GOV_STRICT=0` (default)

- Detects violations
- Logs warnings
- **Does NOT block** build/CI
- **Use case**: During migration, monitoring

### Strict Mode (Blocking)

**Command**: `npm run verify:web-gov`  
**Environment**: `WEB_GOV_STRICT=1`

- Detects violations
- **BLOCKS** with exit code 1
- **Use case**: CI enforcement, pre-commit

---

## CI Requirements

### Mandatory

- ✅ `npm run verify:web-gov` (strict) MUST run in CI
- ✅ MUST block merge if violations found
- ✅ MUST run after `npm run build`

### Recommended

- Pre-commit hook running strict mode
- Branch protection requiring gate PASS

---

## Waiver Policy

Shadow mode MAY be temporarily used in CI **only** under these conditions:

1. **Emergency hotfix** requiring immediate deployment
2. **Documented** in Closure Record with:
   - Reason for waiver
   - Remediation plan
   - Target date for strict re-enablement
3. **Approved** by governance reviewer

Regular development MUST use strict mode.

---

## Output Format

### PASS

```
[WEB-GOV] Running no-hardcoded-urls gate...
Mode: STRICT (blocking)

✅ PASS: No hardcoded URLs found outside lib/site-config.ts

Scanned directories: app, components, lib
Patterns checked: 4
```

### FAIL

```
[WEB-GOV] Running no-hardcoded-urls gate...
Mode: STRICT (blocking)

❌ FAIL: Found 3 hardcoded URLs

app/example/page.tsx:45 - https://docs.mplp.io/docs/intro
components/foo.tsx:12 - https://github.com/Coregentis/MPLP-Protocol

ERROR: Use DOCS_URLS.* or REPO_URLS.* from lib/site-config.ts instead.
```

---

## Maintenance

### Adding New Patterns

1. Update `patterns` array in `no-hardcoded-urls.mjs`
2. Add corresponding SSoT key to `lib/site-config.ts`
3. Update this spec document
4. Run gate to verify

### Updating Scope

Changes to scanned directories require:

- Update `no-hardcoded-urls.mjs`
- Update this spec
- Governance review
