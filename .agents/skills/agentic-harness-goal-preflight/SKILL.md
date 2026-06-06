---
name: agentic-harness-goal-preflight
description: Apply the MPLP Agentic Engineering Harness before, during, and after non-trivial Codex goals.
---

# Agentic Harness Goal Preflight

Use this skill for every non-trivial goal in this repository, especially work
touching schema, package, docs, website, Validation Lab, Cognitive OS, SoloCrew,
release, publication, PR classification, or governance.

## Methodology Separation

Do not confuse development-thinking methods with repository verification
methods.

| Method ID | Layer | Purpose | Applied When | Must Not Be Confused With | Evidence / Gate |
|:---|:---|:---|:---|:---|:---|
| `SCTM` | Codex Agentic Harness | Convert a user request into a governed task model | Beginning of every goal | `TSV` truth verification | Goal model and SOT classification |
| `GLFB` | Codex Agentic Harness | Separate technical possibility, governance permission, owner authorization, and strategic correctness | Any decision boundary | `EVC` release/version verification | Decision matrix and owner-decision requirement |
| `ITCM` | Codex Agentic Harness | Model repositories, objects, layers, dependencies, authority, and derivation edges | Any multi-surface or SOT-layer goal | `DIV` derivation verification | Object map, constraint map, derivation matrix |
| `RBCT` | Codex Agentic Harness | Convert work into one bounded staged goal | Every execution prompt | Any repo gate | Stage plan and stop conditions |
| `VIM` | Codex Agentic Harness | Identify forbidden actions, irreversible risks, impact, mitigation, and rollback | Release, registry, L0, generated artifact, or downstream-impact work | `SUC` usage conformance | Risk register and forbidden-action matrix |
| `PRM` | Codex Agentic Harness | Convert findings into hardening recommendations | End of every goal | Governance method execution itself | Retrospective and evidence integrity statement |
| `DIV` | Repository Governance | Verify derivation boundary, manifest, determinism, generator contract | Generated artifacts or provenance | `ITCM` topology modeling | Derivation evidence |
| `TSV` | Repository Governance | Verify truth references and dependency closure | Source truth touched | `SCTM` task modeling | Reference closure evidence |
| `XCV` | Repository Governance | Verify schema, YAML, and docs consistency | Cross-surface alignment | `GLFB` decision analysis | Cross-consistency evidence |
| `SCV` | Repository Governance | Verify projection completeness | Derived schema or type surface | `ITCM` topology modeling | Surface coverage evidence |
| `SUC` | Repository Governance | Verify SDK/API usage conformance | SDK/API/runtime usage | `VIM` risk analysis | Binding and injection evidence |
| `EVC` | Repository Governance | Verify evolution compatibility | Version or protocol transition | `GLFB` authorization logic | Diff classification and migration evidence |

## Required Execution Order

1. `SCTM`: clarify task and model governed intent.
2. `GLFB`: analyze decisions and authorization boundaries.
3. `ITCM`: map topology, SOT layers, derivation chain, constraints.
4. `RBCT`: build one-goal staged execution plan.
5. `VIM`: identify forbidden actions, risks, mitigations, rollback.
6. Execute only the authorized stage actions.
7. `PRM`: harden methods, gates, SOP, evidence after execution.

Codex must not start by editing files. The only exception is a trivial
self-contained request where repo governance is irrelevant.

## SCTM: Structured Context & Task Modeling

Purpose: turn a natural-language request into a governed task model.

Applies: every goal start, especially schema, package, docs, website,
Validation Lab, Cognitive OS, SoloCrew, release, and PR classification.

Required inputs:

- exact user request
- target repository
- branch, HEAD, working tree, open PR if any
- target workstream
- authoritative local repository
- authoritative remote
- current tracking remote
- forbidden remotes
- cross-repo synchronization scope
- intended outcome
- explicit forbidden actions

Steps:

1. Capture the goal in one precise sentence.
2. Classify the goal type: `readonly_research`, `governance_design`,
   `surgical_patch`, `schema_change`, `generated_artifact_regeneration`,
   `package_preflight`, `release_preparation`, `publication_surface_update`,
   `downstream_runtime_consumption`, or `product_projection_consumption`.
3. Identify affected SOT layers `L0` through `L6`.
4. Identify upstream truth.
5. Identify downstream derivatives.
6. Define acceptance criteria.
7. Declare repository / remote authority.
8. Declare open questions and stop conditions.

Required output: goal statement, goal type, target repo, SOT layer, upstream
SOT, downstream derivatives, acceptance criteria, authorized mutations,
forbidden mutations, repository / remote authority, stop conditions.

Must not: infer owner authorization, mutate files during clarification, treat
product need as protocol authority, or treat green gates as release approval.

## Repository / Remote Authority Preflight

Every non-trivial goal must declare:

