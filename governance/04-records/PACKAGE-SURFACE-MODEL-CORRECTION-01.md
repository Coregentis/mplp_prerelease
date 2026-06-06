---
entry_surface: repository
entry_model_class: primary
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "PACKAGE-SURFACE-MODEL-CORRECTION-01"
surface_role: correction_record
record_state: final
title: "Package Surface Model Correction 01"
---

# Package Surface Model Correction 01

## 1. Purpose

This record corrects the package surface model used during
`PACKAGE-PREFLIGHT-RESEARCH-01`.

The prior research correctly observed that package-internal npm `dist/`
directories were absent in this checkout, but it over-interpreted that
observation as if the npm release surface itself were absent.

Corrected model:

- `packages/npm/**` are npm package distribution roots.
- `packages/pypi/**` are PyPI package distribution roots.
- `packages/sources/**` are source mirrors and source preparation surfaces.
- root-level `dist/**` is a clean build or generated publication output surface
  for MPLP, not the same object as `packages/npm/**` or `packages/pypi/**`.
- `packages/npm/<package>/dist/**` and `packages/pypi/<package>/dist/**` are
  package-internal generated artifact surfaces that must be verified inside the
  package root before pack, build, install smoke, or upload steps.

This record does not authorize package publication, registry mutation, tag
creation, release sealing, branch deletion, PR merge, credential access, package
version changes, public owner/copyright changes, L0 protocol truth mutation, or
direct package artifact patching.

## 2. Repo Truth

| Item | Value |
|:---|:---|
| Repository path | `/Users/jasonwang/Documents/AI_Dev/V1.0_release` |
| Branch | `codex/agentic-harness-two-layer-governance-baseline-01` |
| HEAD inspected | `2ebe65565` |
| Remotes inspected | `origin`, `origin-oss`, `protocol-dev`, `v2` |
| Pre-existing dirty state | `M MPLP_website`; untracked `governance/01-constitutional/CONST-007_CROSS_SURFACE_BRAND_UX_CONSTITUTION.md`; untracked `governance/03-distribution/sdk/MPLP-v1.0.0-EXTERNAL-ACCESS-PREREQUISITES-CHECKLIST-2026-04-07.md` |
| Harness assets inspected | `AGENTS.md`, `.codex/config.toml`, `.agents/skills/agentic-harness-goal-preflight/SKILL.md` |
| Distribution methods inspected | `METHOD-SDKR-08_MULTI_PACKAGE_RELEASE_GOVERNANCE.md`, `MPLP-MULTI-REPO-RELEASE-OPERATION-SHEET-v1.0.md`, `METHOD-DIV-01_DERIVATION_INTEGRITY_VERIFICATION.md` |

The pre-existing dirty entries were not modified by this correction.

## 3. Harness Method Execution

| Method | Applied? | Correction Role | Output |
|:---|:---:|:---|:---|
| `SCTM` | Yes | Reclassified the goal as correction plus governance record patch | Goal model and SOT classification |
| `GLFB` | Yes | Separated surface-model correction from package preflight, publish, and version authority | Authorization boundary matrix |
| `ITCM` | Yes | Remapped package roots, source mirrors, clean build output, and package-internal artifacts | Corrected topology model |
| `RBCT` | Yes | Limited execution to inspection plus one correction record | Bounded stage plan |
| `VIM` | Yes | Reaffirmed no publish, no build, no artifact mutation, and no L0 mutation | Forbidden-action compliance |
| `PRM` | Yes | Converted the prior research error into a durable correction record | Hardening recommendation for next package harness patch |

Applicable repository governance methods:

- `DIV`: package-internal `dist/**`, wheel, sdist, and pack output remain
  derivation artifacts that require provenance evidence.
- `SCV`: package `main`, `types`, and `exports` must resolve to present files
  before pack and install smoke evidence can count.
- `SUC`: clean temp install/import smoke must verify the shipped package
  surface, not the monorepo layout.
- `EVC`: any version or publication action remains outside this correction goal.

## 4. Corrected Package Surface Model

