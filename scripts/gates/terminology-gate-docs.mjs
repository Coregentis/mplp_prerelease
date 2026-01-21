#!/usr/bin/env node
/**
 * GATE-TERM-DOCS — Terminology Gate for Docs
 * 
 * Checks docs/docs/ for forbidden terminology:
 * - GF-0[1-9] (must use FLOW-xx)
 * 
 * Exit 0 = PASS, Exit 1 = FAIL
 */

import { execSync } from 'child_process';

const DOCS_PATH = 'docs/docs/';

const FORBIDDEN_PATTERNS = [
    { pattern: 'GF-0[1-9]', description: 'GF-xx (use FLOW-xx instead)' }
];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('GATE-TERM-DOCS: Docs Terminology Gate');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

let violations = 0;

for (const { pattern, description } of FORBIDDEN_PATTERNS) {
    try {
        const result = execSync(
            `grep -rn "${pattern}" ${DOCS_PATH} --include="*.md" --include="*.mdx" 2>/dev/null || true`,
            { encoding: 'utf-8' }
        ).trim();

        if (result) {
            console.log(`\n❌ VIOLATION: ${description}`);
            console.log(result);
            violations++;
        } else {
            console.log(`✅ No ${description} found`);
        }
    } catch (e) {
        // grep returns exit 1 when no match, which is OK
    }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (violations > 0) {
    console.log(`❌ GATE FAILED: ${violations} terminology violation(s)`);
    process.exit(1);
} else {
    console.log('✅ GATE PASSED: Docs terminology compliant');
    process.exit(0);
}