| Field | Required Meaning |
|:---|:---|
| Workstream | Current workstream, such as package harness, protocol development, public projection, Dev bridge, v2 line, Cognitive OS, SoloCrew, or Validation Lab |
| Authoritative Local Repo | Local repo path that is allowed to mutate for the declared workstream |
| Current Local Repo | `git rev-parse --show-toplevel` for the current shell |
| Authoritative Remote | Remote that is authoritative for the workstream and branch |
| Current Tracking Remote | Upstream tracking branch, if any |
| Allowed Push Target | Remote/branch that may receive pushes when the goal permits push |
| Forbidden Remotes | Remotes that must not be pushed in this goal |
| Cross-Repo Sync In Scope? | Whether copy/cherry-pick/sync across repositories is explicitly authorized |
| Owner Authorization Required? | Whether push, sync, publication, public projection, or schema authority requires owner authorization |

Authority matrix:

| Workstream | Authoritative Local Repo | Authoritative Remote | Allowed Default Push | Forbidden Without Owner Authorization |
|:---|:---|:---|:---|:---|
| Current Agentic Harness / Package Harness / NPM-PyPI preflight | `/Users/jasonwang/Documents/AI_Dev/V1.0_release` | `origin` on current feature branch | `origin` only | `origin-oss`, `protocol-dev`, `v2` |
| MPLP protocol development / schemas / invariants / taxonomy / PR #13 / v2 schema intake | `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol-Dev` | Inspect inside Dev repo; expected Coregentis/MPLP-Protocol-Dev | Dev repo origin only after inspection | `V1.0_release` `origin`, `origin-oss`, `v2` unless authorized |
| Public OSS projection | Task-specific public projection checkout | `origin-oss` or public projection remote | None by default | Any public push without owner authorization |
| Dev bridge from `V1.0_release` | `V1.0_release` plus `protocol-dev` remote | `protocol-dev` only for explicit sync goals | None by default | `protocol-dev` push without sync goal |
| Future v2 line | Task-specific v2 checkout or branch | `v2` only if declared authoritative | None by default | `v2` push without schema/v2 owner authorization |
| Cognitive OS downstream runtime | `/Users/jasonwang/Documents/AI_Dev/Coregentis/Cognitive_OS` | Inspect inside repo | Repo origin only after inspection | Treating it as MPLP protocol truth |
| SoloCrew downstream product | `/Users/jasonwang/Documents/AI_Dev/Coregentis/SoloCrew` | Inspect inside repo | Repo origin only after inspection | Treating it as MPLP protocol truth |
| Validation Lab evidence surface | `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Validation-Lab` or V2 lab repo | Inspect inside repo | Repo origin only after inspection | Treating it as package publication root |

Repository / remote blocked verdicts:

| Verdict | Definition |
|:---|:---|
| `BLOCKED_LOCAL_REPO_AUTHORITY_MISMATCH` | The current local repo does not match the authoritative local repo for the declared workstream. |
| `BLOCKED_REMOTE_AUTHORITY_MISMATCH` | The current tracking remote does not match the authoritative remote for the declared workstream. |
| `BLOCKED_TRACKING_BRANCH_UNCLEAR` | The branch has no clear upstream tracking branch, but the goal intends to push. |
| `BLOCKED_FORBIDDEN_REMOTE_TARGET` | The goal attempts to push to `origin-oss`, `protocol-dev`, `v2`, or another non-authoritative remote without explicit owner authorization. |
| `BLOCKED_CROSS_REPO_SYNC_NOT_AUTHORIZED` | The goal attempts to copy, cherry-pick, or sync across repos without an explicit cross-repo sync goal. |
| `BLOCKED_PUBLIC_PROJECTION_AUTHORIZATION_REQUIRED` | The goal attempts to update public OSS or public projection surfaces without owner authorization. |
| `BLOCKED_PROTOCOL_DEV_REPO_REQUIRED` | The goal attempts protocol schema/source development from the release/projection repo instead of MPLP-Protocol-Dev. |
| `BLOCKED_PACKAGE_HARNESS_REPO_REQUIRED` | The goal attempts package harness or NPM/PyPI preflight work outside `V1.0_release` without an explicit migration/sync goal. |

Must stop before mutation when:

- current local repo does not match the declared authoritative local repo
- current tracking remote is unclear and the goal intends to push
- the goal would push to `origin-oss`, `protocol-dev`, `v2`, or another
  non-authoritative remote without owner authorization
- the goal would synchronize repositories without an explicit cross-repo sync
  scope
- protocol schema/source development is attempted from `V1.0_release`
- package harness or NPM/PyPI preflight work is attempted outside
  `V1.0_release` without an explicit migration/sync goal

## GLFB: Governance Logic & Feedback Balancing

Purpose: separate technical feasibility, governance permission, owner
authorization, strategic alignment, reversibility, and downstream impact.

Applies: source/dist decisions, regeneration, merge, waiver, publish, tag, seal,
L0 schema changes, evidence claims, and docs/website updates after schema
changes.

Steps:

1. Identify decision points.
2. Classify each decision as reversible, irreversible, owner-required,
   repo-policy-required, publication-boundary, L0-boundary, or downstream-boundary.
