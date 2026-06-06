---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "CODEX-GOAL-TEMPLATE"
---

# Codex Goal Template

Use this template before every non-trivial Codex goal. It is a planning and
execution-control artifact, not owner authorization for publication.

## 1. Goal Declaration

| Field | Value |
|:---|:---|
| Goal ID |  |
| Mode | `readonly_research` / `surgical_patch` / `verification_only` / `release_preparation` |
| Target repo |  |
| Branch |  |
| Starting HEAD |  |
| User request |  |
| Intended outcome |  |
| Final stop condition |  |

## 2. Repository / Remote Authority Declaration

| Field | Value |
|:---|:---|
| Workstream |  |
| Authoritative Local Repo |  |
| Current Local Repo |  |
| Authoritative Remote |  |
| Current Tracking Remote |  |
| Active Branch |  |
| Allowed Push Target |  |
| Forbidden Remotes |  |
| Cross-Repo Sync In Scope? | `yes` / `no` |
| Owner Authorization Required? | `yes` / `no` |

| Workstream | Authoritative Local Repo | Current Local Repo | Authoritative Remote | Current Tracking Remote | Allowed Push Target | Forbidden Remotes | Cross-Repo Sync In Scope? | Owner Authorization Required? |
|:---|:---|:---|:---|:---|:---|:---|:---:|:---:|
| Current Agentic Harness / Package Harness / NPM-PyPI preflight | `/Users/jasonwang/Documents/AI_Dev/V1.0_release` |  | `origin` on current feature branch |  | `origin` only when goal permits push | `origin-oss`, `protocol-dev`, `v2` | `no` unless declared | For forbidden remotes, sync, publication |
| MPLP protocol development / schemas / invariants / taxonomy / PR #13 / v2 schema intake | `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Protocol-Dev` |  | Inspect inside Dev repo |  | Dev repo origin only after inspection | `V1.0_release` `origin`, `origin-oss`, `v2` unless authorized | `no` unless declared | For schema authority, public projection, sync |
| Public OSS projection | Task-specific public projection checkout |  | `origin-oss` or public projection remote |  | None by default | Any public push without owner authorization | `no` unless declared | Always for public projection push |
| Dev bridge from `V1.0_release` | `V1.0_release` plus `protocol-dev` remote |  | `protocol-dev` only for explicit sync goals |  | None by default | `protocol-dev` push without sync goal | `yes` only when declared | Always |
| Future v2 line | Task-specific v2 checkout or branch |  | `v2` only if declared authoritative |  | None by default | `v2` push without schema/v2 owner authorization | `no` unless declared | Always |
| Cognitive OS downstream runtime | `/Users/jasonwang/Documents/AI_Dev/Coregentis/Cognitive_OS` |  | Inspect inside repo |  | Repo origin only after inspection | Treating it as MPLP protocol truth | `no` unless declared | For sync/backflow |
| SoloCrew downstream product | `/Users/jasonwang/Documents/AI_Dev/Coregentis/SoloCrew` |  | Inspect inside repo |  | Repo origin only after inspection | Treating it as MPLP protocol truth | `no` unless declared | For sync/backflow |
| Validation Lab evidence surface | `/Users/jasonwang/Documents/AI_Dev/Coregentis/MPLP-Validation-Lab` or V2 lab repo |  | Inspect inside repo |  | Repo origin only after inspection | Treating it as package publication root | `no` unless declared | For sync/backflow |

## 3. SOT Classification

| SOT Layer | Touched? | What Is Touched | Upstream SOT | Owner/Governance Authority |
|:---|:---:|:---|:---|:---|
| `L0` Protocol Truth |  |  |  |  |
| `L1` Projection Source |  |  |  |  |
| `L2` Generated Artifact |  |  |  |  |
| `L3` Verification Evidence |  |  |  |  |
| `L4` Publication Surface |  |  |  |  |
| `L5` Downstream Runtime/Product |  |  |  |  |
| `L6` Codex Execution Governance |  |  |  |  |

## 4. Development Method Execution Table

| Method | Applied? | Why Applied | Inputs Used | Output Produced | Repo Governance Link | Gaps |
|:---|:---:|:---|:---|:---|:---|:---|
| `SCTM` |  |  |  |  |  |  |
| `GLFB` |  |  |  |  |  |  |
| `ITCM` |  |  |  |  |  |  |
| `RBCT` |  |  |  |  |  |  |
| `VIM` |  |  |  |  |  |  |
| `PRM` |  |  |  |  |  |  |

## 5. Methodology Separation Table

| Method ID | Layer | Purpose | Applied When | Must Not Be Confused With | Evidence / Gate |
|:---|:---|:---|:---|:---|:---|
| `SCTM` | Codex Agentic Harness | Governed task modeling | Beginning of every goal | `TSV` | Goal model |
| `GLFB` | Codex Agentic Harness | Decision and authorization analysis | Decision boundary | `EVC` | Decision matrix |
| `ITCM` | Codex Agentic Harness | Topology and constraint modeling | Multi-surface/SOT work | `DIV` | Derivation matrix |
| `RBCT` | Codex Agentic Harness | Bounded staged goal planning | Every execution prompt | Repo gate execution | Stage plan |
| `VIM` | Codex Agentic Harness | Violation, impact, mitigation | Risk or irreversible boundary | `SUC` | Risk register |
| `PRM` | Codex Agentic Harness | Retrospective hardening | End of every goal | Governance method execution | Retrospective |
| `DIV` | Repository Governance | Derivation integrity | Generated artifact/provenance | `ITCM` | Derivation report |
| `TSV` | Repository Governance | Truth reference closure | Source truth touched | `SCTM` | Reference closure |
| `XCV` | Repository Governance | Cross-consistency | Schema/YAML/docs alignment | `GLFB` | Cross-consistency evidence |
| `SCV` | Repository Governance | Projection completeness | Derived schema/type surface | `ITCM` | Surface coverage |
| `SUC` | Repository Governance | Usage conformance | SDK/API/runtime usage | `VIM` | Binding/injection proof |
| `EVC` | Repository Governance | Evolution compatibility | Version/protocol transition | `GLFB` | Diff/migration evidence |

