import { LearningSample, LearningEventFamily } from '../../src/learning/types';

export const BASELINE_SAMPLE: LearningSample = {
    sample_id: "550e8400-e29b-41d4-a716-446655440000",
    sample_family: LearningEventFamily.IntentResolution,
    created_at: "2025-01-01T00:00:00Z",
    input: {
        intent_id: "intent-001"
    },
    output: {
        resolution_quality_label: "good" // Using 'good' as it is in the valid enum list from Validator
    },
    state: {
        risk_level: "low"
    },
    meta: {
        human_feedback_label: "approved", // Using 'approved' as it is in the valid enum list from Validator
        source_flow_id: "flow-01"
    }
};

export function createMinValidSample(): LearningSample {
    // Deep copy to avoid mutation
    return JSON.parse(JSON.stringify(BASELINE_SAMPLE));
}
