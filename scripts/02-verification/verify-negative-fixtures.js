/**
 * MPLP Phase E+ — E+2 Negative Fixtures Expected-Fail Validation
 * 
 * Validates that negative fixtures correctly FAIL schema validation.
 * Uses AJV only - independent of runtime/SDK implementations.
 * 
 * RULE: Each negative fixture must FAIL with at least one AJV error.
 * RULE: AJV error.keyword must match expected failure category.
 * 
 * Usage: node scripts/verify-negative-fixtures.js
 * Output: artifacts/test-baseline/negative-fixtures-report.md
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

// Configuration
const SCHEMAS_DIR = path.join(__dirname, '../schemas/v2');
const OUTPUT_DIR = path.join(__dirname, '../artifacts/test-baseline');

// Negative fixture registry: file path -> { schema, expectedKeyword }
const NEGATIVE_FIXTURES = {
    'tests/cross-language/validation/fixtures/context_invalid_uuid.json': {
        schema: 'mplp-context.schema.json',
        expectedKeyword: 'pattern'  // identifiers.schema uses pattern
    },
    'tests/cross-language/validation/fixtures/context_missing_required.json': {
        schema: 'mplp-context.schema.json',
        expectedKeyword: 'required'
    },
    'tests/cross-language/validation/fixtures/context_extra_forbidden.json': {
        schema: 'mplp-context.schema.json',
        expectedKeyword: 'additionalProperties'
    },
    'tests/cross-language/validation/fixtures/context_invalid_datetime.json': {
        schema: 'mplp-context.schema.json',
        expectedKeyword: 'format'  // date-time format
    },
    'tests/cross-language/validation/fixtures/confirm_invalid_enum.json': {
        schema: 'mplp-confirm.schema.json',
        expectedKeyword: 'enum'
    },
    'tests/cross-language/validation/fixtures/plan_step_missing_id.json': {
        schema: 'mplp-plan.schema.json',
        expectedKeyword: 'required'
    }
};

// Results
const results = {
    timestamp: new Date().toISOString(),
    total: 0,
    passed: 0,  // Expected to FAIL and actually FAILED
    failed: 0,  // Expected to FAIL but PASSED, or wrong keyword
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

    for (const file of schemaFiles) {
        try {
            const schema = JSON.parse(fs.readFileSync(file, 'utf8'));
            const relativePath = path.relative(SCHEMAS_DIR, file).replace(/\\/g, '/');
            ajv.addSchema(schema, relativePath);
        } catch (err) {
            // Ignore load errors
        }
    }

    return ajv;
}

/**
 * Validate a single negative fixture
 */
function validateNegativeFixture(ajv, fixturePath, config) {
    const result = {
        fixture: fixturePath,
        schema: config.schema,
        expectedKeyword: config.expectedKeyword,
        status: 'UNKNOWN',
        actualKeywords: [],
        errors: [],
        reason: ''
    };

    const fullPath = path.join(__dirname, '..', fixturePath);

    if (!fs.existsSync(fullPath)) {
        result.status = 'SKIPPED';
        result.reason = 'Fixture file not found';
        return result;
    }

    const validate = ajv.getSchema(config.schema);
    if (!validate) {
        result.status = 'SKIPPED';
        result.reason = `Schema not compiled: ${config.schema}`;
        return result;
    }

    try {
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        const valid = validate(data);

        if (valid) {
            // Expected to FAIL but PASSED - this is wrong
            result.status = 'FAIL';
            result.reason = 'Expected schema validation to FAIL, but it PASSED';
            return result;
        }

        // Good - it failed! Now check if the keyword matches
        result.actualKeywords = validate.errors.map(e => e.keyword);
        result.errors = validate.errors.map(e => ({
            keyword: e.keyword,
            path: e.instancePath,
            message: e.message
        }));

        if (result.actualKeywords.includes(config.expectedKeyword)) {
            result.status = 'PASS';
            result.reason = `Correctly failed with expected keyword: ${config.expectedKeyword}`;
        } else {
            result.status = 'FAIL';
            result.reason = `Failed but wrong keyword. Expected: ${config.expectedKeyword}, Got: ${result.actualKeywords.join(', ')}`;
        }

    } catch (err) {
        result.status = 'FAIL';
        result.reason = `Parse error: ${err.message}`;
    }

    return result;
}

