---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "DEPRECATION_PLAN"
---

# Script Deprecation Plan

**Document ID**: SCRIPT-AUDIT-003  
**Created**: 2026-01-04  
**Status**: Draft  
**Authority**: MPGC

---

## 1. Deprecation Policy

| Action | Definition |
|:---|:---|
| **ARCHIVE** | Move to `99-archive/` with metadata, retain for 1 release cycle |
| **DELETE** | Remove from repository after archive period |
| **KEEP** | Script is required, do not deprecate |

**Default Action**: ARCHIVE (not DELETE)

---

## 1.1 REVIEW Resolution Rules (MANDATORY)

All REVIEW-status scripts MUST be resolved before audit freeze.

### Resolution Criteria

| Rule | Condition | Resolution |
|:---|:---|:---:|
| **R1** | Referenced in workflow/package.json/governance | → ACTIVE or GOV-REQUIRED |
| **R2** | Affects published package content or user install | → ACTIVE |
| **R3** | Name matches `fix-*`, `clean-*`, `apply-*`, `audit-fix-*` AND no entry reference | → DEPRECATED |
| **R4** | None of above AND no recent usage evidence | → DEPRECATED |
| **R5** | Developer confirms active use | → KEEP |

### Resolution Gate

> REVIEW verdicts MUST be cleared to KEEP or DEPRECATED within the same PR as this audit.
> Audit artifacts with unresolved REVIEW status MUST NOT be frozen.

---

## 2. Scripts Marked DEPRECATED

### 2.1 Category: 01-codegen

| Script | Reason | Action | Archive Path |
|:---|:---|:---:|:---|
| `simple-codegen.ts` | Outputs to non-existent `packages/core-protocol/` | ARCHIVE | `99-archive/codegen/` |

**Replacement**: `generate-types-from-schemas.ts` (if functionality needed)

### 2.2 Category: 03-docs/semantic

| Script | Reason | Action | Archive Path |
|:---|:---|:---:|:---|
| `fix-normative-inheritance.mjs` | One-off doc migration | ARCHIVE | `99-archive/doc-fixes/` |
| `fix-roots.mjs` | One-off doc migration | ARCHIVE | `99-archive/doc-fixes/` |
| `clean-duplicates.mjs` | One-off cleanup | ARCHIVE | `99-archive/doc-fixes/` |
| `apply-headers.mjs` | One-off header update | ARCHIVE | `99-archive/doc-fixes/` |
| `apply-inheritance-headers.mjs` | One-off header update | ARCHIVE | `99-archive/doc-fixes/` |
| `enrich-frontmatter.mjs` | One-off frontmatter fix | ARCHIVE | `99-archive/doc-fixes/` |
| `fix-content-gaps.mjs` | One-off content fix | ARCHIVE | `99-archive/doc-fixes/` |
| `fix-standards-mapping.mjs` | One-off mapping fix | ARCHIVE | `99-archive/doc-fixes/` |
| `audit-fix-00-index.mjs` | One-off index fix | ARCHIVE | `99-archive/doc-fixes/` |

### 2.3 Category: 99-utils

| Script | Reason | Action | Archive Path |
|:---|:---|:---:|:---|
| `fix-cli-header.js` | One-off CLI fix | ARCHIVE | `99-archive/utils/` |
| `fix-duplicate-headers.mjs` | One-off header fix | ARCHIVE | `99-archive/utils/` |
| `fix-npm-duplicate-headers.mjs` | One-off npm fix | ARCHIVE | `99-archive/utils/` |
| `clean-cross-language-comments.js` | One-off cleanup | ARCHIVE | `99-archive/utils/` |
| `clean-fixture-comments.js` | One-off cleanup | ARCHIVE | `99-archive/utils/` |

---

## 3. Archive Structure

```
scripts/99-archive/
├── ARCHIVE_INDEX.md           # Index of archived scripts
├── codegen/
│   └── simple-codegen.ts
├── doc-fixes/
│   ├── fix-normative-inheritance.mjs
│   ├── fix-roots.mjs
│   ├── clean-duplicates.mjs
│   ├── apply-headers.mjs
│   ├── apply-inheritance-headers.mjs
│   ├── enrich-frontmatter.mjs
│   ├── fix-content-gaps.mjs
│   ├── fix-standards-mapping.mjs
│   └── audit-fix-00-index.mjs
└── utils/
    ├── fix-cli-header.js
    ├── fix-duplicate-headers.mjs
    ├── fix-npm-duplicate-headers.mjs
    ├── clean-cross-language-comments.js
    └── clean-fixture-comments.js
```

