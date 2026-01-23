#!/usr/bin/env node
/**
 * GATE-TERM-DOCS — Terminology Gate for Docs
 * 
 * Checks docs/docs/ for forbidden terminology:
 * - GF-0[1-9] (must use FLOW-xx)
 * 
 * Exit 0 = PASS, Exit 1 = FAIL
 */

import fs from 'fs';
import path from 'path';

const DOCS_PATH = 'docs/docs/';

const FORBIDDEN_PATTERNS = [
    { regex: /GF-0[1-9]/g, description: 'GF-xx (use FLOW-xx instead)' }
];

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('GATE-TERM-DOCS: Docs Terminology Gate');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Recursively find all .md and .mdx files
function findMarkdownFiles(dir) {
    const results = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
                results.push(...findMarkdownFiles(fullPath));
            } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
                results.push(fullPath);
            }
        }
    } catch (e) {
        // Skip directories we can't read
    }
    return results;
}

// Search for pattern matches in files
function searchForPattern(files, regex, description) {
    const violations = [];
    for (const file of files) {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            const lines = content.split('\n');
            lines.forEach((line, index) => {
                // Reset regex lastIndex for each line
                regex.lastIndex = 0;
                if (regex.test(line)) {
                    violations.push({ file, line: index + 1, content: line.trim() });
                }
            });
        } catch (e) {
            // Skip files we can't read
        }
    }
    return violations;
}

let totalViolations = 0;
const files = findMarkdownFiles(DOCS_PATH);

for (const { regex, description } of FORBIDDEN_PATTERNS) {
    const violations = searchForPattern(files, regex, description);

    if (violations.length > 0) {
        console.log(`\n❌ VIOLATION: ${description}`);
        for (const v of violations) {
            console.log(`${v.file}:${v.line}: ${v.content}`);
        }
        totalViolations += violations.length;
    } else {
        console.log(`✅ No ${description} found`);
    }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

if (totalViolations > 0) {
    console.log(`❌ GATE FAILED: ${totalViolations} terminology violation(s)`);
    process.exit(1);
} else {
    console.log('✅ GATE PASSED: Docs terminology compliant');
    process.exit(0);
}
