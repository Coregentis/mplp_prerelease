
// CodeQL fix: Helper to check file existence without TOCTOU
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}

#!/usr/bin/env node
/**
 * P1-SNAP Gate: Snapshot Evidence Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';

const GATE_ID = 'P1-SNAP';
const SNAP_DIR = 'Validation_Lab/releases/v0.4/artifacts/snapshots';

function main() {
    console.log(`\n=== ${GATE_ID}: Snapshot Evidence Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check schemas exist
    const indexSchemaPath = path.join(SNAP_DIR, 'snapshot-index.schema.json');
    const diffSchemaPath = path.join(SNAP_DIR, 'snapshot-diff.schema.json');

    const indexSchemaExists = fileExists(indexSchemaPath);
    const diffSchemaExists = fileExists(diffSchemaPath);

    report.checks.push({ check: 'index_schema_exists', passed: indexSchemaExists });
    report.checks.push({ check: 'diff_schema_exists', passed: diffSchemaExists });
    console.log(`${indexSchemaExists ? '✓' : '✗'} Index schema exists`);
    console.log(`${diffSchemaExists ? '✓' : '✗'} Diff schema exists`);

    // Find run directories
    const entries = fs.readdirSync(SNAP_DIR, { withFileTypes: true });
    const runDirs = entries.filter(e => e.isDirectory()).map(e => e.name);

    for (const runId of runDirs) {
        const runPath = path.join(SNAP_DIR, runId);
        const indexPath = path.join(runPath, 'index.json');

        // Check index.json exists
        const indexExists = fileExists(indexPath);
        report.checks.push({ check: `index_exists:${runId}`, passed: indexExists });
        console.log(`${indexExists ? '✓' : '✗'} Index: ${runId}`);

        if (!indexExists) continue;

        const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

        // Check all snapshot files exist
        for (const snap of index.snapshots || []) {
            const snapPath = path.join(runPath, snap.path);
            const snapExists = fileExists(snapPath);
            report.checks.push({ check: `snapshot_exists:${runId}/${snap.id}`, passed: snapExists });
            console.log(`  ${snapExists ? '✓' : '✗'} State: ${snap.id}`);
        }

        // Check all diff files exist
        for (const diff of index.diffs || []) {
            const diffPath = path.join(runPath, diff.path);
            const diffExists = fileExists(diffPath);
            report.checks.push({ check: `diff_exists:${runId}/${diff.from}_${diff.to}`, passed: diffExists });
            console.log(`  ${diffExists ? '✓' : '✗'} Diff: ${diff.from}->${diff.to}`);
        }

        // Check source binding (hash format validation)
        if (index.source) {
            const hashValid = /^[a-f0-9]{64}$/.test(index.source.pack_root_hash || '');
            report.checks.push({ check: `source_hash_valid:${runId}`, passed: hashValid });
            console.log(`  ${hashValid ? '✓' : '✗'} Source hash valid`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.4/gates/p1-snap-gate.report.json';
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
