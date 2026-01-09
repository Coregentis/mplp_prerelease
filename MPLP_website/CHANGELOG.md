# MPLP Website — Changelog

All notable changes to the MPLP Website (mplp.io).

---

## [authority-alignment-v1] — 2025-12-25

### 🎯 Authority & Semantic Alignment

#### Added
- Hero semantic layering (H1 Full Name → H2 Definition → Tagline → Lead)
- Seven stable anchor pages: /architecture, /modules, /kernel-duties, /golden-flows, /governance, /faq, /references
- JSON-LD structure tree (DefinedTermSet, WebSite hasPart, FAQPage, CollectionPage)
- `lib/seo/jsonld-structure.ts` — T0 SSOT and structured data generators
- `lib/content/faq-data.ts` — 36 Q&A covering definitions, boundaries, AI citation
- FAQ page with full content and FAQPage JSON-LD
- References page with framework/protocol context (MCP, A2A, LangChain, CrewAI, AutoGen)
- `scripts/semantic-lint.ts` — CI terminology guardrail
- `semantic:lint` npm script

#### Changed
- Homepage metadata aligned with T0 one-liner
- Sitemap expanded to include 3 new anchor pages
- CI workflow updated to use semantic lint

#### Governance
- DGP-00 terminology enforcement (conformant, not compliant)
- No Product/Service/Certification JSON-LD schema types
- T0 identity anchors required in codebase

---

## [1.1.1] — 2025-12-23

### Changed
- Replaced "MPLP-compliant" with "MPLP-conformant" (DGP-00)
- Standardized URLs to https://www.mplp.io

---

## [1.1.0] — 2025-12-22

### Added
- T4 strategic definition pages
- Standards positioning pages