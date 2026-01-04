# © 2026 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

import re
from uuid import UUID
from typing import List, Optional
from .types import MplpEvent, EventFamily

class ValidationResult:
    def __init__(self, valid: bool, errors: List[str]):
        self.valid = valid
        self.errors = errors

def is_valid_uuid(val: str) -> bool:
    try:
        UUID(val, version=4)
        return True
    except ValueError:
        return False

def is_iso8601(val: str) -> bool:
    # Basic ISO 8601 regex (YYYY-MM-DDTHH:MM:SS...)
    regex = r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$'
    return bool(re.match(regex, val))

def validate_event(event: MplpEvent) -> ValidationResult:
    """
    Validates an MPLP event against Observability Invariants.
    Derived from: schemas/v2/invariants/observability-invariants.yaml
    
    Invariants enforced:
    1. obs_event_id_is_uuid
    2. obs_event_type_non_empty
    3. obs_event_family_valid
    4. obs_timestamp_iso_format
    5. obs_pipeline_event_has_pipeline_id (Conditional)
    6. obs_pipeline_stage_id_non_empty (Conditional)
    7. obs_pipeline_stage_status_valid (Conditional)
    8. obs_graph_event_has_graph_id (Conditional)
    9. obs_graph_update_kind_valid (Conditional)
    10. obs_runtime_event_has_execution_id (Conditional)
    11. obs_runtime_executor_kind_valid (Conditional)
    12. obs_runtime_status_valid (Conditional)
    """
    errors = []

    # 1. obs_event_id_is_uuid
    if not is_valid_uuid(event.event_id):
        errors.append(f"obs_event_id_is_uuid: Event ID {event.event_id} is not a valid UUID v4")

    # 2. obs_event_type_non_empty
    if not event.event_type or not event.event_type.strip():
        errors.append("obs_event_type_non_empty: Event type must be a non-empty string")

    # 3. obs_event_family_valid
    # Pydantic validates Enum membership automatically, but we check explicitly for invariant mapping
    if event.event_family not in EventFamily:
        errors.append(f"obs_event_family_valid: Invalid event family '{event.event_family}'")

    # 4. obs_timestamp_iso_format
    if not is_iso8601(event.timestamp):
        errors.append(f"obs_timestamp_iso_format: Timestamp '{event.timestamp}' is not valid ISO 8601")

    # Conditional Invariants based on Event Family
    payload = event.payload

    # PipelineStageEvent
    if event.event_family == EventFamily.PIPELINE_STAGE:
        # 5. obs_pipeline_event_has_pipeline_id
        if 'pipeline_id' not in payload or not is_valid_uuid(str(payload.get('pipeline_id'))):
            errors.append("obs_pipeline_event_has_pipeline_id: Missing or invalid pipeline_id")
        
        # 6. obs_pipeline_stage_id_non_empty
        if 'stage_id' not in payload or not str(payload.get('stage_id')).strip():
            errors.append("obs_pipeline_stage_id_non_empty: Missing or empty stage_id")
        
        # 7. obs_pipeline_stage_status_valid
        valid_statuses = {'pending', 'running', 'completed', 'failed', 'skipped'}
        if payload.get('stage_status') not in valid_statuses:
            errors.append(f"obs_pipeline_stage_status_valid: Invalid stage_status '{payload.get('stage_status')}'")

    # GraphUpdateEvent
    if event.event_family == EventFamily.GRAPH_UPDATE:
        # 8. obs_graph_event_has_graph_id
        if 'graph_id' not in payload or not is_valid_uuid(str(payload.get('graph_id'))):
            errors.append("obs_graph_event_has_graph_id: Missing or invalid graph_id")
        
        # 9. obs_graph_update_kind_valid
        valid_kinds = {'node_add', 'node_update', 'node_delete', 'edge_add', 'edge_update', 'edge_delete', 'bulk'}
        if payload.get('update_kind') not in valid_kinds:
            errors.append(f"obs_graph_update_kind_valid: Invalid update_kind '{payload.get('update_kind')}'")

    # RuntimeExecutionEvent
    if event.event_family == EventFamily.RUNTIME_EXECUTION:
        # 10. obs_runtime_event_has_execution_id
        if 'execution_id' not in payload or not is_valid_uuid(str(payload.get('execution_id'))):
            errors.append("obs_runtime_event_has_execution_id: Missing or invalid execution_id")
        
        # 11. obs_runtime_executor_kind_valid
        valid_executors = {'agent', 'tool', 'llm', 'worker', 'external'}
        if payload.get('executor_kind') not in valid_executors:
            errors.append(f"obs_runtime_executor_kind_valid: Invalid executor_kind '{payload.get('executor_kind')}'")
        
        # 12. obs_runtime_status_valid
        valid_runtime_statuses = {'pending', 'running', 'completed', 'failed', 'cancelled'}
        if payload.get('status') not in valid_runtime_statuses:
            errors.append(f"obs_runtime_status_valid: Invalid status '{payload.get('status')}'")

    return ValidationResult(valid=len(errors) == 0, errors=errors)
