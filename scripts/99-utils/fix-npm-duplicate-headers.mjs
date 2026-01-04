/**
 * Fix Duplicate Headers Script
 * Removes duplicate copyright headers from TypeScript files in packages/npm
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Pattern to match each complete header block (handles CRLF and LF)
const HEADER_PATTERN = /\/\*\*\r?\n \* © 2025 Bangshi Beijing Network Technology Limited Company\r?\n \* Licensed under the Apache License, Version 2\.0\.\r?\n \*\r?\n \* This file is part of the MPLP reference implementation\.\r?\n \* It is NOT part of the frozen protocol specification\.\r?\n \*\/\r?\n/g;

const CLEAN_HEADER = `/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */
`;

function findTsFiles(dir) {
    const files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.includes('node_modules') && !entry.name.includes('dist')) {
            files.push(...findTsFiles(fullPath));
        } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.d.ts'))) {
            files.push(fullPath);
        }
    }
    return files;
}

function fixDuplicateHeaders(filePath, dryRun = false) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(HEADER_PATTERN);

    if (!matches || matches.length <= 1) {
        return false; // No duplicates
    }

    // Remove all headers and prepend a single clean one
    let newContent = content.replace(HEADER_PATTERN, '');
    newContent = CLEAN_HEADER + newContent.trimStart();

    if (!dryRun) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
    }

    console.log(`Fixed: ${path.relative(rootDir, filePath)} (${matches.length} headers -> 1)`);
    return true;
}

// Main execution
const targetDir = path.join(rootDir, 'packages', 'npm');
const dryRun = process.argv.includes('--dry-run');

if (dryRun) {
    console.log('DRY RUN MODE - No files will be modified\n');
}

console.log(`Scanning ${targetDir} for duplicate headers...\n`);

const tsFiles = findTsFiles(targetDir);
let fixedCount = 0;

for (const file of tsFiles) {
    if (fixDuplicateHeaders(file, dryRun)) {
        fixedCount++;
    }
}

console.log(`\nDone. ${dryRun ? 'Would fix' : 'Fixed'} ${fixedCount} files.`);
