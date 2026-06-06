---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "AGENTS"
---

# Codex Agent Operating Contract

This repository uses a two-layer Agentic Engineering Harness. Every non-trivial
Codex goal must satisfy this contract before changing files.

## Workspace Freeze / Migration Source

`/Users/jasonwang/Documents/AI_Dev/Coregentis` is the Coregentis canonical
workspace root for future active MPLP/Coregentis development.

Coregentis canonical workspace root:
`/Users/jasonwang/Documents/AI_Dev/Coregentis`.

`/Users/jasonwang/Documents/AI_Dev/V1.0_release` is frozen as a
non-authoritative migration/evidence source. Do not treat V1.0_release as
global MPLP SOT.

V1.0_release is frozen as migration/evidence source; do not treat V1.0_release as global MPLP SOT.

Use V1.0_release only as a migration/evidence source unless the owner explicitly
authorizes a new V1-scoped goal. No new active protocol, package, source
recovery, package preflight, or release-readiness work should start here.
Content from V1.0_release may enter Coregentis repos only through explicit
migration, backport, or projection goals with evidence.

MPLP-Protocol-Dev is protocol/package/release Dev truth:
`/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol-Dev`.

Next Dev-side goals are `DEV-HARNESS-BACKPORT-01` and
`PACKAGE-DEV-TRUTH-SOURCE-RECOVERY-PLAN-01`. This V1 freeze provides no
publish, no upload, no tag, no seal, and no merge authorization.

## 1. Required Repo Truth Check

Before any mutation, inspect and record:

- repository path
- branch and HEAD
- working tree status
- remotes
- applicable `AGENTS.md`
- `.codex/config.toml`
- `.agents/skills/**`
- applicable governance methods under `governance/02-methods/`
- applicable distribution methods under `governance/03-distribution/`
- applicable records under `governance/04-records/`
- package scripts and safe local gates

If repo truth is unclear, stop with `BLOCKED_REPO_TRUTH_UNCLEAR`.

## 2. Two-Layer Governance

### Layer A: Repository Governance

Repository Governance defines the repository's truth, source files, generated
artifacts, package surfaces, evidence, governance records, mutation rules, and
release or publication boundaries.

For schema and projection work, the repository governance methods are:

| Method | Name | Role |
|:---|:---|:---|
| `DIV` | Derivation Integrity Verification | Derivation boundary, manifest, determinism, generator contract |
| `TSV` | Truth Source Verification | Schema references and dependency closure |
| `XCV` | Cross-Consistency Verification | Schema, YAML, and docs consistency |
| `SCV` | Surface Completeness Verification | Derived schema and projection coverage |
| `SUC` | Usage Conformance Verification | SDK/API binding, injection proof, round-trip behavior |
| `EVC` | Evolution Compatibility Verification | Version transition, compatibility, migration handling |

These are repository verification methods. They are not Codex reasoning methods.

### Layer B: Codex Agentic Harness

Codex Agentic Harness defines how Codex executes each goal:

- classify the SOT layer
- identify upstream truth
- identify downstream artifacts
- select applicable repository governance methods
- apply the development-thinking methods
- declare authorized mutations
- declare forbidden mutations
- run safe gates
- produce evidence
- stop for owner decision when required
- produce a final verdict and retrospective

Codex Agentic Harness does not replace Repository Governance. Green gates verify
state; they do not authorize publish, upload, tag, seal, merge, or registry
mutation.

## 3. Three-Repo Boundary

The discovery chain is:

`SoloCrew user need / Wow moment -> product requirement -> Cognitive OS neutral runtime requirement -> MPLP definition mapping -> MPLP Candidate / MPGC`.

The truth chain is:

`MPLP -> Cognitive OS -> SoloCrew`.

Protocol truth flows downward. Downstream repos may provide candidate evidence,
implementation pressure, runtime feedback, product validation, and gap reports,
but they must not directly back-write L0 MPLP schemas, invariants, taxonomy,
kernel duties, or protocol definitions.

## 4. Repository / Remote Authority Model

Every non-trivial goal must declare:

- target workstream
- authoritative local repository
- current local repository
- authoritative remote
- current tracking remote
- active branch
- allowed push target
- forbidden remotes
- whether cross-repo synchronization is in scope
- whether owner authorization is required before push, sync, or publication

Repository truth must be checked before any mutation. A clean local worktree,
green local gate, pushed branch, or existing remote name does not grant authority
to push to another remote, synchronize another repository, or mutate a public
projection surface.

### Workstream-To-Repository Matrix

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

Current package harness and package preflight work is authoritative in
`/Users/jasonwang/Documents/AI_Dev/V1.0_release` on the current feature branch.
Do not move it into MPLP-Protocol-Dev unless a future synchronization or
cherry-pick goal explicitly authorizes that transfer.

Protocol schema/source development must not be performed from
`/Users/jasonwang/Documents/AI_Dev/V1.0_release` unless the goal explicitly
defines the work as release projection or public promotion. MPLP protocol
development, schema changes, invariants, taxonomy, kernel duties, PR #13-style
Dev work, and MPLP v2 schema intake require
`/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol-Dev` as the
authoritative local repo unless the owner declares a different authority.

`origin-oss`, `protocol-dev`, and `v2` are not default push targets for current
package harness work. Pushes to those remotes require explicit owner
authorization and a goal that names the remote, workstream, and synchronization
scope.

Downstream Cognitive OS, SoloCrew, Website, Documentation, and Validation Lab
repositories may consume or validate protocol projections, but they are not
package harness authorities and must not be synchronized inside package harness
goals.

