#!/usr/bin/env node
/**
 * MPLP Census: Scan Invariants
 * Scans all invariants.yaml files and counts rules
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, relative } from 'path';

const REPO_ROOT = process.cwd();
const TESTS_DIR = join(REPO_ROOT, 'tests');

function scanDirectory(dir, results = []) {
    if (!existsSync(dir)) return results;

    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, results);
        } else if (entry === 'invariants.yaml') {
            const relativePath = relative(REPO_ROOT, fullPath);
            try {
                const content = readFileSync(fullPath, 'utf-8');
                // Simple regex-based parsing for invariants
                const idMatches = content.match(/^\s*-\s*id:\s*(\S+)/gm) || [];
                const scopeMatches = content.match(/^\s*scope:\s*(\S+)/gm) || [];

                const invariantIds = idMatches.map(m => m.replace(/^\s*-\s*id:\s*/, '').trim());
                const scopes = [...new Set(scopeMatches.map(m => m.replace(/^\s*scope:\s*/, '').trim()))];

                results.push({
                    path: relativePath,
                    invariant_count: invariantIds.length,
                    invariant_ids: invariantIds,
                    scopes: scopes
                });
            } catch (e) {
                results.push({
                    path: relativePath,
                    error: e.message
                });
            }
        }
    }

    return results;
}

// Main
const results = scanDirectory(TESTS_DIR);

// Sort by path for reproducibility
const sorted = results.sort((a, b) => a.path.localeCompare(b.path));

const output = {
    generated_at: new Date().toISOString(),
    scan_root: 'tests/',
    total_count: sorted.length,
    total_invariants: sorted.reduce((sum, item) => sum + (item.invariant_count || 0), 0),
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
