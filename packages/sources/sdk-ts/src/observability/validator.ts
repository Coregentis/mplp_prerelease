/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { MplpEvent, EventFamily } from './types';
import { validate as uuidValidate } from 'uuid';

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

/**
 * Validates an MPLP event against Observability Invariants.
 * Derived from: schemas/v2/invariants/observability-invariants.yaml
 * 
 * Invariants enforced:
 * 1. obs_event_id_is_uuid
 * 2. obs_event_type_non_empty
 * 3. obs_event_family_valid
 * 4. obs_timestamp_iso_format
 * 5. obs_pipeline_event_has_pipeline_id (Conditional)
 * 6. obs_pipeline_stage_id_non_empty (Conditional)
 * 7. obs_pipeline_stage_status_valid (Conditional)
 * 8. obs_graph_event_has_graph_id (Conditional)
 * 9. obs_graph_update_kind_valid (Conditional)
 * 10. obs_runtime_event_has_execution_id (Conditional)
 * 11. obs_runtime_executor_kind_valid (Conditional)
 * 12. obs_runtime_status_valid (Conditional)
 */
export function validateEvent(event: MplpEvent): ValidationResult {
    const errors: string[] = [];

    // 1. obs_event_id_is_uuid
    if (!uuidValidate(event.event_id)) {
        errors.push(`obs_event_id_is_uuid: Event ID ${event.event_id} is not a valid UUID v4`);
    }

    // 2. obs_event_type_non_empty
    if (!event.event_type || event.event_type.trim() === '') {
        errors.push('obs_event_type_non_empty: Event type must be a non-empty string');
    }

    // 3. obs_event_family_valid
    if (!Object.values(EventFamily).includes(event.event_family)) {
        errors.push(`obs_event_family_valid: Invalid event family '${event.event_family}'`);
    }

    // 4. obs_timestamp_iso_format
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})$/;
    if (!iso8601Regex.test(event.timestamp)) {
        errors.push(`obs_timestamp_iso_format: Timestamp '${event.timestamp}' is not valid ISO 8601`);
    }

    // Conditional Invariants based on Event Family

    // PipelineStageEvent
    if (event.event_family === EventFamily.PipelineStage) {
        // 5. obs_pipeline_event_has_pipeline_id
        if (!event.payload.pipeline_id || !uuidValidate(event.payload.pipeline_id)) {
            errors.push('obs_pipeline_event_has_pipeline_id: Missing or invalid pipeline_id');
        }
        // 6. obs_pipeline_stage_id_non_empty
        if (!event.payload.stage_id || event.payload.stage_id.trim() === '') {
            errors.push('obs_pipeline_stage_id_non_empty: Missing or empty stage_id');
        }
        // 7. obs_pipeline_stage_status_valid
        const validStatuses = ['pending', 'running', 'completed', 'failed', 'skipped'];
        if (!validStatuses.includes(event.payload.stage_status)) {
            errors.push(`obs_pipeline_stage_status_valid: Invalid stage_status '${event.payload.stage_status}'`);
        }
    }

    // GraphUpdateEvent
    if (event.event_family === EventFamily.GraphUpdate) {
        // 8. obs_graph_event_has_graph_id
        if (!event.payload.graph_id || !uuidValidate(event.payload.graph_id)) {
            errors.push('obs_graph_event_has_graph_id: Missing or invalid graph_id');
        }
        // 9. obs_graph_update_kind_valid
        const validKinds = ['node_add', 'node_update', 'node_delete', 'edge_add', 'edge_update', 'edge_delete', 'bulk'];
        if (!validKinds.includes(event.payload.update_kind)) {
            errors.push(`obs_graph_update_kind_valid: Invalid update_kind '${event.payload.update_kind}'`);
        }
    }

    // RuntimeExecutionEvent
    if (event.event_family === EventFamily.RuntimeExecution) {
        // 10. obs_runtime_event_has_execution_id
        if (!event.payload.execution_id || !uuidValidate(event.payload.execution_id)) {
            errors.push('obs_runtime_event_has_execution_id: Missing or invalid execution_id');
        }
        // 11. obs_runtime_executor_kind_valid
        const validExecutors = ['agent', 'tool', 'llm', 'worker', 'external'];
        if (!validExecutors.includes(event.payload.executor_kind)) {
            errors.push(`obs_runtime_executor_kind_valid: Invalid executor_kind '${event.payload.executor_kind}'`);
        }
        // 12. obs_runtime_status_valid
        const validRuntimeStatuses = ['pending', 'running', 'completed', 'failed', 'cancelled'];
        if (!validRuntimeStatuses.includes(event.payload.status)) {
            errors.push(`obs_runtime_status_valid: Invalid status '${event.payload.status}'`);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
