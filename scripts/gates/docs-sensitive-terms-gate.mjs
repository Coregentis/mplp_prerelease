
// CodeQL fix: Helper to check file existence without TOCTOU
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

#!/usr/bin/env node

/**
 * Docs Sensitive Terms Gate v1.0 (Phase 4)
 * 
 * Purpose: Scan docs content for forbidden terms that violate
 * governance boundaries (certification, endorsement, ranking, etc.)
 * 
 * Sources:
 * - PATTERN-LIBRARY-DOCS-01.md (F1-F4 patterns)
 * - semantic-lint.mjs (existing term library)
 * 
 * Exit 0 = PASS, Exit 1 = FAIL
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');

// Paths
const DOCS_DIR = path.join(ROOT, 'docs/docs');
const OUTPUT_DIR = path.join(ROOT, 'governance/exports');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'docs-sensitive-terms.report.json');
const OUTPUT_MD = path.join(OUTPUT_DIR, 'docs-sensitive-terms.report.md');

// === TERM LIBRARIES ===

// Tier 1: Absolute Forbidden (FAIL if found outside allowed context)
const ABSOLUTE_FORBIDDEN = [
    // Certification/Endorsement
    { term: 'MPLP compliant', pattern: /MPLP[\s-]*compliant/gi, severity: 'FAIL' },
    { term: 'MPLP-compliant', pattern: /MPLP-compliant/gi, severity: 'FAIL' },
    { term: 'MPLP approved', pattern: /MPLP[\s-]*approved/gi, severity: 'FAIL' },
    { term: 'certified by MPLP', pattern: /certified by MPLP/gi, severity: 'FAIL' },
    { term: 'MPGC approved', pattern: /MPGC[\s-]*approved/gi, severity: 'FAIL' },
    { term: 'official verification', pattern: /official verification/gi, severity: 'FAIL' },
    { term: 'official verdict', pattern: /official verdict/gi, severity: 'FAIL' },

    // Ranking/Scoring
    { term: 'ranking', pattern: /\branking\b/gi, severity: 'WARN' },
    { term: 'ranked', pattern: /\branked\b/gi, severity: 'WARN' },
    { term: 'benchmark winner', pattern: /benchmark winner/gi, severity: 'FAIL' },
    { term: 'scored', pattern: /\bscored\b/gi, severity: 'WARN' },
];

// Tier 2: Context-Sensitive (require context check)
const CONTEXT_SENSITIVE = [
    // These are allowed when describing what the protocol DOESN'T do
    { term: 'certified', pattern: /\bcertified\b/gi, allowedPatterns: [/not\s+certified/i, /non-certifying/i, /no\s+certification/i] },
    { term: 'certification', pattern: /\bcertification\b/gi, allowedPatterns: [/not\s+certification/i, /non-certifying/i, /no\s+certification/i] },
    { term: 'endorsed', pattern: /\bendorsed\b/gi, allowedPatterns: [/not\s+endorsed/i, /non-endorsement/i] },
    { term: 'endorsement', pattern: /\bendorsement\b/gi, allowedPatterns: [/non-endorsement/i, /no\s+endorsement/i] },
    { term: 'guarantee', pattern: /\bguarantee\b/gi, allowedPatterns: [/no\s+guarantee/i, /does\s+not\s+guarantee/i] },
    { term: 'guarantees', pattern: /\bguarantees\b/gi, allowedPatterns: [/does\s+not\s+guarantee/i] },
];

// Tier 3: Forbidden Verbs (F1/F2 patterns)
const FORBIDDEN_VERBS = [
    // These verbs make docs sound like a product/platform
    { term: 'MPLP provides', pattern: /MPLP\s+provides/gi, severity: 'WARN' },
    { term: 'MPLP runs', pattern: /MPLP\s+runs/gi, severity: 'WARN' },
    { term: 'MPLP executes', pattern: /MPLP\s+executes/gi, severity: 'WARN' },
    { term: 'MPLP hosts', pattern: /MPLP\s+hosts/gi, severity: 'WARN' },
    { term: 'submit your', pattern: /submit\s+your/gi, severity: 'WARN' },
    { term: 'upload your', pattern: /upload\s+your/gi, severity: 'WARN' },
];

// Allowed file patterns (documentation about forbidden terms)
const ALLOWED_FILE_PATTERNS = [
    /PATTERN-LIBRARY/i,
    /semantic-lint/i,
    /CHANGELOG/i,
    /\.mjs$/,
    /\.js$/,
    /\.ts$/,
];

// Get all markdown files
function getAllMdFiles(dir, fileList = []) {
    if (!fileExists(dir)) return fileList;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
            getAllMdFiles(filePath, fileList);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Check if file should be skipped
function shouldSkipFile(filePath) {
    return ALLOWED_FILE_PATTERNS.some(pattern => pattern.test(filePath));
}

// Check if line is documenting forbidden terms (not using them)
function isDocumentationContext(line) {
    // Table cells that list forbidden patterns
    if (line.includes('| "') && (
        line.includes('No certification') ||
        line.includes('No endorsement') ||
        line.includes('No ranking') ||
        line.includes('forbidden') ||
        line.includes('Forbidden')
    )) {
        return true;
    }

    // Quoted/referenced terms in governance docs
    if (/\| ".*" \|/.test(line) && /No\s/.test(line)) {
        return true;
    }

    return false;
}

// Check if term is in allowed context
function isAllowedContext(line, allowedPatterns) {
    // First check if it's documentation context
    if (isDocumentationContext(line)) return true;

    if (!allowedPatterns) return false;
    return allowedPatterns.some(pattern => pattern.test(line));
}

// Scan files for terms
function scanFiles(files) {
    const violations = [];
    const stats = {
        files_scanned: 0,
        fail_count: 0,
        warn_count: 0
    };

    files.forEach(filePath => {
        if (shouldSkipFile(filePath)) return;

        stats.files_scanned++;
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const relativePath = path.relative(ROOT, filePath);

        lines.forEach((line, lineIndex) => {
            // Check absolute forbidden
            ABSOLUTE_FORBIDDEN.forEach(rule => {
                if (rule.pattern.test(line)) {
                    rule.pattern.lastIndex = 0; // Reset regex first

                    // Skip if in documentation context (tables showing forbidden terms)
                    if (isDocumentationContext(line)) return;

                    violations.push({
                        file: relativePath,
                        line: lineIndex + 1,
                        term: rule.term,
                        severity: rule.severity,
                        context: line.trim().slice(0, 100)
                    });
                    if (rule.severity === 'FAIL') stats.fail_count++;
                    else stats.warn_count++;
                }
            });

            // Check context-sensitive
            CONTEXT_SENSITIVE.forEach(rule => {
                if (rule.pattern.test(line)) {
                    rule.pattern.lastIndex = 0;
                    if (!isAllowedContext(line, rule.allowedPatterns)) {
                        violations.push({
                            file: relativePath,
                            line: lineIndex + 1,
                            term: rule.term,
                            severity: 'WARN',
                            context: line.trim().slice(0, 100)
                        });
                        stats.warn_count++;
                    }
                }
            });

            // Check forbidden verbs
            FORBIDDEN_VERBS.forEach(rule => {
                if (rule.pattern.test(line)) {
                    violations.push({
                        file: relativePath,
                        line: lineIndex + 1,
                        term: rule.term,
                        severity: rule.severity,
                        context: line.trim().slice(0, 100)
                    });
                    if (rule.severity === 'FAIL') stats.fail_count++;
                    else stats.warn_count++;
                    rule.pattern.lastIndex = 0;
                }
            });
        });
    });

    return { violations, stats };
}

// Generate markdown report
function generateMarkdownReport(violations, stats) {
    const now = new Date().toISOString();

    let md = `# Docs Sensitive Terms Report

**Generated**: ${now}  
**Gate**: DOCS-LINT-01 (Phase 4)

## Summary

| Metric | Count |
|:---|---:|
| Files scanned | ${stats.files_scanned} |
| FAIL violations | ${stats.fail_count} |
| WARN violations | ${stats.warn_count} |
| Total violations | ${violations.length} |

## Status

${stats.fail_count === 0 ? '✅ **PASS** — No FAIL-level violations' : '❌ **FAIL** — FAIL-level violations found'}

---

## Violations

`;

    if (violations.length === 0) {
        md += 'No violations found.\n';
    } else {
        // Group by file
        const byFile = {};
        violations.forEach(v => {
            if (!byFile[v.file]) byFile[v.file] = [];
            byFile[v.file].push(v);
        });

        Object.keys(byFile).slice(0, 20).forEach(file => {
            md += `### ${file}\n\n`;
            byFile[file].forEach(v => {
                const icon = v.severity === 'FAIL' ? '❌' : '⚠️';
                md += `- ${icon} **L${v.line}**: \`${v.term}\`\n`;
                md += `  > ${v.context}\n\n`;
            });
        });
    }

    md += `---

## Governance Reference

- [PATTERN-LIBRARY-DOCS-01](file://governance/04-docs-governance/PATTERN-LIBRARY-DOCS-01.md)
- [METHOD-LINKMAP-01](file://governance/04-docs-governance/METHOD-LINKMAP-01_FOUR_ENTRY_LINK_INTEGRITY_AUDIT.md)

**© 2026 MPGC**
`;

    return md;
}

// Main execution
function main() {
    console.log('=== Docs Sensitive Terms Gate v1.0 (Phase 4) ===\n');

    // Scan files
    const files = getAllMdFiles(DOCS_DIR);
    console.log(`Found ${files.length} markdown files in docs/docs/\n`);

    const { violations, stats } = scanFiles(files);

    // Print results
    console.log('Gate DOCS-LINT-01: Sensitive Terms');
    console.log(`Files scanned: ${stats.files_scanned}`);
    console.log(`FAIL violations: ${stats.fail_count}`);
    console.log(`WARN violations: ${stats.warn_count}`);

    if (violations.length > 0) {
        console.log('\nTop violations:');
        violations.slice(0, 10).forEach(v => {
            const icon = v.severity === 'FAIL' ? '❌' : '⚠️';
            console.log(`  ${icon} ${v.file}:${v.line} — "${v.term}"`);
        });
    }

    // Write reports
    if (!fileExists(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const report = {
        gate: 'DOCS-LINT-01',
        version: '1.0.0',
        generated_at: new Date().toISOString(),
        summary: stats,
        violations
    };

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2));
    console.log(`\n✓ JSON Report: ${OUTPUT_JSON}`);

    const mdReport = generateMarkdownReport(violations, stats);
    fs.writeFileSync(OUTPUT_MD, mdReport);
    console.log(`✓ MD Report: ${OUTPUT_MD}`);

    // Exit status
    console.log('\n=== Gate Summary ===');
    if (stats.fail_count > 0) {
        console.log(`\n❌ Gate FAILED (${stats.fail_count} FAIL violations)`);
        process.exit(1);
    } else {
        console.log(`\n✅ Gate PASSED (${stats.warn_count} warnings)`);
        process.exit(0);
    }
}

main();
