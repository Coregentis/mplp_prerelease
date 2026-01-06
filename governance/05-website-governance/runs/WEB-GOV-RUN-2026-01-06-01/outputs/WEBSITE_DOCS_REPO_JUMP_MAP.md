# Website ↔ Docs ↔ Repo Jump Map

**Run ID**: WEB-GOV-RUN-2026-01-06-01  
**Status**: Normative (for website governance)  
**Authority**: MPGC  
**Last Updated**: 2026-01-06  
**Phase**: Phase 3 - Cross-Entry Alignment

---

## Purpose

This document defines the mandatory cross-entry linking requirements for every website page. It serves as the mechanical enforcement layer for CONST-001 Three-Entry Model compliance.

---

## Single Source of Truth

> **All Docs URLs MUST be sourced from `lib/site-config.ts → DOCS_URLS`**
> 
> No hardcoded docs.mplp.io URLs allowed in page files.

---

## Jump Map (DOCS_URLS Keys)

### 7 Navbar Anchors

| Website Path | docsKey | repoKey | evidenceKey | Required Components |
|--------------|---------|---------|-------------|---------------------|
| `/architecture` | `architecture` | `schemas` | `goldenFlows` | CanonicalReferences, NextSteps, PositioningDisclaimer |
| `/modules` | `modules` | `schemas` | `goldenFlows` | CanonicalReferences, NextSteps, UsageBoundary |
| `/kernel-duties` | `kernelDuties` | `schemas` | `goldenFlows` | CanonicalReferences, NextSteps |
| `/golden-flows` | `goldenFlows` | `tests` | `conformance` | CanonicalReferences, NextSteps |
| `/governance/overview` | `governance` | `governance` | `goldenFlows` | CanonicalReferences, NextSteps |
| `/references` | `home` | `root` | `goldenFlows` | CanonicalReferences, NextSteps |
| `/faq` | `overview` | `root` | `goldenFlows` | CanonicalReferences, NextSteps |

---

### Canonical Anchor (Machine)

| Website Path | JSON-LD Binding | Required |
|--------------|-----------------|----------|
| `/definition` | `@graph: WebPage.mainEntity → DefinedTerm → inDefinedTermSet` | @graph JSON-LD, NextSteps |

---

### Additional Core Pages

| Website Path | docsKey | repoKey | Notice Required |
|--------------|---------|---------|-----------------|
| `/conformance` | `conformance` | `tests` | NonCertificationNotice |
| `/ecosystem` | `sdkDocs` | `root` | **EcosystemNotice** (NEW) |
| `/why-mplp` | `overview` | — | — |
| `/` (Home) | `home` | `root` | PositioningNotice |

---

## DOCS_URLS Reference (lib/site-config.ts)

```typescript
export const DOCS_URLS = {
    // Entry points
    home: "https://docs.mplp.io",
    overview: "https://docs.mplp.io/docs/overview/intro-to-mplp",
    
    // Architecture
    architecture: "https://docs.mplp.io/docs/architecture/architecture-overview",
    l1ToL4: "https://docs.mplp.io/docs/architecture/l1-l4-architecture-deep-dive",
    kernelDuties: "https://docs.mplp.io/docs/architecture/cross-cutting-kernel-duties",
    
    // Golden Flows
    goldenFlows: "https://docs.mplp.io/docs/golden-flows",
    
    // Conformance & Tests
    conformance: "https://docs.mplp.io/docs/category/tests",
    testsOverview: "https://docs.mplp.io/docs/tests/golden-test-suite-overview",
    
    // Guides
    guides: "https://docs.mplp.io/docs/category/guides",
    quickstart: "https://docs.mplp.io/docs/guides/quickstart-5min",
    
    // Modules & SDK
    modules: "https://docs.mplp.io/docs/category/modules",
    sdkDocs: "https://docs.mplp.io/sdk",
    
    // Governance
    governance: "https://docs.mplp.io/docs/category/governance",
    releasePolicy: "https://docs.mplp.io/docs/governance/versioning-policy",
};
```

---

## REPO_URLS Reference

```typescript
export const REPO_URLS = {
    root: "https://github.com/Coregentis/MPLP-Protocol",
    schemas: "https://github.com/Coregentis/MPLP-Protocol/tree/main/schemas",
    governance: "https://github.com/Coregentis/MPLP-Protocol/tree/main/governance",
    tests: "https://github.com/Coregentis/MPLP-Protocol/tree/main/packages",
};
```

---

## Enforcement Rules

1. **Primary Link Rule**: Every anchor page MUST use `DOCS_URLS[docsKey]`
2. **Repo Link Rule**: Implementation pages MUST use `REPO_URLS[repoKey]`
3. **No Hardcoding**: Page files MUST NOT contain hardcoded `docs.mplp.io` URLs
4. **Notice Requirement**: High F1/F3 risk pages MUST have disclaimer component

---

## Verification Checklist

- [x] All DOCS_URLS match real docs.mplp.io navigation
- [x] All anchor pages use CanonicalReferences + NextSteps
- [x] /ecosystem has EcosystemNotice
- [x] /conformance has NonCertificationNotice
- [x] Homepage Quickstart de-implemented (eyebrow: "Getting Started")
- [x] /definition has @graph JSON-LD entity binding
- [x] npm run build: ✅ Compiled successfully

---

**End of Jump Map**

**© 2026 MPGC — MPLP Protocol Governance Committee**
