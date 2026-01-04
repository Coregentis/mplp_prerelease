import { LearningSample, LearningEventFamily } from './types';
import { LearningValidationError, makeLearnError } from './errors';

export interface ValidationResult {
    valid: boolean;
    errors: LearningValidationError[];
}

/**
 * Validates a LearningSample against the 12 invariants defined in
 * schemas/v2/invariants/learning-invariants.yaml
 */
export function validateLearningSample(sample: LearningSample): ValidationResult {
    const errors: LearningValidationError[] = [];

    // --- Core Invariants ---

    // 1. learning_sample_id_is_uuid
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!sample.sample_id || !uuidRegex.test(sample.sample_id)) {
        errors.push(makeLearnError(
            'learning_sample_id_is_uuid',
            `sample_id must be a valid UUID v4. Got: ${sample.sample_id}`,
            '/sample_id',
            { value: sample.sample_id }
        ));
    }

    // 2. learning_sample_family_non_empty
    if (!sample.sample_family || sample.sample_family.trim() === '') {
        errors.push(makeLearnError(
            'learning_sample_family_non_empty',
            `sample_family must be non-empty.`,
            '/sample_family'
        ));
    } else if (!Object.values(LearningEventFamily).includes(sample.sample_family)) {
        errors.push(makeLearnError(
            'learning_sample_family_non_empty',
            `sample_family must be a valid LearningEventFamily. Got: ${sample.sample_family}`,
            '/sample_family',
            { value: sample.sample_family }
        ));
    }

    // 3. learning_sample_created_at_iso
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:?\d{2}))?$/;
    if (!sample.created_at || !isoDateRegex.test(sample.created_at)) {
        errors.push(makeLearnError(
            'learning_sample_created_at_iso',
            `created_at must be a valid ISO 8601 timestamp. Got: ${sample.created_at}`,
            '/created_at',
            { value: sample.created_at }
        ));
    }

    // 4. learning_sample_has_input_section
    if (!sample.input || typeof sample.input !== 'object') {
        errors.push(makeLearnError(
            'learning_sample_has_input_section',
            `input section is required and must be an object.`,
            '/input'
        ));
    }

    // 5. learning_sample_has_output_section
    if (!sample.output || typeof sample.output !== 'object') {
        errors.push(makeLearnError(
            'learning_sample_has_output_section',
            `output section is required and must be an object.`,
            '/output'
        ));
    }

    // 6. learning_sample_feedback_label_valid (Optional)
    if (sample.meta && sample.meta.human_feedback_label) {
        const validLabels = ['approved', 'rejected', 'not_reviewed'];
        if (!validLabels.includes(sample.meta.human_feedback_label)) {
            errors.push(makeLearnError(
                'learning_sample_feedback_label_valid',
                `human_feedback_label must be one of: ${validLabels.join(', ')}. Got: ${sample.meta.human_feedback_label}`,
                '/meta/human_feedback_label',
                { value: sample.meta.human_feedback_label, allowed: validLabels }
            ));
        }
    }

    // 7. learning_sample_source_flow_non_empty (Optional)
    if (sample.meta && sample.meta.source_flow_id !== undefined) {
        if (typeof sample.meta.source_flow_id !== 'string' || sample.meta.source_flow_id.trim() === '') {
            errors.push(makeLearnError(
                'learning_sample_source_flow_non_empty',
                `source_flow_id must be a non-empty string if present.`,
                '/meta/source_flow_id'
            ));
        }
    }

    // --- Family-Specific Invariants ---

    const input = (sample.input || {}) as any;
    const output = (sample.output || {}) as any;
    const state = (sample.state || {}) as any;

    if (sample.sample_family === LearningEventFamily.IntentResolution) {
        // 8. learning_intent_has_intent_id
        if (!input.intent_id || typeof input.intent_id !== 'string' || input.intent_id.trim() === '') {
            errors.push(makeLearnError(
                'learning_intent_has_intent_id',
                `Intent resolution samples must have non-empty intent_id in input.`,
                '/input/intent_id'
            ));
        }

        // 9. learning_intent_quality_label_valid (Optional)
        if (output.resolution_quality_label) {
            const validQuality = ['good', 'acceptable', 'bad', 'unknown'];
            if (!validQuality.includes(output.resolution_quality_label)) {
                errors.push(makeLearnError(
                    'learning_intent_quality_label_valid',
                    `resolution_quality_label must be one of: ${validQuality.join(', ')}. Got: ${output.resolution_quality_label}`,
                    '/output/resolution_quality_label',
                    { value: output.resolution_quality_label, allowed: validQuality }
                ));
            }
        }
    }

    if (sample.sample_family === LearningEventFamily.DeltaImpact) {
        // 10. learning_delta_has_delta_id
        if (!input.delta_id || typeof input.delta_id !== 'string' || input.delta_id.trim() === '') {
            errors.push(makeLearnError(
                'learning_delta_has_delta_id',
                `Delta impact samples must have non-empty delta_id in input.`,
                '/input/delta_id'
            ));
        }

        // 11. learning_delta_scope_valid
        const validScope = ['local', 'module', 'system', 'global'];
        if (!output.impact_scope || !validScope.includes(output.impact_scope)) {
            errors.push(makeLearnError(
                'learning_delta_scope_valid',
                `impact_scope must be one of: ${validScope.join(', ')}. Got: ${output.impact_scope}`,
                '/output/impact_scope',
                { value: output.impact_scope, allowed: validScope }
            ));
        }

        // 12. learning_delta_risk_valid (Optional)
        if (state.risk_level) {
            const validRisk = ['low', 'medium', 'high', 'critical'];
            if (!validRisk.includes(state.risk_level)) {
                errors.push(makeLearnError(
                    'learning_delta_risk_valid',
                    `risk_level must be one of: ${validRisk.join(', ')}. Got: ${state.risk_level}`,
                    '/state/risk_level',
                    { value: state.risk_level, allowed: validRisk }
                ));
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
