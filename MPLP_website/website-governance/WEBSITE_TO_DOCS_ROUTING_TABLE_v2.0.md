# MPLP Website ↔ Documentation Routing Table

**Version**: 2.0  
**Status**: ACTIVE  
**Date**: 2025-12-27  
**Authority**: MPLP Website Governance  
**Phase**: Post Semantic Anchor Alignment  

---

## 1. Authority Split (Immutable)

| Surface | Role | Content Type |
|:--------|:-----|:-------------|
| **mplp.io** | Definitional Authority | Public definitions, interpretive anchors, semantic boundaries |
| **docs.mplp.io** | Normative Specification | Schemas, obligations, technical references, verification |

> **Rule**: docs.mplp.io pages MUST NOT present themselves as the definitional source for Agent OS Protocol.

---

## 2. The 7 Semantic Anchors (Frozen)

| # | Website Anchor | Docs Target | Boundary |
|:--|:---------------|:------------|:---------|
| 1 | `/architecture` | `/docs/architecture/*` | Website: overview; Docs: normative spec |
| 2 | `/modules` | `/docs/modules/*` | Website: overview; Docs: schema details |
| 3 | `/kernel-duties` | `/docs/architecture/cross-cutting-kernel-duties` | Website: summary; Docs: normative |
| 4 | `/golden-flows` | `/docs/golden-flows/*` | Website: summary; Docs: verification |
| 5 | `/governance/overview` | `/docs/governance/*` | Website: principles; Docs: policy |
| 6 | `/references` | `/docs/standards/*` | Website: context; Docs: mappings |
| 7 | `/faq` | (Website-primary) | Website: definitions; Docs: HOW_TO_EVALUATE |

---

## 3. 301 Redirects (mplp.io)

These legacy URLs now redirect to semantic anchors:

| Legacy URL | Redirects To | Status |
|:-----------|:-------------|:-------|
| `/standards/positioning` | `/references` | 301 |
| `/standards/protocol-evaluation` | `/references` | 301 |
| `/standards/regulatory-positioning` | `/references` | 301 |
| `/standards/what-mplp-is-not` | `/faq` | 301 |
| `/enterprise` | `/references` | 301 |
| `/adoption` | `/references` | 301 |
| `/governance` | `/governance/overview` | 301 |

---

## 4. Website → Docs Link Matrix

### 4.1 Homepage

| Source | Target | Link Text |
|:-------|:-------|:----------|
| Hero CTA | `https://docs.mplp.io` | "Read Documentation" |
| Quickstart | `https://docs.mplp.io/docs/guides/quickstart-5min` | "5-Minute Quickstart" |

### 4.2 Anchor Pages

| Website Page | Docs Target | Link Text Type |
|:-------------|:------------|:---------------|
| `/architecture` | `/docs/architecture/*` | "Full Specification →" |
| `/modules` | `/docs/modules/*` | "Module Specifications" |
| `/kernel-duties` | `/docs/architecture/cross-cutting-kernel-duties` | "Read Full Specification →" |
| `/golden-flows` | `/docs/golden-flows/*` | "Verification Guide" |
| `/governance/overview` | `/docs/governance/*` | "Governance Policy" |
| `/references` | `/docs/standards/*` | "Standards Mappings (Docs)" |
| `/faq` | `/docs/intro` | "Read Documentation →" |

---

## 5. Docs → Website Deferral Links (CRITICAL)

Docs MUST defer to website for definitional authority:

| Docs Page | Website Target | Purpose |
|:----------|:---------------|:--------|
| `intro.mdx` | `https://www.mplp.io` | Definitional authority |
| `/docs/standards/*` | `https://www.mplp.io/references` | Interpretation deferral |
| `/docs/governance/*` | `https://www.mplp.io/governance/overview` | Authority deferral |
| `/docs/enterprise/*` | `https://www.mplp.io/references` | Evaluation context |

### 5.1 Broken Links to Fix

| Docs File | Current Link | Should Be |
|:----------|:-------------|:----------|
| `15-standards/nist-mapping.md` | `/standards/positioning` | `/references` |
| `15-standards/iso-mapping.md` | `/standards/positioning` | `/references` |
| `14-runtime/drift-and-rollback.md` | `/standards/positioning` | `/references` |
| `04-observability/observability-overview.md` | `/standards/positioning` | `/references` |
| `03-profiles/sa-profile.md` | `/standards/positioning` | `/references` |
| `01-architecture/l2-coordination-governance.md` | `/standards/positioning` | `/references` |
| `17-enterprise/index.mdx` | `/enterprise` | `/references` |

---

## 6. Prohibited Routes

### 6.1 Website → Docs (Prohibited)

| Website Page | Cannot Link To | Reason |
|:-------------|:---------------|:-------|
| ANY | `/docs/99-internal/*` | Internal artifacts |
| `/why-mplp` | ANY `/docs/*` | Why narratives belong to website only |

### 6.2 Docs → Website (Prohibited)

| Docs Page | Cannot Link To | Reason |
|:----------|:---------------|:-------|
| ANY | Marketing pages | Docs must not endorse |
| Specification pages | Blog/News | No temporal references |

---

## 7. Anchor Text Rules

### Allowed
- Mapping, Alignment, Enablement, Compatibility, Reference, Overview, Specification

### Prohibited
- Compliance, Certification, Meets Requirements, Official, Endorsed, Approved

---

**MPLP Website Governance**  
**2025-12-27**
