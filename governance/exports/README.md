# Governance Exports

This directory contains machine-generated outputs from governance gates and audits.

## Files

| File | Generator | Purpose |
|------|-----------|---------|
| `docs-seo-manifest.json` | `generate-docs-seo-manifest.mjs` | Full SEO metadata for all docs pages |
| `docs-link-map.json` | `audit-crosslinks.mjs` | Cross-surface link topology |
| `docs-banner-gate.report.json` | `docs-banner-gate.mjs` | Phase 3 banner validation |
| `docs-sensitive-terms.report.json` | `docs-sensitive-terms-gate.mjs` | Phase 4 sensitive terms (JSON) |
| `docs-sensitive-terms.report.md` | `docs-sensitive-terms-gate.mjs` | Phase 4 sensitive terms (Markdown) |

## Contract

- All files in this directory are **machine-generated**
- Do not manually edit these files
- Regenerate via the corresponding scripts
- These outputs are used by CI gates and audit trails

## Regeneration Commands

```bash
# SEO Manifest
node scripts/03-docs/generate-docs-seo-manifest.mjs

# Banner Gate
node scripts/gates/docs-banner-gate.mjs

# Sensitive Terms Gate (Phase 4)
node scripts/gates/docs-sensitive-terms-gate.mjs
```
