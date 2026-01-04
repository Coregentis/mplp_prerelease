/**
 * MPLP Phase E — Fixture Schema Validation (Fixed Loader)
 * 
 * Validates golden flow fixture files against their corresponding schemas.
 * RULE: Fixtures must pass schema validation BEFORE invariant testing.
 * 
 * Fixed: Pre-loads all schemas by $id to avoid cache/resolution issues.
 * 
 * Usage: node scripts/verify-fixtures-schema.js
 * Output: artifacts/fixtures-validation/report.md
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Configuration
const SCHEMAS_DIR = path.join(__dirname, '../schemas/v2');
const FLOWS_DIR = path.join(__dirname, '../tests/golden/flows');
const OUTPUT_DIR = path.join(__dirname, '../artifacts/fixtures-validation');

// Schema mapping: fixture filename → schema $id pattern
const SCHEMA_MAP = {
    'context.json': 'mplp-context.schema.json',
    'plan.json': 'mplp-plan.schema.json',
    'confirm.json': 'mplp-confirm.schema.json',
    'trace.json': 'mplp-trace.schema.json',
    'collab.json': 'mplp-collab.schema.json'
};

// Results
const results = {
    timestamp: new Date().toISOString(),
    fixtures_total: 0,
    fixtures_passed: 0,
    fixtures_failed: 0,
    fixtures_skipped: 0,
    details: []
};

/**
 * Recursively get all schema files
 */
function getAllSchemaFiles(dir, files = []) {
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
    const ajv = new Ajv({
        allErrors: true,
        strict: false,
        validateSchema: false // Skip meta-schema validation for speed
    });
    addFormats(ajv);

    // Pre-load ALL schemas from schemas/v2
    const schemaFiles = getAllSchemaFiles(SCHEMAS_DIR);
    console.log(`Loading ${schemaFiles.length} schemas...`);

    for (const file of schemaFiles) {
        try {
            const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
            const relativePath = path.relative(SCHEMAS_DIR, file).replace(/\\/g, '/');

            // Use relative path as key for $ref resolution
            ajv.addSchema(schema, relativePath);

            // Also add by $id if present
            if (schema.$id) {
                const shortId = schema.$id.replace('https://schemas.mplp.dev/v1.0/', '');
                try {
                    ajv.addSchema(schema, shortId);
                } catch (e) {
                    // Already added, ignore
                }
            }
        } catch (err) {
            console.error(`  Error loading ${file}: ${err.message}`);
        }
    }

    console.log(`Loaded ${schemaFiles.length} schemas\n`);
    return ajv;
}

/**
 * Validate a single fixture file
 */
