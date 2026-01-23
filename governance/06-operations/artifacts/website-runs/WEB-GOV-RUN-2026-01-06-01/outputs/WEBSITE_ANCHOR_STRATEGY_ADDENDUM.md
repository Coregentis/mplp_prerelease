---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "WEBSITE_ANCHOR_STRATEGY_ADDENDUM"
---

# Website Anchor Strategy — Governance Addendum

**Run ID**: WEB-GOV-RUN-2026-01-06-01  
**Status**: NORMATIVE (for website governance)  
**Authority**: MPGC  
**Last Updated**: 2026-01-06

---

## Purpose

This addendum defines the relationship between:
- **7 Semantic Anchors** (Navbar entries for human navigation)
- **Canonical Positioning Anchor** (/definition - machine anchor for AI/search engines)

These two concepts serve different purposes and do not conflict.

---

## Rule 1: 7 Navbar Anchors (FROZEN)

The website navbar contains exactly **7 semantic anchors**. This is frozen per CONST-001.

| # | Path | Purpose |
|---|------|---------|
| 1 | `/architecture` | Protocol architecture overview |
| 2 | `/modules` | Module registry summary |
| 3 | `/kernel-duties` | Cross-cutting duties overview |
| 4 | `/golden-flows` | Verification scenarios overview |
| 5 | `/governance/overview` | Governance positioning |
| 6 | `/references` | Pointer hub + consolidated pages |
| 7 | `/faq` | Frequently asked questions |

**Modification requires**: RFC process + MPGC approval.

---

## Rule 2: /definition as Canonical Positioning Anchor

`/definition` is the **machine anchor** for AI systems and search engines. It:

- **IS** in: Footer, Sitemap, CanonicalReferences component, internal links
- **IS NOT** in: Navbar (does not count toward 7 anchors)

### Purpose

Provide a stable positioning anchor that machines can reliably reference to understand:
- What MPLP is (POSIX-like specification)
- What MPLP is not (not a framework, runtime, or platform)
- Where normative definitions live (docs.mplp.io)
- Who governs the protocol (MPGC)

### JSON-LD Requirements

The /definition page MUST include:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebPage", "mainEntity": { "@id": "...#term" } },
    { "@type": "DefinedTerm", "@id": "...#term" },
    { "@type": "Organization", "@id": "...#mpgc" }
  ]
}
```

This establishes:
- `WebPage` → `DefinedTerm` binding (what this page defines)
- `DefinedTerm` → `DefinedTermSet` (normative source at docs)
- `Organization` (MPGC as publisher)

---

## Rule 3: Site-Level JSON-LD (Root Layout)

The root layout (`app/layout.tsx`) injects site-level structured data:

| Schema Type | Purpose | Notes |
|-------------|---------|-------|
| `WebSite` | Site identity | May include SearchAction (optional) |
| `Organization` | MPGC identity | Must include `sameAs` to docs/GitHub |

**Prohibited language**: "defines", "provides", "guarantees" (F4 violation)

---

## Rule 4: CanonicalReferences + NextSteps Integration

All anchor pages (including the 7 navbar anchors) SHOULD include:

1. **`CanonicalReferences`** component - links to /definition + docs + repo
2. **`NextSteps`** component - 3-button CTA linking to docs/repo/evidence

This ensures any page can route back to the authority chain.

---

## Verification Checklist

- [ ] Navbar contains exactly 7 anchors (no more, no less)
- [ ] /definition is in Footer and Sitemap
- [ ] /definition is NOT in Navbar
- [ ] /definition has @graph JSON-LD with WebPage ↔ DefinedTerm ↔ Organization
- [ ] Root layout has WebSite + Organization JSON-LD (no normative language)
- [ ] No "defines/provides/guarantees" in any JSON-LD description

---

## Change Control

Any modification to:
- Navbar anchor count or paths
- /definition positioning or JSON-LD structure
- Site-level JSON-LD schemas

**Requires**: WG review + documentation update to this addendum.
