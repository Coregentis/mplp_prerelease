#!/usr/bin/env node
/**
 * verify-jump-map.mjs
 * Jump Map Governance Gate for Website Governance System
 * 
 * Purpose: Validate jump-map.yaml entries against lib/site-config.ts SSoT
 * to ensure all docsKey/repoKey/evidenceKey references are valid.
 * 
 * Usage:
 *   npm run verify:jump-map:warn   # Shadow mode (exit 0, report only)
 *   npm run verify:jump-map        # Strict mode (exit 1 on violations)
 * 
 * Environment Variables:
 *   JUMP_MAP_STRICT=1        Enable strict mode (blocking)
 *   EVIDENCE_DIR=path        Output evidence files to specified directory
 *   RUN_ID=WEB-GOV-RUN-*     Run ID for scoped evidence naming
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRICT = process.env.JUMP_MAP_STRICT === '1';
const EVIDENCE_DIR = process.env.EVIDENCE_DIR || null;
const RUN_ID = process.env.RUN_ID || `JUMP-MAP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

// Paths
const SITE_CONFIG_PATH = path.join(__dirname, '../../lib/site-config.ts');
const JUMP_MAP_PATH = path.join(__dirname, '../../../governance/05-website-governance/runs/WEB-GOV-RUN-2026-01-06-01/outputs/jump-map.yaml');

console.log('\n[JUMP-MAP] Running Jump Map governance gate...');
console.log(`Mode: ${STRICT ? 'STRICT (blocking)' : 'SHADOW (warn only)'}`);
console.log(`Run ID: ${RUN_ID}\n`);

/**
 * Extract DOCS_URLS and REPO_URLS keys from site-config.ts
 */
function extractSSoTKeys(configContent) {
    const docsUrlsMatch = configContent.match(/export const DOCS_URLS = \{([\s\S]*?)\} as const;/);
    const repoUrlsMatch = configContent.match(/export const REPO_URLS = \{([\s\S]*?)\} as const;/);

    const extractKeys = (block) => {
        if (!block) return [];
        const keyPattern = /^\s*(\w+):/gm;
        const keys = [];
        let match;
        while ((match = keyPattern.exec(block)) !== null) {
            keys.push(match[1]);
        }
        return keys;
    };

    return {
        docsKeys: extractKeys(docsUrlsMatch ? docsUrlsMatch[1] : ''),
        repoKeys: extractKeys(repoUrlsMatch ? repoUrlsMatch[1] : '')
    };
}

/**
 * Parse jump-map.yaml (simple parser for this specific structure)
 */
function parseJumpMapYaml(yamlContent) {
    const entries = [];
    const entryBlocks = yamlContent.split(/^\s*-\s*website_path:/gm).slice(1);

    for (const block of entryBlocks) {
        const lines = block.split('\n');
        const entry = {
            website_path: null,
            docsKey: null,
            repoKey: null,
            evidenceKey: null
        };

        // First line contains the path (after split)
        const pathMatch = lines[0].trim();
        if (pathMatch) {
            entry.website_path = pathMatch;
        }

        // Parse remaining fields
        for (const line of lines) {
            const docsKeyMatch = line.match(/^\s*docsKey:\s*(\w+)/);
            const repoKeyMatch = line.match(/^\s*repoKey:\s*(\w+)/);
            const evidenceKeyMatch = line.match(/^\s*evidenceKey:\s*(\w+)/);

            if (docsKeyMatch) entry.docsKey = docsKeyMatch[1];
            if (repoKeyMatch) entry.repoKey = repoKeyMatch[1];
            if (evidenceKeyMatch) entry.evidenceKey = evidenceKeyMatch[1];
        }

        if (entry.website_path) {
            entries.push(entry);
        }
    }

    return entries;
}

/**
 * Validate entries against SSoT
 */
