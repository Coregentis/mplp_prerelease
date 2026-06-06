---
entry_surface: repository
entry_model_class: primary
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "AGENTIC-HARNESS-TWO-LAYER-GOVERNANCE-BASELINE-01"
surface_role: canonical
record_state: final
title: "Agentic Harness Two-Layer Governance Baseline 01"
---

# Agentic Harness Two-Layer Governance Baseline 01

## 1. Purpose

This record documents the implementation of the first repository-local Codex
Agentic Engineering Harness baseline.

The baseline makes future Codex goals mutually verify:

- repository-level governance, and
- Codex execution governance.

It does not authorize package publication, registry mutation, tag creation,
release sealing, branch deletion, PR merge, credential access, package version
changes, public owner/copyright changes, or L0 protocol truth mutation.

## 2. Repo Truth

| Item | Value |
|:---|:---|
| Repository path | `/Users/jasonwang/Documents/AI_Dev/V1.0_release` |
| Starting branch | `public-promotion/protocol-v1.0.0-rc1` |
| Implementation branch | `codex/agentic-harness-two-layer-governance-baseline-01` |
| Starting HEAD | `a5cc65e78` |
| Existing remotes | `origin`, `origin-oss`, `protocol-dev`, `v2` |
| Pre-existing dirty state | `MPLP_website` modified; `governance/01-constitutional/CONST-007_CROSS_SURFACE_BRAND_UX_CONSTITUTION.md` untracked; `governance/03-distribution/sdk/MPLP-v1.0.0-EXTERNAL-ACCESS-PREREQUISITES-CHECKLIST-2026-04-07.md` untracked |
| Existing local `AGENTS.md` | Not present before this baseline |
| Existing `.codex/config.toml` | Not present before this baseline |
| Existing local `.agents/skills/**` | Not present before this baseline |
| Existing goal template | Not present before this baseline |

## 3. Files Changed

| Path | Purpose |
|:---|:---|
| `AGENTS.md` | Adds the repository-level Codex operating contract |
| `.codex/config.toml` | Enables goals and points to Harness assets without defining publication authority |
| `.agents/skills/agentic-harness-goal-preflight/SKILL.md` | Adds the callable six-method preflight and retrospective skill |
| `governance/codex-goals/CODEX-GOAL-TEMPLATE.md` | Adds a reusable Goal declaration and evidence template |
| `governance/04-records/AGENTIC-HARNESS-TWO-LAYER-GOVERNANCE-BASELINE-01.md` | Records this baseline and its limits |

No L0 schema, invariant, taxonomy, kernel duty, package version, package
artifact, generated artifact, registry surface, tag, seal, or publication
surface was changed by this baseline.

## 4. Two-Layer Governance Model

### Layer A: Repository Governance

Repository Governance defines the repository's truth sources, schemas,
invariants, taxonomy, source files, generated artifacts, package surfaces,
verification reports, governance records, mutation rules, and release or publish
boundaries.

For schema/projection work, the repository methods remain:

| Method | Layer | Role |
|:---|:---|:---|
| `DIV` | Repository Governance | Derivation integrity |
| `TSV` | Repository Governance | Truth reference verification |
| `XCV` | Repository Governance | Schema/YAML/docs cross-consistency |
| `SCV` | Repository Governance | Surface completeness |
| `SUC` | Repository Governance | SDK/API usage conformance |
| `EVC` | Repository Governance | Evolution compatibility |

### Layer B: Codex Agentic Harness

Codex Agentic Harness defines how Codex executes each goal:

- classify the SOT layer
- identify upstream truth
- identify downstream artifacts
- select repository governance methods
- apply development-thinking methods
- declare authorized and forbidden mutations
- run safe gates
- produce evidence
- stop for owner decision when required
- produce final verdict and PRM retrospective

Repository gates verify state but do not authorize publication or irreversible
actions. Codex execution rules constrain process but do not define protocol
truth.

## 5. Development Method Execution Table

