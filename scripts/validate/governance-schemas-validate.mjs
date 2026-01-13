#!/usr/bin/env node
/**
 * Governance Schemas Validator (Ajv 2020-12)
 * 
 * Purpose: Validate governance artifacts against 2020-12 schemas
 * Used by: S0 Lock, CI gates
 * 
 * Validates:
 * - Claim Catalog
 * - Capability Coverage Matrix
 * - Equivalence Record (when exists)
 */

import fs from 'fs';
import path from 'path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const GOVERNANCE_VALIDATIONS = [
    {
        name: 'Claim Catalog',
        schema: 'governance/schemas/claim-catalog.schema.json',
        data: 'governance/06-artifacts/CLAIM_CATALOG.v1.0.0.json',
        required: true
    },
    {
        name: 'Capability Coverage Matrix',
        schema: 'governance/schemas/capability-coverage-matrix.schema.json',
        data: 'governance/06-artifacts/CAPABILITY_COVERAGE_MATRIX.v1.0.0.json',
        required: true
    },
    {
        name: 'Equivalence Record (gf-01)',
        schema: 'governance/schemas/equivalence-record.schema.json',
        data: 'Validation_Lab/releases/v0.2/artifacts/equivalence/gf-01.json',
        required: false  // Will exist after Phase II
    }
];

function readJson(filepath) {
    if (!fs.existsSync(filepath)) {
        return null;
    }
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

try {
    // Initialize Ajv with 2020-12 support
    const ajv = new Ajv2020({
        allErrors: true,
        strict: false,
        validateFormats: true
    });
    addFormats(ajv);

    console.log('Governance Schema Validator (2020-12)\n');
    console.log('='.repeat(50) + '\n');

    let passed = 0;
    let failed = 0;
    let skipped = 0;

    for (const validation of GOVERNANCE_VALIDATIONS) {
        const schemaPath = validation.schema;
        const dataPath = validation.data;

        // Check if data file exists
        if (!fs.existsSync(dataPath)) {
            if (validation.required) {
                console.error(`❌ ${validation.name}: Data file missing (${dataPath})`);
                failed++;
            } else {
                console.log(`⏳ ${validation.name}: Skipped (${dataPath} not yet created)`);
                skipped++;
            }
            continue;
        }

        // Check if schema file exists
        if (!fs.existsSync(schemaPath)) {
            console.error(`❌ ${validation.name}: Schema file missing (${schemaPath})`);
            failed++;
            continue;
        }

        // Load and validate
        const schema = readJson(schemaPath);
        const data = readJson(dataPath);

        const validate = ajv.compile(schema);
        const valid = validate(data);

        if (valid) {
            console.log(`✓ ${validation.name}: PASS`);
            passed++;
        } else {
            console.error(`❌ ${validation.name}: FAIL`);
            for (const err of validate.errors || []) {
                console.error(`   - ${err.instancePath || '/'}: ${err.message}`);
            }
            failed++;
        }
    }

    console.log('\n' + '='.repeat(50));
    console.log(`\nResults: ${passed} passed, ${failed} failed, ${skipped} skipped\n`);

    if (failed > 0) {
        console.error('❌ Governance schema validation FAILED\n');
        process.exit(1);
    }

    console.log('✅ Governance schema validation PASSED\n');
    process.exit(0);

} catch (error) {
    console.error(`\n❌ Validator crashed: ${error.message}\n`);
    console.error(error.stack);
    process.exit(1);
}
