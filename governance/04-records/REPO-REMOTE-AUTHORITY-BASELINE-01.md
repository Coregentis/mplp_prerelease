---
entry_surface: repository
entry_model_class: primary
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "REPO-REMOTE-AUTHORITY-BASELINE-01"
surface_role: canonical
record_state: final
title: "Repo Remote Authority Baseline 01"
---

# Repo Remote Authority Baseline 01

## 1. Purpose

This record adds repository and remote authority rules to the Codex Agentic
Harness baseline.

The baseline prevents future Codex goals from confusing:

- local workspaces
- authoritative local repositories
- tracking branches
- package harness feature branches
- public projection remotes
- Dev bridge remotes
- protocol-dev remotes
- v2 remotes
- downstream runtime/product repositories

Every future non-trivial Codex goal must declare the target workstream,
authoritative local repository, current local repository, authoritative remote,
current tracking remote, active branch, allowed push target, forbidden remotes,
cross-repo synchronization scope, and owner authorization requirements before
mutation.

This record does not authorize package publication, registry mutation, release
tagging, release sealing, branch deletion, PR merge, credential access, package
version changes, L0 protocol truth mutation, package artifact patching, generated
artifact mutation, package preflight, or cross-repo synchronization.

## 2. Repo Truth

| Item | Value |
|:---|:---|
| Repository path | `/Users/jasonwang/Documents/AI_Dev/V1.0_release` |
| Branch | `codex/agentic-harness-two-layer-governance-baseline-01` |
| Starting HEAD | `19d916f0c` |
| Tracking branch | `origin/codex/agentic-harness-two-layer-governance-baseline-01` |
| Authoritative remote for this feature branch | `origin` |
| Remote `origin` | `https://github.com/Coregentis/mplp_prerelease.git` |
| Remote `origin-oss` | `https://github.com/Coregentis/MPLP-Protocol.git` |
| Remote `protocol-dev` | `https://github.com/Coregentis/MPLP-Protocol-Dev.git` |
| Remote `v2` | `https://github.com/Coregentis/MPLP-Validation-Lab-V2.git` |
| Pushed baseline confirmed | `19d916f0c` exists on `origin/codex/agentic-harness-two-layer-governance-baseline-01` |
| Pre-existing dirty state | `M MPLP_website`; untracked `governance/01-constitutional/CONST-007_CROSS_SURFACE_BRAND_UX_CONSTITUTION.md`; untracked `governance/03-distribution/sdk/MPLP-v1.0.0-EXTERNAL-ACCESS-PREREQUISITES-CHECKLIST-2026-04-07.md` |

The pre-existing dirty entries were not modified or staged by this goal.

## 3. Harness Method Execution

| Method | Applied? | Role | Output |
|:---|:---:|:---|:---|
| `SCTM` | Yes | Classified this goal as `surgical_patch` over L6 execution governance and repository authority governance | Goal model and authority declaration |
| `GLFB` | Yes | Separated local repo authority, remote push authority, public projection authority, Dev sync authority, and owner authorization | Decision boundary matrix |
| `ITCM` | Yes | Mapped workstreams to repositories, remotes, allowed push targets, forbidden remotes, and downstream repos | Repository / remote topology matrix |
| `RBCT` | Yes | Limited execution to Harness/governance files and this record | Bounded stage plan |
| `VIM` | Yes | Blocked package preflight, build, publish, upload, tag, seal, merge, package artifacts, L0, and cross-repo sync | Risk and forbidden action matrix |
| `PRM` | Yes | Hardened future Goals with repo/remote declarations and blocked verdicts | Retrospective governance baseline |

## 4. Required Future Goal Declaration

Every future non-trivial Codex goal must declare:

| Field | Required Meaning |
|:---|:---|
| Workstream | Current workstream, such as package harness, protocol development, public projection, Dev bridge, v2 line, Cognitive OS, SoloCrew, or Validation Lab |
| Authoritative Local Repo | Local repository that is allowed to mutate for the workstream |
| Current Local Repo | `git rev-parse --show-toplevel` for the current shell |
| Authoritative Remote | Remote that is authoritative for the workstream and branch |
| Current Tracking Remote | Upstream tracking branch, if any |
| Active Branch | Current local branch |
| Allowed Push Target | Remote and branch that may receive pushes when the goal permits push |
| Forbidden Remotes | Remotes that must not be pushed in the goal |
| Cross-Repo Sync In Scope? | Whether copy/cherry-pick/sync across repositories is explicitly authorized |
| Owner Authorization Required? | Whether push, sync, publication, public projection, or schema authority requires owner authorization |

## 5. Required Authority Matrix

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

## 6. Workstream Rules

### 6.1 Current Package / Harness Workstream

Applies to:

- Agentic Harness
- Package Harness
- NPM/PyPI preflight research
- package-internal artifact remediation planning
- release surface verification planning

