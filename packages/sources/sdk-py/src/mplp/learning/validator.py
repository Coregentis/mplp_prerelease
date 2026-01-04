from typing import List, NamedTuple, Any, Dict
from uuid import UUID
from .types import LearningSample, LearningEventFamily
from .errors import LearningValidationError, make_learn_error

class ValidationResult(NamedTuple):
    valid: bool
    errors: List[LearningValidationError]

def validate_learning_sample(sample: LearningSample) -> ValidationResult:
    """
    Validates a LearningSample against the 12 invariants defined in
    schemas/v2/invariants/learning-invariants.yaml
    """
    errors: List[LearningValidationError] = []
    
    # --- Core Invariants ---

    # 1. learning_sample_id_is_uuid
    if not sample.sample_id:
        errors.append(make_learn_error(
            "learning_sample_id_is_uuid",
            "sample_id is required.",
            "/sample_id"
        ))
    elif sample.sample_id.version != 4:
        errors.append(make_learn_error(
            "learning_sample_id_is_uuid",
            f"sample_id must be UUID v4. Got version: {sample.sample_id.version}",
            "/sample_id",
            {"value": str(sample.sample_id)}
        ))

    # 2. learning_sample_family_non_empty
    if not sample.sample_family:
        errors.append(make_learn_error(
            "learning_sample_family_non_empty",
            "sample_family is required.",
            "/sample_family"
        ))

    # 3. learning_sample_created_at_iso
    if not sample.created_at:
        errors.append(make_learn_error(
            "learning_sample_created_at_iso",
            "created_at is required.",
            "/created_at"
        ))

    # 4. learning_sample_has_input_section
    if sample.input is None or not isinstance(sample.input, dict):
        errors.append(make_learn_error(
            "learning_sample_has_input_section",
            "input section is required and must be a dictionary.",
            "/input"
        ))

    # 5. learning_sample_has_output_section
    if sample.output is None or not isinstance(sample.output, dict):
        errors.append(make_learn_error(
            "learning_sample_has_output_section",
            "output section is required and must be a dictionary.",
            "/output"
        ))

    # 6. learning_sample_feedback_label_valid (Optional)
    if sample.meta and sample.meta.human_feedback_label:
        label = sample.meta.human_feedback_label
        valid_labels = ['approved', 'rejected', 'not_reviewed']
        if label not in valid_labels:
            errors.append(make_learn_error(
                "learning_sample_feedback_label_valid",
                f"human_feedback_label must be one of: {', '.join(valid_labels)}. Got: {label}",
                "/meta/human_feedback_label",
                {"value": label, "allowed": valid_labels}
            ))
    
    # 7. learning_sample_source_flow_non_empty (Optional)
    if sample.meta and sample.meta.source_flow_id is not None:
        flow_id = sample.meta.source_flow_id
        if not isinstance(flow_id, str) or not flow_id.strip():
            errors.append(make_learn_error(
                "learning_sample_source_flow_non_empty",
                "source_flow_id must be a non-empty string if present.",
                "/meta/source_flow_id"
            ))

    # --- Family-Specific Invariants ---
    
    input_dict = sample.input if isinstance(sample.input, dict) else {}
    output_dict = sample.output if isinstance(sample.output, dict) else {}
    state_dict = sample.state if isinstance(sample.state, dict) else {}

    if sample.sample_family == LearningEventFamily.intent_resolution:
        # 8. learning_intent_has_intent_id
        intent_id = input_dict.get("intent_id")
        if not intent_id or not isinstance(intent_id, str) or not intent_id.strip():
            errors.append(make_learn_error(
                "learning_intent_has_intent_id",
                "Intent resolution samples must have non-empty intent_id in input.",
                "/input/intent_id"
            ))

        # 9. learning_intent_quality_label_valid (Optional)
        quality = output_dict.get("resolution_quality_label")
        if quality:
            valid_quality = ['good', 'acceptable', 'bad', 'unknown']
            if quality not in valid_quality:
                errors.append(make_learn_error(
                    "learning_intent_quality_label_valid",
                    f"resolution_quality_label must be one of: {', '.join(valid_quality)}. Got: {quality}",
                    "/output/resolution_quality_label",
                    {"value": quality, "allowed": valid_quality}
                ))

    if sample.sample_family == LearningEventFamily.delta_impact:
        # 10. learning_delta_has_delta_id
        delta_id = input_dict.get("delta_id")
        if not delta_id or not isinstance(delta_id, str) or not delta_id.strip():
            errors.append(make_learn_error(
                "learning_delta_has_delta_id",
                "Delta impact samples must have non-empty delta_id in input.",
                "/input/delta_id"
            ))

        # 11. learning_delta_scope_valid
        scope = output_dict.get("impact_scope")
        valid_scopes = ['local', 'module', 'system', 'global']
        if not scope or scope not in valid_scopes:
             errors.append(make_learn_error(
                 "learning_delta_scope_valid",
                 f"impact_scope must be one of: {', '.join(valid_scopes)}. Got: {scope}",
                 "/output/impact_scope",
                 {"value": scope, "allowed": valid_scopes}
             ))

        # 12. learning_delta_risk_valid (Optional)
        risk = state_dict.get("risk_level")
        if risk:
            valid_risks = ['low', 'medium', 'high', 'critical']
            if risk not in valid_risks:
                errors.append(make_learn_error(
                    "learning_delta_risk_valid",
                    f"risk_level must be one of: {', '.join(valid_risks)}. Got: {risk}",
                    "/state/risk_level",
                    {"value": risk, "allowed": valid_risks}
                ))

    return ValidationResult(valid=len(errors) == 0, errors=errors)
