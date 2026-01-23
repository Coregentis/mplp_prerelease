# Version Change Justification

**Document ID**: VERSION_CHANGE_JUSTIFICATION  
**Release Date**: 2026-01-05  
**Reference**: METHOD-SDKR-09 §5.2, METHOD-SDKR-03

---

## Version Changes Summary

All packages in this release use **PATCH** bumps only.

| Package | Previous | New | Bump Type |
|:---|:---|:---|:---|
| @mplp/core | 1.0.5 | 1.0.6 | PATCH |
| @mplp/sdk-ts | 1.0.5 | 1.0.6 | PATCH |
| @mplp/coordination | 1.0.5 | 1.0.6 | PATCH |
| @mplp/schema | 1.0.4 | 1.0.5 | PATCH |
| @mplp/compliance | 1.0.4 | 1.0.5 | PATCH |
| @mplp/modules | 1.0.4 | 1.0.5 | PATCH |
| @mplp/runtime-minimal | 1.0.4 | 1.0.5 | PATCH |
| @mplp/devtools | 1.0.4 | 1.0.5 | PATCH |
| @mplp/integration-llm-http | 1.0.4 | 1.0.5 | PATCH |
| @mplp/integration-storage-fs | 1.0.4 | 1.0.5 | PATCH |
| @mplp/integration-storage-kv | 1.0.4 | 1.0.5 | PATCH |
| @mplp/integration-tools-generic | 1.0.4 | 1.0.5 | PATCH |
| @mplp/conformance | NEW | 1.0.0 | INITIAL |
| mplp-sdk | 1.0.3 | 1.0.4 | PATCH |

---

## Justification by Package

### All @mplp/* packages (PATCH)

- [x] Governance compliance: Adding `require` field to exports for CommonJS compatibility
- [x] Internal improvement: Copyright year update 2025 → 2026
- [x] Internal improvement: DERIVATION_PROOF.yaml alignment

### @mplp/compliance (PATCH)

- [x] Deprecation notice: Added [LEGACY] marker, migration to @mplp/conformance

### @mplp/conformance (INITIAL)

- [x] New package: Replaces @mplp/compliance with correct terminology (Conformance Kit)

### mplp-sdk (PATCH)

- [x] Compatibility: Python version requirement expanded from >=3.10 to >=3.9
- [x] Internal improvement: Simplified __init__.py

---

## Legitimacy Confirmation

- [x] All version changes follow METHOD-SDKR-03 Versioning Law
- [x] No MINOR bumps for error correction
- [x] All PATCH bumps are for bugfix/internal improvement/governance compliance
- [x] All versions are (registry_latest + 1)

---

## Sign-off

| Role | Name | Date |
|:---|:---|:---|
| Release Engineer | | 2026-01-05 |

---

**Reference**: METHOD-SDKR-09 §5.2
