# DOCUMENT FORMAT SPECIFICATION

**Status:** FROZEN  
**Authority:** MPGC  
**Effective:** 2026-01-01  
**Version:** 1.1

---

## 1. Purpose

This specification defines the mandatory format for all MPLP documents.
It is the second constitutional document.

---

## 2. Universal Frontmatter

Every document in **Documentation** and **Website** MUST have this frontmatter.

**Repository content MUST NOT use this frontmatter schema.**
Repository documents are out of scope for this specification.

```yaml
---
entry_surface: website | documentation
doc_type: normative | informative
status: draft | frozen
authority: MPGC | none
protocol_version: "1.0.0"

# Documentation only (optional)
doc_id: "DOC-XXX-001"
repo_refs:
  schemas:
    - "schemas/v2/..."
  tests:
    - "packages/..."

# External standards (required)
external_standards:
  w3c_trace_context: none | informative | normative
  opentelemetry: none | informative | normative

# Website only (see §2.3)
seo:
  enabled: true
  canonical: required
json_ld:
  enabled: true

# Optional
ai_readability:
  enabled: true | false
---
```

### 2.1 Core Fields (All Documents)

| Field | Values | Required | Description |
|-------|--------|----------|-------------|
| `entry_surface` | `website`, `documentation` | YES | Entry point classification |
| `doc_type` | `normative`, `informative` | YES | Document authority level |
| `status` | `draft`, `frozen` | YES | Document maturity |
| `authority` | `MPGC`, `none` | YES | Governing body |
| `protocol_version` | SemVer string | YES | Protocol version |
| `external_standards` | Object | YES | External standard alignment |

### 2.2 Documentation-Only Fields

| Field | Required | Description |
|-------|----------|-------------|
| `doc_id` | Optional (v1.1) | Stable document identifier for cross-reference |
| `repo_refs` | Optional (v1.1) | References to schema/test files in Repository |

**doc_id Format:** `DOC-{AREA}-{NUMBER}` (e.g., `DOC-OBS-001`, `DOC-MOD-CONTEXT-001`)

**repo_refs Usage:**
- Provides machine-readable links to Repository SOT
- Does NOT validate content consistency (reserved for Phase F)
- Enables future automated drift detection

### 2.3 Website-Only Fields (Mandatory)

| Field | Required | Description |
|-------|----------|-------------|
| `seo` | **MUST be present** | SEO configuration object |
| `json_ld` | **MUST be present** | Structured data configuration |

**Documentation MUST NOT include `seo` or `json_ld` fields.**

### 2.4 Optional Fields

| Field | Applies To | Description |
|-------|------------|-------------|
| `ai_readability` | Website, Documentation | AI parsing hints |

---

## 3. Entry Surface × Doc Type Matrix

### 3.1 Legal Combinations

| Entry Surface | Normative | Informative | Authority |
|---------------|-----------|-------------|-----------|
| `documentation` | ✅ YES | ✅ YES | See §3.2 |
| `website` | ❌ NO | ✅ YES | `none` only |

### 3.2 Authority Rules (Mandatory)

| Combination | Authority MUST Be |
|-------------|-------------------|
| `documentation` + `normative` | `MPGC` |
| `documentation` + `informative` | `none` |
| `website` + `informative` | `none` |

**Violation of authority rules = INVALID document.**

### 3.3 Field Presence Rules (Mandatory)

| Field | Website | Documentation |
|-------|---------|---------------|
| `seo` | **MUST** | **MUST NOT** |
| `json_ld` | **MUST** | **MUST NOT** |
| `doc_id` | MUST NOT | Optional |
| `repo_refs` | MUST NOT | Optional |

**Violation of presence rules = INVALID document.**

### 3.4 Illegal Combinations (Auto-Invalid)

- `entry_surface: website` + `doc_type: normative` → **INVALID**
- `entry_surface: website` + `authority: MPGC` → **INVALID**
- `entry_surface: website` + `doc_id` present → **INVALID**
- `entry_surface: documentation` + `seo` present → **INVALID**
- `entry_surface: documentation` + `json_ld` present → **INVALID**

---

## 4. Normative Document Rules

Documents with `doc_type: normative` MUST follow these rules:

### 4.1 Allowed Content

- Definitions
- Constraints (MUST / MUST NOT / SHALL / MAY)
- Complete field lists
- Complete enum lists
- Schema path references

### 4.2 Forbidden Content

- Example code (TypeScript, Python, etc.)
- Partial enums or field lists
- Tutorial-style explanations
- Marketing language
- SEO content

### 4.3 Enum Listing Rule

For any enum or field set:

**Either:**
- List it completely (all values from schema)

**Or:**
- Do not list it at all; only provide schema reference

**Never:**
- List partial values with "..." or "etc."

---

## 5. Informative Document Rules

Documents with `doc_type: informative` MAY contain:

- Example code
- Diagrams and illustrations
- Tutorial explanations
- Comparisons
- External standard mappings (W3C, OTel, etc.)

### 5.1 Required Clarification

Informative documents MUST include one of:

- `> **Note:** This document is informative and non-normative.`
- Frontmatter clearly showing `doc_type: informative`

---

## 6. Repository Documents

Repository documents (README, code comments) are **NOT governed** by this
format specification.

**Repository documents:**
- MUST NOT contain Frozen Headers
- MUST NOT use normative language (MUST/SHALL/REQUIRED)
- MUST NOT claim to be specifications
- MUST NOT use this frontmatter schema

---

## 7. External Standards

References to external standards (W3C, OpenTelemetry, ISO, NIST) MUST
declare their status in frontmatter.

### 7.1 Legal Values by Entry Surface

| Entry Surface | `none` | `informative` | `normative` |
|---------------|--------|---------------|-------------|
| `website` | ✅ | ✅ | ❌ FORBIDDEN |
| `documentation` + `informative` | ✅ | ✅ | ❌ FORBIDDEN |
| `documentation` + `normative` | ✅ | ✅ | ✅ |

### 7.2 Rules

- `normative`: Only allowed in `documentation` + `doc_type: normative`
- `informative`: Allowed in documentation or website
- Website can NEVER claim normative alignment with external standards

---

## 8. Violation Handling

Any document that violates this specification:
- Is considered **INVALID**
- Has no normative or authoritative effect
- Must be corrected before being referenced

---

## 9. Website Metadata Requirements

This section defines **minimum metadata requirements** for Website pages.
These are informative rules but **mandatory for compliance**.

### 9.1 SEO Configuration

| Field | Requirement |
|-------|-------------|
| `seo.enabled` | MUST be `true` for indexable pages |
| `seo.canonical` | MUST be `required` when `seo.enabled: true` |

### 9.2 JSON-LD Configuration

| Field | Requirement |
|-------|-------------|
| `json_ld.enabled` | MUST be explicitly set |

### 9.3 JSON-LD Type Restrictions

Website pages MUST use JSON-LD types from this restricted set:

| Page Type | Allowed JSON-LD Types |
|-----------|----------------------|
| Home | `WebSite`, `Organization` |
| Content pages | `WebPage` |
| Protocol overview | `TechArticle` or `WebPage` |

### 9.4 JSON-LD Forbidden Content

JSON-LD MUST NOT include:
- Certification language ("certified", "compliant")
- Endorsement language ("officially endorsed", "approved by")
- Conformance claims

---

**Frozen:** 2026-01-01  
**Version:** 1.1  
**Owner:** MPLP Protocol Governance Committee
