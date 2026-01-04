# FROZEN HEADER SPECIFICATION

**Status:** FROZEN  
**Authority:** MPGC  
**Effective:** 2026-01-01  
**Version:** 1.0

---

## 1. Purpose

This specification defines the Frozen Header format and usage rules.
It is the third constitutional document.

---

## 2. Frozen Header Template

The following is the **sole** authorized Frozen Header format:

```markdown
> [!FROZEN]
> **MPLP Protocol v1.0.0 — Frozen Specification**
> **Authority**: MPLP Protocol Governance Committee (MPGC)
> **License**: Apache-2.0
```

No variations are permitted.

---

## 3. Usage Rules

### 3.1 Where Frozen Header is REQUIRED

| Condition | Required |
|-----------|----------|
| `entry_surface: documentation` + `doc_type: normative` + `status: frozen` | ✅ YES |

### 3.2 Where Frozen Header is FORBIDDEN

| Entry Surface | Forbidden |
|---------------|-----------|
| `repository` | ✅ ALWAYS FORBIDDEN |
| `website` | ✅ ALWAYS FORBIDDEN |
| `documentation` + `doc_type: informative` | ✅ FORBIDDEN |
| `documentation` + `status: draft` | ✅ FORBIDDEN |

### 3.3 Position

When present, the Frozen Header MUST appear:
- After the frontmatter
- Before the main title (H1)
- Before any content

---

## 4. Semantic Meaning

The Frozen Header indicates:
- This document is a frozen normative specification
- No breaking changes are permitted without a new protocol version
- MPGC is the governing authority

The Frozen Header does **NOT** indicate:
- Implementation is complete
- Code exists for all defined features
- Website content is frozen

---

## 5. Violation Handling

- Frozen Header in wrong location → Document is **INVALID**
- Modified Frozen Header text → Document is **INVALID**
- Frozen Header without matching frontmatter → Document is **INVALID**

---

**Frozen:** 2026-01-01  
**Owner:** MPLP Protocol Governance Committee