| Method | Applied? | Why Applied | Inputs Used | Output Produced | Repo Governance Link | Gaps |
|:---|:---:|:---|:---|:---|:---|:---|
| `SCTM` | Yes | Goal had implementation scope and forbidden actions | User request, repo truth, mode | Goal model and SOT classification | Identifies `DIV`/`TSV`/`XCV` triggers | None known |
| `GLFB` | Yes | Needed separation of verification from authorization | Owner boundaries, repo methods, forbidden actions | Decision and authorization matrix | Maps to `EVC`/`SUC`/`XCV` when relevant | No owner publication authorization present |
| `ITCM` | Yes | Baseline spans repo governance and Codex execution assets | File topology, SOT layers, governance dirs | Object map and derivation matrix | Maps to `DIV`/`SCV`/`XCV` | Machine enforcement remains future work |
| `RBCT` | Yes | Goal required surgical implementation only | Mode, scope, gates | Staged plan and stop conditions | Selects applicable gates | No publish or release stage allowed |
| `VIM` | Yes | Goal includes explicit forbidden action baseline | Forbidden actions, dirty tree, L0 boundaries | Risk and forbidden action matrix | Maps to `EVC`/`DIV`/`SUC` as applicable | Runtime enforcement remains procedural |
| `PRM` | Yes | Baseline must harden future goals | Gate results, files changed, evidence limits | Retrospective expectations | Creates governance record and templates | Future goals must keep this updated |

## 6. Methodology Separation Table

| Method ID | Layer | Purpose | Applied When | Must Not Be Confused With | Evidence / Gate |
|:---|:---|:---|:---|:---|:---|
| `SCTM` | Codex Agentic Harness | Governed task modeling | Beginning of every goal | `TSV` | Goal model |
| `GLFB` | Codex Agentic Harness | Decision and authorization analysis | Decision boundary | `EVC` | Decision matrix |
| `ITCM` | Codex Agentic Harness | Topology and constraint modeling | Multi-surface or SOT work | `DIV` | Derivation matrix |
| `RBCT` | Codex Agentic Harness | Bounded staged planning | Every execution prompt | Repo gate execution | Stage plan |
| `VIM` | Codex Agentic Harness | Violation and impact control | Risk or irreversible boundary | `SUC` | Risk register |
| `PRM` | Codex Agentic Harness | Retrospective hardening | End of every goal | Governance method execution | Retrospective |
| `DIV` | Repository Governance | Derivation integrity | Generated artifact/provenance | `ITCM` | Derivation evidence |
| `TSV` | Repository Governance | Truth reference closure | Source truth touched | `SCTM` | Reference closure |
| `XCV` | Repository Governance | Cross-consistency | Schema/YAML/docs alignment | `GLFB` | Cross-consistency evidence |
| `SCV` | Repository Governance | Projection completeness | Derived schema/type surface | `ITCM` | Surface coverage |
| `SUC` | Repository Governance | Usage conformance | SDK/API/runtime usage | `VIM` | Binding/injection proof |
| `EVC` | Repository Governance | Evolution compatibility | Version/protocol transition | `GLFB` | Diff/migration evidence |

## 7. Two-Layer Governance Alignment Table

| Goal Type | Repo Governance Required | Codex Harness Required | SOT Layer | Authorized Mutation | Forbidden Mutation | Owner Decision Needed |
|:---|:---|:---|:---|:---|:---|:---|
| Read-only research | Repo truth sources and evidence records | `SCTM`, `GLFB`, `ITCM`, `RBCT`, `VIM`, `PRM` | Any, read-only | None | File mutation, staging, commit, push | If action exceeds research |
| Surgical patch | Applicable methods for touched surfaces | Full six-method execution | Declared layer only | Scoped source/doc/governance/template edits | Publish, upload, tag, seal, unrelated files | For irreversible or L0/public-surface changes |
| Verification only | Applicable local gates | `RBCT`, `VIM`, evidence integrity | L3 | Local gates only | Artifact mutation unless declared | If gates imply release action |
| Release preparation | SDKR and schema/release methods | Full six-method execution | L3/L4 prep only | Evidence/preflight records | Actual publish/upload/tag/seal | Before any publication |
| Schema change | `DIV`, `TSV`, `XCV`, `SCV`, `EVC` | Full six-method execution | L0 | None unless explicitly authorized | L0 mutation without schema intake | Always |
| Downstream product discovery | Candidate/promotion rules | `SCTM`, `GLFB`, `ITCM`, `VIM`, `PRM` | L5 to candidate evidence | Candidate evidence only | Direct L0 back-write | For promotion |

## 8. SOT Derivation Matrix

