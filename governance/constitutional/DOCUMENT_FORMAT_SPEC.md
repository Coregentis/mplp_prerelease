# MPLP Document Format Specification

**Document ID**: CONST-002  
**Status**: Constitutional  
**Authority**: MPGC  
**Effective**: v1.0.0

---

## 1. Scope

This document defines the required format and validity rules for all MPLP documentation.

This specification is constitutional. A document that does not conform to this specification is invalid regardless of its content.

---

## 2. Frontmatter Schema

All MPLP documentation files must include a YAML frontmatter block.

### 2.1 Required Fields

| Field | Type | Values |
|-------|------|--------|
| `entry_surface` | enum | `website`, `documentation`, `repository` |
| `doc_type` | enum | `normative`, `informative` |
| `status` | enum | `draft`, `frozen` |
| `authority` | enum | `protocol`, `none` |
| `protocol_version` | string | Semantic version (e.g., "1.0.0") |
| `doc_id` | string | Unique document identifier |

### 2.2 Optional Fields

| Field | Type | Purpose |
|-------|------|---------|
| `title` | string | UI display only |
| `sidebar_label` | string | UI display only |

Optional fields are non-normative and excluded from protocol semantics.

---

## 3. Legal Combinations

The following combinations of frontmatter values are valid.

### 3.1 Validity Matrix

| entry_surface | doc_type | authority | status | Valid |
|---------------|----------|-----------|--------|-------|
| documentation | normative | protocol | draft | ✅ |
| documentation | normative | protocol | frozen | ✅ |
| documentation | informative | none | draft | ✅ |
| documentation | informative | none | frozen | ❌ |
| website | informative | none | draft | ✅ |
| website | normative | * | * | ❌ |
| website | * | protocol | * | ❌ |

### 3.2 Invalid Combinations

The following combinations are unconditionally invalid:

- `entry_surface: website` + `doc_type: normative`
- `entry_surface: website` + `authority: protocol`
- `doc_type: informative` + `status: frozen`
- `doc_type: informative` + `authority: protocol`

---

## 4. Normative and Informative Documents

### 4.1 Normative Documents

Normative documents:
- May use MUST, SHALL, REQUIRED
- Define protocol requirements
- Must be located in `specification/*`
- May have `status: frozen`
- Require `authority: protocol`

### 4.2 Informative Documents

Informative documents:
- Must not use MUST, SHALL, REQUIRED
- Explain, describe, or guide
- May be located in `evaluation/*` or elsewhere
- Cannot have `status: frozen`
- Require `authority: none`

### 4.3 Non-Normative Guard

All informative documents must include the following guard:

```
> [!IMPORTANT]
> **Non-Normative Document**
>
> This document is informative only.
```

Absence of this guard in an informative document is a validity error.

---

## 5. Frozen Eligibility

Only documents meeting all of the following conditions may be frozen:

- `doc_type: normative`
- `authority: protocol`
- `entry_surface: documentation`

Documents that do not meet these conditions must not have `status: frozen`.

Frozen eligibility is a necessary but not sufficient condition. Actual freezing requires MPGC governance process.

---

## 6. External Standard References

MPLP documents may reference external standards (ISO, W3C, NIST, IETF).

### 6.1 Permitted Uses

- Contextual reference
- Terminology alignment
- Architectural inspiration

### 6.2 Prohibited Uses

- Claiming compliance with external standards
- Importing requirements from external standards
- Transferring authority from external standards
- Suggesting equivalence to external standards

---

## 7. Validation

A document is valid if and only if:

1. Frontmatter contains all required fields
2. Frontmatter values form a legal combination per Section 3
3. Normative language rules per Section 4 are satisfied
4. Non-Normative Guard is present for informative documents
5. Frozen eligibility per Section 5 is satisfied

A document that fails any condition is invalid.

---

## 8. Amendment

This specification may only be amended through the MPGC constitutional governance process.

---

**End of Document**