## 5. SOT Layer Classification

Every goal must declare affected SOT layers:

| Layer | Meaning | Examples |
|:---|:---|:---|
| `L0` | Protocol Truth | 10 module schemas, v2 object model, invariants, taxonomy, kernel duties, protocol definitions |
| `L1` | Projection Source | Package source, docs source, website source, Validation Lab source, generator input, runtime mapping source |
| `L2` | Generated Artifact | `dist`, declarations, pack output, wheel, generated docs, generated manifests |
| `L3` | Verification Evidence | Tests, smoke results, manifest checks, conformance reports, release evidence, audit records |
| `L4` | Publication Surface | npm, PyPI, official website, docs site, GitHub release, public registry, deployed lab |
| `L5` | Downstream Runtime / Product | Cognitive OS, SoloCrew, runtime consumption, product projections |
| `L6` | Codex Execution Governance | `AGENTS.md`, Skill files, goal templates, reviewer agents, forbidden actions, execution records |

L0 changes require explicit owner/schema-intake authorization and continuous SOT
traceability. L1-L5 changes require task-start SOT/SOP verification and must
follow the declared derivation chain.

## 6. Development-Thinking Methods

The Codex execution methods are:

| Method | Name | Required Role |
|:---|:---|:---|
| `SCTM` | Structured Context & Task Modeling | Clarify task and model governed intent |
| `GLFB` | Governance Logic & Feedback Balancing | Analyze decisions and authorization boundaries |
| `ITCM` | Integrated Topology & Constraint Modeling | Map topology, SOT layers, derivation chain, constraints |
| `RBCT` | Roadmap-Bounded Change & Tasking | Build one-goal staged execution plan |
| `VIM` | Violation, Impact & Mitigation | Identify forbidden actions, risks, mitigations, rollback |
| `PRM` | Post-Run Retrospective & Method Hardening | Harden methods, gates, SOP, evidence after execution |

Use `.agents/skills/agentic-harness-goal-preflight/SKILL.md` for the complete
callable method specification.

## 7. Pre-Execution Contract

For every non-trivial goal, Codex must produce or internally satisfy:

- `sctm_goal_model`
- `glfb_decision_matrix`
- `itcm_derivation_matrix`
- `rbct_stage_plan`
- `vim_risk_register`
- `applicable_repo_governance_methods`
- repository / remote authority declaration

Codex must not start by editing files.

## 8. Forbidden Action Baseline

Always forbidden unless explicitly authorized by the owner:

- `npm publish`
- `twine upload`
- package registry mutation
- GitHub release
- tag creation
- seal declaration
- production deployment
- branch deletion
- PR merge
- credential access
- package version change
- public owner/copyright change
- L0 protocol schema mutation
- invariant mutation
- taxonomy mutation
- kernel duty mutation
- direct L2 dist patch without source provenance or `DIST_AS_TRACKED_SOURCE_EXCEPTION`
- push to a non-authoritative or forbidden remote
- cross-repo synchronization without an explicit sync goal

Research mode also forbids file mutation, staging, commit, push, generation,
publish, upload, tag, and seal.

Surgical patch mode permits only scoped source, documentation, governance, or
template changes explicitly declared by the goal. It never authorizes
publication.

Verification mode permits local build, lint, test, pack, local install smoke,
`twine check`, import smoke, and manifest checks. It never authorizes publish,
upload, tag, or seal.

Release preparation mode permits release evidence generation, package preflight,
and manifest validation. It does not authorize actual publication.

## 9. Required Post-Execution Contract

Every completed goal must report:

- gate results
- evidence integrity statement
- forbidden-action compliance statement
- files changed and files intentionally not touched
- repository / remote authority compliance statement
- PRM retrospective or hardening recommendation
- final verdict

Allowed blocked verdicts include:

- `BLOCKED_REPO_TRUTH_UNCLEAR`
- `BLOCKED_SOT_PROVENANCE_MISSING`
- `BLOCKED_OWNER_AUTHORIZATION_REQUIRED`
- `BLOCKED_GATES_FAILING`
- `BLOCKED_PATCH_GATE_FAILURE`
- `BLOCKED_RELEASE_AUTHORIZATION_REQUIRED`
- `BLOCKED_LOCAL_REPO_AUTHORITY_MISMATCH`
- `BLOCKED_REMOTE_AUTHORITY_MISMATCH`
- `BLOCKED_TRACKING_BRANCH_UNCLEAR`
- `BLOCKED_FORBIDDEN_REMOTE_TARGET`
- `BLOCKED_CROSS_REPO_SYNC_NOT_AUTHORIZED`
- `BLOCKED_PUBLIC_PROJECTION_AUTHORIZATION_REQUIRED`
- `BLOCKED_PROTOCOL_DEV_REPO_REQUIRED`
- `BLOCKED_PACKAGE_HARNESS_REPO_REQUIRED`

Repository / remote blocked verdict definitions:

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

## 10. MPLP 2.0 Derivation Rule

MPLP 2.0 is not "just schema changes." Any change to the 10 module schemas, v2
object model, invariants, taxonomy, kernel duties, lifecycle objects, or
protocol definitions must be mapped across:

`L0 protocol truth -> L1 source projections -> L2 generated artifacts -> L3 verification evidence -> L4 publication surfaces -> L5 Cognitive OS / SoloCrew consumption -> L6 Codex execution records`.

The derivation matrix must include docs, packages, runtime mapping, Validation
Lab, website, owner/copyright wording, release evidence, Cognitive OS
consumption, and SoloCrew projection impact.