3. Evaluate options by benefit, risk, SOT alignment, repo governance alignment,
   downstream impact, and rollback.
4. Separate verification from authorization.
5. Recommend a path and identify rejected options.
6. Record decision logic.

Must not: merge decision with execution, treat CI as owner approval, publish
after preflight without explicit authorization, or accept waiver without record.

## ITCM: Integrated Topology & Constraint Modeling

Purpose: model the system as layers, repositories, objects, dependencies,
authority boundaries, and derivation chains before changing anything.

Topology dimensions:

- repository topology: MPLP, Cognitive OS, SoloCrew, Validation Lab, Website, Docs
- repository / remote authority topology: workstream, authoritative local repo,
  current local repo, authoritative remote, tracking branch, forbidden remotes,
  sync scope
- truth topology: L0 through L6
- derivation topology: source-to-dist, source-to-pack, source-to-wheel,
  schema-to-docs, schema-to-validator, schema-to-runtime mapping,
  evidence-to-release record, website-copy-to-public positioning
- authority topology: protocol, repo governance, owner decision, Codex execution,
  publication
- boundary topology: v1 frozen spec, schemas v2 active iteration, product vs
  runtime, runtime vs protocol, source vs generated artifact, verification vs
  authorization

Steps:

1. Build object map.
2. Assign each object to SOT layer.
3. Identify derivation edges.
4. Identify authority boundaries.
5. Identify constraints.
6. Detect topology conflicts.
7. Produce derivation matrix.

Must not: patch L2 without L1 provenance, inline v2 objects into v1 frozen
modules, let product semantics pollute protocol truth, treat publication surface
as source truth, ignore downstream runtime/product impact, push to forbidden
remotes, or synchronize repositories without explicit authorization.

## RBCT: Roadmap-Bounded Change & Tasking

Purpose: convert a large request into one bounded goal with stages, gates,
rollback, evidence, and final verdict.

Allowed goal modes: `readonly_research`, `surgical_patch`,
`verification_only`, `release_preparation`.

Forbidden unless explicit owner authorization: publish, upload, tag, seal,
merge.

Each stage must declare purpose, allowed actions, forbidden actions, gates,
expected outputs, and stop conditions.

Must not: merge multiple goals, implement future scope, patch unrelated files,
publish inside preflight, tag inside validation, or convert research into patch
without authorization.

## VIM: Violation, Impact & Mitigation

Purpose: identify forbidden actions, irreversible operations, release risks,
credential risks, evidence overclaims, downstream drift, and mitigation paths.

Risk classes:

- irreversible publication: npm publish, twine upload, GitHub release, public
  website deploy, docs live deploy
- authority boundary: PR merge, branch deletion, release tag, seal, waiver,
  owner/copyright wording
- provenance boundary: direct dist patch, generated artifact without generator,
  pack changed without source, evidence claim without gate
- credential boundary: npm token, PyPI token, GitHub PAT, deployment token,
  signing key
- remote authority boundary: `origin-oss`, `protocol-dev`, `v2`, public
  projection remotes, Dev sync remotes, downstream repo remotes
- protocol boundary: L0 schema, invariant, taxonomy, kernel duty, v1 frozen spec
- downstream drift boundary: Cognitive OS, SoloCrew, docs, website, Validation Lab

Must not: access credentials, publish/upload/tag/seal without explicit owner
authorization, mutate L0 without schema-intake authorization, patch dist without
`DIST_AS_TRACKED_SOURCE_EXCEPTION`, push to a forbidden remote, cross-sync repos
without explicit authorization, or claim release-ready from partial evidence.

## PRM: Post-Run Retrospective & Method Hardening

Purpose: convert findings, failures, drift, blockers, evidence gaps, and owner
decisions into hardened governance assets.

Applies at the end of every goal and is mandatory when gates fail, package
smoke fails, evidence mismatches source truth, provenance is unclear, owner
decision is required, a forbidden boundary appears, release readiness is
blocked, or schema/runtime/docs/product drift is found.

Retrospective categories:

- execution result
- evidence result
- governance result
- hardening result

Must not: hide partial completion, overstate evidence, call preflight
publish-ready, delete history to clean a report, silently accept waiver, or leave
method updates unrecorded.

## Development to Repository Governance Mapping

| Development Method | Repo Governance Trigger |
|:---|:---|
| `SCTM` | `TSV` when source truth is touched; `DIV` when generated artifacts are touched; `XCV` when docs/source alignment is touched |
| `GLFB` | `EVC` when release/version is affected; `SUC` when package or SDK usage is affected; `XCV` when cross-surface alignment is affected |
| `ITCM` | `DIV` for derivation integrity; `SCV` for projection completeness; `XCV` for cross-consistency |
| `RBCT` | All applicable gates selected by goal type |
| `VIM` | `EVC` for version/release compatibility; `DIV` for provenance; `SUC` for usage safety; release governance records where applicable |
| `PRM` | Governance record creation/update; gate coverage recommendation; `AGENTS.md`, skill, or goal-template hardening |
