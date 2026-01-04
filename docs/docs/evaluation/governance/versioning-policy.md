---
entry_surface: documentation
doc_type: informative
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "DOC-EVAL-GOV-VERSION-001"

# UI metadata (non-normative; excluded from protocol semantics)
title: Versioning Policy
sidebar_label: Versioning Policy
---

> [!IMPORTANT]
> **Non-Normative Document**
>
> This document is informative only.
> It MUST NOT be used as an authoritative specification.
> All normative requirements are defined in the Specification documents.

# Versioning Policy


## 1. Overview

MPLP follows [Semantic Versioning 2.0.0](https://semver.org/) with extensions for protocol versioning.

## 2. Version Format

```
MAJOR.MINOR.PATCH
```

| Component | Change Type | Example |
|:---|:---|:---|
| **MAJOR** | Breaking changes to schemas or APIs | 1.0.0 → 2.0.0 |
| **MINOR** | Backward-compatible additions | 1.0.0 → 1.1.0 |
| **PATCH** | Bug fixes, documentation updates | 1.0.0 → 1.0.1 |

## 3. Protocol Version Lifecycle

| State | Description |
|:---|:---|
| **Draft** | In development, subject to change |
| **Release Candidate** | Feature complete, testing phase |
| **Frozen** | No breaking changes permitted |
| **Deprecated** | Superseded by newer version |
| **Retired** | No longer supported |

## 4. Current Versions

| Component | Version | Status |
|:---|:---|:---|
| Protocol Specification | 1.0.0 | **FROZEN** |
| JSON Schemas (`schemas/v2/`) | 1.0.0 | **FROZEN** |
| TypeScript SDK (`@mplp/sdk-ts`) | 1.0.3 | Stable |
| Python SDK (`mplp`) | 1.0.0 | Stable |

## 5. Breaking Change Policy

For FROZEN protocol versions:

- No changes to existing schema fields
- No changes to required/optional status
- No changes to enum values
- Additive changes allowed (new optional fields)
- Documentation updates allowed

## 6. Version Compatibility

See [Compatibility Matrix](./compatibility-matrix.md) for cross-version compatibility details.