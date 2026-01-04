# SDK Release Checklist

**Document ID**: CHECKLIST-SDK-RELEASE  
**Status**: Draft  
**Authority**: MPGC  
**Effective**: v1.0.0

---

## Usage

This checklist MUST be completed for every SDK release.

All items MUST be YES. Any NO = release blocked.

---

## Pre-Release Gates

| # | Check | YES/NO |
|:---|:---|:---:|
| 1 | Evidence Baseline frozen? | [ ] |
| 2 | Phase 0-3 (TSV/XCV/YAML) PASS? | [ ] |
| 3 | Phase 4 (SCV-01 TS Mirror) PASS? | [ ] |
| 4 | Phase 5 (SUC-01 Python Models) PASS? | [ ] |
| 5 | Phase 6 (DIV-01) PASS or waived? | [ ] |
| 6 | Phase 7 (EVC-01) FROZEN? | [ ] |

---

## Derivation Compliance

| # | Check | YES/NO |
|:---|:---|:---:|
| 7 | All types derived from schema? | [ ] |
| 8 | All enums derived from schema? | [ ] |
| 9 | No convenience additions? | [ ] |
| 10 | All content has provenance? | [ ] |
| 11 | DERIVATION_PROOF.yaml present? | [ ] |
| 12 | Derivation proof validated? | [ ] |
| 13 | Forbidden content scan PASS? | [ ] |

---

## Package Compliance

| # | Check | YES/NO |
|:---|:---|:---:|
| 11 | RELEASE_MANIFEST.json present? | [ ] |
| 12 | Manifest fields complete? | [ ] |
| 13 | Bundle hash matches Evidence Baseline? | [ ] |
| 14 | README.md present? | [ ] |
| 15 | LICENSE present? | [ ] |
| 16 | No forbidden files (_manifests, governance)? | [ ] |

---

## Version Compliance

| # | Check | YES/NO |
|:---|:---|:---:|
| 17 | SDK version ≤ protocol version? | [ ] |
| 18 | Version follows semver? | [ ] |
| 19 | No unauthorized version bump? | [ ] |

---

## Post-Publish Verification

| # | Check | YES/NO |
|:---|:---|:---:|
| 20 | npm/pip install succeeds (clean env)? | [ ] |
| 21 | Import succeeds? | [ ] |
| 22 | Enum count matches (11)? | [ ] |
| 23 | Type instantiation succeeds? | [ ] |

---

## Sign-off

| Role | Name | Date | Signature |
|:---|:---|:---|:---|
| Release Engineer | | | |
| MPGC Representative | | | |

---

## Automatic Rejection Conditions

The following conditions result in **immediate release rejection** without further review:

| Condition | Method Reference | Ruling |
|:---|:---|:---:|
| Missing RELEASE_MANIFEST.json | METHOD-SDKR-05 | **REJECT** |
| Manifest bundle hash mismatch | METHOD-SDKR-05 | **REJECT** |
| Package content mismatch vs layout spec | METHOD-SDKR-04 | **REJECT** |
| Version not derivable from protocol | METHOD-SDKR-03 | **REJECT** |
| Undeclared helper functions | METHOD-SDKR-02 | **REJECT** |
| Post-install verification not recorded | METHOD-SDKR-06 | **REJECT** |
| Verification run in non-clean environment | METHOD-SDKR-06 | **REJECT** |
| Evidence Baseline not frozen | README | **REJECT** |

Any REJECT = release blocked until condition is resolved.

---

**Document Status**: Governance Checklist  
**Supersedes**: None  
**References**: All METHOD-SDKR-* documents
