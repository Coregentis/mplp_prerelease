---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "SCRIPT_INVENTORY"
---

# Script Inventory

**Document ID**: SCRIPT-AUDIT-001  
**Created**: 2026-01-04  
**Status**: Draft  
**Authority**: MPGC

---

## 1. Inventory Summary

| Category | Count | Location |
|:---|:---:|:---|
| 01-codegen | 5 | Code generation scripts |
| 02-verification | 11 | Schema/evidence verification |
| 03-docs/semantic | 19 | Documentation validation |
| 03-docs (root) | 2 | Footer/styling verification |
| 04-build | 5 | Build & release |
| 99-utils | 5 | One-off utilities |
| **Total** | **47** | |

---

## 2. Full Script Inventory

### 2.1 Category: 01-codegen (5 files)

| Script | Size | Last Modified | Purpose |
|:---|:---:|:---:|:---|
| `generate-types-from-schemas.ts` | 3.7 KB | Recent | Generate TypeScript types from JSON Schema |
| `generate-py-models-from-schemas.ts` | 13.6 KB | Recent | Generate Python Pydantic models |
| `generate_learning_snapshot.py` | 2.2 KB | Recent | Generate learning samples |
| `simple-codegen.ts` | 7.0 KB | Recent | Simple codegen (outputs to core-protocol/) |
| `run-cross-language-builders.ts` | 5.4 KB | Recent | Cross-language build orchestration |

### 2.2 Category: 02-verification (11 files)

| Script | Size | Purpose |
|:---|:---:|:---|
| `verify-sdk-mirror.sh` | 3.7 KB | **SCV-01 CI Gate** - Verify SDK schema mirrors |
| `verify-invariants.js` | 14.4 KB | Verify schema invariants (governance-referenced) |
| `verify-fixtures-schema.js` | 8.8 KB | Verify test fixtures (governance-referenced) |
| `verify-negative-fixtures.js` | 8.9 KB | Verify negative test cases |
| `verify-validators.ts` | 3.0 KB | Verify validator outputs |
| `verify-coordination.ts` | 1.0 KB | Verify coordination module |
| `verify-test-evidence.js` | 8.2 KB | Verify test evidence |
| `verify-repo-refs.js` | 8.6 KB | Verify repository references |
| `validate-schemas.js` | 3.0 KB | **CI-executed** - Validate JSON schemas |
| `validate-schemas.ts` | 2.7 KB | TypeScript source for validate-schemas |
| `validate-evidence-chain.js` | 3.9 KB | Validate evidence chain integrity |

### 2.3 Category: 03-docs/semantic (19 files)

| Script | Size | Purpose |
|:---|:---:|:---|
| `semantic-lint.mjs` | 12.1 KB | **CI-executed** - Semantic linting |
| `mapping-health.mjs` | 4.5 KB | **CI-executed** - Mapping health check |
| `project-acceptance-audit.mjs` | 36.4 KB | Project acceptance audit |
| `governance-rc-audit.mjs` | 14.7 KB | Governance RC audit |
| `validate-docs.mjs` | 7.2 KB | Validate documentation |
| `audit-crosslinks.mjs` | 10.0 KB | Audit cross-document links |
| `classify-docs.mjs` | 8.4 KB | Classify document types |
| `fix-normative-inheritance.mjs` | 7.1 KB | Fix normative inheritance |
| `fix-roots.mjs` | 8.1 KB | Fix root documents |
| `clean-duplicates.mjs` | 6.2 KB | Clean duplicate content |
| `apply-headers.mjs` | 4.7 KB | Apply headers to docs |
| `apply-inheritance-headers.mjs` | 2.9 KB | Apply inheritance headers |
| `enrich-frontmatter.mjs` | 3.8 KB | Enrich frontmatter |
| `fix-content-gaps.mjs` | 3.6 KB | Fix content gaps |
| `fix-standards-mapping.mjs` | 3.0 KB | Fix standards mapping |
| `audit-fix-00-index.mjs` | 3.6 KB | Audit and fix index |
| `verify-content.mjs` | 2.7 KB | Verify content |
| `verify-publish-only.mjs` | 4.0 KB | **Package.json referenced** - Verify publish |
| `docs-validation.assertions.yaml` | 2.3 KB | Validation assertions config |

### 2.4 Category: 03-docs (root) (2 files)

| Script | Size | Purpose |
|:---|:---:|:---|
| `verify-footer-compliance.mjs` | 3.2 KB | Verify footer compliance |
| `verify-governance-styling.mjs` | 4.3 KB | Verify governance doc styling |

### 2.5 Category: 04-build (5 files)

| Script | Size | Purpose |
|:---|:---:|:---|
| `build-release.js` | 4.1 KB | **Package.json referenced** - Build release |
| `copy-schemas.js` | 1.5 KB | Copy schemas to SDK |
| `pre-release-check.mjs` | 2.9 KB | **Package.json referenced** - Pre-release check |
| `update-frozen-headers.mjs` | 9.5 KB | Update frozen headers |
| `simulate-ci.ps1` | 2.4 KB | Simulate CI locally (Windows) |

### 2.6 Category: 99-utils (5 files)

| Script | Size | Purpose |
|:---|:---:|:---|
| `fix-cli-header.js` | 1.7 KB | Fix CLI header |
| `fix-duplicate-headers.mjs` | 2.0 KB | Fix duplicate headers |
| `fix-npm-duplicate-headers.mjs` | 2.6 KB | Fix npm duplicate headers |
| `clean-cross-language-comments.js` | 1.3 KB | Clean cross-language comments |
| `clean-fixture-comments.js` | 2.0 KB | Clean fixture comments |

---

## 3. Evidence Sources Scanned

| Source | Files Scanned |
|:---|:---:|
| `.github/workflows/*.yml` | 5 |
| Root `package.json` | 1 |
| Sub-package `package.json` | 18+ |
| `governance/**/*.md` | All |
| Script inter-dependencies | All |
