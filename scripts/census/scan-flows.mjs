#!/usr/bin/env node
/**
 * MPLP Census: Scan Golden Flows
 * Scans all golden flow directories with input/expected/harness status
 */

import { readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const REPO_ROOT = process.cwd();
const FLOWS_DIR = join(REPO_ROOT, 'tests/golden/flows');

function scanFlows() {
    if (!existsSync(FLOWS_DIR)) {
        return { error: 'Golden flows directory not found', path: 'tests/golden/flows' };
    }

    const entries = readdirSync(FLOWS_DIR);
    const results = [];

    for (const entry of entries) {
        const flowPath = join(FLOWS_DIR, entry);
        const stat = statSync(flowPath);

        if (!stat.isDirectory() || entry.startsWith('.')) continue;

        const relativePath = relative(REPO_ROOT, flowPath);
        const hasInput = existsSync(join(flowPath, 'input'));
        const hasExpected = existsSync(join(flowPath, 'expected'));
        const hasInvariants = existsSync(join(flowPath, 'invariants.yaml'));
        const hasReadme = existsSync(join(flowPath, 'README.md'));

        // Determine strength based on assets
        let strength = 'S0';
        if (hasInput && hasExpected) {
            strength = hasInvariants ? 'S2' : 'S1';
        }

        results.push({
            path: relativePath,
            flow_id: entry,
            has_input: hasInput,
            has_expected: hasExpected,
            has_invariants: hasInvariants,
            has_readme: hasReadme,
            inferred_strength: strength
        });
    }

    return results;
}

// Main
const results = scanFlows();

// Sort by path for reproducibility
const sorted = Array.isArray(results)
    ? results.sort((a, b) => a.path.localeCompare(b.path))
    : results;

const output = {
    generated_at: new Date().toISOString(),
    scan_root: 'tests/golden/flows/',
    total_count: Array.isArray(sorted) ? sorted.length : 0,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
