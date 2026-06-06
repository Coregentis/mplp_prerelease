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

## 4. SOT Layer Classification

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

## 5. Development-Thinking Methods

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

## 6. Pre-Execution Contract

For every non-trivial goal, Codex must produce or internally satisfy:

- `sctm_goal_model`
- `glfb_decision_matrix`
- `itcm_derivation_matrix`
- `rbct_stage_plan`
- `vim_risk_register`
- `applicable_repo_governance_methods`

Codex must not start by editing files.

## 7. Forbidden Action Baseline

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

## 8. Required Post-Execution Contract

Every completed goal must report:

- gate results
- evidence integrity statement
- forbidden-action compliance statement
- files changed and files intentionally not touched
- PRM retrospective or hardening recommendation
- final verdict

Allowed blocked verdicts include:

- `BLOCKED_REPO_TRUTH_UNCLEAR`
- `BLOCKED_SOT_PROVENANCE_MISSING`
- `BLOCKED_OWNER_AUTHORIZATION_REQUIRED`
- `BLOCKED_GATES_FAILING`
- `BLOCKED_PATCH_GATE_FAILURE`
- `BLOCKED_RELEASE_AUTHORIZATION_REQUIRED`

## 9. MPLP 2.0 Derivation Rule

MPLP 2.0 is not "just schema changes." Any change to the 10 module schemas, v2
object model, invariants, taxonomy, kernel duties, lifecycle objects, or
protocol definitions must be mapped across:

`L0 protocol truth -> L1 source projections -> L2 generated artifacts -> L3 verification evidence -> L4 publication surfaces -> L5 Cognitive OS / SoloCrew consumption -> L6 Codex execution records`.

The derivation matrix must include docs, packages, runtime mapping, Validation
Lab, website, owner/copyright wording, release evidence, Cognitive OS
consumption, and SoloCrew projection impact.