### 3.1 Domain Separation (MANDATORY)

> Archive directory lives under `scripts/`, NOT under `governance/`.

| Domain | Archive Location | Purpose |
|:---|:---|:---|
| Scripts (execution tools) | `scripts/99-archive/` | Deprecated scripts |
| Governance (policy docs) | `governance/99-archive/` | Superseded governance schemes |

These domains MUST NOT be mixed.

### 3.2 Archive Boundary Declarations

**Non-Executable Status:**
> Scripts in `scripts/99-archive/**` are NOT guaranteed to execute.
> They are NOT included in CI.
> They are NOT supported.

**No Governance Authority:**
> Archived scripts MUST NOT be referenced as MUST/SHALL steps in governance documents.
> If an archived script is needed for governance, it MUST be restored to active status first.

---

## 4. Archive Index Template

```markdown
# Archived Scripts Index

| Script | Original Path | Archived Date | Reason | Replacement |
|:---|:---|:---:|:---|:---|
| simple-codegen.ts | 01-codegen/ | 2026-01-04 | Path obsolete | generate-types-from-schemas.ts |
| fix-normative-inheritance.mjs | 03-docs/semantic/ | 2026-01-04 | One-off | None |
```

---

## 5. Rollback Procedure

If an archived script is later needed:

1. Check `99-archive/ARCHIVE_INDEX.md` for location
2. `git mv scripts/99-archive/{category}/{script} scripts/{target-category}/`
3. Update ARCHIVE_INDEX.md
4. Test script functionality
5. Add to governance reference if GOV-REQUIRED

---

## 6. Observation Window

| Phase | Duration | Action |
|:---|:---:|:---|
| Archive | v1.0.0 → v1.1.0 | Move to 99-archive/, monitor for breakage |
| Delete | v1.1.0+ | Remove from repository if no issues |

---

## 7. Scripts Requiring Manual Review (22)

These scripts are NOT deprecated but need confirmation:

| Script | Question |
|:---|:---|
| `generate-types-from-schemas.ts` | Is this used for SDK codegen? |
| `generate-py-models-from-schemas.ts` | Is this used for Python SDK? |
| `generate_learning_snapshot.py` | Is this used for testing? |
| `run-cross-language-builders.ts` | Is this used in CI? |
| `verify-negative-fixtures.js` | Is this run as part of tests? |
| `verify-validators.ts` | Is this used? |
| `verify-coordination.ts` | Is this used? |
| `verify-test-evidence.js` | Is this used? |
| `verify-repo-refs.js` | Is this used? |
| `validate-evidence-chain.js` | Is this used? |
| `project-acceptance-audit.mjs` | Is this used for release? |
| `governance-rc-audit.mjs` | Is this used? |
| `validate-docs.mjs` | Is this used? |
| `audit-crosslinks.mjs` | Is this used? |
| `classify-docs.mjs` | Is this used? |
| `verify-content.mjs` | Is this used? |
| `verify-footer-compliance.mjs` | Is this used? |
| `verify-governance-styling.mjs` | Is this used? |
| `copy-schemas.js` | Is this used for SDK packaging? |
| `update-frozen-headers.mjs` | Is this used? |
| `simulate-ci.ps1` | Is this used on Windows? |

---

## 8. Execution Order

1. **User confirms REVIEW verdicts** (22 scripts)
2. **Execute archive** for confirmed DEPRECATED scripts
3. **Create ARCHIVE_INDEX.md**
4. **Commit with message**: `chore: archive 15 deprecated scripts`
5. **Wait observation window** (1 release cycle)
6. **Delete archived scripts** if no issues

---

## 9. Decision Required

> [!IMPORTANT]
> Please review the 22 REVIEW-status scripts and confirm which should be:
> - **KEEP** (still needed)
> - **DEPRECATED** (can archive)