| Surface | Correct Role | SOT Layer | Published From? | Generated? | Verification Required |
|:---|:---|:---|:---:|:---:|:---|
| `packages/npm/**` | npm package distribution roots and public package candidates after policy filtering | `L1` package release root / publication preparation source | Yes, for PUBLIC packages in Publish Set | No, root itself is the package root | Package policy, manifest, derivation proof, content spec, pack, temp install/import smoke |
| `packages/pypi/**` | PyPI package distribution roots and public package candidates after policy filtering | `L1` package release root / publication preparation source | Yes, for PUBLIC PyPI packages | No, root itself is the package root | PyPI metadata, derivation proof, build, wheel/sdist checks, temp venv install/import smoke |
| `packages/sources/**` | Source mirrors and source preparation surfaces | `L1` source mirror | No | Mixed source/mirror surface | Mirror alignment, source-to-package provenance, must not enter Publish Set |
| root `dist/**` | Clean build or generated publication output surface for MPLP projection | `L2` generated/public projection output | No direct registry package publication from this path by default | Yes | Build provenance, projection integrity, exclusion from package-root identity claims |
| `packages/npm/<package>/dist/**` | Package-internal compiled JavaScript and declaration artifact surface | `L2` package-internal generated artifact | Included in npm tarball if package manifest requires it | Yes | Build provenance, `main`/`types`/`exports` resolution, pack file list, temp install/import smoke |
| `packages/pypi/<package>/dist/**` | Package-internal wheel and sdist output surface | `L2` package-internal generated artifact | Uploaded artifact source only after explicit publish authorization | Yes | `python -m build`, hash/proof alignment, `twine check`, temp venv install/import smoke |

## 5. Prior Research Error

Prior incorrect blocker:

```text
packages/npm/**/dist missing = npm publication surface missing
```

Corrected interpretation:

```text
packages/npm/** are npm release roots.
If package.json main/types/exports point to package-internal dist/**, then
package-internal build artifacts must be generated and verified before npm pack.
That is an internal artifact verification issue inside the package root, not a
package-root discovery failure.
```

The corrected model preserves the real concern without misclassifying the
surface:

- Missing package-internal `dist/**` may block a specific package from
  successful pack/install/import verification.
- Missing package-internal `dist/**` does not prove that `packages/npm/**` is not
  the intended npm release root.
- Source mirrors under `packages/sources/**` must not be promoted into Publish
  Set merely because package-internal artifacts are absent.

## 6. Revised Blocker Classification

| Prior Classification | Revised Classification |
|:---|:---|
| `packages/npm/**/dist` missing as npm publication surface missing | `PACKAGE_INTERNAL_ARTIFACT_VERIFICATION_REQUIRED` |
| npm release root unclear | npm release roots are `packages/npm/**` subject to PUBLIC package policy |
| direct package preflight rerun blocked because release surface absent | direct preflight rerun must first verify/generate package-internal artifacts from authorized source and then run pack/install/import smoke |

This revision does not make any package publish-ready. It only corrects the
surface model that the next harness patch must use.

## 7. Corrected Next Step

The next package harness patch should be based on this topology:

1. Discover npm release roots from `packages/npm/**`.
2. Discover PyPI release roots from `packages/pypi/**`.
3. Exclude `packages/sources/**` from Publish Set.
4. Treat package-internal `dist/**` as `L2` artifacts requiring provenance and
   verification, not as the package root itself.
5. Run package build, pack, temp install, and import smoke only in a later
   verification or package-preflight goal with explicit authorization for local
   artifact generation.
6. Keep publish, upload, tag, seal, merge, credential access, and version changes
   as separate owner-authorized goals.

Suggested next verdict after this correction:

```text
COMPLETE_READY_FOR_CORRECTED_PACKAGE_HARNESS_PATCH
```

## 8. Files Changed

| Path | Change |
|:---|:---|
| `governance/04-records/PACKAGE-SURFACE-MODEL-CORRECTION-01.md` | Added this correction record |

No package manifests, package source files, source mirrors, package-internal
artifacts, generated artifacts, version files, registry configuration, or L0
protocol truth files were changed.

## 9. Gates and Evidence

Expected validation for this correction record:

| Gate | Purpose |
|:---|:---|
| `git diff --check -- governance/04-records/PACKAGE-SURFACE-MODEL-CORRECTION-01.md` | Markdown whitespace check |
| Frontmatter check for this record | Confirm governance record frontmatter exists |
| `git status --short` | Confirm only intended correction record was added besides pre-existing dirty state |

These gates verify only the correction record shape and local diff hygiene. They
do not verify package build readiness, pack readiness, install smoke readiness,
registry state, or publish readiness.

## 10. Forbidden Action Compliance Statement

This correction did not publish to npm or PyPI, upload artifacts, mutate any
registry, create a tag, declare a seal, merge a PR, delete a branch, access
credentials, change package versions, change public owner/copyright wording,
mutate L0 schemas/invariants/taxonomy/kernel duties, patch package-internal
`dist/**`, generate package artifacts, or modify source mirrors.

## 11. Final Verdict

`COMPLETE_READY_FOR_CORRECTED_PACKAGE_HARNESS_PATCH`
