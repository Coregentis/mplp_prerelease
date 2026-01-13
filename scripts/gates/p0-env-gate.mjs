#!/usr/bin/env node
/**
 * P0-ENV Gate: Environment Fingerprint Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';

const GATE_ID = 'P0-ENV';
const ENV_DIR = 'Validation_Lab/releases/v0.3/artifacts/env';
const SCHEMA_PATH = path.join(ENV_DIR, 'env-fingerprint.schema.json');

const REQUIRED_RUNS = [
    'gf-01-langchain-official-v0.2',
    'gf-01-a2a-official-v0.2',
    'gf-01-mcp-official-v0.2'
];

function main() {
    console.log(`\n=== ${GATE_ID}: Environment Fingerprint Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check schema exists
    const schemaExists = fs.existsSync(SCHEMA_PATH);
    report.checks.push({ check: 'schema_exists', passed: schemaExists });
    console.log(`${schemaExists ? '✓' : '✗'} Schema exists: ${SCHEMA_PATH}`);

    // Check each run has env fingerprint
    for (const runId of REQUIRED_RUNS) {
        const envPath = path.join(ENV_DIR, `${runId}.env.json`);
        const exists = fs.existsSync(envPath);
        report.checks.push({ check: `env_exists:${runId}`, passed: exists });
        console.log(`${exists ? '✓' : '✗'} Env fingerprint: ${runId}`);

        if (exists) {
            const content = JSON.parse(fs.readFileSync(envPath, 'utf-8'));
            const hasRequired = content.run_id && content.os && content.arch && content.runtime;
            report.checks.push({ check: `env_valid:${runId}`, passed: hasRequired });
            console.log(`  ${hasRequired ? '✓' : '✗'} Required fields present`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.3/gates/p0-env-gate.report.json';
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