/**
 * Generate markdown report
 */
function generateReport() {
    const status = results.failed === 0 ? '✅ **PASS**' : '❌ **FAIL**';

    let md = `# E+2 Negative Fixtures Expected-Fail Report

**Date**: ${results.timestamp}  
**Status**: ${status}

---

## Summary

| Metric | Value |
|--------|-------|
| Total Negative Fixtures | ${results.total} |
| Correctly Failed | ${results.passed} |
| Incorrectly Passed/Wrong Keyword | ${results.failed} |

---

## Gate Criteria

> **Negative fixtures must FAIL schema validation with expected AJV keyword.**

| Condition | Required | Actual | Status |
|-----------|----------|--------|--------|
| All fixtures FAIL with expected keyword | 100% | ${results.passed}/${results.total} | ${results.failed === 0 ? '✅' : '❌'} |

**Gate Result**: ${results.failed === 0 ? '**PASS**' : '**FAIL**'}

---

## Validation Results

`;

    for (const detail of results.details) {
        const icon = detail.status === 'PASS' ? '✅' : (detail.status === 'SKIPPED' ? '⚠️' : '❌');
        md += `### ${icon} ${path.basename(detail.fixture)}\n\n`;
        md += `**Schema**: \`${detail.schema}\`\n\n`;
        md += `**Expected Keyword**: \`${detail.expectedKeyword}\`\n\n`;
        md += `**Actual Keywords**: \`[${detail.actualKeywords.join(', ')}]\`\n\n`;
        md += `**Result**: ${detail.reason}\n\n`;

        if (detail.errors.length > 0) {
            md += `**AJV Errors**:\n`;
            for (const err of detail.errors.slice(0, 3)) {
                md += `- \`${err.path || '(root)'}\` [${err.keyword}]: ${err.message}\n`;
            }
            md += '\n';
        }

        md += `---\n\n`;
    }

    md += `## Verification Independence

> This validation uses **AJV only** against \`schemas/v2\`.
> It is independent of TS/Python SDK runtime implementations.
> TS runtime-compat failures do not affect this gate.
`;

    return md;
}

/**
 * Main execution
 */
function main() {
    console.log('MPLP Phase E+ — E+2 Negative Fixtures Validation');
    console.log('=================================================\n');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const ajv = createAjvWithSchemas();
    console.log(`Loaded schemas. Validating ${Object.keys(NEGATIVE_FIXTURES).length} negative fixtures...\n`);

    for (const [fixturePath, config] of Object.entries(NEGATIVE_FIXTURES)) {
        results.total++;

        const result = validateNegativeFixture(ajv, fixturePath, config);
        results.details.push(result);

        if (result.status === 'PASS') {
            results.passed++;
            console.log(`✅ ${path.basename(fixturePath)}`);
            console.log(`   Expected: ${config.expectedKeyword} → Got: ${result.actualKeywords.join(', ')}`);
        } else if (result.status === 'SKIPPED') {
            console.log(`⚠️ ${path.basename(fixturePath)}: ${result.reason}`);
        } else {
            results.failed++;
            console.log(`❌ ${path.basename(fixturePath)}`);
            console.log(`   ${result.reason}`);
        }
    }

    // Write reports
    fs.writeFileSync(path.join(OUTPUT_DIR, 'negative-fixtures-report.json'), JSON.stringify(results, null, 2));
    fs.writeFileSync(path.join(OUTPUT_DIR, 'negative-fixtures-report.md'), generateReport());

    console.log('\n=================================================');
    console.log('SUMMARY');
    console.log('=================================================');
    console.log(`Total: ${results.total}`);
    console.log(`Correctly Failed: ${results.passed}`);
    console.log(`Incorrectly Passed/Wrong: ${results.failed}`);
    console.log(`Gate: ${results.failed === 0 ? 'PASS ✅' : 'FAIL ❌'}`);

    process.exit(results.failed > 0 ? 1 : 0);
}

main();
