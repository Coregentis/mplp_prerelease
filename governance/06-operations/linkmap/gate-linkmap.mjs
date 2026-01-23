#!/usr/bin/env node

/**
 * Gate LinkMap Runner
 * Implements METHOD-LINKMAP-01: Four-Entry Link Integrity Audit
 * 
 * Usage:
 *   node gate-linkmap.mjs --scope docs/docs
 *   node gate-linkmap.mjs --scope docs/docs/evaluation --emit
 *   node gate-linkmap.mjs --scope docs/docs --external
 * 
 * Flags:
 *   --scope <path>   Audit scope (default: docs/docs)
 *   --emit           Generate audit report and link map export
 *   --external       Run Gate-LINK-02 (external link check) - currently unimplemented
 *   --help           Show help
 */

import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '../../..');

// Parse arguments
const args = process.argv.slice(2);
const flags = {
    scope: 'docs/docs',
    emit: false,
    external: false,
    help: false
};

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--scope' && args[i + 1]) {
        flags.scope = args[++i];
    } else if (args[i] === '--emit') {
        flags.emit = true;
    } else if (args[i] === '--external') {
        flags.external = true;
    } else if (args[i] === '--help') {
        flags.help = true;
    }
}

if (flags.help) {
    console.log(`
Gate LinkMap Runner (METHOD-LINKMAP-01)

Usage:
  pnpm gate:linkmap                    Run LINK-01 + LINK-03 on docs/docs
  pnpm gate:linkmap:2a                 Run on docs/docs/evaluation only
  pnpm gate:linkmap --emit             Generate audit outputs
  pnpm gate:linkmap:external           Run with external link check (LINK-02)

Flags:
  --scope <path>   Audit scope (default: docs/docs)
  --emit           Generate audit report and link map export
  --external       Run Gate-LINK-02 (external link check)
  --help           Show help
`);
    process.exit(0);
}

console.log('');
console.log('═══════════════════════════════════════════════════════════════');
console.log('  Gate LinkMap Runner (METHOD-LINKMAP-01)');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`  Scope: ${flags.scope}`);
console.log(`  Emit: ${flags.emit}`);
console.log(`  External: ${flags.external}`);
console.log('═══════════════════════════════════════════════════════════════');
console.log('');

let exitCode = 0;
const results = {
    'LINK-01': { status: 'PENDING', details: '' },
    'LINK-02': { status: 'DEFERRED', details: 'Not enabled (use --external)' },
    'LINK-03': { status: 'PENDING', details: '' }
};

// ============================================================================
// Gate-LINK-01: Docs Build
// ============================================================================
console.log('▶ Gate-LINK-01: Docs Build');
try {
    console.log('  Running: pnpm -C docs build');
    execSync('pnpm -C docs build', {
        cwd: ROOT,
        stdio: 'pipe',
        timeout: 120000
    });
} catch (error) {
    console.log('  ⚠️ pnpm failed or not found, trying npm run build');
    try {
        execSync('npm run build', {
            cwd: join(ROOT, 'docs'),
            stdio: 'pipe',
            timeout: 120000
        });
    } catch (npmError) {
        const output = npmError.stdout?.toString() || npmError.stderr?.toString() || '';
        const brokenLinkMatch = output.match(/Broken link on source page/g);
        const brokenCount = brokenLinkMatch?.length || 'unknown';
        results['LINK-01'] = { status: 'FAIL', details: `Build FAILED: ${brokenCount} broken links` };
        console.log(`  ❌ FAIL: ${brokenCount} broken links detected`);
        exitCode = 1;
        throw npmError; // Re-throw to skip the rest of the block if it's a real failure
    }
}
results['LINK-01'] = { status: 'PASS', details: 'Build SUCCESS, 0 broken links' };
console.log('  ✅ PASS: Build SUCCESS');
console.log('');

// ============================================================================
// Gate-LINK-03: Semantic Boundary Scan
// ============================================================================
console.log('▶ Gate-LINK-03: Semantic Boundary Scan');

const patternsFile = join(ROOT, 'governance/rules/LINKMAP_FORBIDDEN_PATTERNS.txt');
let patterns = [];

if (existsSync(patternsFile)) {
    const content = readFileSync(patternsFile, 'utf-8');
    patterns = content
        .split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(p => p.trim());
}

