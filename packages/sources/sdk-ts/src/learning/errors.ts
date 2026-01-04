export type LearningValidationError = {
    error_code: string;
    invariant_id: string;
    message: string;
    path: string;
    details?: Record<string, unknown>;
};

export const LEARN_INV = {
    learning_sample_id_is_uuid: "LEARN_INV_learning_sample_id_is_uuid",
    learning_sample_family_non_empty: "LEARN_INV_learning_sample_family_non_empty",
    learning_sample_created_at_iso: "LEARN_INV_learning_sample_created_at_iso",
    learning_sample_has_input_section: "LEARN_INV_learning_sample_has_input_section",
    learning_sample_has_output_section: "LEARN_INV_learning_sample_has_output_section",
    learning_sample_feedback_label_valid: "LEARN_INV_learning_sample_feedback_label_valid",
    learning_sample_source_flow_non_empty: "LEARN_INV_learning_sample_source_flow_non_empty",
    learning_intent_has_intent_id: "LEARN_INV_learning_intent_has_intent_id",
    learning_intent_quality_label_valid: "LEARN_INV_learning_intent_quality_label_valid",
    learning_delta_has_delta_id: "LEARN_INV_learning_delta_has_delta_id",
    learning_delta_scope_valid: "LEARN_INV_learning_delta_scope_valid",
    learning_delta_risk_valid: "LEARN_INV_learning_delta_risk_valid",
} as const;

export function makeLearnError(
    invariantId: keyof typeof LEARN_INV,
    message: string,
    path: string,
    details?: Record<string, unknown>
): LearningValidationError {
    return {
        error_code: LEARN_INV[invariantId],
        invariant_id: invariantId,
        message,
        path,
        details,
    };
}
