/**
 * MPLP Learning Types
 * Derived from schemas/v2/learning/mplp-learning-sample-core.schema.json
 * and schemas/v2/taxonomy/learning-taxonomy.yaml
 */

/**
 * Learning Sample Families
 * Strictly aligned with learning-taxonomy.yaml IDs
 */
export enum LearningEventFamily {
    IntentResolution = "intent_resolution",
    DeltaImpact = "delta_impact",
    PipelineOutcome = "pipeline_outcome",
    ConfirmDecision = "confirm_decision",
    GraphEvolution = "graph_evolution",
    MultiAgentCoordination = "multi_agent_coordination"
}

/**
 * Learning Sample Metadata
 * Derived from schemas/v2/learning/mplp-learning-sample-core.schema.json
 */
export interface LearningSampleMeta {
    source_flow_id?: string;
    source_event_ids?: string[];
    project_id?: string;
    human_feedback_label?: 'approved' | 'rejected' | 'not_reviewed';
    quality_score?: number;
    [key: string]: unknown;
}

/**
 * Learning Sample Structure
 * Derived from schemas/v2/learning/mplp-learning-sample-core.schema.json
 * Note: Schema defines a flat structure for core fields.
 */
export interface LearningSample {
    sample_id: string;           // UUID v4
    sample_family: LearningEventFamily;
    created_at: string;          // ISO 8601

    input: Record<string, unknown>;
    output: Record<string, unknown>;
    state?: Record<string, unknown>;

    meta?: LearningSampleMeta;
}