## 6. Two-Layer Governance Alignment Table

| Goal Type | Repo Governance Required | Codex Harness Required | SOT Layer | Authorized Mutation | Forbidden Mutation | Owner Decision Needed |
|:---|:---|:---|:---|:---|:---|:---|
| Read-only research | Repo truth sources and evidence records | `SCTM`, `GLFB`, `ITCM`, `RBCT`, `VIM`, `PRM` | Any, read-only | None | File mutation, staging, commit, push | If action exceeds research |
| Surgical patch | Applicable methods for touched surfaces | Full six-method execution | Declared layer only | Scoped source/doc/governance/template edits | Publish, upload, tag, seal, unrelated files | For irreversible or L0/public-surface changes |
| Verification only | Applicable local gates | `RBCT`, `VIM`, evidence integrity | L3 | Local gates only | Artifact mutation unless declared | If gates imply release action |
| Release preparation | SDKR and schema/release methods | Full six-method execution | L3/L4 prep only | Evidence/preflight records | Actual publish/upload/tag/seal | Before any publication |
| Schema change | `DIV`, `TSV`, `XCV`, `SCV`, `EVC` | Full six-method execution | L0 | None unless explicitly authorized | L0 mutation without schema intake | Always |
| Downstream product discovery | Candidate/promotion rules | `SCTM`, `GLFB`, `ITCM`, `VIM`, `PRM` | L5 -> candidate evidence | Candidate evidence only | Direct L0 back-write | For promotion |

## 7. SOT Derivation Matrix

| Upstream SOT | Layer | Downstream Artifact | Derivation Type | Verification Method | Evidence Required | Drift Risk |
|:---|:---|:---|:---|:---|:---|:---|
| `schemas/v2/**` | L0 | package schemas, validators, docs, lab rules | Generated or projected | `DIV`, `TSV`, `XCV`, `SCV`, `SUC`, `EVC` | Manifest, tests, reports | Docs/package/runtime stale |
| invariants/taxonomy/kernel duties | L0 | docs, examples, Validation Lab, runtime mapping | Projected | `XCV`, `SUC`, `EVC` | Cross-consistency and usage evidence | Semantic mismatch |
| package source | L1 | `dist`, npm pack | Generated | `DIV`, `SCV`, `SUC` | Build, pack, install smoke | Source/dist drift |
| docs source | L1 | docs site | Built publication surface | `XCV`, docs methods | Docs build/link evidence | Public docs stale |
| website source | L1 | public website | Built/deployed surface | docs/website governance | Build/link evidence | Discovery claims drift |
| release evidence | L3 | release decision records | Manual governance record | SDKR methods | Evidence bundle | Evidence overclaim |
| Cognitive OS / SoloCrew feedback | L5 | MPLP candidate backlog | Candidate evidence | Promotion rules | Candidate evidence package | Product need pollutes protocol |

## 8. Forbidden Action Matrix

| Action | Allowed in Research | Allowed in Surgical Patch | Allowed in Verification | Requires Owner Authorization | Notes |
|:---|:---:|:---:|:---:|:---:|:---|
| File mutation | No | Scoped only | No unless declared | Sometimes | Research cannot mutate |
| Stage/commit/push | No | Commit only if goal asks/allows | No | Push requires explicit authorization | Do not push by default |
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
| Push to forbidden remote | No | No unless explicitly scoped | No | Yes | Blocks `origin-oss`, `protocol-dev`, `v2`, and non-authoritative remotes |
| Cross-repo synchronization | No | No unless explicitly scoped | No | Yes | Requires explicit sync/cherry-pick/copy goal |

## 9. Repository / Remote Blocked Verdicts

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

## 10. Stage Plan

| Stage | Purpose | Allowed Actions | Forbidden Actions | Gates | Expected Output | Stop Conditions |
|:---|:---|:---|:---|:---|:---|:---|
| Repo truth | Establish current authority and status | Read-only inspection | Mutation | `git status` | Repo truth summary | Unclear repo truth |
| Repo / remote authority | Validate workstream, local repo, tracking remote, allowed push target, forbidden remotes, sync scope | Read-only inspection | Push/sync | `git rev-parse`, `git remote`, upstream check | Authority declaration | Repo/remote mismatch |
| Mapping | SOT and derivation mapping | Read-only inspection | Mutation | N/A | Derivation matrix | Missing SOT |
| Implementation | Apply scoped changes | Declared edits only | Publication/L0 unless authorized | Diff review | Scoped patch | Scope expansion |
| Verification | Run safe gates | Local gates | Publish/upload/tag/seal | Declared gates | Gate results | Patch-caused failure |
| Retrospective | Evidence integrity and hardening | Report/update evidence | Overclaim | N/A | Final verdict | Missing evidence |

## 11. Evidence and Final Verdict

| Field | Value |
|:---|:---|
| Evidence record path |  |
| Gates run |  |
| Gates unavailable |  |
| Evidence integrity statement |  |
| Forbidden-action compliance statement |  |
| Repository / remote authority compliance statement |  |
| Final verdict |  |
