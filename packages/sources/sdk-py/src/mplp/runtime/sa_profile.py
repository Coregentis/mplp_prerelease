# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import List, NamedTuple, Optional
from uuid import UUID
from ..models.core import Context, Plan, Trace

class ValidationResult(NamedTuple):
    valid: bool
    errors: List[str]

def validate_sa_profile(context: Context, plan: Plan, trace: Optional[Trace] = None) -> ValidationResult:
    """
    Validates a Single Agent (SA) execution context against the SA Profile invariants.
    
    Invariants enforced:
    1. sa_requires_context: Context ID must be UUID v4 (Enforced by Pydantic)
    2. sa_context_must_be_active: Context status must be 'active'
    3. sa_plan_context_binding: Plan.context_id == Context.id
    4. sa_plan_has_steps: Plan.steps.length >= 1
    5. sa_steps_have_valid_ids: All step_ids are UUID v4 (Enforced by Pydantic)
    6. sa_steps_have_agent_role: All steps have agent_role (Enforced by Pydantic)
    7. sa_trace_not_empty: Trace.events.length >= 1 (checked post-execution)
    8. sa_trace_context_binding: Trace.context_id == Context.id
    9. sa_trace_plan_binding: Trace.plan_id == Plan.id
    """
    errors = []

    # 2. sa_context_must_be_active
    if context.status != 'active':
        errors.append(f"sa_context_must_be_active: Context status is '{context.status}', expected 'active'")

    # 3. sa_plan_context_binding
    if plan.context_id != context.context_id:
        errors.append(f"sa_plan_context_binding: Plan context_id {plan.context_id} does not match Context ID {context.context_id}")

    # 4. sa_plan_has_steps
    if not plan.steps or len(plan.steps) == 0:
        errors.append("sa_plan_has_steps: Plan must contain at least one step")

    # Trace validation (if trace provided)
    if trace:
        # 7. sa_trace_not_empty
        if not trace.events or len(trace.events) == 0:
            errors.append("sa_trace_not_empty: Trace must contain at least one event")

        # 8. sa_trace_context_binding
        if trace.context_id != context.context_id:
            errors.append(f"sa_trace_context_binding: Trace context_id {trace.context_id} does not match Context ID")

        # 9. sa_trace_plan_binding
        if trace.plan_id != plan.plan_id:
            errors.append(f"sa_trace_plan_binding: Trace plan_id {trace.plan_id} does not match Plan ID")

    return ValidationResult(valid=len(errors) == 0, errors=errors)
