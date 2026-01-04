---

doc_type: governance
status: frozen
authority: Documentation Governance
description: ""
title: v1.0.0 Release Notes

---

> Authority: project-governance/active/GOV-03_CHANGE_PROTOCOL.md
> This document mirrors the protocol definition for reference only.

> [!FROZEN]
> **MPLP Protocol v1.0.0 — Frozen Specification**
> **Freeze Date**: 2025-12-03
> **Status**: FROZEN (no breaking changes permitted)
> **Governance**: MPLP Protocol Governance Committee (MPGC)
> **License**: Apache-2.0
> **Note**: Any normative change requires a new protocol version.


> **Scope**: Inherited (from /docs/meta/release/mplp-v1.0.0-release-notes)
> **Non-Goals**: Inherited (from /docs/meta/release/mplp-v1.0.0-release-notes)

# v1.0.0 Release Notes

**ID**: DGP-XX
**Version**: 1.0
**Status**: FROZEN
**Authority**: Documentation Governance
**Last Updated**: 2025-12-21

**Release Date**: 2025-12-03


## 1. Introduction

We are proud to announce the release of **MPLP (Multi-Agent Lifecycle Protocol) v1.0.0** — a vendor-neutral, protocol-first specification for building observable, interoperable AI agent systems.

## 2. Key Features

### 2.1 Protocol Layers

| Layer | Description |
|:---|:---|
| **L1 Core** | Context, Plan, Confirm, Trace schemas |
| **L2 Coordination** | Role, Dialog, Collab, Network modules |
| **L3 Execution** | Extension, Learning modules |

### 2.2 Event Architecture

- **3 Physical Event Schemas**: `PipelineStageEvent`, `GraphUpdateEvent`, `RuntimeExecutionEvent`
- **12 Logical Event Families**: Job, Step, Plan, etc.

### 2.3 Profiles

| Profile | Use Case |
|:---|:---|
| **SA (Single Agent)** | Solo agent execution |
| **MAP (Multi-Agent)** | Collaborative agent workflows |

## 3. Package Structure

| Component | Path | Purpose |
|:---|:---|:---|
| **Schemas** | `schemas/v2/` | JSON Schema definitions |
| **SDK (TypeScript)** | `packages/npm/sdk-ts/` | Reference implementation (NPM) |
| **SDK (Python)** | `packages/pypi/` | Cross-language support (PyPI) |
| **Source Code** | `packages/sources/` | Development source |
| **Golden Tests** | `tests/golden/` | Compliance test fixtures |
| **Documentation** | `docs/` | Protocol specification |

## 4. Installation

### TypeScript

```bash
npm install @mplp/sdk-ts
```

### Python

```bash
pip install mplp
```

## 5. Breaking Changes

This is the initial stable release. No breaking changes from v0.9.

## 6. Known Issues

See [Known Issues v1.0.0](./mplp-v1.0.0-known-issues.md)

## 7. Acknowledgments

Thanks to the Coregentis Team and the Open Source Community for their contributions.