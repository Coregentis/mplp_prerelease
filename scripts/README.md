# MPLP Scripts

This directory contains all automation scripts for the MPLP protocol.

---

## Directory Structure

```
scripts/
├── README.md              # You are here
├── 01-codegen/            # Code generation
├── 02-verification/       # Schema & evidence verification
├── 03-docs/               # Documentation validation
├── 04-build/              # Build & release
└── 99-utils/              # One-off utilities
```

---

## Layer Descriptions

### 01-codegen (Code Generation)

Scripts for generating types, models, and code from schemas.

| Script | Purpose |
|:---|:---|
| `generate-types-from-schemas.ts` | Generate TypeScript types |
| `generate-py-models-from-schemas.ts` | Generate Python Pydantic models |
| `generate_learning_snapshot.py` | Generate learning samples |
| `simple-codegen.ts` | Simple codegen utility |
| `run-cross-language-builders.ts` | Cross-language build orchestration |

### 02-verification (Schema & Evidence)

Scripts for verifying schema integrity and evidence artifacts.

| Script | Purpose |
|:---|:---|
| `verify-sdk-mirror.sh` | **SCV-01 CI Gate** - Verify SDK schema mirrors |
| `verify-invariants.js` | Verify schema invariants |
| `verify-fixtures-schema.js` | Verify test fixtures against schema |
| `verify-negative-fixtures.js` | Verify negative test cases |
| `validate-schemas.js/ts` | Validate JSON schemas |
| `validate-evidence-chain.js` | Validate evidence chain integrity |

### 03-docs (Documentation Validation)

Scripts for validating documentation quality and compliance.

| Script | Purpose |
|:---|:---|
| `semantic/*.mjs` | Semantic documentation validation |
| `verify-footer-compliance.mjs` | Verify footer format |
| `verify-governance-styling.mjs` | Verify governance doc styling |

### 04-build (Build & Release)

Scripts for building and releasing packages.

| Script | Purpose |
|:---|:---|
| `build-release.js` | Build release package |
| `copy-schemas.js` | Copy schemas to SDK |
| `pre-release-check.mjs` | Pre-release validation |
| `update-frozen-headers.mjs` | Update frozen headers |
| `simulate-ci.ps1` | Simulate CI locally (Windows) |

### 99-utils (Utilities)

One-off fix and cleanup scripts.

| Script | Purpose |
|:---|:---|
| `fix-*.js/mjs` | Various fix scripts |
| `clean-*.js` | Cleanup scripts |

---

## Execution Order

### Development Workflow

```
01-codegen → 02-verification → 03-docs → 04-build
```

### CI Pipeline

```
02-verification (gates) → 04-build (release)
```

---

## Key CI Gates

| Gate | Script | Phase |
|:---|:---|:---|
| SCV-01 | `02-verification/verify-sdk-mirror.sh` | Phase 4 |
| Schema Validation | `02-verification/validate-schemas.js` | Phase 1-3 |
| Invariant Check | `02-verification/verify-invariants.js` | Phase 3 |
