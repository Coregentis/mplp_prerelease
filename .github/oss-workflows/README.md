# OSS-Specific CI Workflows

This directory contains **OSS-compatible** versions of GitHub Actions workflows.

## Why Separate?

Dev repository CI workflows assume:
- `pnpm` package manager
- `./V1.0-release` working directory structure
- Website submodule (`MPLP_website/**`)

OSS package CI workflows assume:
- `npm` only (no pnpm)
- Root working directory (no nesting)
- No website (excluded from package)

## Release Process

### When Packaging OSS Release

**Manual Step** (after running `build-release.js`):

```bash
# 1. Package is built to dist/mplp-v1.0/
node scripts/04-build/build-release.js

# 2. Manually copy OSS workflows
cp .github/oss-workflows/*.yml dist/mplp-v1.0/.github/workflows/

# 3. Commit and push to Prerelease
cd dist/mplp-v1.0
git add .github/workflows/
git commit -m "chore: sync OSS workflows"
git push origin main
```

### When Updating CI

**If you modify Dev CI** (`.github/workflows/*.yml`):

1. **Dev change**: Edit `.github/workflows/gates.yml` (for example)
2. **OSS adaptation**: Edit `.github/oss-workflows/gates.yml`
   - Remove `pnpm` references
   - Remove `working-directory: ./V1.0-release`
   - Add conditional checks for missing files
3. **Next release**: OSS version will auto-copy

## Workflow Mapping

| Dev Workflow | OSS Workflow | Key Differences |
|:---|:---|:---|
| `gates.yml` | `gates.yml` | pnpm → npm, no V1.0-release path |
| `ci-release.yml` | `ci-release.yml` | Conditional package.json checks |
| `deploy-docs.yml` | `deploy-docs.yml` | ✓ Compatible as-is |
| `codeql.yml` | `codeql.yml` | ✓ Compatible as-is |
| `semantic-lint.yml` | `semantic-lint.yml` | ✓ Compatible as-is |
| `link-health.yml` | `link-health.yml` | ✓ Compatible as-is |

## Current OSS Workflows

Last synced: 2026-01-09 (Commit 68ddc75 in Prerelease)

- ✅ `gates.yml` - Governance gates (no pnpm, no V1.0-release)
- ✅ `ci-release.yml` - Build & test (conditional checks)
- ✅ `deploy-docs.yml` - Docs deployment
- ✅ `codeql.yml` - Security scanning
- ✅ `semantic-lint.yml` - Semantic validation
- ✅ `link-health.yml` - Link checking
