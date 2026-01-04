#!/usr/bin/env node
/**
 * Fix Duplicate Frozen Headers v2
 * Removes duplicate copyright headers from source files.
 */
import fs from "fs";
import path from "path";

const SOURCE_HEADER = `/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */`;

const SINGLE_HEADER_REGEX = /\/\*\*\s*\n\s*\*\s*©\s*2025 Bangshi Beijing Network Technology Limited Company[\s\S]*?It is NOT part of the frozen protocol specification\.\s*\n\s*\*\/\s*\n?/g;

function fixFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Count headers
    const matches = content.match(SINGLE_HEADER_REGEX);
    if (matches && matches.length > 1) {
        // Remove all headers first
        content = content.replace(SINGLE_HEADER_REGEX, '');
        // Add single header back
        content = SOURCE_HEADER + '\n' + content.trimStart();
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', path.basename(filePath), `(removed ${matches.length - 1} duplicates)`);
        return 1;
    }
    return 0;
}

function walk(dir) {
    if (dir.includes('node_modules') || dir.includes('.git') || dir.includes('dist') || dir.includes('build')) return 0;

    let fixed = 0;
    try {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
            const full = path.join(dir, item.name);
            if (item.isDirectory()) {
                fixed += walk(full);
            } else if (item.name.endsWith('.ts') || item.name.endsWith('.js')) {
                fixed += fixFile(full);
            }
        }
    } catch (err) {
        // Ignore permission errors
    }
    return fixed;
}

console.log("Fixing duplicate headers in packages/sources...");
const fixed = walk(path.join(process.cwd(), "packages", "sources"));
console.log(`Done. Fixed ${fixed} files.`);
