#!/usr/bin/env node
/**
 * P1-VFY Gate: Third-party Verifier Record Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';

const GATE_ID = 'P1-VFY';
const VFY_DIR = 'Validation_Lab/releases/v0.4/artifacts/verifier';

function main() {
    console.log(`\n=== ${GATE_ID}: Third-party Verifier Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check schema exists
    const schemaPath = path.join(VFY_DIR, 'verifier-record.schema.json');
    const schemaExists = fs.existsSync(schemaPath);
    report.checks.push({ check: 'schema_exists', passed: schemaExists });
    console.log(`${schemaExists ? '✓' : '✗'} Schema exists`);

    // Find VFY directories
    const entries = fs.readdirSync(VFY_DIR, { withFileTypes: true });
    const vfyDirs = entries.filter(e => e.isDirectory() && e.name.startsWith('VFY-')).map(e => e.name);

    for (const vfyId of vfyDirs) {
        const vfyPath = path.join(VFY_DIR, vfyId);
        console.log(`\nVerifying ${vfyId}:`);

        // Check required files
        const envPath = path.join(vfyPath, 'env.json');
        const verifyPath = path.join(vfyPath, 'verify_report.json');
        const evalPath = path.join(vfyPath, 'eval_report.json');
        const statementPath = path.join(vfyPath, 'statement.md');
        const recordPath = path.join(vfyPath, 'record.json');

        const envExists = fs.existsSync(envPath);
        const verifyExists = fs.existsSync(verifyPath);
        const evalExists = fs.existsSync(evalPath);
        const statementExists = fs.existsSync(statementPath);
        const recordExists = fs.existsSync(recordPath);

        report.checks.push({ check: `env_exists:${vfyId}`, passed: envExists });
        report.checks.push({ check: `verify_report_exists:${vfyId}`, passed: verifyExists });
        report.checks.push({ check: `eval_report_exists:${vfyId}`, passed: evalExists });
        report.checks.push({ check: `statement_exists:${vfyId}`, passed: statementExists });
        report.checks.push({ check: `record_exists:${vfyId}`, passed: recordExists });

        console.log(`  ${envExists ? '✓' : '✗'} env.json`);
        console.log(`  ${verifyExists ? '✓' : '✗'} verify_report.json`);
        console.log(`  ${evalExists ? '✓' : '✗'} eval_report.json`);
        console.log(`  ${statementExists ? '✓' : '✗'} statement.md`);
        console.log(`  ${recordExists ? '✓' : '✗'} record.json`);

        // Check statement contains non-certification phrase
        if (statementExists) {
            const statementContent = fs.readFileSync(statementPath, 'utf-8');
            const hasNonCert = statementContent.includes('NOT') &&
                (statementContent.includes('certification') || statementContent.includes('endorsement'));
            report.checks.push({ check: `non_certification_phrase:${vfyId}`, passed: hasNonCert });
            console.log(`  ${hasNonCert ? '✓' : '✗'} Non-certification statement`);
        }

        // Check eval_report has report_version
        if (evalExists) {
            const evalContent = JSON.parse(fs.readFileSync(evalPath, 'utf-8'));
            const hasReportVersion = evalContent.report_version !== undefined;
            report.checks.push({ check: `report_version:${vfyId}`, passed: hasReportVersion });
            console.log(`  ${hasReportVersion ? '✓' : '✗'} report_version field`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.4/gates/p1-vfy-gate.report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