| Upstream SOT | Layer | Downstream Artifact | Derivation Type | Verification Method | Evidence Required | Drift Risk |
|:---|:---|:---|:---|:---|:---|:---|
| `schemas/v2/**` | L0 | package schemas, validators, docs, lab rules | Generated/projected | `DIV`, `TSV`, `XCV`, `SCV`, `SUC`, `EVC` | Manifest, tests, reports | Docs/package/runtime stale |
| invariants/taxonomy/kernel duties | L0 | docs, examples, Validation Lab, runtime mapping | Projected | `XCV`, `SUC`, `EVC` | Cross-consistency and usage evidence | Semantic mismatch |
| package source | L1 | `dist`, npm pack | Generated | `DIV`, `SCV`, `SUC` | Build, pack, install smoke | Source/dist drift |
| docs source | L1 | docs site | Built publication surface | `XCV`, docs methods | Docs build/link evidence | Public docs stale |
| website source | L1 | public website | Built/deployed surface | docs/website governance | Build/link evidence | Discovery claims drift |
| release evidence | L3 | release decision records | Manual governance record | SDKR methods | Evidence bundle | Evidence overclaim |
| Cognitive OS / SoloCrew feedback | L5 | MPLP candidate backlog | Candidate evidence | Promotion rules | Candidate evidence package | Product need pollutes protocol |

## 9. Forbidden Action Matrix

| Action | Allowed in Research | Allowed in Surgical Patch | Allowed in Verification | Requires Owner Authorization | Notes |
|:---|:---:|:---:|:---:|:---:|:---|
| File mutation | No | Scoped only | No unless declared | Sometimes | Research cannot mutate |
| Stage/commit/push | No | Commit only after scoped patch and gates | No | Push requires explicit authorization | Do not push by default |
| npm publish | No | No | No | Yes | Publication boundary |
| twine upload | No | No | No | Yes | Publication boundary |
| Registry mutation | No | No | No | Yes | Includes package metadata mutation |
| Tag/release/seal | No | No | No | Yes | Irreversible authority boundary |
| PR merge | No | No | No | Yes | Do not infer from green gates |
| Branch deletion | No | No | No | Yes | Destructive operation |
| Credential access | No | No | No | Yes | Avoid tokens and secrets |
| Package version change | No | No unless explicitly scoped | No | Yes | Requires release/version decision |
| Public owner/copyright change | No | No unless explicitly scoped | No | Yes | Public identity boundary |
| L0 schema/invariant/taxonomy mutation | No | No unless schema-intake authorized | No | Yes | Continuous SOT traceability required |
| Direct L2 dist patch | No | No unless exception-approved | No | Yes | Requires provenance or `DIST_AS_TRACKED_SOURCE_EXCEPTION` |

## 10. Future Enforcement Expectations

Future Codex goals must use:

- `AGENTS.md` as the repository operating contract
- `.agents/skills/agentic-harness-goal-preflight/SKILL.md` as the callable
  preflight and retrospective method
- `governance/codex-goals/CODEX-GOAL-TEMPLATE.md` as the goal declaration
  scaffold
- repository governance methods under `governance/02-methods/` and
  `governance/03-distribution/` for actual verification

## 11. Known Limitations

- This baseline is procedural and documentation-driven; it does not yet add a
  machine gate that blocks commits missing goal declarations.
- Root `npm test` and `npm run lint` are placeholders in this checkout.
- Existing dirty worktree entries were not modified or resolved by this goal.
- No npm/PyPI publication, registry mutation, tag, seal, or release action was
  performed.

## 12. Gates Run

| Gate | Result | Notes |
|:---|:---:|:---|
| `git diff --check -- AGENTS.md .codex/config.toml .agents/skills/agentic-harness-goal-preflight/SKILL.md governance/codex-goals/CODEX-GOAL-TEMPLATE.md governance/04-records/AGENTIC-HARNESS-TWO-LAYER-GOVERNANCE-BASELINE-01.md` | PASS | Whitespace check over new Harness files |
| `npm run lint` | PASS_PLACEHOLDER | Root script prints `No root linting configured` |
| `npm test` | PASS_PLACEHOLDER | Root script prints `No root tests configured` |
| `python3` TOML parse for `.codex/config.toml` | PASS | Parsed successfully with `tomllib`/`tomli` fallback |
| Frontmatter presence check for new Markdown files | PASS | Confirmed leading and closing frontmatter markers |

## 13. Evidence Integrity Statement

The gates above verify formatting, placeholder root scripts, TOML syntax, and
frontmatter structure for the new Harness files. They do not prove package
release readiness, schema conformance, registry readiness, website correctness,
or generated artifact parity.

## 14. Forbidden Action Compliance Statement

This goal did not publish to npm or PyPI, upload artifacts, mutate a registry,
create a tag, declare a seal, merge a PR, delete a branch, access credentials,
change package versions, change public owner/copyright wording, mutate L0
schemas/invariants/taxonomy/kernel duties, or patch L2 dist artifacts.

## 15. Final Verdict

`COMPLETE_READY_FOR_PACKAGE_PREFLIGHT_RESEARCH`
