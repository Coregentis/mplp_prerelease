# Website CI Workflows

## Active Gates

### `docs-link-gate.yml` - Documentation Link Health

**Purpose**: Ensures all `docs.mplp.io` links from Website are valid and stable.

**Trigger**:
- Pull requests modifying `app/`, `components/`, `lib/`
- Push to `main`
- Manual dispatch

**Policy**:
- `broken > 0` → **FAIL** (404/5xx links)
- `redirects > 0` → **FAIL** (301/302, must update to final URLs)

**Invariants**:
- Zero broken links
- Zero redirects (all links point to canonical URLs)

**Artifacts**:
- `docs-link-report.json` (retained 90 days)

**Governance**: WG-05-WEBSITE | Link Health

---

## Local Testing

```bash
# Run the same validation locally
node scripts/check-doc-links.mjs

# View report
cat docs-link-report.json | jq '{checked, broken, redirects}'
```

## Failure Resolution

1. Download `docs-link-report.json` artifact from failed run
2. Locate broken/redirecting URLs: `jq '.results[] | select(.status >= 300)'`
3. Update `lib/site-config.ts` with correct URLs
4. Re-run checker locally to verify
5. Commit fix and push
