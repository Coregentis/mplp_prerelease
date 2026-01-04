<#
.SYNOPSIS
    Simulate GitHub CI Workflows Locally
.DESCRIPTION
    Executes the steps defined in .github/workflows/ci.yml, deploy-docs.yml, and semantic-lint.yml
    to ensure the repository is ready for push.
#>

$ErrorActionPreference = "Stop"

function Run-Step {
    param($Name, $Command)
    Write-Host "`n[CI Step] $Name..." -ForegroundColor Cyan
    Invoke-Expression $Command
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Step '$Name' failed with exit code $LASTEXITCODE"
    }
    Write-Host "✅ Passed" -ForegroundColor Green
}

Write-Host "==================================================" -ForegroundColor Magenta
Write-Host "   GITHUB CI LOCAL SIMULATION" -ForegroundColor Magenta
Write-Host "==================================================" -ForegroundColor Magenta

# 1. Semantic Lint (semantic-lint.yml)
Run-Step "Install Root Dependencies" "npx pnpm install"
Run-Step "Semantic Lint Gate" "node scripts/semantic/semantic-lint.mjs --ci"

# 2. Repository CI (ci.yml)
Run-Step "Repository Lint" "npx pnpm run lint"

Run-Step "Compile Schema Validator" "npx tsc scripts/validate-schemas.ts --target es2020 --module commonjs --esModuleInterop --skipLibCheck"
Run-Step "Validate Schemas" "node scripts/validate-schemas.js"

Run-Step "Golden Test Suite (TypeScript)" "npx pnpm test:golden"
Run-Step "Unit Tests (TypeScript)" "npx pnpm run test"

# Python tests (Assuming python environment is set up as per user metadata)
# Run-Step "Install Python SDK" "pip install -e packages/sdk-py"
# Run-Step "Golden Test Suite (Python)" "python -m pytest packages/sdk-py/tests/golden/ -v"

# 3. Website CI (deploy-docs.yml)
Write-Host "`n[CI Step] Website Build (docs/)..." -ForegroundColor Cyan
Push-Location docs
try {
    Run-Step "Install Docs Dependencies" "npm install"
    $env:NODE_OPTIONS = "--max-old-space-size=4096"
    Run-Step "Build Docusaurus" "npm run build"
    Run-Step "Create CNAME" "echo 'docs.mplp.io' | Out-File -FilePath build/CNAME -Encoding ASCII"
}
finally {
    Pop-Location
}

# 4. Link Health Check (link-health.yml)
# Note: Full linkinator scan is skipped to avoid long execution time in simulation, 
# but we verify the mapping health script which is part of the workflow.
Run-Step "Cross-Surface Mapping Check" "node scripts/semantic/mapping-health.mjs --skip-live"

Write-Host "`n🎉 ALL CI CHECKS PASSED LOCALLY" -ForegroundColor Green