Authority:

- local repository: `/Users/jasonwang/Documents/AI_Dev/V1.0_release`
- current feature-branch remote: `origin`
- current branch: `codex/agentic-harness-two-layer-governance-baseline-01`
- allowed push target: `origin` only when branch tracking is clear and the goal
  permits push

Forbidden without explicit owner authorization:

- `origin-oss`
- `protocol-dev`
- `v2`

Rule:

Do not move package harness or package preflight work into MPLP-Protocol-Dev
unless a future synchronization or cherry-pick goal explicitly authorizes it.

### 6.2 Protocol Development Workstream

Applies to:

- MPLP protocol development
- schema changes
- invariants
- taxonomy
- kernel duties
- governance source changes
- PR #13-style Dev work
- MPLP v2 schema intake

Authority:

- local repository:
  `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol-Dev`
- remote: inspect inside Dev repo before use; expected
  Coregentis/MPLP-Protocol-Dev

Rule:

Do not perform protocol schema/source development from
`/Users/jasonwang/Documents/AI_Dev/V1.0_release` unless a goal explicitly
defines it as release projection or public promotion.

### 6.3 Public OSS / Public Projection Workstream

Applies to:

- public OSS projection
- public release projection
- OSS synchronization
- public-facing repository update

Potential remote:

- `origin-oss`

Rule:

`origin-oss` is not the default push target. Push to `origin-oss` requires
explicit owner authorization and a public projection goal. Do not push feature
branch package harness changes to `origin-oss` by default.

### 6.4 `protocol-dev` Remote In `V1.0_release`

Role:

- bridge/reference remote to Dev truth or synchronization target only when
  explicitly authorized

Rule:

`protocol-dev` is not the primary remote for current package harness work. Do not
push to `protocol-dev` unless the goal is explicitly a Dev synchronization goal.

### 6.5 `v2` Remote

Role:

- future/v2 or schema-line remote only if explicitly authorized

Rule:

Do not push package harness or release-preflight governance patches to `v2`. Do
not use `v2` for schema intake unless the goal explicitly identifies `v2` as
authoritative.

### 6.6 Downstream Runtime / Product Repositories

| Repository | Expected Role | Rule |
|:---|:---|:---|
| Cognitive OS | downstream runtime / ontology / neutral runtime consumption | Inspect local repo before use; not a package harness authority |
| SoloCrew | downstream product / projection consumption | Inspect local repo before use; not a protocol truth authority |
| Validation Lab | evidence adjudication / validation surface | Inspect local repo before use; not package publication root |

Do not synchronize downstream repositories inside package harness goals.

## 7. Blocking Verdicts

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

## 8. Files Changed

| Path | Purpose |
|:---|:---|
| `AGENTS.md` | Adds repository / remote authority model, workstream matrix, forbidden remote rules, and blocked verdicts |
| `.agents/skills/agentic-harness-goal-preflight/SKILL.md` | Adds preflight requirements for repo/remote authority declarations |
| `governance/codex-goals/CODEX-GOAL-TEMPLATE.md` | Adds repository / remote authority declaration table |
| `.codex/config.toml` | Adds pointer to this authority record |
| `governance/04-records/REPO-REMOTE-AUTHORITY-BASELINE-01.md` | Records the baseline and implementation scope |

No package files, package artifacts, root `dist/**`, L0 protocol truth, public
projection repository, Dev repository, downstream repository, or remote other
than `origin` was changed by this goal.

## 9. Gate Results

Safe gates run for this baseline:

| Gate | Result | Notes |
|:---|:---:|:---|
| `git diff --check` over changed files | `PASS` | Whitespace hygiene |
| TOML parse for `.codex/config.toml` | `PASS` | Confirmed `repo_remote_authority_record` pointer |
| frontmatter check for this record | `PASS` | Governance record structure |
| required phrase scan | `PASS` | Confirmed blocked verdicts, authority paths, and forbidden remotes |
| `npm run package:surface:check --silent` | `PASS` | Optional no-publish check; no repo artifacts written |

These gates do not prove package readiness, publish readiness, protocol schema
validity, or cross-repo synchronization readiness.

## 10. Forbidden Action Compliance Statement

This goal did not publish, upload, create a tag, declare a seal, merge a PR,
delete a branch, access credentials, change package versions, mutate L0 schemas,
patch package artifacts, generate package artifacts, run npm/PyPI preflight,
touch `packages/npm/**`, touch `packages/pypi/**`, touch `packages/sources/**`,
touch root `dist/**`, synchronize repositories, push to `origin-oss`, push to
`protocol-dev`, or push to `v2`.

## 11. Final Verdict

`COMPLETE_REPO_REMOTE_AUTHORITY_BASELINE_PRESERVED`
