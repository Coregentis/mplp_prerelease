#!/usr/bin/env node
/**
 * MPLP Claim Extraction Script
 * Extracts claim-like sentences from Website/Docs/Lab sources
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, relative, extname } from 'path';

const REPO_ROOT = process.cwd();

// Patterns that indicate claim-like content
const CLAIM_PATTERNS = [
    /provides?\s+\w+/gi,
    /supports?\s+\w+/gi,
    /enables?\s+\w+/gi,
    /validates?\s+\w+/gi,
    /verif(y|ies)\s+\w+/gi,
    /POSIX/gi,
    /protocol\s+\w+/gi,
    /standard(ized)?/gi
];

function scanFile(filePath, results) {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, idx) => {
        for (const pattern of CLAIM_PATTERNS) {
            if (pattern.test(line)) {
                results.push({
                    file: relative(REPO_ROOT, filePath),
                    line: idx + 1,
                    content: line.trim().substring(0, 200),
                    pattern: pattern.source
                });
                break;
            }
        }
    });
}

function scanDirectory(dir, extensions, results = []) {
    if (!existsSync(dir)) return results;

    const entries = readdirSync(dir);

    for (const entry of entries) {
        if (entry.startsWith('.') || entry === 'node_modules') continue;

        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, extensions, results);
        } else {
            const ext = extname(entry);
            if (extensions.includes(ext)) {
                scanFile(fullPath, results);
            }
        }
    }

    return results;
}

// Parse args
const args = process.argv.slice(2);
const sourceArg = args.find(a => a.startsWith('--source='));
const source = sourceArg ? sourceArg.split('=')[1] : 'all';

let results = [];

if (source === 'website' || source === 'all') {
    const websiteDir = join(REPO_ROOT, 'MPLP_website');
    if (existsSync(websiteDir)) {
        scanDirectory(join(websiteDir, 'app'), ['.tsx', '.ts'], results);
        scanDirectory(join(websiteDir, 'content'), ['.md', '.mdx'], results);
    }
}

if (source === 'docs' || source === 'all') {
    const docsDir = join(REPO_ROOT, 'docs/docs');
    if (existsSync(docsDir)) {
        scanDirectory(docsDir, ['.md', '.mdx'], results);
    }
}

if (source === 'lab' || source === 'all') {
    const labDir = join(REPO_ROOT, 'Validation_Lab/app');
    if (existsSync(labDir)) {
        scanDirectory(labDir, ['.tsx', '.ts'], results);
    }
}

// Sort by file for reproducibility
const sorted = results.sort((a, b) => a.file.localeCompare(b.file));

const output = {
    generated_at: new Date().toISOString(),
    source: source,
    total_candidates: sorted.length,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
