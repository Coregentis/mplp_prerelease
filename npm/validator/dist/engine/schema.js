"use strict";
/**
 * MPLP Validator - Schema Validation Engine
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * Standalone AJV-based schema validation.
 * Does NOT depend on @mplp/schema or @mplp/core.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaDir = getSchemaDir;
exports.validateSchema = validateSchema;
exports.listSchemas = listSchemas;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const fs_1 = require("fs");
const path_1 = require("path");
// Cache for loaded schemas
const schemaCache = new Map();
/**
 * Get the default schema directory (embedded in package)
 */
function getSchemaDir() {
    // In dist: ../assets/schemas (relative to dist/engine/)
    // Fallback to package root /schemas
    const embeddedPath = (0, path_1.join)(__dirname, '..', 'assets', 'schemas');
    if ((0, fs_1.existsSync)(embeddedPath)) {
        return embeddedPath;
    }
    // Try from package root
    const packageSchemas = (0, path_1.join)(__dirname, '..', '..', 'schemas');
    if ((0, fs_1.existsSync)(packageSchemas)) {
        return packageSchemas;
    }
    throw new Error('Schema directory not found. Use --schema to specify path.');
}
/**
 * Load a schema by name from the schema directory
 */
function loadSchema(schemaName, schemaDir) {
    const cacheKey = `${schemaDir}:${schemaName}`;
    if (schemaCache.has(cacheKey)) {
        return schemaCache.get(cacheKey);
    }
    const schemaPath = (0, path_1.join)(schemaDir, `${schemaName}.schema.json`);
    if (!(0, fs_1.existsSync)(schemaPath)) {
        throw new Error(`Schema not found: ${schemaPath}`);
    }
    const content = (0, fs_1.readFileSync)(schemaPath, 'utf-8');
    const schema = JSON.parse(content);
    schemaCache.set(cacheKey, schema);
    return schema;
}
/**
 * Load all referenced schemas (common types, etc.)
 */
function loadReferencedSchemas(schemaDir, ajv) {
    const commonDir = (0, path_1.join)(schemaDir, 'common');
    if ((0, fs_1.existsSync)(commonDir)) {
        const files = (0, fs_1.readdirSync)(commonDir).filter(f => f.endsWith('.schema.json'));
        for (const file of files) {
            try {
                const content = (0, fs_1.readFileSync)((0, path_1.join)(commonDir, file), 'utf-8');
                const schema = JSON.parse(content);
                if (schema.$id) {
                    ajv.addSchema(schema);
                }
            }
            catch {
                // ignore parse errors in referenced schemas
            }
        }
    }
}
/**
 * Create a configured AJV instance
 */
function createAjv(schemaDir) {
    const ajv = new ajv_1.default({
        strict: false,
        allErrors: true,
        verbose: true
    });
    (0, ajv_formats_1.default)(ajv);
    loadReferencedSchemas(schemaDir, ajv);
    return ajv;
}
/**
 * Validate data against a schema
 * @returns Array of validation errors (empty if valid)
 */
function validateSchema(schemaName, data, schemaDir) {
    const errors = [];
    try {
        const schema = loadSchema(schemaName, schemaDir);
        const ajv = createAjv(schemaDir);
        const validate = ajv.compile(schema);
        const valid = validate(data);
        if (!valid && validate.errors) {
            for (const err of validate.errors) {
                let message = err.message || 'Unknown validation error';
                // Enhance additionalProperties errors with the specific field name
                if (err.keyword === 'additionalProperties' && err.params) {
                    const extra = err.params.additionalProperty;
                    if (extra) {
                        message = `${message} (extra: "${extra}")`;
                    }
                }
                errors.push({
                    schema: schemaName,
                    path: err.instancePath || '/',
                    message
                });
            }
        }
    }
    catch (err) {
        errors.push({
            schema: schemaName,
            path: '',
            message: err.message
        });
    }
    return errors;
}
/**
 * List available schema names
 */
function listSchemas(schemaDir) {
    try {
        return (0, fs_1.readdirSync)(schemaDir)
            .filter(f => f.startsWith('mplp-') && f.endsWith('.schema.json'))
            .map(f => f.replace('.schema.json', ''));
    }
    catch {
        return [];
    }
}
