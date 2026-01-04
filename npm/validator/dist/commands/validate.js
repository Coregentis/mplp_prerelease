"use strict";
/**
 * MPLP Validator - Validate Command
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCommand = validateCommand;
const fs_1 = require("fs");
const path_1 = require("path");
const schema_1 = require("../engine/schema");
const flow01_1 = require("../engine/flow01");
async function validateCommand(options) {
    const result = {
        success: true,
        schemaErrors: [],
        flowErrors: []
    };
    const inputPath = options.input;
    const schemaDir = options.schema || (0, schema_1.getSchemaDir)();
    // 1. Check input directory exists
    if (!(0, fs_1.existsSync)(inputPath)) {
        error(`Input directory not found: ${inputPath}`);
        process.exit(2);
    }
    // 2. Schema Validation
    const artifacts = findArtifacts(inputPath);
    if (artifacts.length === 0) {
        error(`No MPLP artifacts found in: ${inputPath}`);
        process.exit(2);
    }
    for (const artifact of artifacts) {
        const schemaName = inferSchemaName(artifact.name);
        if (!schemaName)
            continue;
        try {
            const data = JSON.parse((0, fs_1.readFileSync)(artifact.path, 'utf-8'));
            const errors = (0, schema_1.validateSchema)(schemaName, data, schemaDir);
            if (errors.length > 0) {
                result.success = false;
                result.schemaErrors.push(...errors.map(e => ({
                    ...e,
                    file: artifact.path
                })));
            }
        }
        catch (err) {
            result.success = false;
            result.schemaErrors.push({
                file: artifact.path,
                schema: schemaName,
                path: '',
                message: `JSON parse error: ${err.message}`
            });
        }
    }
    // 3. Golden Flow Validation (if flow-01)
    if (options.flow === 'golden-flow-01') {
        const flowErrors = (0, flow01_1.validateGoldenFlow01)(inputPath);
        if (flowErrors.length > 0) {
            result.success = false;
            result.flowErrors = flowErrors;
        }
    }
    // 4. Output
    if (options.json) {
        console.log(JSON.stringify(result, null, 2));
    }
    else {
        printResult(result);
    }
    // 5. Exit code
    process.exit(result.success ? 0 : 1);
}
function findArtifacts(dir) {
    const artifacts = [];
    try {
        const files = (0, fs_1.readdirSync)(dir);
        for (const file of files) {
            if (file.endsWith('.json')) {
                artifacts.push({
                    name: file,
                    path: (0, path_1.join)(dir, file)
                });
            }
        }
    }
    catch {
        // ignore
    }
    return artifacts;
}
function inferSchemaName(filename) {
    const base = (0, path_1.basename)(filename, '.json').toLowerCase();
    const mapping = {
        'context': 'mplp-context',
        'plan': 'mplp-plan',
        'confirm': 'mplp-confirm',
        'trace': 'mplp-trace',
        'role': 'mplp-role',
        'dialog': 'mplp-dialog',
        'collab': 'mplp-collab',
        'extension': 'mplp-extension',
        'core': 'mplp-core',
        'network': 'mplp-network'
    };
    return mapping[base] || null;
}
function printResult(result) {
    if (result.success) {
        console.log('[MPLP] 鉁?Validation passed');
        return;
    }
    console.log('[MPLP] 鉂?Validation failed\n');
    if (result.schemaErrors.length > 0) {
        console.log('Schema errors:');
        for (const err of result.schemaErrors) {
            console.log(`  - file: ${err.file}`);
            console.log(`    schema: ${err.schema}`);
            console.log(`    error: ${err.path} ${err.message}`);
            console.log('');
        }
    }
    if (result.flowErrors.length > 0) {
        console.log('Golden Flow errors:');
        for (const err of result.flowErrors) {
            console.log(`  - ${err}`);
        }
    }
}
function error(msg) {
    console.error(`[MPLP] 鉂?${msg}`);
}
