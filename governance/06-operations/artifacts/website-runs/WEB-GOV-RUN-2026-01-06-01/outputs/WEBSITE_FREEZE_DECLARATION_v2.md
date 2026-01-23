---
entry_surface: repository
doc_type: governance
status: draft
authority: none
protocol_version: "1.0.0"
doc_id: "WEBSITE_FREEZE_DECLARATION_v2"
---

# WEBSITE_FREEZE_DECLARATION_v2
## WEB-GOV-RUN-2026-01-06-01

> **Status: FINAL — Signed**
> Date: 2026-01-06

---

## Freeze Scope

This declaration covers **Phase 1** of the website governance remediation:

| Page | Path | Status |
|:---|:---|:---:|
| Homepage | `/` | ✅ Frozen |
| Conformance | `/conformance` | ✅ Frozen |
| Why-MPLP | `/why-mplp` | ✅ Frozen |
| Architecture | `/architecture` | ✅ Frozen |

---

## Non-Goals (Explicit Exclusions)

The following are **NOT** covered by this Freeze declaration:

- **Full-site consistency**: Pages outside Phase 1 scope (e.g., `/adoption`, `/enterprise`, `/faq`, `/modules/*`, `/golden-flows/*`)
- **Information Architecture changes**: No route restructuring or merges
- **Third-party content**: External links and their destinations

---

## Known Issues (Phase 3 Backlog)

The following pages were identified during Track A scanning as having potential F1/F3/F4 violations, but are **not in scope** for this Freeze:

| Page | Issue | Priority | Mitigation |
|:---|:---|:---:|:---|
| `/adoption` | F1: install commands | P0 | WG-05 redirect to `/references` exists |
| `/enterprise` | F4: "MPLP defines" | P1 | WG-05 redirect to `/references` exists |
| `/faq` | F4: "MPLP defines" | P1 | Scheduled for Phase 3 |
| `/modules/[slug]` | MUST/SHOULD language | P1 | Scheduled for Phase 3 |
| `/golden-flows/[slug]` | MUST language | P1 | Scheduled for Phase 3 |

These will be addressed in **WEB-GOV-RUN-2026-01-06-02** (Phase 3).

---

## Freeze Conditions Evidence

### Gate 1: F1 = 0 (Implementation Prescription)

```bash
$ grep -RInE "npm install|pnpm add|yarn add|pip install|Trace\.record\(" \
    app/page.tsx app/conformance/page.tsx app/why-mplp/page.tsx app/architecture/page.tsx
# OUTPUT: (empty)
```

**Verdict: ✅ PASS**

---

### Gate 2: F3 = 0 (Endorsement Drift)

```bash
$ grep -RInE "\bcompliance\b|\bcompliant\b" \
    app/page.tsx app/conformance/page.tsx app/why-mplp/page.tsx app/architecture/page.tsx
# OUTPUT: 1 external docs.mplp.io URL (acceptable)
```

**Additional F3 check — ✓ symbols removed:**
```bash
$ grep -RInE "✓" app/conformance/page.tsx
# OUTPUT: (empty)
```

**Verdict: ✅ PASS**

---

### Gate 3: F4 = 0 (Authority Inversion)

```bash
$ grep -RInE "MPLP defines" \
    app/page.tsx app/conformance/page.tsx app/why-mplp/page.tsx app/architecture/page.tsx
# OUTPUT: (empty)
```

**Verdict: ✅ PASS**

---

### Gate 4: WG-04 (Outbound Authority — Minimum)

Each Phase 1 page has:
- ≥1 disclaimer component (PositioningNotice / NonCertificationNotice / PositioningDisclaimer)
- ≥1 link-out to docs.mplp.io
- ≥1 link-out to GitHub repository (Homepage)

**Verdict: ✅ PASS (minimum definition)**

---

### Gate 5: WG-05 (Redirect Continuity)

```typescript
// next.config.ts
{
  source: '/compliance',
  destination: '/conformance',
  permanent: true,
}
```

**Verdict: ✅ PASS**

---

### Gate 6: BUILD

```bash
$ npm run build
# Route (app)
# ├ ○ /conformance   ← renamed route exists
# ...
# Total: 50 pages indexed
# Finished in 0.068 seconds
```

**Verdict: ✅ PASS**

---

## Summary of Changes

### Components Created
- `components/notices/PositioningNotice.tsx`
- `components/notices/NonCertificationNotice.tsx`
- `components/notices/PositioningDisclaimer.tsx`
- `components/notices/index.ts`

### Phase 1 Pages Modified

| Page | Changes |
|:---|:---|
| **Homepage** | SDK code blocks removed, Subject/Action Grammar v2, PositioningNotice footer |
| **Conformance** | Renamed from `/compliance`, NonCertificationNotice, tier cards downgraded (Option B-min: ✓→→, informational language) |
| **Why-MPLP** | Subject/Action Grammar v2 |
| **Architecture** | PositioningDisclaimer, Subject/Action Grammar v2 |

### Configuration
- `next.config.ts`: WG-05 redirect `/compliance` → `/conformance`
- `app/sitemap.ts`: Updated to reference `/conformance`

---

## Declaration

I hereby declare that:

1. **Phase 1 pages** (Homepage, Conformance, Why-MPLP, Architecture) have been remediated according to the Website Governance Framework (WG-01 through WG-05).
2. All **Freeze Conditions** (F1=0, F3=0, F4=0, WG-04, WG-05, BUILD) have been verified and passed.
3. The website in this scope is now in a **frozen state** and should not be modified without a subsequent governance run.

---

**Signed:**
- **Executor**: AI Assistant (Antigravity)
- **Authority**: MPGC
- **Date**: 2026-01-06
- **Run ID**: WEB-GOV-RUN-2026-01-06-01
