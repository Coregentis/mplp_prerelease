# ENTRY MODEL SPECIFICATION

**Status:** FROZEN  
**Authority:** MPGC  
**Effective:** 2026-01-01  
**Version:** 1.0

---

## 1. Purpose

This specification defines the MPLP Three-Entry Model.
It is the first constitutional document and cannot be overridden.

---

## 2. The Three-Entry Model

MPLP uses exactly three entry surfaces. Each has a strict, non-overlapping role.

| Surface | Role | Purpose |
|---------|------|---------|
| **Website** | Protocol Legitimacy & Evaluation Entry | Establish MPLP as a defined, governed, evaluable protocol |
| **Documentation** | Specification & Reference | Explain how the protocol works |
| **Repository** | Source of Truth | Schemas, Code, Tests, Governance |

---

## 3. Entry Definitions

### 3.1 Repository (Source of Truth)

The Repository is the **sole source of truth** for MPLP.

**Contains:**
- JSON Schemas (`schemas/`)
- Source code (`packages/`)
- Tests
- Governance constitution files (`governance/`)

**Does NOT contain:**
- Protocol explanations
- Usage tutorials
- Marketing content

**Rule:** If it's not in the Repository, it's not a fact.

### 3.2 Documentation (Specification & Reference)

Documentation is a **projection** of the Repository.

**Contains:**
- Normative specifications (derived from schemas)
- Informative explanations
- Usage references

**Does NOT contain:**
- New facts not in Repository
- Executable code as normative content
- Marketing claims

**Rule:** Documentation cannot create facts. It can only describe them.

### 3.3 Website (Protocol Legitimacy & Evaluation Entry)

The Website establishes MPLP as a **serious, governed, evaluable protocol** for external audiences.

**Contains:**
- What MPLP is (protocol identity and scope at a high level)
- Why MPLP exists (problem framing and value boundaries)
- Governance posture (MPGC, versioning, license)
- Evaluation entrypoints (links to Documentation, Validation Lab, Repository)

**Does NOT contain:**
- Schema, field, or enum definitions
- Binding requirements (MUST / SHALL / REQUIRED)
- Conformance, certification, or endorsement claims

**Rule:** The Website may assert protocol identity and provide evaluation navigation, but it **cannot create or modify protocol obligations**.

---

## 4. Cross-Entry Rules

### 4.1 No Cross-Entry Authority

Each entry surface has authority **only within its own domain**.

- Repository cannot dictate website copy
- Website cannot create protocol requirements
- Documentation cannot invent facts not in Repository

### 4.2 Direction of Truth Flow

```
      Repository (Source of Truth)
           ↙           ↘
  Documentation        Website
  (Spec & Reference)   (Legitimacy & Evaluation Entry)
```

**Truth flows FROM Repository TO other surfaces.**

**Reverse flow is FORBIDDEN:**
- Website → Documentation: ❌ NOT ALLOWED
- Website → Repository: ❌ NOT ALLOWED
- Documentation → Repository: ❌ NOT ALLOWED

### 4.3 Cross-Reference Rules

- Website MAY link to Documentation and Repository artifacts
- Website MUST NOT be used as a fact source for Documentation or Repository
- Documentation MAY cite Repository facts
- Documentation MUST NOT rely on Website for protocol facts

### 4.4 Violation = Invalid

Any document that violates the entry model is considered **INVALID**
and has no normative or authoritative effect.

---

## 5. Amendments

This specification can only be amended by:
- MPGC formal resolution
- New version number
- Explicit supersession notice

---

**Frozen:** 2026-01-01  
**Owner:** MPLP Protocol Governance Committee
