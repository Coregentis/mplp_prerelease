#!/usr/bin/env node
/**
 * MPLP Census: Scan Rulesets
 * Scans ruleset directories for rule definitions
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, relative } from 'path';

const REPO_ROOT = process.cwd();
// Check both possible locations
const RULESETS_DIRS = [
    join(REPO_ROOT, 'Validation_Lab/data/rulesets'),
    join(REPO_ROOT, 'data/rulesets')
];

function scanRulesets() {
    const results = [];

    for (const RULESETS_DIR of RULESETS_DIRS) {
        if (!existsSync(RULESETS_DIR)) continue;

        const entries = readdirSync(RULESETS_DIR);

        for (const entry of entries) {
            const rulesetPath = join(RULESETS_DIR, entry);
            const stat = statSync(rulesetPath);

            if (!stat.isDirectory() || entry.startsWith('.')) continue;

            const relativePath = relative(REPO_ROOT, rulesetPath);
            const files = readdirSync(rulesetPath);

            results.push({
                path: relativePath,
                ruleset_id: entry,
                file_count: files.length,
                files: files.filter(f => !f.startsWith('.')).sort()
            });
        }
    }

    return results;
}

// Main
const results = scanRulesets();

// Sort by path for reproducibility
const sorted = results.sort((a, b) => a.path.localeCompare(b.path));

const output = {
    generated_at: new Date().toISOString(),
    scan_roots: RULESETS_DIRS.map(d => relative(REPO_ROOT, d)),
    total_count: sorted.length,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