function validateFixture(ajv, fixturePath, schemaKey) {
    const result = {
        fixture: fixturePath,
        schema: schemaKey,
        status: 'UNKNOWN',
        errors: []
    };

    const validate = ajv.getSchema(schemaKey);
    if (!validate) {
        result.status = 'SKIPPED';
        result.errors.push(`Schema not compiled: ${schemaKey}`);
        return result;
    }

    try {
        const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
        const valid = validate(fixture);

        if (valid) {
            result.status = 'PASS';
        } else {
            result.status = 'FAIL';
            result.errors = validate.errors.map(e => {
                const path = e.instancePath || '(root)';
                return `${path} ${e.message}`;
            });
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
    let md = `# Phase E — Fixture Schema Validation Report

**Date**: ${results.timestamp}  
**Status**: ${results.fixtures_failed === 0 && results.fixtures_skipped === 0 ? '✅ **PASS**' : '❌ **FAIL**'}

---

## Summary

| Metric | Value |
|--------|-------|
| Fixtures Total | ${results.fixtures_total} |
| Fixtures Passed | ${results.fixtures_passed} |
| Fixtures Failed | ${results.fixtures_failed} |
| Fixtures Skipped | ${results.fixtures_skipped} |

---

## Gate Rule (Hard)

> **Fixtures must pass schema validation BEFORE invariant testing.**
> 
> This ensures all fixture data is structurally valid per \`schemas/v2\` truth source.

---

## Validation Results

`;

    for (const detail of results.details) {
        const status = detail.status === 'PASS' ? '✅' : (detail.status === 'FAIL' ? '❌' : '⚠️');
        const flowDir = path.dirname(path.dirname(detail.fixture));
        const flowName = path.basename(flowDir);
        const fileName = path.basename(detail.fixture);

        md += `### ${status} ${flowName}/${fileName}\n\n`;
        md += `**Schema**: \`${detail.schema}\`\n\n`;

        if (detail.errors.length > 0) {
            md += `**Errors**:\n`;
            for (const err of detail.errors.slice(0, 10)) { // Limit to 10 errors
                md += `- ${err}\n`;
            }
            if (detail.errors.length > 10) {
                md += `- ... and ${detail.errors.length - 10} more errors\n`;
            }
            md += '\n';
        }

        md += `---\n\n`;
    }

    md += `## Schema Truth Source

All schemas loaded from: \`schemas/v2/\`

| Fixture Type | Schema File |
|-------------|-------------|
| context.json | mplp-context.schema.json |
| plan.json | mplp-plan.schema.json |
| confirm.json | mplp-confirm.schema.json |
| trace.json | mplp-trace.schema.json |
| collab.json | mplp-collab.schema.json |
`;

    return md;
}

/**
 * Main execution
 */
function main() {
    console.log('MPLP Phase E — Fixture Schema Validation');
    console.log('=========================================\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Create AJV with all schemas pre-loaded
    const ajv = createAjvWithSchemas();

    // Get all flow directories
    const flows = fs.readdirSync(FLOWS_DIR)
        .filter(f => fs.statSync(path.join(FLOWS_DIR, f)).isDirectory());

    console.log(`Found ${flows.length} flows to validate\n`);

    for (const flow of flows) {
        const inputDir = path.join(FLOWS_DIR, flow, 'input');
        if (!fs.existsSync(inputDir)) continue;

        const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.json'));

        for (const file of files) {
            const schemaKey = SCHEMA_MAP[file];
            if (!schemaKey) {
                console.log(`  ⚠️ ${flow}/${file}: No schema mapping, skipped`);
                results.fixtures_skipped++;
                results.fixtures_total++;
                continue;
            }

            const fixturePath = path.join(inputDir, file);
            const result = validateFixture(ajv, fixturePath, schemaKey);
            results.details.push(result);
            results.fixtures_total++;

            if (result.status === 'PASS') {
                results.fixtures_passed++;
                console.log(`✅ ${flow}/${file}`);
            } else if (result.status === 'FAIL') {
                results.fixtures_failed++;
                console.log(`❌ ${flow}/${file}`);
                for (const err of result.errors.slice(0, 3)) {
                    console.log(`   ${err}`);
                }
            } else {
                results.fixtures_skipped++;
                console.log(`⚠️ ${flow}/${file}: ${result.errors.join(', ')}`);
            }
        }
    }

    // Write report
    const reportPath = path.join(OUTPUT_DIR, 'report.md');
    fs.writeFileSync(reportPath, generateReport());

    // Write JSON results
    const jsonPath = path.join(OUTPUT_DIR, 'report.json');
    fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

    console.log(`\nReport: ${reportPath}`);

    // Summary
    console.log('\n=========================================');
    console.log('SUMMARY');
    console.log('=========================================');
    console.log(`Total: ${results.fixtures_total}`);
    console.log(`Passed: ${results.fixtures_passed}`);
    console.log(`Failed: ${results.fixtures_failed}`);
    console.log(`Skipped: ${results.fixtures_skipped}`);
    console.log(`Gate: ${results.fixtures_failed === 0 && results.fixtures_skipped === 0 ? 'PASS ✅' : 'FAIL ❌'}`);

    process.exit(results.fixtures_failed > 0 || results.fixtures_skipped > 0 ? 1 : 0);
}

main();
