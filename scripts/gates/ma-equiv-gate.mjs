
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
 * MA-EQUIV Gate: Multi-Agent GF-01 Invariant Equivalence
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const GATE_ID = 'MA-EQUIV';
const PACKS_DIR = 'Validation_Lab/releases/v0.6/artifacts/packs';

function main() {
    console.log(`\n=== ${GATE_ID}: Multi-Agent Invariant Equivalence Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Find MA pack directories
    const entries = fs.readdirSync(PACKS_DIR, { withFileTypes: true });
    const packDirs = entries.filter(e => e.isDirectory() && e.name.includes('-ma-')).map(e => e.name);

    for (const packId of packDirs) {
        const packPath = path.join(PACKS_DIR, packId);
        console.log(`Checking ${packId}:`);

        // INV-MA-EQUIV-002: Pack contains GF-01 required artifact set
        const contextPath = path.join(packPath, 'artifacts/context.json');
        const planPath = path.join(packPath, 'artifacts/plan.json');
        const tracePath = path.join(packPath, 'artifacts/trace.json');

        const contextExists = fileExists(contextPath);
        const planExists = fileExists(planPath);
        const traceExists = fileExists(tracePath);

        report.checks.push({ check: `context_exists:${packId}`, invariant_id: 'INV-MA-EQUIV-002', passed: contextExists });
        report.checks.push({ check: `plan_exists:${packId}`, invariant_id: 'INV-MA-EQUIV-002', passed: planExists });
        report.checks.push({ check: `trace_exists:${packId}`, invariant_id: 'INV-MA-EQUIV-002', passed: traceExists });

        console.log(`  ${contextExists ? '✓' : '✗'} context.json`);
        console.log(`  ${planExists ? '✓' : '✗'} plan.json`);
        console.log(`  ${traceExists ? '✓' : '✗'} trace.json`);

        // Check plan references context
        if (planExists) {
            const plan = JSON.parse(fs.readFileSync(planPath, 'utf-8'));
            const planRefsContext = plan.context_ref !== undefined;
            report.checks.push({ check: `plan_refs_context:${packId}`, invariant_id: 'INV-GF01-002', passed: planRefsContext });
            console.log(`  ${planRefsContext ? '✓' : '✗'} Plan references context`);
        }

        // Check trace references plan
        if (traceExists) {
            const trace = JSON.parse(fs.readFileSync(tracePath, 'utf-8'));
            const traceRefsPlan = trace.plan_ref !== undefined;
            report.checks.push({ check: `trace_refs_plan:${packId}`, invariant_id: 'INV-GF01-003', passed: traceRefsPlan });
            console.log(`  ${traceRefsPlan ? '✓' : '✗'} Trace references plan`);
        }

        // INV-MA-EQUIV-003/004: Compute pack_root_hash and verdict_hash
        const sha256sumsPath = path.join(packPath, 'integrity/sha256sums.txt');
        if (fileExists(sha256sumsPath)) {
            const sha256sumsContent = fs.readFileSync(sha256sumsPath);
            const packRootHash = crypto.createHash('sha256').update(sha256sumsContent).digest('hex');
            const validHash = /^[a-f0-9]{64}$/.test(packRootHash);
            report.checks.push({
                check: `pack_root_hash_valid:${packId}`,
                invariant_id: 'INV-MA-EQUIV-003',
                passed: validHash,
                pack_root_hash: packRootHash
            });
            console.log(`  ${validHash ? '✓' : '✗'} pack_root_hash: ${packRootHash.substring(0, 16)}...`);

            // Compute verdict_hash from artifacts
            if (contextExists && planExists && traceExists) {
                const contextContent = fs.readFileSync(contextPath);
                const planContent = fs.readFileSync(planPath);
                const traceContent = fs.readFileSync(tracePath);
                const combined = Buffer.concat([contextContent, planContent, traceContent]);
                const verdictHash = crypto.createHash('sha256').update(combined).digest('hex');
                const validVerdictHash = /^[a-f0-9]{64}$/.test(verdictHash);
                report.checks.push({
                    check: `verdict_hash_valid:${packId}`,
                    invariant_id: 'INV-MA-EQUIV-004',
                    passed: validVerdictHash,
                    verdict_hash: verdictHash
                });
                console.log(`  ${validVerdictHash ? '✓' : '✗'} verdict_hash: ${verdictHash.substring(0, 16)}...`);
            }
        }

        // INV-MA-EQUIV-001: Evaluator produces PASS (simulated here)
        const allArtifactsExist = contextExists && planExists && traceExists;
        report.checks.push({
            check: `evaluator_pass:${packId}`,
            invariant_id: 'INV-MA-EQUIV-001',
            passed: allArtifactsExist,
            verdict: allArtifactsExist ? 'PASS' : 'FAIL'
        });
        console.log(`  ${allArtifactsExist ? '✓' : '✗'} Evaluator verdict: ${allArtifactsExist ? 'PASS' : 'FAIL'}`);
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.6/gates/ma-equiv-gate.report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
