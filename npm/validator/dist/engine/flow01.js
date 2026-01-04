"use strict";
/**
 * MPLP Validator - Golden Flow 01 Validation
 * 漏 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * Minimal Golden Flow 01 assertions.
 * This is the "most likely to fail" flow for new projects.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGoldenFlow01 = validateGoldenFlow01;
const fs_1 = require("fs");
const path_1 = require("path");
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
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
function validateGoldenFlow01(inputPath) {
    const errors = [];
    // 1. Load artifacts
    const contextPath = (0, path_1.join)(inputPath, 'context.json');
    const planPath = (0, path_1.join)(inputPath, 'plan.json');
    if (!(0, fs_1.existsSync)(contextPath)) {
        errors.push('Missing required artifact: context.json');
        return errors;
    }
    if (!(0, fs_1.existsSync)(planPath)) {
        errors.push('Missing required artifact: plan.json');
        return errors;
    }
    let context;
    let plan;
    try {
        context = JSON.parse((0, fs_1.readFileSync)(contextPath, 'utf-8'));
    }
    catch {
        errors.push('context.json: Invalid JSON');
        return errors;
    }
    try {
        plan = JSON.parse((0, fs_1.readFileSync)(planPath, 'utf-8'));
    }
    catch {
        errors.push('plan.json: Invalid JSON');
        return errors;
    }
    // 2. Context invariants
    if (!context.context_id) {
        errors.push('context: missing context_id');
    }
    else if (!UUID_V4_REGEX.test(context.context_id)) {
        errors.push(`context: context_id must be UUID v4, got "${context.context_id}"`);
    }
    if (context.status !== 'active') {
        errors.push(`context: status must be "active", got "${context.status}"`);
    }
    // 3. Plan invariants
    if (!plan.plan_id) {
        errors.push('plan: missing plan_id');
    }
    else if (!UUID_V4_REGEX.test(plan.plan_id)) {
        errors.push(`plan: plan_id must be UUID v4, got "${plan.plan_id}"`);
    }
    if (!plan.context_id) {
        errors.push('plan: missing context_id');
    }
    else if (context.context_id && plan.context_id !== context.context_id) {
        errors.push(`plan: context_id mismatch (expected "${context.context_id}", got "${plan.context_id}")`);
    }
    if (!plan.steps || !Array.isArray(plan.steps)) {
        errors.push('plan: missing or invalid steps array');
    }
    else if (plan.steps.length === 0) {
        errors.push('plan: steps array must have at least 1 step');
    }
    else {
        for (let i = 0; i < plan.steps.length; i++) {
            const step = plan.steps[i];
            if (!step.step_id) {
                errors.push(`plan: steps[${i}] missing step_id`);
            }
            else if (!UUID_V4_REGEX.test(step.step_id)) {
                errors.push(`plan: steps[${i}].step_id must be UUID v4`);
            }
        }
    }
    return errors;
}
