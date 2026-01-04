from dataclasses import dataclass, field
from typing import Dict, Any, Optional

@dataclass
class LearningValidationError:
    error_code: str
    invariant_id: str
    message: str
    path: str
    details: Optional[Dict[str, Any]] = None

LEARN_INV = {
    "learning_sample_id_is_uuid": "LEARN_INV_learning_sample_id_is_uuid",
    "learning_sample_family_non_empty": "LEARN_INV_learning_sample_family_non_empty",
    "learning_sample_created_at_iso": "LEARN_INV_learning_sample_created_at_iso",
    "learning_sample_has_input_section": "LEARN_INV_learning_sample_has_input_section",
    "learning_sample_has_output_section": "LEARN_INV_learning_sample_has_output_section",
    "learning_sample_feedback_label_valid": "LEARN_INV_learning_sample_feedback_label_valid",
    "learning_sample_source_flow_non_empty": "LEARN_INV_learning_sample_source_flow_non_empty",
    "learning_intent_has_intent_id": "LEARN_INV_learning_intent_has_intent_id",
    "learning_intent_quality_label_valid": "LEARN_INV_learning_intent_quality_label_valid",
    "learning_delta_has_delta_id": "LEARN_INV_learning_delta_has_delta_id",
    "learning_delta_scope_valid": "LEARN_INV_learning_delta_scope_valid",
    "learning_delta_risk_valid": "LEARN_INV_learning_delta_risk_valid",
}

def make_learn_error(
    invariant_id: str,
    message: str,
    path: str,
    details: Optional[Dict[str, Any]] = None
) -> LearningValidationError:
    return LearningValidationError(
        error_code=LEARN_INV.get(invariant_id, f"LEARN_INV_{invariant_id}"),
        invariant_id=invariant_id,
        message=message,
        path=path,
        details=details
    )
