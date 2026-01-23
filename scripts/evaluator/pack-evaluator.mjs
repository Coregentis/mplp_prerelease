#!/usr/bin/env node
/**
 * Enhanced Pack Evaluator v0.3
 * Authority: Validation Lab (Non-Normative)
 * 
 * Enhancements over v0.2:
 * - report_version field for backward compatibility
 * - Structured failed_checks array for FAIL verdicts
 * - Invariant ID mapping
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const REPORT_VERSION = '1';
const EVALUATOR_VERSION = 'local-cli-v0.3.0';

const args = process.argv.slice(2).filter(a => !a.startsWith('--'));
const PACK_PATH = args[0] || 'pack';
const JSON_OUTPUT = process.argv.includes('--json');

// Invariant definitions
const INVARIANTS = {
    'INV-PACK-001': { check: 'file_exists:manifest.json', message: 'Manifest file required' },
    'INV-PACK-002': { check: 'file_exists:artifacts/trace.json', message: 'Trace artifact required' },
    'INV-PACK-003': { check: 'file_exists:artifacts/context.json', message: 'Context artifact required' },
    'INV-PACK-004': { check: 'file_exists:artifacts/plan.json', message: 'Plan artifact required' },
};

function evaluatePack(packDir) {
    const timestamp = new Date().toISOString();
    const results = {
        report_version: REPORT_VERSION,
        evaluator_version: EVALUATOR_VERSION,
        timestamp,
        pack_path: packDir,
        checks: [],
        failed_checks: [],
        verdict: 'UNKNOWN'
    };

    // Required files with invariant IDs
    const requiredFiles = [
        { path: 'manifest.json', invariant_id: 'INV-PACK-001' },
        { path: 'artifacts/context.json', invariant_id: 'INV-PACK-003' },
        { path: 'artifacts/plan.json', invariant_id: 'INV-PACK-004' },
        { path: 'artifacts/trace.json', invariant_id: 'INV-PACK-002' },
    ];

    for (const { path: filePath, invariant_id } of requiredFiles) {
        const fullPath = path.join(packDir, filePath);
        // CodeQL fix: Use try/catch instead of existsSync to avoid TOCTOU
        let exists = false;
        try {
            fs.accessSync(fullPath, fs.constants.R_OK);
            exists = true;
        } catch {
            exists = false;
        }
        const checkId = `file_exists:${filePath}`;

        results.checks.push({
            check: checkId,
            invariant_id,
            passed: exists
        });

        if (!exists) {
            results.failed_checks.push({
                check: checkId,
                invariant_id,
                message: INVARIANTS[invariant_id]?.message || `Missing: ${filePath}`,
                severity: 'error'
            });
        }
    }

    // Compute verdict_hash if trace exists
    const tracePath = path.join(packDir, 'artifacts/trace.json');
    // CodeQL fix: Use try/catch instead of existsSync
    try {
        fs.accessSync(tracePath, fs.constants.R_OK);
        const artifactDir = path.join(packDir, 'artifacts');
        const artifactFiles = fs.readdirSync(artifactDir).sort();
        let combinedContent = '';
        for (const file of artifactFiles) {
            const content = fs.readFileSync(path.join(artifactDir, file), 'utf-8');
            combinedContent += content;
        }
        results.verdict_hash = crypto.createHash('sha256').update(combinedContent).digest('hex');
    } catch {
        // Trace doesn't exist, skip verdict_hash computation
    }

    // Determine final verdict
    results.verdict = results.failed_checks.length === 0 ? 'PASS' : 'FAIL';

    return results;
}

function main() {
    if (!JSON_OUTPUT) {
        console.log(`\n=== Pack Evaluator v${REPORT_VERSION} ===\n`);
    }

    const results = evaluatePack(PACK_PATH);

    if (JSON_OUTPUT) {
        console.log(JSON.stringify(results, null, 2));
    } else {
        console.log(`Pack: ${results.pack_path}`);
        console.log(`Evaluator: ${results.evaluator_version}`);
        console.log(`Timestamp: ${results.timestamp}\n`);

        console.log('Checks:');
        for (const check of results.checks) {
            const status = check.passed ? '✓' : '✗';
            console.log(`  ${status} [${check.invariant_id}] ${check.check}`);
        }

        if (results.failed_checks.length > 0) {
            console.log('\nFailed Checks:');
            for (const fc of results.failed_checks) {
                console.log(`  ✗ ${fc.invariant_id}: ${fc.message}`);
            }
        }

        console.log(`\nVerdict: ${results.verdict}`);
        if (results.verdict_hash) {
            console.log(`verdict_hash: ${results.verdict_hash}`);
        }
    }

    process.exit(results.verdict === 'PASS' ? 0 : 1);
}

main();
