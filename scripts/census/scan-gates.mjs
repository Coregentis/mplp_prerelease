#!/usr/bin/env node
/**
 * MPLP Census: Scan Gates
 * Scans CI gate scripts and workflows
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'fs';
import { join, relative } from 'path';

const REPO_ROOT = process.cwd();
const GATES_SCRIPTS_DIR = join(REPO_ROOT, 'scripts/gates');
const WORKFLOWS_DIR = join(REPO_ROOT, '.github/workflows');

function scanGateScripts() {
    const results = [];

    if (existsSync(GATES_SCRIPTS_DIR)) {
        const entries = readdirSync(GATES_SCRIPTS_DIR);

        for (const entry of entries) {
            if (!entry.endsWith('.mjs') && !entry.endsWith('.js') && !entry.endsWith('.ts')) continue;

            const fullPath = join(GATES_SCRIPTS_DIR, entry);
            const relativePath = relative(REPO_ROOT, fullPath);

            // Extract gate name from filename
            const gateName = entry.replace(/\.(mjs|js|ts)$/, '');

            results.push({
                path: relativePath,
                gate_name: gateName,
                type: 'script'
            });
        }
    }

    return results;
}

function scanWorkflows() {
    const results = [];

    if (existsSync(WORKFLOWS_DIR)) {
        const entries = readdirSync(WORKFLOWS_DIR);

        for (const entry of entries) {
            if (!entry.endsWith('.yml') && !entry.endsWith('.yaml')) continue;

            const fullPath = join(WORKFLOWS_DIR, entry);
            const relativePath = relative(REPO_ROOT, fullPath);

            try {
                const content = readFileSync(fullPath, 'utf-8');
                // Simple check for gate-related content
                const hasGates = content.includes('gate') || content.includes('Gate');

                results.push({
                    path: relativePath,
                    workflow_name: entry.replace(/\.(yml|yaml)$/, ''),
                    type: 'workflow',
                    contains_gates: hasGates
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
const scripts = scanGateScripts();
const workflows = scanWorkflows();
const allItems = [...scripts, ...workflows];

// Sort by path for reproducibility
const sorted = allItems.sort((a, b) => a.path.localeCompare(b.path));

const output = {
    generated_at: new Date().toISOString(),
    scan_roots: ['scripts/gates/', '.github/workflows/'],
    gate_scripts_count: scripts.length,
    workflows_count: workflows.length,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
