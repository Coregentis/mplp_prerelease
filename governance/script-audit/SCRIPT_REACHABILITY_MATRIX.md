# Script Reachability Matrix

**Document ID**: SCRIPT-AUDIT-002  
**Created**: 2026-01-04  
**Status**: Draft  
**Authority**: MPGC

---

## 0. Reproducible Scan Methodology

This section defines how to reproduce the reachability analysis.

### 0.1 Input Sets

| Input | Path Pattern | Purpose |
|:---|:---|:---|
| Workflows | `.github/workflows/**/*.yml` | CI/Release script references |
| Package.json (root) | `package.json` | npm scripts |
| Package.json (sub) | `packages/**/package.json` | Sub-package scripts |
| Governance docs | `governance/**/*.md` | GOV-REQUIRED references |
| Scripts | `scripts/**/*.{js,ts,mjs,py,sh}` | Target inventory |

### 0.2 Scan Patterns

```bash
# Entry reference patterns (grep -E)
ENTRY_PATTERNS="node\s+.*scripts/|ts-node\s+.*scripts/|tsx\s+.*scripts/|pnpm.*run|npm.*run|bash\s+.*scripts/|python\s+.*scripts/"

# Import/require patterns (for inter-script deps)
IMPORT_PATTERNS="require\(.*(scripts/|\.\./).*\)|import.*from.*(scripts/|\.\./).*"

# Governance reference patterns
GOV_PATTERNS="scripts/.*\.(js|ts|sh|py|mjs)"
```

### 0.3 Verdict Assignment Rules

| Condition | Verdict |
|:---|:---:|
| Referenced in workflow + executed | **ACTIVE** |
| Referenced in package.json scripts | **ACTIVE** |
| Referenced in governance docs as MUST/SHALL | **GOV-REQUIRED** |
| Source file for ACTIVE compiled output | **ACTIVE-SOURCE** |
| Name matches `fix-*`, `clean-*`, `apply-*`, `audit-fix-*` + no entry reference | **DEPRECATED** |
| No references found + no deprecation signature | **REVIEW** |

### 0.4 Gate Requirement

> Any new script added to `scripts/` MUST be classified in this matrix within the same PR. PRs adding unclassified scripts SHOULD be blocked.

---

## 1. Verdict Legend

| Verdict | Definition |
|:---|:---|
| **ACTIVE** | Referenced by CI/workflow/package.json, cannot delete |
| **GOV-REQUIRED** | Referenced by governance documents, cannot delete |
| **ACTIVE-SOURCE** | Source file for an ACTIVE compiled output |
| **DEPRECATED** | No references found, candidate for archive |
| **REVIEW** | Needs manual review before verdict |

---

## 2. Reachability Matrix

### 2.1 Category: 01-codegen

| Script | Reference Source | Scenario | Verdict |
|:---|:---|:---:|:---:|
| `generate-types-from-schemas.ts` | None found | Dev tool | **REVIEW** |
| `generate-py-models-from-schemas.ts` | None found | Dev tool | **REVIEW** |
| `generate_learning_snapshot.py` | None found | Dev tool | **REVIEW** |
| `simple-codegen.ts` | None found; outputs to non-existent path | Obsolete? | **DEPRECATED** |
| `run-cross-language-builders.ts` | None found | Dev tool | **REVIEW** |

### 2.2 Category: 02-verification

