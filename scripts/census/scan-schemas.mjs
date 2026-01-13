#!/usr/bin/env node
/**
 * MPLP Census: Scan Schemas
 * Scans all .schema.json files and outputs sorted inventory
 */

import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative } from 'path';

const REPO_ROOT = process.cwd();
const SCHEMAS_DIR = join(REPO_ROOT, 'schemas');

function scanDirectory(dir, results = []) {
    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, results);
        } else if (entry.endsWith('.schema.json')) {
            const relativePath = relative(REPO_ROOT, fullPath);
            try {
                const content = JSON.parse(readFileSync(fullPath, 'utf-8'));
                results.push({
                    path: relativePath,
                    title: content.title || null,
                    id: content.$id || null,
                    type: content.type || null,
                    required_fields: content.required || [],
                    properties_count: content.properties ? Object.keys(content.properties).length : 0
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
const results = scanDirectory(SCHEMAS_DIR);

// Sort by path for reproducibility
const sorted = results.sort((a, b) => a.path.localeCompare(b.path));

const output = {
    generated_at: new Date().toISOString(),
    scan_root: 'schemas/',
    total_count: sorted.length,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
