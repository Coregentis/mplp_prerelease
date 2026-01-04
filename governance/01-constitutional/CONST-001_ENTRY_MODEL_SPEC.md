# MPLP Entry Model Specification

**Document ID**: CONST-001  
**Status**: Constitutional  
**Authority**: MPGC  
**Effective**: v1.0.0

---

## 1. Scope

This document defines the exclusive entry points through which information enters the MPLP ecosystem and the authority boundaries of each entry point.

This specification is constitutional. No other document may override, modify, or reinterpret its provisions.

---

## 2. Entry Points

MPLP recognizes exactly three entry points. This list is exhaustive.

### 2.1 Website

**URI**: mplp.io  
**Role**: Discovery and Positioning  
**Authority**: None

The Website:
- Provides discovery and positioning content
- Is informative only
- Has no authority to define protocol requirements
- Has no authority to interpret specifications
- May be updated without governance process

### 2.2 Documentation

**URI**: docs.mplp.io  
**Role**: Specification and Reference  
**Authority**: Normative (specification documents only)

The Documentation:
- Contains protocol specifications
- Contains reference documentation
- Contains evaluation descriptions
- Must not contradict the Repository
- Must derive normative content from Repository schemas and invariants

### 2.3 Repository

**URI**: github.com/Coregentis/MPLP-Protocol  
**Role**: Source of Truth  
**Authority**: Ultimate

The Repository:
- Is the sole source of truth for all protocol definitions
- Contains canonical schemas
- Contains canonical invariants
- Contains canonical implementations
- Takes precedence over all other sources

---

## 3. Conflict Resolution

When any conflict exists between entry points, the following precedence applies:

```
Repository > Documentation > Website
```

This precedence is absolute and non-negotiable.

### 3.1 Repository–Documentation Conflict

If Documentation contradicts Repository:
- Repository prevails
- Documentation must be corrected

### 3.2 Documentation–Website Conflict

If Website contradicts Documentation:
- Documentation prevails
- Website must be corrected

### 3.3 Repository–Website Conflict

If Website contradicts Repository:
- Repository prevails
- Website must be corrected

---

## 4. Prohibited Patterns

The following patterns are prohibited without exception.

### 4.1 Website Authority Violation

The Website must not:
- Define protocol requirements
- Use normative language (MUST, SHALL, REQUIRED)
- Claim specification authority
- Interpret normative documents

### 4.2 Documentation Independence Violation

Documentation must not:
- Create normative content without Repository backing
- Contradict Repository schemas or invariants
- Claim authority beyond its scope

### 4.3 Compliance and Certification Claims

No entry point may:
- Claim that MPLP provides compliance
- Claim that MPLP provides certification
- Suggest that MPLP adoption confers regulatory status
- Use the terms "MPLP compliant" or "MPLP certified"

---

## 5. Amendment

This specification may only be amended through the MPGC constitutional governance process.

Amendments require:
- Explicit MPGC approval
- Version increment
- Public notice period

---

**End of Document**
