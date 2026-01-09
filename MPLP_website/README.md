# MPLP Protocol �?Official Reference Website

This repository contains the source code for **mplp.io**, the official reference website of the **Multi-Agent Lifecycle Protocol (MPLP)**.

🌐 **Live**: [https://www.mplp.io](https://www.mplp.io)

---

## Purpose

The MPLP website serves as a **protocol reference and evaluation surface**, not as:
- a product website
- a marketing site
- a certification authority

It provides:
- Canonical protocol specifications
- Governance and lifecycle definitions
- Normative module descriptions
- Standards mapping and compatibility positioning

---

## Protocol Status

| Property | Value |
|----------|-------|
| Protocol Version | MPLP v1.0.0 |
| Status | FROZEN (no breaking changes permitted) |
| Governance | MPLP Protocol Governance Committee (MPGC) |
| License | Apache-2.0 |

---

## Scope Boundaries

This website intentionally:
- Does **NOT** offer compliance certification
- Does **NOT** provide product comparisons or endorsements
- Does **NOT** include jurisdiction-specific regulatory claims

All standard references follow MPLP's **Mapping / Compatibility / Enablement** model.

For details, see [Standards Compatibility & Mapping Policy](https://www.mplp.io/standards/positioning).

---

## Website Governance

This repository includes a comprehensive governance documentation system:

```
/website-governance/
├── README.md                      # Entry point
├── FREEZE_RECORD.md               # Frozen elements, prohibited actions
├── SEMANTIC_REGISTRY.md           # Canonical terms, page contracts
├── SEMANTIC_DRIFT_CONTROL.md      # Drift detection, AI workflow
├── SEMANTIC_DIFFLOG.md            # History of semantic changes
├── ARCHITECTURE_GUARDRAILS.md     # Page tiers, navigation rules
├── NAVIGATION_POLICY.md           # Link integrity, semantic paths
├── SEO_AND_JSONLD_POLICY.md       # SEO structure rules
├── CONTENT_CHANGE_RULES.md        # Allowed vs prohibited changes
├── VISUAL_IDENTITY_POLICY.md      # Design consistency
├── CHANGE_EVALUATION_CHECKLIST.md # Pre-change validation
├── PERFORMANCE_A11Y_POLICY.md     # Lighthouse thresholds, Core Web Vitals
├── SEARCH_POLICY.md               # Pagefind index, tier ranking
├── BUILD_PERFORMANCE_BASELINE.md  # Build time targets
├── AI_MAINTENANCE_GUIDE.md        # Rules for AI/new maintainers
├── COMPONENT_GUIDE.md             # Component semantic constraints
└── archive/                       # Legacy documents
```

**Before making any changes**, read `/website-governance/README.md`.

---

## Relationship to Other Repositories

| Repository | Purpose |
|------------|---------|
| [Coregentis/MPLP-Protocol](https://github.com/Coregentis/MPLP-Protocol) | Protocol Specification |
| [docs.mplp.io](https://docs.mplp.io) | Technical Documentation |
| mplp.io (this repo) | Reference Website |

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX via `next-mdx-remote`
- **Deployment**: Vercel

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Deployment

The site auto-deploys to Vercel on push to `main`.

> ⚠️ Deployment does not imply feature iteration.
> All content changes must follow `/website-governance/` policies.

---

## Semantic Identity Statement

> This README exists to define the **semantic identity** of this repository for platforms, crawlers, and AI systems.

This is a **Protocol Reference Website**, not a product or marketing site. All content, semantics, and structured data are deterministically aligned with the MPLP v1.0 frozen specification.

---

## License

Apache 2.0 �?See the [MPLP Protocol](https://github.com/Coregentis/MPLP-Protocol) for details.