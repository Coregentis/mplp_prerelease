import { validateLearningSample } from '../src/learning/validator';
import { LEARN_INV } from '../src/learning/errors';
import { createMinValidSample } from './fixtures/learningSampleFactory';
import { LearningEventFamily } from '../src/learning/types';

describe('Learning Invariants Validator', () => {

    // --- 1. learning_sample_id_is_uuid ---
    test('PASS: learning_sample_id_is_uuid', () => {
        const sample = createMinValidSample();
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_id_is_uuid', () => {
        const sample = createMinValidSample();
        sample.sample_id = "not-a-uuid";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_id_is_uuid,
            path: '/sample_id'
        }));
    });

    // --- 2. learning_sample_family_non_empty ---
    test('PASS: learning_sample_family_non_empty', () => {
        const sample = createMinValidSample();
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_family_non_empty (empty)', () => {
        const sample = createMinValidSample();
        (sample as any).sample_family = "";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_family_non_empty,
            path: '/sample_family'
        }));
    });

    test('FAIL: learning_sample_family_non_empty (invalid enum)', () => {
        const sample = createMinValidSample();
        (sample as any).sample_family = "unknown_family";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_family_non_empty,
            path: '/sample_family'
        }));
    });

    // --- 3. learning_sample_created_at_iso ---
    test('PASS: learning_sample_created_at_iso', () => {
        const sample = createMinValidSample();
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_created_at_iso', () => {
        const sample = createMinValidSample();
        sample.created_at = "yesterday";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_created_at_iso,
            path: '/created_at'
        }));
    });

    // --- 4. learning_sample_has_input_section ---
    test('PASS: learning_sample_has_input_section', () => {
        const sample = createMinValidSample();
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_has_input_section', () => {
        const sample = createMinValidSample();
        (sample as any).input = null;
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_has_input_section,
            path: '/input'
        }));
    });

    // --- 5. learning_sample_has_output_section ---
    test('PASS: learning_sample_has_output_section', () => {
        const sample = createMinValidSample();
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_has_output_section', () => {
        const sample = createMinValidSample();
        (sample as any).output = null;
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_has_output_section,
            path: '/output'
        }));
    });

    // --- 6. learning_sample_feedback_label_valid ---
    test('PASS: learning_sample_feedback_label_valid', () => {
        const sample = createMinValidSample();
        sample.meta!.human_feedback_label = "approved";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_feedback_label_valid', () => {
        const sample = createMinValidSample();
        (sample.meta as any).human_feedback_label = "good"; // Invalid enum
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_feedback_label_valid,
            path: '/meta/human_feedback_label'
        }));
    });

    // --- 7. learning_sample_source_flow_non_empty ---
    test('PASS: learning_sample_source_flow_non_empty', () => {
        const sample = createMinValidSample();
        sample.meta!.source_flow_id = "flow-123";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_sample_source_flow_non_empty', () => {
        const sample = createMinValidSample();
        sample.meta!.source_flow_id = "";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_sample_source_flow_non_empty,
            path: '/meta/source_flow_id'
        }));
    });

    // --- 8. learning_intent_has_intent_id ---
    test('PASS: learning_intent_has_intent_id', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.IntentResolution;
        sample.input = { intent_id: "intent-001" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_intent_has_intent_id', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.IntentResolution;
        sample.input = {}; // Missing intent_id
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_intent_has_intent_id,
            path: '/input/intent_id'
        }));
    });

    // --- 9. learning_intent_quality_label_valid ---
    test('PASS: learning_intent_quality_label_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.IntentResolution;
        sample.output = { resolution_quality_label: "good" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_intent_quality_label_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.IntentResolution;
        sample.output = { resolution_quality_label: "excellent" }; // Invalid enum
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_intent_quality_label_valid,
            path: '/output/resolution_quality_label'
        }));
    });

    // --- 10. learning_delta_has_delta_id ---
    test('PASS: learning_delta_has_delta_id', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = { delta_id: "delta-001" };
        // Need to fix output/state to be valid for Delta too if they were specific to Intent in baseline
        sample.output = { impact_scope: "local" };
        sample.state = { risk_level: "low" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_delta_has_delta_id', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = {}; // Missing delta_id
        sample.output = { impact_scope: "local" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_delta_has_delta_id,
            path: '/input/delta_id'
        }));
    });

    // --- 11. learning_delta_scope_valid ---
    test('PASS: learning_delta_scope_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = { delta_id: "delta-001" };
        sample.output = { impact_scope: "global" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_delta_scope_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = { delta_id: "delta-001" };
        sample.output = { impact_scope: "universe" }; // Invalid enum
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_delta_scope_valid,
            path: '/output/impact_scope'
        }));
    });

    // --- 12. learning_delta_risk_valid ---
    test('PASS: learning_delta_risk_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = { delta_id: "delta-001" };
        sample.output = { impact_scope: "local" };
        sample.state = { risk_level: "critical" };
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(true);
    });

    test('FAIL: learning_delta_risk_valid', () => {
        const sample = createMinValidSample();
        sample.sample_family = LearningEventFamily.DeltaImpact;
        sample.input = { delta_id: "delta-001" };
        sample.output = { impact_scope: "local" };
        sample.state = { risk_level: "apocalyptic" }; // Invalid enum
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.objectContaining({
            error_code: LEARN_INV.learning_delta_risk_valid,
            path: '/state/risk_level'
        }));
    });

    // --- System Tests ---

    test('System: Multi-Error Accumulation', () => {
        const sample = createMinValidSample();
        sample.sample_id = "bad-uuid";
        sample.created_at = "bad-date";
        const result = validateLearningSample(sample);
        expect(result.valid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(2);
        expect(result.errors).toContainEqual(expect.objectContaining({ error_code: LEARN_INV.learning_sample_id_is_uuid }));
        expect(result.errors).toContainEqual(expect.objectContaining({ error_code: LEARN_INV.learning_sample_created_at_iso }));
    });

    test('System: Stable Ordering', () => {
        const sample = createMinValidSample();
        sample.sample_id = "bad-uuid";
        sample.created_at = "bad-date";

        const result1 = validateLearningSample(sample);
        const result2 = validateLearningSample(sample);

        const codes1 = result1.errors.map(e => e.error_code);
        const codes2 = result2.errors.map(e => e.error_code);

        expect(codes1).toEqual(codes2);
    });

});
