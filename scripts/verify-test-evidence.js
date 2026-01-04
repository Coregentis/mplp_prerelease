/**
 * MPLP Phase E+ — E+1 Generated Evidence Schema Validation
 * 
 * Validates runtime/out generated evidence against schemas/v2.
 * 
 * RULE: Clean is MANDATORY before validation.
 * RULE: Only validates positive MPLP artifacts (context, plan, confirm, trace).
 * RULE: error-plan.json is excluded (goes to E+2 negative validation).
 * 
 * Usage: node scripts/verify-test-evidence.js
 * Output: artifacts/test-baseline/generated-evidence-report.md
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Configuration
const SCHEMAS_DIR = path.join(__dirname, '../schemas/v2');
const TESTS_DIR = path.join(__dirname, '../tests');
const OUTPUT_DIR = path.join(__dirname, '../artifacts/test-baseline');

// Schema mapping for MPLP artifacts
const SCHEMA_MAP = {
    'context.json': 'mplp-context.schema.json',
    'plan.json': 'mplp-plan.schema.json',
    'confirm.json': 'mplp-confirm.schema.json',
    'trace.json': 'mplp-trace.schema.json'
};

// Negative fixtures to EXCLUDE from positive validation
const NEGATIVE_PATTERNS = ['error-', 'invalid-', '_invalid', '_missing', '_extra'];

// Evidence directories to scan
const EVIDENCE_DIRS = [
    'cross-language/runtime/out/ts',
    'cross-language/runtime/out/py',
    'cross-language/builders/out'
];

// Results
const results = {
    timestamp: new Date().toISOString(),
    evidence_total: 0,
    evidence_passed: 0,
    evidence_failed: 0,
    evidence_skipped: 0,
    details: []
};

/**
 * Recursively get all schema files
 */
function getAllSchemaFiles(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            getAllSchemaFiles(fullPath, files);
        } else if (item.endsWith('.schema.json')) {
            files.push(fullPath);
        }
    }
    return files;
}

/**
 * Create AJV instance with all schemas pre-loaded
 */
function createAjvWithSchemas() {
    const ajv = new Ajv({ allErrors: true, strict: false, validateSchema: false });
    addFormats(ajv);

    const schemaFiles = getAllSchemaFiles(SCHEMAS_DIR);
    console.log(`Loading ${schemaFiles.length} schemas...`);

    for (const file of schemaFiles) {
        try {
            const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
            const relativePath = path.relative(SCHEMAS_DIR, file).replace(/\\/g, '/');
            ajv.addSchema(schema, relativePath);
        } catch (err) {
            console.error(`  Error loading ${file}: ${err.message}`);
        }
    }

    return ajv;
}

/**
 * Check if file is a negative fixture
 */
function isNegativeFixture(filename) {
    return NEGATIVE_PATTERNS.some(pattern => filename.includes(pattern));
}

/**
 * Validate a single evidence file
 */
function validateEvidence(ajv, filePath) {
    const filename = path.basename(filePath);
    const schemaName = SCHEMA_MAP[filename];

    const result = {
        file: path.relative(TESTS_DIR, filePath),
        schema: schemaName || 'N/A',
        status: 'UNKNOWN',
        errors: []
    };

    // Skip if no schema mapping
    if (!schemaName) {
        result.status = 'SKIPPED';
        result.errors.push('No schema mapping for this file type');
        return result;
    }

    // Skip negative fixtures (handled in E+2)
    if (isNegativeFixture(filename)) {
        result.status = 'SKIPPED';
        result.errors.push('Negative fixture (E+2 scope)');
        return result;
    }

    const validate = ajv.getSchema(schemaName);
    if (!validate) {
        result.status = 'SKIPPED';
        result.errors.push(`Schema not compiled: ${schemaName}`);
        return result;
    }

    try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const valid = validate(data);

        if (valid) {
            result.status = 'PASS';
        } else {
            result.status = 'FAIL';
            result.errors = validate.errors.map(e => `${e.instancePath || '(root)'} ${e.message}`);
        }
    } catch (err) {
        result.status = 'FAIL';
        result.errors.push(`Parse error: ${err.message}`);
    }

    return result;
}

