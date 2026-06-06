---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "PACKAGE-PREFLIGHT-HARNESS"
---

# Package Preflight Harness

## 1. Purpose

This document defines the corrected no-publish package preflight harness for
MPLP package release preparation.

The harness exists to inspect package release roots, package-internal artifacts,
source mirrors, placeholder gates, and future evidence plans before any npm or
PyPI preflight rerun. It does not publish, upload, tag, seal, merge, mutate
registries, access credentials, change package versions, build packages, pack
packages, install packages, or patch generated artifacts.

## 2. Scope

This harness applies to:

- npm package release roots under `packages/npm/**`
- PyPI package release roots under `packages/pypi/**`
- source mirrors under `packages/sources/**`
- root-level `dist/**` as generated projection output
- package-internal `dist/**` surfaces inside package roots
- evidence planning for future pack, install, import, and type smoke gates

This harness does not apply to:

- actual npm publication
- actual PyPI upload
- release tag creation
- release sealing
- version bump implementation
- direct package content repair
- direct package-internal artifact patching
- PR #33 remediation

## 3. Relation To Agentic Harness

This package harness is a repository-governance and package-preflight asset. It
must be used under the Codex Agentic Harness when a Codex goal touches package
release roots, generated package artifacts, package evidence, publication
planning, or package governance.

Required Codex Agentic Harness methods:

| Method | Role In Package Harness Work |
|:---|:---|
| `SCTM` | Classify the goal as research, surgical patch, verification, or release preparation |
| `GLFB` | Separate verification from owner authorization and publication authority |
| `ITCM` | Map package roots, source mirrors, root `dist/**`, and package-internal artifacts |
| `RBCT` | Keep each package-preflight goal bounded to one stage |
| `VIM` | Block publish, upload, tag, seal, merge, credentials, version changes, and direct artifact patching |
| `PRM` | Convert package blockers and evidence gaps into hardening records |

Applicable repository governance methods:

| Method | Trigger |
|:---|:---|
| `DIV` | Source-to-dist, source-to-pack, source-to-wheel, and artifact provenance |
| `TSV` | Package truth references and dependency closure |
| `XCV` | Cross-surface package, docs, and evidence alignment |
| `SCV` | Manifest, exports, type surface, and package content coverage |
| `SUC` | Clean install/import/type smoke behavior |
| `EVC` | Version or release transition decisions |

## 4. Corrected Package Surface Model

| Surface | Correct Role | SOT Layer | Published From? | Generated? |
|:---|:---|:---|:---|:---:|
| `packages/npm/**` | npm package distribution roots | `L1` package release root | Yes, after policy filtering | No |
| `packages/pypi/**` | PyPI package distribution roots | `L1` package release root | Yes, after policy filtering | No |
| `packages/sources/**` | source mirrors / preparation surfaces | `L1` source mirror | No | Mixed |
| root `dist/**` | clean build / generated publication output | `L2` generated projection | Not direct package root by default | Yes |
| `packages/npm/<pkg>/dist/**` | npm package-internal compiled artifact | `L2` package-internal artifact | Included if manifest requires it | Yes |
| `packages/pypi/<pkg>/dist/**` | PyPI wheel/sdist artifact output | `L2` package-internal artifact | Upload source only after owner authorization | Yes |

The harness must never say:

- `packages/npm/**` is missing because `packages/npm/**/dist` is missing.
- `packages/pypi/**` is missing because `packages/pypi/**/dist` is missing.

Correct wording:

- package root exists or does not exist
- package-internal artifact exists or does not exist
- missing package-internal artifacts may block pack, install, import, or type
  verification
- missing package-internal artifacts do not invalidate the release root identity

## 5. npm Release Root Rules

The npm release-root parent is `packages/npm/`.

Each `packages/npm/<pkg>/package.json` is inspected as a package release root,
subject to policy filtering.

Classification vocabulary:

