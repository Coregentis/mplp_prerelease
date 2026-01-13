#!/usr/bin/env node
/**
 * P0-REPRO Gate: Repro Bundle Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';

const GATE_ID = 'P0-REPRO';
const REPRO_DIR = 'Validation_Lab/releases/v0.3/artifacts/repro';

const REQUIRED_RUNS = [
    'gf-01-langchain-official-v0.2',
    'gf-01-a2a-official-v0.2',
    'gf-01-mcp-official-v0.2'
];

function main() {
    console.log(`\n=== ${GATE_ID}: Repro Bundle Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check schema exists
    const schemaPath = path.join(REPRO_DIR, 'repro-bundle.schema.json');
    const schemaExists = fs.existsSync(schemaPath);
    report.checks.push({ check: 'schema_exists', passed: schemaExists });
    console.log(`${schemaExists ? '✓' : '✗'} Schema exists`);

    // Check each run has repro bundle
    for (const runId of REQUIRED_RUNS) {
        const jsonPath = path.join(REPRO_DIR, `${runId}.repro.json`);
        const shPath = path.join(REPRO_DIR, `${runId}.repro.sh`);

        const jsonExists = fs.existsSync(jsonPath);
        const shExists = fs.existsSync(shPath);

        report.checks.push({ check: `repro_json_exists:${runId}`, passed: jsonExists });
        report.checks.push({ check: `repro_sh_exists:${runId}`, passed: shExists });

        console.log(`${jsonExists ? '✓' : '✗'} Repro JSON: ${runId}`);
        console.log(`${shExists ? '✓' : '✗'} Repro SH: ${runId}`);

        if (shExists) {
            const stat = fs.statSync(shPath);
            const isExecutable = (stat.mode & 0o111) !== 0;
            report.checks.push({ check: `repro_sh_executable:${runId}`, passed: isExecutable });
            console.log(`  ${isExecutable ? '✓' : '✗'} Executable`);
        }

        if (jsonExists) {
            const content = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
            const hasNoAbsPath = content.constraints?.no_absolute_paths === true;
            report.checks.push({ check: `no_absolute_paths:${runId}`, passed: hasNoAbsPath });
            console.log(`  ${hasNoAbsPath ? '✓' : '✗'} No absolute paths constraint`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.3/gates/p0-repro-gate.report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
