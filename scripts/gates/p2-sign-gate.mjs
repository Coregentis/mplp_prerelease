#!/usr/bin/env node
/**
 * P2-SIGN Gate: Signed Proof Validation
 * Authority: Validation Lab (Non-Normative)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const GATE_ID = 'P2-SIGN';
const SIGN_DIR = 'Validation_Lab/releases/v0.5/artifacts/signed-proof';

function main() {
    console.log(`\n=== ${GATE_ID}: Signed Proof Gate ===\n`);

    const report = {
        gate_id: GATE_ID,
        timestamp: new Date().toISOString(),
        checks: [],
        verdict: 'UNKNOWN'
    };

    // Check schemas exist
    const signedProofSchemaPath = path.join(SIGN_DIR, 'signed-proof.schema.json');
    const envelopeSchemaPath = path.join(SIGN_DIR, 'signature-envelope.schema.json');

    report.checks.push({ check: 'signed_proof_schema_exists', passed: fs.existsSync(signedProofSchemaPath) });
    report.checks.push({ check: 'envelope_schema_exists', passed: fs.existsSync(envelopeSchemaPath) });
    console.log(`${fs.existsSync(signedProofSchemaPath) ? '✓' : '✗'} signed-proof.schema.json`);
    console.log(`${fs.existsSync(envelopeSchemaPath) ? '✓' : '✗'} signature-envelope.schema.json`);

    // Find SIGN directories
    const entries = fs.readdirSync(SIGN_DIR, { withFileTypes: true });
    const signDirs = entries.filter(e => e.isDirectory() && e.name.startsWith('SIGN-')).map(e => e.name);

    for (const signId of signDirs) {
        const signPath = path.join(SIGN_DIR, signId);
        console.log(`\nVerifying ${signId}:`);

        // Check required files
        const sigPath = path.join(signPath, 'signature.json');
        const payloadPath = path.join(signPath, 'payload.json');
        const sumsPath = path.join(signPath, 'sha256sums.txt');
        const pubKeyPath = path.join(signPath, 'public_key.txt');
        const statementPath = path.join(signPath, 'statement.md');

        const sigExists = fs.existsSync(sigPath);
        const payloadExists = fs.existsSync(payloadPath);
        const sumsExists = fs.existsSync(sumsPath);
        const pubKeyExists = fs.existsSync(pubKeyPath);
        const statementExists = fs.existsSync(statementPath);

        report.checks.push({ check: `signature_exists:${signId}`, passed: sigExists });
        report.checks.push({ check: `payload_exists:${signId}`, passed: payloadExists });
        report.checks.push({ check: `sha256sums_exists:${signId}`, passed: sumsExists });
        report.checks.push({ check: `public_key_exists:${signId}`, passed: pubKeyExists });
        report.checks.push({ check: `statement_exists:${signId}`, passed: statementExists });

        console.log(`  ${sigExists ? '✓' : '✗'} signature.json`);
        console.log(`  ${payloadExists ? '✓' : '✗'} payload.json`);
        console.log(`  ${sumsExists ? '✓' : '✗'} sha256sums.txt`);
        console.log(`  ${pubKeyExists ? '✓' : '✗'} public_key.txt`);
        console.log(`  ${statementExists ? '✓' : '✗'} statement.md`);

        // Check statement contains non-certification
        if (statementExists) {
            const statementContent = fs.readFileSync(statementPath, 'utf-8');
            const hasNonCert = statementContent.includes('NOT') && statementContent.includes('certification');
            report.checks.push({ check: `non_certification_phrase:${signId}`, passed: hasNonCert });
            console.log(`  ${hasNonCert ? '✓' : '✗'} Non-certification statement`);
        }

        // Check payload sha256 matches signature.json
        if (sigExists && payloadExists) {
            const sigContent = JSON.parse(fs.readFileSync(sigPath, 'utf-8'));
            const payloadContent = fs.readFileSync(payloadPath);
            const payloadSha256 = crypto.createHash('sha256').update(payloadContent).digest('hex');
            const payloadHashMatch = payloadSha256 === sigContent.payload_sha256;
            report.checks.push({ check: `payload_hash_match:${signId}`, passed: payloadHashMatch });
            console.log(`  ${payloadHashMatch ? '✓' : '✗'} Payload hash matches signature`);

            // Verify sha256sums.txt hash in payload
            if (sumsExists && payloadExists) {
                const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf-8'));
                const sumsContent = fs.readFileSync(sumsPath);
                const sumsSha256 = crypto.createHash('sha256').update(sumsContent).digest('hex');
                const sumsHashMatch = sumsSha256 === payload.sha256sums_sha256;
                report.checks.push({ check: `sha256sums_hash_match:${signId}`, passed: sumsHashMatch });
                console.log(`  ${sumsHashMatch ? '✓' : '✗'} sha256sums hash matches payload`);
            }

            // Verify signature
            if (pubKeyExists) {
                try {
                    const pubKeyPem = fs.readFileSync(pubKeyPath, 'utf-8');
                    const publicKey = crypto.createPublicKey(pubKeyPem);
                    const signatureBuffer = Buffer.from(sigContent.signature, 'base64');
                    const isValid = crypto.verify(null, payloadContent, publicKey, signatureBuffer);
                    report.checks.push({ check: `signature_valid:${signId}`, passed: isValid });
                    console.log(`  ${isValid ? '✓' : '✗'} Signature verified`);
                } catch (e) {
                    report.checks.push({ check: `signature_valid:${signId}`, passed: false, error: e.message });
                    console.log(`  ✗ Signature verification failed: ${e.message}`);
                }
            }
        }

        // Verify sha256sums entries
        if (sumsExists) {
            const sumsContent = fs.readFileSync(sumsPath, 'utf-8');
            const lines = sumsContent.trim().split('\n');
            let allMatch = true;
            let checkedCount = 0;

            for (const line of lines) {
                const [expectedHash, filePath] = line.split('  ');
                if (fs.existsSync(filePath)) {
                    const actualHash = crypto.createHash('sha256')
                        .update(fs.readFileSync(filePath))
                        .digest('hex');
                    if (actualHash !== expectedHash) {
                        allMatch = false;
                        console.log(`  ✗ Hash mismatch: ${filePath}`);
                    }
                    checkedCount++;
                } else {
                    allMatch = false;
                    console.log(`  ✗ File missing: ${filePath}`);
                }
            }

            report.checks.push({ check: `sha256sums_verified:${signId}`, passed: allMatch, files_checked: checkedCount });
            console.log(`  ${allMatch ? '✓' : '✗'} All ${checkedCount} file hashes verified`);
        }
    }

    report.verdict = report.checks.every(c => c.passed) ? 'PASS' : 'FAIL';
    console.log(`\n${report.verdict === 'PASS' ? '✅' : '❌'} ${GATE_ID}: ${report.verdict}`);

    // Write report
    const reportPath = 'Validation_Lab/releases/v0.5/gates/p2-sign-gate.report.json';
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\nReport: ${reportPath}`);

    process.exit(report.verdict === 'PASS' ? 0 : 1);
}

main();