| Classification | Meaning |
|:---|:---|
| `PUBLISH_CANDIDATE` | Public package candidate after policy filtering and evidence comparison |
| `PRIVATE_OR_INTERNAL` | Non-public root or workspace package |
| `BLOCKED_BY_POLICY` | Blocked by `private`, `mplp.ci_only`, `mplp.publishBlocked`, or internal class |
| `GENERATED_ONLY` | Generated output surface, not a package release root |
| `UNKNOWN_NEEDS_RESEARCH` | Insufficient evidence to classify safely |

The root repository `package.json` is not automatically publishable.

`@mplp/validator` remains blocked when `private`, `mplp.ci_only`, or
`mplp.publishBlocked` is present.

`@mplp/compliance` must be flagged `SPECIAL_OWNER_REVIEW` when deprecated,
legacy-alias, or compatibility-alias posture is detected.

The harness may consult `artifacts/release/publish-set.json` as historical
evidence, but that artifact is not publication authorization.

## 6. PyPI Release Root Rules

The PyPI release-root parent is `packages/pypi/`.

Each directory under `packages/pypi/` with `pyproject.toml`, `setup.cfg`, or
`setup.py` is inspected as a PyPI package release root, subject to policy
filtering.

Classification vocabulary:

| Classification | Meaning |
|:---|:---|
| `PYPI_PUBLISH_CANDIDATE` | Public PyPI package candidate after policy filtering |
| `PRIVATE_OR_INTERNAL` | Non-public package surface |
| `BLOCKED_BY_POLICY` | Blocked by policy metadata |
| `GENERATED_ONLY` | Generated output surface, not a package release root |
| `UNKNOWN_NEEDS_RESEARCH` | Insufficient evidence to classify safely |

The harness may consult `artifacts/release/pypi-set.json` as historical evidence,
but that artifact is not publication authorization.

## 7. Source Mirror Exclusion Rules

`packages/sources/**` surfaces are source mirrors or source preparation surfaces.
They must not enter the Publish Set.

Source mirrors may provide provenance for public package roots, but they are not
registry package roots.

If a source mirror contains package-internal or generated `dist/**` content, that
content is a source-mirror artifact boundary. It is not a direct authorization to
patch dist, publish dist, or treat the mirror as a release root.

## 8. Root `dist/**` Distinction

Root-level `dist/**` is clean build or generated publication output for MPLP
projection. It is not, by default, the npm or PyPI package release root.

The harness must not confuse root `dist/**` with:

- `packages/npm/**`
- `packages/pypi/**`
- package-internal `dist/**`
- source-mirror `dist/**`

## 9. Package-Internal Artifact Boundary

Package-internal artifacts include:

- `packages/npm/<pkg>/dist/**`
- `packages/pypi/<pkg>/dist/*.whl`
- `packages/pypi/<pkg>/dist/*.tar.gz`

These are `L2` package-internal artifacts. Missing package-internal artifacts may
block future pack, temp install, import, or type smoke verification, but they do
not invalidate the identity of the `L1` package release root.

Direct package-internal artifact patching is forbidden without provenance or an
explicit `DIST_AS_TRACKED_SOURCE_EXCEPTION` decision.

## 10. Placeholder Gate Correction

Echo-only scripts do not count as verification passes.

Examples:

- `echo 'No root tests configured'`
- `echo 'No root linting configured'`
- `echo 'No tests yet'`
- `echo 'Publish-only workspace: run unit tests in packages/sources/ instead'`

The harness must classify these as `PLACEHOLDER_NOT_REAL_PASS`, not as real
verification.

## 11. Source/Dist Provenance Rule

Any future package build, pack, wheel, sdist, temp install, import smoke, or type
smoke evidence must trace from:

1. package release root
2. source mirror or package source where applicable
3. generated package-internal artifact
4. pack or wheel/sdist output
5. clean consumer verification result

Evidence without this chain must not be used to claim release readiness.

## 12. No-Publish Rule

The package harness must not implement publish mode.

If a script receives any publish, upload, registry mutation, tag, seal, merge,
credential, version bump, build, pack, or install option outside an explicitly
authorized later goal, it must stop with:

