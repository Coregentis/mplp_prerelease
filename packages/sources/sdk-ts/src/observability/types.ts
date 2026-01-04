/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

// import { Metadata } from '../types'; // Metadata not exported from types/index.ts yet

export interface Metadata {
    [key: string]: any;
}


/**
 * Event Families as defined in schemas/v2/taxonomy/event-taxonomy.yaml
 */
/**
 * Event Families as defined in schemas/v2/invariants/observability-invariants.yaml
 * (Strict alignment: 12 families)
 */
export enum EventFamily {
    ImportProcess = 'import_process',
    Intent = 'intent',
    DeltaIntent = 'delta_intent',
    ImpactAnalysis = 'impact_analysis',
    CompensationPlan = 'compensation_plan',
    Methodology = 'methodology',
    ReasoningGraph = 'reasoning_graph',
    PipelineStage = 'pipeline_stage',
    GraphUpdate = 'graph_update',
    RuntimeExecution = 'runtime_execution',
    CostBudget = 'cost_budget',
    ExternalIntegration = 'external_integration'
}

export interface MplpEvent {
    event_id: string;
    event_type: string;
    event_family: EventFamily;
    timestamp: string; // ISO 8601
    payload: Record<string, any>;
    meta?: Metadata;
}

export interface TraceSpan {
    trace_id: string;
    span_id: string;
    context_id: string;
    name?: string;
    status: 'running' | 'completed' | 'failed';
}

export interface ObservabilityConfig {
    exporter?: {
        type: 'ndjson' | 'console';
        path?: string; // For ndjson file output
    };
    validation?: {
        enforceInvariants: boolean;
    };
}
