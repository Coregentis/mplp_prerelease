#!/usr/bin/env node
/**
 * no-compliance-term.mjs
 * Terminology Governance Gate for Website Governance System
 * 
 * Purpose: Scan for "Compliance/compliance" terms in protocol adherence context
 * and enforce waiver requirements for allowed exceptions.
 * 
 * Usage:
 *   npm run verify:web-term:warn   # Shadow mode (exit 0, report only)
 *   npm run verify:web-term        # Strict mode (exit 1 on actionable hits)
 * 
 * Environment Variables:
 *   WEB_TERM_STRICT=1        Enable strict mode (blocking)
 *   EVIDENCE_DIR=path        Output evidence files to specified directory
 *   RUN_ID=WEB-TERM-RUN-*    Run ID for scoped evidence naming
 *   VERBOSE=1                Show waived hits in console output
 * 
 * Waiver Format:
 *   {/* TERM-WAIVER: REASON_CODE - description *//*}
* 
* Valid REASON_CODES (per TERM_BASELINE.md):
*   - EXTERNAL_STANDARD_PROPER_NOUN
*   - ENTERPRISE_DEPT_CONTEXT
*   - HISTORICAL_ROUTE_REFERENCE
*   - NEGATION_CONTEXT
*   - EXTERNAL_URL_FILENAME
*   - ARCHITECTURAL_COMPARISON
*/

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const STRICT = process.env.WEB_TERM_STRICT === '1';
const SCAN_DIRS = ['app', 'components', 'lib'];
const PATTERN = /[Cc]ompliance/g;
// Match TERM-WAIVER: followed by either REASON_CODE or descriptive text
const WAIVER_PATTERN = /TERM-WAIVER:\s*(.+?)(?:\s*[-*\/]|$)/;
const EVIDENCE_DIR = process.env.EVIDENCE_DIR || null;
const RUN_ID = process.env.RUN_ID || `WEB-TERM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

console.log('\n[WEB-TERM] Running terminology governance gate...');
console.log(`Mode: ${STRICT ? 'STRICT (blocking)' : 'SHADOW (warn only)'}`);
console.log(`Run ID: ${RUN_ID}\n`);

// Mapping from descriptive text to canonical REASON_CODE
const REASON_MAPPINGS = {
    'External standard': 'EXTERNAL_STANDARD_PROPER_NOUN',
    'External standard context': 'EXTERNAL_STANDARD_PROPER_NOUN',
    'ISO/IEC 42001': 'EXTERNAL_STANDARD_PROPER_NOUN',
    'Enterprise context': 'ENTERPRISE_DEPT_CONTEXT',
    'Historical reference': 'HISTORICAL_ROUTE_REFERENCE',
    'Historical': 'HISTORICAL_ROUTE_REFERENCE',
    'Negation context': 'NEGATION_CONTEXT',
    'Negation': 'NEGATION_CONTEXT',
    'External URL': 'EXTERNAL_URL_FILENAME',
    'External docs URL': 'EXTERNAL_URL_FILENAME',
    'Architectural comparison': 'ARCHITECTURAL_COMPARISON',
    'Technical reference': 'ARCHITECTURAL_COMPARISON',
    'Usage boundary': 'NEGATION_CONTEXT',
    'Legal disclaimer': 'NEGATION_CONTEXT',
    'Responsibility statement': 'NEGATION_CONTEXT',
    'Jurisdictional neutrality': 'NEGATION_CONTEXT',
    'Semantic distinction': 'NEGATION_CONTEXT',
    'Legacy section title': 'HISTORICAL_ROUTE_REFERENCE'
};

/**
 * Extract waiver reason code from waiver marker
 */
function extractWaiverReason(line) {
    const match = line.match(WAIVER_PATTERN);
    if (!match || !match[1]) return 'UNSPECIFIED';

    const rawReason = match[1].trim();

    // Check if it's already a valid REASON_CODE (all caps with underscores)
    if (/^[A-Z_]+$/.test(rawReason)) {
        return rawReason;
    }

    // Try to map descriptive text to canonical code
    for (const [pattern, code] of Object.entries(REASON_MAPPINGS)) {
        if (rawReason.toLowerCase().includes(pattern.toLowerCase())) {
            return code;
        }
    }

    return 'UNSPECIFIED';
}


/**
 * Read file and find all compliance occurrences with line numbers
 */
function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const hits = [];

    lines.forEach((line, index) => {
        const lineNumber = index + 1;
        const matches = line.match(PATTERN);
        if (matches) {
            // Check for waiver on same line or previous line
            const prevLine = index > 0 ? lines[index - 1] : '';
            const hasWaiverOnLine = WAIVER_PATTERN.test(line);
            const hasWaiverOnPrev = WAIVER_PATTERN.test(prevLine);
            const hasWaiver = hasWaiverOnLine || hasWaiverOnPrev;

            const waiverReason = hasWaiver
                ? extractWaiverReason(hasWaiverOnLine ? line : prevLine)
                : null;

            hits.push({
                file: filePath,
                line: lineNumber,
                content: line.trim().substring(0, 100),
                waived: hasWaiver,
                waiverLine: hasWaiver ? (hasWaiverOnLine ? lineNumber : lineNumber - 1) : null,
                waiverReason: waiverReason
            });
        }
    });

    return hits;
}

/**
 * Recursively find all .tsx files in directories
 */
function findTsxFiles(dirs) {
    const files = [];

    for (const dir of dirs) {
        if (!fs.existsSync(dir)) continue;

        const result = execSync(`find ${dir} -name "*.tsx" -type f`, { encoding: 'utf-8' });
        files.push(...result.trim().split('\n').filter(Boolean));
    }

    return files;
}

/**
 * Generate waiver reason statistics
 */
function getWaiverStats(waivedHits) {
    const stats = {};
    waivedHits.forEach(hit => {
        const reason = hit.waiverReason || 'UNSPECIFIED';
        stats[reason] = (stats[reason] || 0) + 1;
    });
    return stats;
}

// Main execution
const scanTimestamp = new Date().toISOString();
const files = findTsxFiles(SCAN_DIRS);
console.log(`Scanning ${files.length} .tsx files in: ${SCAN_DIRS.join(', ')}\n`);

let allHits = [];
for (const file of files) {
    const hits = scanFile(file);
    allHits.push(...hits);
}

const waivedHits = allHits.filter(h => h.waived);
const actionableHits = allHits.filter(h => !h.waived);
const waiverStats = getWaiverStats(waivedHits);

// Output summary
console.log('─'.repeat(60));
console.log('TERMINOLOGY SCAN RESULTS');
console.log('─'.repeat(60));
console.log(`Total hits:       ${allHits.length}`);
console.log(`Waived hits:      ${waivedHits.length}`);
console.log(`Actionable hits:  ${actionableHits.length}`);
console.log('─'.repeat(60));

// Show waiver breakdown
if (Object.keys(waiverStats).length > 0) {
    console.log('\nWaiver Breakdown:');
    Object.entries(waiverStats)
        .sort((a, b) => b[1] - a[1])
        .forEach(([reason, count]) => {
            console.log(`  ${reason}: ${count}`);
        });
}

// Report actionable hits
if (actionableHits.length > 0) {
    console.log('\n⚠️  ACTIONABLE HITS (require waiver or replacement):\n');
    actionableHits.forEach(hit => {
        console.log(`  ${hit.file}:${hit.line}`);
        console.log(`    ${hit.content}`);
        console.log('');
    });
}

// Report waived hits (for audit transparency)
if (waivedHits.length > 0 && process.env.VERBOSE === '1') {
    console.log('\n✓ WAIVED HITS (documented exceptions):\n');
    waivedHits.forEach(hit => {
        console.log(`  ${hit.file}:${hit.line} [${hit.waiverReason}]`);
    });
}

// Write evidence files if directory specified
if (EVIDENCE_DIR) {
    if (!fs.existsSync(EVIDENCE_DIR)) {
        fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
    }

    // Run-scoped file names
    const jsonPath = path.join(EVIDENCE_DIR, `${RUN_ID}.report.json`);
    const rawPath = path.join(EVIDENCE_DIR, `${RUN_ID}.raw.txt`);
    const actionablePath = path.join(EVIDENCE_DIR, `${RUN_ID}.actionable.txt`);

    // JSON evidence (machine-readable)
    const jsonEvidence = {
        runId: RUN_ID,
        timestamp: scanTimestamp,
        mode: STRICT ? 'strict' : 'shadow',
        summary: {
            totalHits: allHits.length,
            waivedHits: waivedHits.length,
            actionableHits: actionableHits.length,
            filesScanned: files.length,
            dirsScanned: SCAN_DIRS
        },
        waiverBreakdown: waiverStats,
        actionableItems: actionableHits.map(h => ({
            file: h.file,
            line: h.line,
            content: h.content
        })),
        waivedItems: waivedHits.map(h => ({
            file: h.file,
            line: h.line,
            reason: h.waiverReason
        })),
        verdict: actionableHits.length === 0 ? 'PASS' : (STRICT ? 'FAIL' : 'WARN')
    };

    fs.writeFileSync(jsonPath, JSON.stringify(jsonEvidence, null, 2));

    // Raw text evidence
    fs.writeFileSync(rawPath, allHits.map(h =>
        `${h.file}:${h.line}:${h.waived ? `[WAIVED:${h.waiverReason}]` : '[ACTIONABLE]'}:${h.content}`
    ).join('\n'));

    // Actionable text evidence
    fs.writeFileSync(actionablePath, actionableHits.map(h =>
        `${h.file}:${h.line}:${h.content}`
    ).join('\n'));

    console.log(`\nEvidence written to:`);
    console.log(`  ${jsonPath}`);
    console.log(`  ${rawPath}`);
    console.log(`  ${actionablePath}`);
}

// Exit code
if (actionableHits.length > 0) {
    if (STRICT) {
        console.log('\n❌ FAIL: Actionable terminology hits found. Add TERM-WAIVER markers or replace terms.');
        process.exit(1);
    } else {
        console.log('\n⚠️  WARN: Actionable terminology hits found (shadow mode - not blocking).');
        process.exit(0);
    }
} else {
    console.log('\n✅ PASS: All terminology hits are waived or none found.');
    process.exit(0);
}
