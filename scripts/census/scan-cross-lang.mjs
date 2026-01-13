#!/usr/bin/env node
/**
 * MPLP Census: Scan Cross-Language Tests
 * Scans cross-language test directory for multi-language coverage
 */

import { readdirSync, statSync, existsSync } from 'fs';
import {
    join, relative
    , extname
} from 'path';

const REPO_ROOT = process.cwd();
const CROSS_LANG_DIR = join(REPO_ROOT, 'tests/cross-language');

const LANG_EXTENSIONS = {
    '.js': 'javascript',
    '.mjs': 'javascript',
    '.ts': 'typescript',
    '.py': 'python',
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml'
};

function scanDirectory(dir, results = []) {
    if (!existsSync(dir)) return results;

    const entries = readdirSync(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') {
            // Scan subdirectory for language coverage
            const subEntries = readdirSync(fullPath);
            const languages = new Set();
            let fileCount = 0;

            for (const subEntry of subEntries) {
                const subPath = join(fullPath, subEntry);
                if (statSync(subPath).isFile()) {
                    const ext = extname(subEntry);
                    if (LANG_EXTENSIONS[ext]) {
                        languages.add(LANG_EXTENSIONS[ext]);
                        fileCount++;
                    }
                }
            }

            results.push({
                path: relative(REPO_ROOT, fullPath),
                test_suite: entry,
                languages: [...languages].sort(),
                file_count: fileCount,
                has_multi_language: languages.size > 1
            });
        }
    }

    return results;
}

// Main
const results = scanDirectory(CROSS_LANG_DIR);

// Sort by path for reproducibility
const sorted = results.sort((a, b) => a.path.localeCompare(b.path));

const output = {
    generated_at: new Date().toISOString(),
    scan_root: 'tests/cross-language/',
    total_count: sorted.length,
    multi_language_count: sorted.filter(r => r.has_multi_language).length,
    items: sorted
};

console.log(JSON.stringify(output, null, 2));