| Script | Reference Source | Evidence | Verdict |
|:---|:---|:---|:---:|
| `verify-sdk-mirror.sh` | governance/02-methods/*, governance/03-sdk-release/README.md | "SCV-01 CI Gate", "Block merge" | **GOV-REQUIRED** |
| `verify-invariants.js` | governance/02-methods/README.md | "verify-invariants.js" | **GOV-REQUIRED** |
| `verify-fixtures-schema.js` | governance/02-methods/README.md | "verify-fixtures-schema.js" | **GOV-REQUIRED** |
| `verify-negative-fixtures.js` | None found | Test support | **REVIEW** |
| `verify-validators.ts` | None found | Dev tool | **REVIEW** |
| `verify-coordination.ts` | None found | Dev tool | **REVIEW** |
| `verify-test-evidence.js` | None found | Dev tool | **REVIEW** |
| `verify-repo-refs.js` | None found | Dev tool | **REVIEW** |
| `validate-schemas.js` | `.github/workflows/ci.yml` | "node scripts/validate-schemas.js" | **ACTIVE** |
| `validate-schemas.ts` | `.github/workflows/ci.yml` | "npx tsc scripts/validate-schemas.ts" (compiles to .js) | **ACTIVE-SOURCE** |
| `validate-evidence-chain.js` | None found | Dev tool | **REVIEW** |

### 2.3 Category: 03-docs/semantic

| Script | Reference Source | Evidence | Verdict |
|:---|:---|:---|:---:|
| `semantic-lint.mjs` | `.github/workflows/semantic-lint.yml` | "node scripts/semantic/semantic-lint.mjs --ci" | **ACTIVE** |
| `mapping-health.mjs` | `.github/workflows/link-health.yml` | "node scripts/semantic/mapping-health.mjs" | **ACTIVE** |
| `verify-publish-only.mjs` | `package.json` | "verify:npm" script | **ACTIVE** |
| `project-acceptance-audit.mjs` | None found | Dev/audit tool | **REVIEW** |
| `governance-rc-audit.mjs` | None found | Dev/audit tool | **REVIEW** |
| `validate-docs.mjs` | None found | Dev tool | **REVIEW** |
| `audit-crosslinks.mjs` | None found | Dev tool | **REVIEW** |
| `classify-docs.mjs` | None found | Dev tool | **REVIEW** |
| `fix-normative-inheritance.mjs` | None found | One-off fix | **DEPRECATED** |
| `fix-roots.mjs` | None found | One-off fix | **DEPRECATED** |
| `clean-duplicates.mjs` | None found | One-off fix | **DEPRECATED** |
| `apply-headers.mjs` | None found | One-off fix | **DEPRECATED** |
| `apply-inheritance-headers.mjs` | None found | One-off fix | **DEPRECATED** |
| `enrich-frontmatter.mjs` | None found | One-off fix | **DEPRECATED** |
| `fix-content-gaps.mjs` | None found | One-off fix | **DEPRECATED** |
| `fix-standards-mapping.mjs` | None found | One-off fix | **DEPRECATED** |
| `audit-fix-00-index.mjs` | None found | One-off fix | **DEPRECATED** |
| `verify-content.mjs` | None found | Dev tool | **REVIEW** |
| `docs-validation.assertions.yaml` | Likely used by semantic-lint.mjs | Config | **ACTIVE** |

### 2.4 Category: 03-docs (root)

| Script | Reference Source | Evidence | Verdict |
|:---|:---|:---|:---:|
| `verify-footer-compliance.mjs` | None found | Dev tool | **REVIEW** |
| `verify-governance-styling.mjs` | None found | Dev tool | **REVIEW** |

### 2.5 Category: 04-build

| Script | Reference Source | Evidence | Verdict |
|:---|:---|:---|:---:|
| `build-release.js` | `package.json` | "build:release" script | **ACTIVE** |
| `pre-release-check.mjs` | `package.json` | "pre-release" script | **ACTIVE** |
| `copy-schemas.js` | None found | Dev tool | **REVIEW** |
| `update-frozen-headers.mjs` | None found | Dev tool | **REVIEW** |
| `simulate-ci.ps1` | None found | Windows dev tool | **REVIEW** |

### 2.6 Category: 99-utils

| Script | Reference Source | Evidence | Verdict |
|:---|:---|:---|:---:|
| `fix-cli-header.js` | None found | One-off fix | **DEPRECATED** |
| `fix-duplicate-headers.mjs` | None found | One-off fix | **DEPRECATED** |
| `fix-npm-duplicate-headers.mjs` | None found | One-off fix | **DEPRECATED** |
| `clean-cross-language-comments.js` | None found | One-off fix | **DEPRECATED** |
| `clean-fixture-comments.js` | None found | One-off fix | **DEPRECATED** |

---

## 3. Verdict Summary

| Verdict | Count | Scripts |
|:---|:---:|:---|
| **ACTIVE** | 6 | validate-schemas.js, semantic-lint.mjs, mapping-health.mjs, verify-publish-only.mjs, build-release.js, pre-release-check.mjs |
| **ACTIVE-SOURCE** | 1 | validate-schemas.ts |
| **GOV-REQUIRED** | 3 | verify-sdk-mirror.sh, verify-invariants.js, verify-fixtures-schema.js |
| **DEPRECATED** | 15 | simple-codegen.ts, fix-*.mjs, clean-*.js, apply-*.mjs, etc. |
| **REVIEW** | 22 | Various dev tools requiring manual confirmation |

---

## 4. Critical Finding: validate-schemas.ts/.js Relationship

### 4.1 Evidence from CI workflow

```yaml
# .github/workflows/ci.yml
npx tsc scripts/validate-schemas.ts --target es2020 --module commonjs --esModuleInterop --skipLibCheck
node scripts/validate-schemas.js
```

### 4.2 Analysis

- `tsc` without `--outDir` compiles to current directory → overwrites existing `.js`
- The `.js` in repo is a **checked-in executable backup**
- CI compiles `.ts` → `.js` then executes `.js`
- Both files have identical logic

### 4.3 MPGC Decision (BINDING)

**DECISION: Option B — Dual-file pattern with sync gate**

> The repository SHALL maintain both `validate-schemas.ts` (source) and `validate-schemas.js` (executable).
> The `.js` file serves as the checked-in executable entry point for environments without tsc/ts-node.

**Sync Rule:**
- Any change to `validate-schemas.ts` MUST be followed by `npx tsc validate-schemas.ts`
- PRs modifying `.ts` without updating `.js` SHOULD be blocked (soft gate)
- The CI workflow remains: compile → execute (validates sync)

**Rationale:**
- Preserves backward compatibility
- No runtime dependency on ts-node in CI
- CI compilation step acts as implicit sync verification

---

## 5. Required Tools Registry

GOV-REQUIRED scripts MUST be registered here:

| Tool ID | Script Path | Owning Method | Gate Type |
|:---|:---|:---|:---:|
| TOOL-001 | `02-verification/verify-sdk-mirror.sh` | SCV-01 | **block_merge** |
| TOOL-002 | `02-verification/verify-invariants.js` | TSV/XCV | record_only |
| TOOL-003 | `02-verification/verify-fixtures-schema.js` | SUC-01 | record_only |
| TOOL-004 | `02-verification/validate-schemas.js` | TSV-01 | **block_merge** |

