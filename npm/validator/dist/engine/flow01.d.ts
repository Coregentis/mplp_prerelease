/**
 * MPLP Validator - Golden Flow 01 Validation
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * Minimal Golden Flow 01 assertions.
 * This is the "most likely to fail" flow for new projects.
 */
/**
 * Golden Flow 01: Single Agent Basic Plan
 *
 * Required artifacts:
 * - context.json
 * - plan.json
 * - trace.json (optional but recommended)
 *
 * Invariants:
 * - context.context_id must be UUID v4
 * - context.status must be "active"
 * - plan.context_id must match context.context_id
 * - plan.steps must have at least 1 step
 * - each step must have a UUID v4 step_id
 */
export declare function validateGoldenFlow01(inputPath: string): string[];
//# sourceMappingURL=flow01.d.ts.map