```text
OWNER_AUTHORIZATION_REQUIRED
```

## 13. Owner Authorization Boundary

The following actions are outside this harness:

- `npm publish`
- `twine upload`
- registry mutation
- tag creation
- release sealing
- PR merge
- branch deletion
- credential access
- package version changes
- public owner/copyright changes
- L0 schema, invariant, taxonomy, or kernel duty mutation
- direct package-internal artifact patching
- generated release artifact commits

Green gates, successful script output, clean working trees, and historical
publish-set artifacts do not authorize these actions.

## 14. PR #33 Classification Rule

PR #33-related classification:

| Field | Value |
|:---|:---|
| Surface | `packages/sources/sdk-ts/dist/**` |
| SOT layer | `L2` / source mirror boundary |
| Current problem | tracked ignored source mirror dist contains legacy owner strings |
| Deeper problem | source-to-dist provenance and evidence overclaim risk |

Allowed future action:

- revalidate under derivation matrix
- correct evidence record if overclaimed
- regenerate artifact only if upstream source and generator are proven
- otherwise stop for `DIST_AS_TRACKED_SOURCE_EXCEPTION` decision

Forbidden future action:

- direct patch dist without provenance or exception
- claim release readiness from dist-only cleanup

## 15. Evidence Path Conventions

Future package-preflight evidence should use:

| Evidence | Path |
|:---|:---|
| Surface report | `artifacts/package-preflight/<goal-id>/surface-report.json` |
| npm surface | `artifacts/package-preflight/<goal-id>/npm-surface.json` |
| PyPI surface | `artifacts/package-preflight/<goal-id>/pypi-surface.json` |
| Gate results | `artifacts/package-preflight/<goal-id>/gate-results.json` |
| Pack plan | `artifacts/package-preflight/<goal-id>/pack-plan.json` |
| Install smoke plan | `artifacts/package-preflight/<goal-id>/install-smoke-plan.json` |
| Import smoke plan | `artifacts/package-preflight/<goal-id>/import-smoke-plan.json` |
| No-publish compliance | `artifacts/package-preflight/<goal-id>/no-publish-compliance.json` |

Evidence classification vocabulary:

- `PASS`
- `PASS_PLACEHOLDER`
- `PLACEHOLDER_NOT_REAL_PASS`
- `NOT_AVAILABLE`
- `NOT_RUN`
- `BLOCKED`
- `FAIL`
- `FAIL_PREEXISTING_OR_UNRELATED`
- `FAIL_PATCH_CAUSED`

This goal does not require generated release artifacts. Surface reports may be
printed to stdout unless a later goal explicitly authorizes writing evidence
artifacts.

## 16. Final Verdict Vocabulary

Package harness verdict vocabulary:

- `PACKAGE_SURFACE_MODEL_VALIDATED`
- `PACKAGE_PREFLIGHT_RESEARCH_COMPLETE`
- `READY_FOR_NPM_PYPI_PREFLIGHT_RERUN`
- `BLOCKED_PACKAGE_INTERNAL_ARTIFACT_MISSING`
- `BLOCKED_PACKAGE_SURFACE_UNCLEAR`
- `BLOCKED_OWNER_DECISION_REQUIRED`
- `BLOCKED_PLACEHOLDER_GATES_ONLY`
- `BLOCKED_DIST_AS_TRACKED_SOURCE_EXCEPTION_REQUIRED`
- `BLOCKED_PACKAGE_ARTIFACT_MISMATCH`
- `BLOCKED_PREFLIGHT_SCRIPT_FAILURE`

## 17. Script Entry Points

The repository-local script is:

```bash
node scripts/semantic/package-preflight-harness.mjs --mode=surface --no-publish
node scripts/semantic/package-preflight-harness.mjs --mode=research --no-publish
node scripts/semantic/package-preflight-harness.mjs --mode=verify-plan --no-publish
```

Root package scripts may wrap these commands as no-publish inspection helpers.
They must not add publish, upload, build, pack, install, version, deploy, tag, or
seal behavior.
