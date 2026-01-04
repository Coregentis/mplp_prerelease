/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */

import { Context, Plan, Trace, ValidationResult } from '../types';
import { validate as uuidValidate } from 'uuid';

/**
 * Validates a Single Agent (SA) execution context against the SA Profile invariants.
 * 
 * Invariants enforced:
 * 1. sa_requires_context: Context ID must be UUID v4
 * 2. sa_context_must_be_active: Context status must be 'active'
 * 3. sa_plan_context_binding: Plan.context_id == Context.id
 * 4. sa_plan_has_steps: Plan.steps.length >= 1
 * 5. sa_steps_have_valid_ids: All step_ids are UUID v4
 * 6. sa_steps_have_agent_role: All steps have agent_role
 * 7. sa_trace_not_empty: Trace.events.length >= 1 (checked post-execution)
 * 8. sa_trace_context_binding: Trace.context_id == Context.id
 * 9. sa_trace_plan_binding: Trace.plan_id == Plan.id
 */
export function validateSAProfile(
    context: Context,
    plan: Plan,
    trace?: Trace
): ValidationResult {
    const errors: string[] = [];

    // 1. sa_requires_context
    if (!uuidValidate(context.id)) {
        errors.push(`sa_requires_context: Context ID ${context.id} is not a valid UUID v4`);
    }

    // 2. sa_context_must_be_active
    if (context.status !== 'active') {
        errors.push(`sa_context_must_be_active: Context status is '${context.status}', expected 'active'`);
    }

    // 3. sa_plan_context_binding
    if (plan.context_id !== context.id) {
        errors.push(`sa_plan_context_binding: Plan context_id ${plan.context_id} does not match Context ID ${context.id}`);
    }

    // 4. sa_plan_has_steps
    if (!plan.steps || plan.steps.length === 0) {
        errors.push('sa_plan_has_steps: Plan must contain at least one step');
    }

    // 5. sa_steps_have_valid_ids & 6. sa_steps_have_agent_role
    if (plan.steps) {
        plan.steps.forEach((step, index) => {
            if (!step.step_id || !uuidValidate(step.step_id)) {
                errors.push(`sa_steps_have_valid_ids: Step at index ${index} has invalid step_id`);
            }
            if (!step.agent_role) {
                errors.push(`sa_steps_have_agent_role: Step ${step.step_id || index} missing agent_role`);
            }
        });
    }

    // Trace validation (if trace provided)
    if (trace) {
        // 7. sa_trace_not_empty
        if (!trace.events || trace.events.length === 0) {
            errors.push('sa_trace_not_empty: Trace must contain at least one event');
        }

        // 8. sa_trace_context_binding
        if (trace.context_id !== context.id) {
            errors.push(`sa_trace_context_binding: Trace context_id ${trace.context_id} does not match Context ID`);
        }

        // 9. sa_trace_plan_binding
        if (trace.plan_id !== plan.id) {
            errors.push(`sa_trace_plan_binding: Trace plan_id ${trace.plan_id} does not match Plan ID`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
