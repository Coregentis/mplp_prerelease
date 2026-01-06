# Release Intent Declaration

**Document ID**: RELEASE_INTENT  
**Release Date**: 2026-01-05  
**Prepared By**: Release Engineer

---

## 1. Packages to Release

### npm Packages (13)

| Package | Registry Version | Target Version | Ecosystem |
|:---|:---|:---|:---|
| @mplp/core | 1.0.5 | 1.0.6 | npm |
| @mplp/sdk-ts | 1.0.5 | 1.0.6 | npm |
| @mplp/coordination | 1.0.5 | 1.0.6 | npm |
| @mplp/schema | 1.0.4 | 1.0.5 | npm |
| @mplp/compliance | 1.0.4 | 1.0.5 | npm |
| @mplp/modules | 1.0.4 | 1.0.5 | npm |
| @mplp/runtime-minimal | 1.0.4 | 1.0.5 | npm |
| @mplp/devtools | 1.0.4 | 1.0.5 | npm |
| @mplp/integration-llm-http | 1.0.4 | 1.0.5 | npm |
| @mplp/integration-storage-fs | 1.0.4 | 1.0.5 | npm |
| @mplp/integration-storage-kv | 1.0.4 | 1.0.5 | npm |
| @mplp/integration-tools-generic | 1.0.4 | 1.0.5 | npm |
| @mplp/conformance | NEW | 1.0.0 | npm |

### PyPI Packages (1)

| Package | Registry Version | Target Version | Ecosystem |
|:---|:---|:---|:---|
| mplp-sdk | 1.0.3 | 1.0.4 | PyPI |

---

## 2. Version Change Summary

| Package | Bump Type | Reason |
|:---|:---|:---|
| @mplp/core | PATCH | Governance compliance + exports fix |
| @mplp/sdk-ts | PATCH | Governance compliance |
| @mplp/coordination | PATCH | Governance compliance |
| @mplp/schema | PATCH | Governance compliance |
| @mplp/compliance | PATCH | Deprecation update (LEGACY marker) |
| @mplp/modules | PATCH | Governance compliance |
| @mplp/runtime-minimal | PATCH | Governance compliance |
| @mplp/devtools | PATCH | Governance compliance |
| @mplp/integration-* (4) | PATCH | Governance compliance |
| @mplp/conformance | INITIAL | New package (replaces @mplp/compliance) |
| mplp-sdk | PATCH | Python 3.9 compatibility + governance |

---

## 3. Release Scope

### Included
- [x] npm packages (13)
- [x] PyPI packages (1)

### Excluded
- [x] @mplp/validator (CI-ONLY, publish blocked)

---

## 4. Prerequisites Verified

- [x] Evidence Baseline frozen (FREEZE_EVIDENCE_BASELINE_v1.0.md)
- [x] All derivation phases PASS
- [x] No blocking governance issues

---

## 5. Sign-off

| Role | Name | Date |
|:---|:---|:---|
| Release Engineer | | 2026-01-05 |

---

**Reference**: METHOD-SDKR-09 §5.1
