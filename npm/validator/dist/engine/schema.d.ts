/**
 * MPLP Validator - Schema Validation Engine
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * Standalone AJV-based schema validation.
 * Does NOT depend on @mplp/schema or @mplp/core.
 */
export interface ValidationError {
    file?: string;
    schema: string;
    path: string;
    message: string;
}
/**
 * Get the default schema directory (embedded in package)
 */
export declare function getSchemaDir(): string;
/**
 * Validate data against a schema
 * @returns Array of validation errors (empty if valid)
 */
export declare function validateSchema(schemaName: string, data: unknown, schemaDir: string): ValidationError[];
/**
 * List available schema names
 */
export declare function listSchemas(schemaDir: string): string[];
//# sourceMappingURL=schema.d.ts.map