/**
 * Generate markdown report
 */
function generateReport() {
    const status = results.evidence_failed === 0 ? '✅ **PASS**' : '❌ **FAIL**';

    let md = `# E+1 Generated Evidence Schema Validation Report

**Date**: ${results.timestamp}  
**Status**: ${status}

---

## Summary

| Metric | Value |
|--------|-------|
| Evidence Files Scanned | ${results.evidence_total} |
| Passed | ${results.evidence_passed} |
| Failed | ${results.evidence_failed} |
| Skipped | ${results.evidence_skipped} |

---

## Gate Criteria

| Condition | Required | Actual | Status |
|-----------|----------|--------|--------|
| FAIL count | 0 | ${results.evidence_failed} | ${results.evidence_failed === 0 ? '✅' : '❌'} |

**Gate Result**: ${results.evidence_failed === 0 ? '**PASS**' : '**FAIL**'}

---

## Validation Results

`;

    for (const detail of results.details) {
        const icon = detail.status === 'PASS' ? '✅' : (detail.status === 'FAIL' ? '❌' : '⚠️');
        md += `### ${icon} ${detail.file}\n\n`;
        md += `**Schema**: \`${detail.schema}\`\n\n`;

        if (detail.errors.length > 0) {
            md += `**Errors**:\n`;
            for (const err of detail.errors.slice(0, 5)) {
                md += `- ${err}\n`;
            }
            md += '\n';
        }

        md += `---\n\n`;
    }

    md += `## Schema Truth Source

All schemas loaded from: \`schemas/v2/\`

| Evidence Type | Schema File |
|--------------|-------------|
| context.json | mplp-context.schema.json |
| plan.json | mplp-plan.schema.json |
| confirm.json | mplp-confirm.schema.json |
| trace.json | mplp-trace.schema.json |
`;

    return md;
}

/**
 * Main execution
 */
function main() {
    console.log('MPLP Phase E+ — E+1 Generated Evidence Validation');
    console.log('==================================================\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const ajv = createAjvWithSchemas();

    for (const relDir of EVIDENCE_DIRS) {
        const dir = path.join(TESTS_DIR, relDir);
        console.log(`\nScanning: ${relDir}`);

        if (!fs.existsSync(dir)) {
            console.log(`  Directory not found (may need rebuild)`);
            continue;
        }

        const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const filePath = path.join(dir, file);
            const result = validateEvidence(ajv, filePath);
            results.details.push(result);
            results.evidence_total++;

            if (result.status === 'PASS') {
                results.evidence_passed++;
                console.log(`  ✅ ${file}`);
            } else if (result.status === 'FAIL') {
                results.evidence_failed++;
                console.log(`  ❌ ${file}`);
                for (const err of result.errors.slice(0, 2)) {
                    console.log(`     ${err}`);
                }
            } else {
                results.evidence_skipped++;
                console.log(`  ⚠️ ${file}: ${result.errors[0]}`);
            }
        }
    }

    // Write reports
    fs.writeFileSync(path.join(OUTPUT_DIR, 'generated-evidence-report.json'), JSON.stringify(results, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'generated-evidence-report.md'), generateReport());

    console.log('\n==================================================');
    console.log('SUMMARY');
    console.log('==================================================');
    console.log(`Total: ${results.evidence_total}`);
    console.log(`Passed: ${results.evidence_passed}`);
    console.log(`Failed: ${results.evidence_failed}`);
    console.log(`Skipped: ${results.evidence_skipped}`);
    console.log(`Gate: ${results.evidence_failed === 0 ? 'PASS ✅' : 'FAIL ❌'}`);

    process.exit(results.evidence_failed > 0 ? 1 : 0);
}

main();
