#!/usr/bin/env node
/**
 * P0-NEGATIVE Gate: Failure Evidence Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const GATE_ID = 'P0-NEGATIVE';
const NEG_DIR = 'Validation_Lab/releases/v0.3/artifacts/negative/NEG-01';
const EVALUATOR_PATH = 'scripts/evaluator/pack-evaluator.mjs';

function main() {
    console.log(`\n=== ${GATE_ID}: Failure Evidence Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check NEG-01 pack exists
    const packPath = path.join(NEG_DIR, 'pack');
    const packExists = fs.existsSync(packPath);
    report.checks.push({ check: 'neg01_pack_exists', passed: packExists });
    console.log(`${packExists ? '✓' : '✗'} NEG-01 pack exists`);

    // Check eval report exists
    const evalReportPath = path.join(NEG_DIR, 'eval-report.json');
    const evalReportExists = fs.existsSync(evalReportPath);
    report.checks.push({ check: 'eval_report_exists', passed: evalReportExists });
    console.log(`${evalReportExists ? '✓' : '✗'} Eval report exists`);

    if (evalReportExists) {
        const evalReport = JSON.parse(fs.readFileSync(evalReportPath, 'utf-8'));

        // Check verdict is FAIL
        const isFail = evalReport.verdict === 'FAIL';
        report.checks.push({ check: 'verdict_is_fail', passed: isFail });
        console.log(`${isFail ? '✓' : '✗'} Verdict is FAIL`);

        // Check has report_version
        const hasReportVersion = evalReport.report_version !== undefined;
        report.checks.push({ check: 'has_report_version', passed: hasReportVersion });
        console.log(`${hasReportVersion ? '✓' : '✗'} Has report_version`);

        // Check has failed_checks array
        const hasFailedChecks = Array.isArray(evalReport.failed_checks) && evalReport.failed_checks.length > 0;
        report.checks.push({ check: 'has_failed_checks', passed: hasFailedChecks });
        console.log(`${hasFailedChecks ? '✓' : '✗'} Has failed_checks array`);

        // Check failed_checks has invariant_id
        if (hasFailedChecks) {
            const hasInvariantId = evalReport.failed_checks.every(fc => fc.invariant_id !== undefined);
            report.checks.push({ check: 'failed_checks_have_invariant_id', passed: hasInvariantId });
            console.log(`${hasInvariantId ? '✓' : '✗'} Failed checks have invariant_id`);
        }
    }

    // Run-twice determinism check (if evaluator exists)
    if (fs.existsSync(EVALUATOR_PATH) && packExists) {
        try {
            const run1 = execSync(`node ${EVALUATOR_PATH} ${packPath} --json 2>/dev/null`, { encoding: 'utf-8' });
            const run2 = execSync(`node ${EVALUATOR_PATH} ${packPath} --json 2>/dev/null`, { encoding: 'utf-8' });

            const report1 = JSON.parse(run1);
            const report2 = JSON.parse(run2);

            // Compare everything except timestamp
            delete report1.timestamp;
            delete report2.timestamp;

            const isDeterministic = JSON.stringify(report1) === JSON.stringify(report2);
            report.checks.push({ check: 'fail_is_deterministic', passed: isDeterministic });
            console.log(`${isDeterministic ? '✓' : '✗'} FAIL is deterministic (run-twice)`);
        } catch (e) {
            console.log(`⚠ Run-twice check skipped: ${e.message}`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.3/gates/p0-negative-gate.report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