if (patterns.length === 0) {
    console.log('  ⚠️ No patterns found in LINKMAP_FORBIDDEN_PATTERNS.txt');
    results['LINK-03'] = { status: 'SKIP', details: 'No patterns configured' };
} else {
    console.log(`  Patterns loaded: ${patterns.length}`);

    // Build grep pattern
    const grepPattern = patterns.join('|');
    const scopePath = join(ROOT, flags.scope);

    // Run grep to find all matches
    const grepCmd = `grep -riE "${grepPattern}" "${scopePath}" --include="*.md" --include="*.mdx" 2>/dev/null || true`;

    try {
        const output = execSync(grepCmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
        const lines = output.trim().split('\n').filter(l => l);

        // Load false positive patterns from external governance files
        const falsePositiveFile = join(ROOT, 'governance/rules/LINKMAP_FALSE_POSITIVE_CONTAINS.txt');
        const technicalFieldFile = join(ROOT, 'governance/rules/LINKMAP_TECHNICAL_FIELD_ALLOWLIST.txt');

        const loadPatterns = (filePath) => {
            if (!existsSync(filePath)) return [];
            return readFileSync(filePath, 'utf-8')
                .split('\n')
                .filter(line => line.trim() && !line.startsWith('#'))
                .map(p => p.trim());
        };

        const negatedPatterns = loadPatterns(falsePositiveFile);
        const technicalFieldPatterns = loadPatterns(technicalFieldFile);

        console.log(`  False positive patterns: ${negatedPatterns.length}`);
        console.log(`  Technical field patterns: ${technicalFieldPatterns.length}`);

        // First filter: remove lines containing negated patterns
        const violations = lines.filter(line => {
            return !negatedPatterns.some(np => line.toLowerCase().includes(np.toLowerCase()));
        });

        // Second filter: remove technical field names
        const realViolations = violations.filter(line => {
            return !technicalFieldPatterns.some(tf => line.toLowerCase().includes(tf.toLowerCase()));
        });

        console.log(`  Pattern hits (total): ${lines.length}`);
        console.log(`  Negated boundary language: ${lines.length - realViolations.length}`);
        console.log(`  Violations: ${realViolations.length}`);

        if (realViolations.length > 0) {
            results['LINK-03'] = {
                status: 'FAIL',
                details: `${realViolations.length} violations found`,
                violations: realViolations.slice(0, 10)
            };
            console.log('  ❌ FAIL: Violations detected');
            realViolations.slice(0, 5).forEach(v => console.log(`    - ${v.slice(0, 100)}...`));
            exitCode = 1;
        } else {
            results['LINK-03'] = {
                status: 'PASS',
                details: `${lines.length} pattern hits (all negated boundary language), 0 violations`
            };
            console.log('  ✅ PASS: 0 violations');
        }
    } catch (error) {
        results['LINK-03'] = { status: 'ERROR', details: error.message };
        console.log(`  ❌ ERROR: ${error.message}`);
        exitCode = 1;
    }
}
console.log('');

// ============================================================================
// Gate-LINK-02: External Link Check (Optional)
// ============================================================================
if (flags.external) {
    console.log('▶ Gate-LINK-02: External Link Check');
    console.log('  ⚠️ Not implemented yet. Use lychee or markdown-link-check manually.');
    results['LINK-02'] = { status: 'SKIP', details: 'Not implemented (use external tool)' };
    console.log('');
}

// ============================================================================
// Summary
// ============================================================================
console.log('═══════════════════════════════════════════════════════════════');
console.log('  SUMMARY');
console.log('═══════════════════════════════════════════════════════════════');
console.log(`  Gate-LINK-01: ${results['LINK-01'].status} — ${results['LINK-01'].details}`);
console.log(`  Gate-LINK-02: ${results['LINK-02'].status} — ${results['LINK-02'].details}`);
console.log(`  Gate-LINK-03: ${results['LINK-03'].status} — ${results['LINK-03'].details}`);
console.log('═══════════════════════════════════════════════════════════════');

if (exitCode === 0) {
    console.log('  ✅ ALL GATES PASS');
} else {
    console.log('  ❌ GATE FAILED');
}
console.log('');

// ============================================================================
// Emit outputs (optional)
// ============================================================================
if (flags.emit) {
    console.log('▶ Emitting audit outputs...');

    const date = new Date().toISOString().slice(0, 10);
    const phase = flags.scope.includes('evaluation') ? '2A' : '2B';

    const auditReport = `# AUDIT-LINKMAP-${date}-AUTO

**Generated by:** gate-linkmap.mjs
**Date:** ${date}
**Scope:** ${flags.scope}
**Phase:** ${phase}

## Gate Results

| Gate | Status | Details |
|:---|:---:|:---|
| LINK-01 | ${results['LINK-01'].status} | ${results['LINK-01'].details} |
| LINK-02 | ${results['LINK-02'].status} | ${results['LINK-02'].details} |
| LINK-03 | ${results['LINK-03'].status} | ${results['LINK-03'].details} |

## Overall: ${exitCode === 0 ? '✅ PASS' : '❌ FAIL'}
`;

    const auditPath = join(ROOT, `governance/audits/AUDIT-LINKMAP-${date}-AUTO.md`);
    writeFileSync(auditPath, auditReport);
    console.log(`  Written: ${auditPath}`);
}

process.exit(exitCode);