function validateEntries(entries, ssotKeys) {
    const violations = [];
    const validEntries = [];

    for (const entry of entries) {
        const entryViolations = [];

        // Check docsKey
        if (entry.docsKey && !ssotKeys.docsKeys.includes(entry.docsKey)) {
            entryViolations.push({
                type: 'INVALID_DOCS_KEY',
                key: entry.docsKey,
                message: `docsKey "${entry.docsKey}" not found in DOCS_URLS`
            });
        }

        // Check repoKey
        if (entry.repoKey && !ssotKeys.repoKeys.includes(entry.repoKey)) {
            entryViolations.push({
                type: 'INVALID_REPO_KEY',
                key: entry.repoKey,
                message: `repoKey "${entry.repoKey}" not found in REPO_URLS`
            });
        }

        // Check evidenceKey (should be in DOCS_URLS)
        if (entry.evidenceKey && !ssotKeys.docsKeys.includes(entry.evidenceKey)) {
            entryViolations.push({
                type: 'INVALID_EVIDENCE_KEY',
                key: entry.evidenceKey,
                message: `evidenceKey "${entry.evidenceKey}" not found in DOCS_URLS`
            });
        }

        if (entryViolations.length > 0) {
            violations.push({
                website_path: entry.website_path,
                violations: entryViolations
            });
        } else {
            validEntries.push(entry);
        }
    }

    return { violations, validEntries };
}

// Main execution
const scanTimestamp = new Date().toISOString();

// Read files
if (!fs.existsSync(SITE_CONFIG_PATH)) {
    console.error(`❌ site-config.ts not found: ${SITE_CONFIG_PATH}`);
    process.exit(1);
}

if (!fs.existsSync(JUMP_MAP_PATH)) {
    console.error(`❌ jump-map.yaml not found: ${JUMP_MAP_PATH}`);
    process.exit(1);
}

const configContent = fs.readFileSync(SITE_CONFIG_PATH, 'utf-8');
const yamlContent = fs.readFileSync(JUMP_MAP_PATH, 'utf-8');

// Extract SSoT keys
const ssotKeys = extractSSoTKeys(configContent);
console.log(`SSoT Keys:`);
console.log(`  DOCS_URLS: ${ssotKeys.docsKeys.length} keys`);
console.log(`  REPO_URLS: ${ssotKeys.repoKeys.length} keys\n`);

// Parse and validate
const entries = parseJumpMapYaml(yamlContent);
console.log(`Jump Map entries: ${entries.length}\n`);

const { violations, validEntries } = validateEntries(entries, ssotKeys);

// Output summary
console.log('─'.repeat(60));
console.log('JUMP MAP VALIDATION RESULTS');
console.log('─'.repeat(60));
console.log(`Total entries:    ${entries.length}`);
console.log(`Valid entries:    ${validEntries.length}`);
console.log(`Entries with violations: ${violations.length}`);
console.log('─'.repeat(60));

// Report violations
if (violations.length > 0) {
    console.log('\n⚠️  VIOLATIONS FOUND:\n');
    for (const v of violations) {
        console.log(`  ${v.website_path}:`);
        for (const issue of v.violations) {
            console.log(`    - ${issue.message}`);
        }
        console.log('');
    }
}

// Write evidence files if directory specified
if (EVIDENCE_DIR) {
    if (!fs.existsSync(EVIDENCE_DIR)) {
        fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
    }

    const jsonPath = path.join(EVIDENCE_DIR, `${RUN_ID}.jump-map.report.json`);

    const jsonEvidence = {
        runId: RUN_ID,
        timestamp: scanTimestamp,
        mode: STRICT ? 'strict' : 'shadow',
        summary: {
            totalEntries: entries.length,
            validEntries: validEntries.length,
            entriesWithViolations: violations.length
        },
        ssotKeys: {
            docsKeys: ssotKeys.docsKeys,
            repoKeys: ssotKeys.repoKeys
        },
        violations: violations,
        verdict: violations.length === 0 ? 'PASS' : (STRICT ? 'FAIL' : 'WARN')
    };

    fs.writeFileSync(jsonPath, JSON.stringify(jsonEvidence, null, 2));
    console.log(`\nEvidence written to: ${jsonPath}`);
}

// Exit code
if (violations.length > 0) {
    if (STRICT) {
        console.log('\n❌ FAIL: Jump Map contains invalid key references.');
        process.exit(1);
    } else {
        console.log('\n⚠️  WARN: Jump Map violations found (shadow mode - not blocking).');
        process.exit(0);
    }
} else {
    console.log('\n✅ PASS: All Jump Map keys validate against SSoT.');
    process.exit(0);
}
