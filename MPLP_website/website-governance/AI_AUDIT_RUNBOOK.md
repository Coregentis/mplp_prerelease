# AI Website Consistency Audit Runbook

**Version:** v1.0  
**Target:** mplp.io (Official Website)  
**Executor:** AI Assistant (Antigravity / Claude / GPT)  

---

## 🔒 P0 — Semantic Authority Rule (IMMUTABLE)

> **The 7 Semantic Anchors constitute the ONLY public semantic surface of MPLP.**  
> All other pages are subordinate, contextual, or auxiliary.

Any audit, fix, or generation MUST NOT violate this rule.

---

## 📋 Execution Order (STRICT)

AI MUST execute in this order, NO skipping:

| Phase | Name | Gate |
|:------|:-----|:-----|
| 1 | Page Inventory & Classification | Must complete before Phase 2 |
| 2 | Structural Consistency Audit | Blocks Phase 3 if P0 issues |
| 3 | Semantic & Naming Consistency | Blocks Phase 4 if P0 issues |
| 4 | SEO & Metadata Consistency | Blocks Phase 5 if P0 issues |
| 5 | JSON-LD / Structured Data Audit | Blocks Phase 6 if P0 issues |
| 6 | Rich Result Eligibility Audit | Final gate before freeze |

---

## Phase 1: Page Inventory & Classification

### Objective
Ensure every URL has a defined semantic role.

### Output Format

| Path | Type | Anchor Mapping | Expected Schema |
|:-----|:-----|:---------------|:----------------|
| `/` | Homepage | — | WebSite + DefinedTermSet |
| `/architecture` | Anchor | #1 | TechArticle |
| `/modules` | Anchor | #2 | CollectionPage |
| `/kernel-duties` | Anchor | #3 | TechArticle |
| `/golden-flows` | Anchor | #4 | CollectionPage |
| `/governance/overview` | Anchor | #5 | TechArticle |
| `/references` | Anchor | #6 | CollectionPage |
| `/faq` | Anchor | #7 | FAQPage |
| `/why-mplp` | NonAnchor | → FAQ | TechArticle |
| `/compliance` | NonAnchor | → Governance | TechArticle |
| `/ecosystem` | NonAnchor | → References | CollectionPage |
| `/blog` | Utility | — | Blog |
| `/search` | Utility | — | SearchResultsPage |

### Classification Rules

```typescript
type PageType = "Anchor" | "AnchorChild" | "NonAnchor" | "Utility";

interface PageEntry {
    path: string;
    type: PageType;
    parentAnchor?: string;  // Required if type !== "Anchor" && type !== "Utility"
    expectedSchema: string;
}
```

### Gate
- ❌ Unclassified page = **P0 BLOCK**

---

## Phase 2: Structural Consistency Audit

### Required Structure by Page Type

#### Anchor / AnchorChild Pages
```tsx
<Breadcrumb />
<PageHeader />
<ContentSection />
```

#### NonAnchor Pages
```tsx
<Breadcrumb />
<PageHeader />
<ContentSection />
<BackToAnchor />
```

### Audit Commands

```bash
grep -r "PageHeader" app/**/page.tsx --include="*.tsx"
grep -r "Breadcrumb" app/**/page.tsx --include="*.tsx"
grep -r "BackToAnchor" app/**/page.tsx --include="*.tsx"
```

### Gate
- ❌ Anchor missing PageHeader/Breadcrumb = **P0**
- ❌ NonAnchor missing BackToAnchor = **P0**

---

## Phase 3: Semantic & Naming Consistency

### Anchor Naming Invariant

```typescript
const ANCHOR_CANONICAL = {
    architecture: "Architecture",
    modules: "Modules",
    kernelDuties: "Kernel Duties",
    goldenFlows: "Golden Flows",
    governance: "Governance",
    references: "References",
    faq: "FAQ"
} as const;
```

Must verify consistency in: Navbar, Footer, PageHeader, JSON-LD.

### Gate
- ❌ Anchor name mismatch = **P0**

---

## Phase 4: SEO & Metadata Consistency

### Forbidden Keywords
```
Best, Leading, Certified, Official comparison, compliant, endorsed, approved
```

### Gate
- ❌ Forbidden keyword in metadata = **P0**

---

## Phase 5: JSON-LD / Structured Data Audit

### Schema Type Whitelist

| Page Type | Allowed Schema |
|:----------|:---------------|
| Homepage | WebSite + DefinedTermSet |
| FAQ | FAQPage |
| Anchor (Tech) | TechArticle |
| References | CollectionPage |

### T0 SSOT Validation

All JSON-LD must reference centralized T0 from `lib/seo/jsonld-structure.ts`.

### Gate
- ❌ Non-whitelist schema = **P0**
- ❌ Anchor missing JSON-LD = **P0**

---

## Phase 6: Rich Result Eligibility

| Page | Rich Result Type |
|:-----|:-----------------|
| `/faq` | FAQ Rich Result |
| `/` | Knowledge Panel / Sitelinks |
| `/references` | Collection / Sitelinks |

---

## 📤 Required Outputs

1. **`website-consistency-audit.json`** — Machine-readable
2. **`website-consistency-audit.md`** — Human-readable
3. **`fix-plan.md`** — Prioritized fixes
4. **`website-freeze-declaration.md`** — Final sign-off

---

## ✅ Current Status

| Priority | Page | Fix Required |
|:---------|:-----|:-------------|
| 🔴 P0 | `/faq` | PageHeader + Breadcrumb |
| 🔴 P0 | `/kernel-duties` | PageHeader + Breadcrumb + JSON-LD |
| 🟡 P1 | `/why-mplp` | Breadcrumb |
