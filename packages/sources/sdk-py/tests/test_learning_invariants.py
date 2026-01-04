import pytest
from uuid import UUID
from datetime import datetime
from mplp.learning.validator import validate_learning_sample
from mplp.learning.errors import LEARN_INV
from mplp.learning.types import LearningEventFamily
from .fixtures.learning_sample_factory import create_min_valid_sample

class TestLearningInvariants:
    
    # --- 1. learning_sample_id_is_uuid ---
    def test_pass_learning_sample_id_is_uuid(self):
        sample = create_min_valid_sample()
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_id_is_uuid(self):
        sample = create_min_valid_sample()
        # Pydantic validates UUID type, so we can't easily assign a string "not-a-uuid" to sample_id field directly
        # without Pydantic raising ValidationError before our validator runs.
        # However, our validator checks if sample_id is None or version 4.
        # To test the validator logic, we might need to bypass Pydantic or construct an invalid object if possible.
        # But since we are testing the *validator function* which takes a LearningSample object,
        # we assume the object is constructed. 
        # If Pydantic prevents construction, that's also a form of validation, but our validator adds specific checks (like v4).
        # Let's try to assign a v1 UUID to fail the v4 check.
        sample.sample_id = UUID("550e8400-e29b-11d4-a716-446655440000") 
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_id_is_uuid"] for e in result.errors)
        assert any(e.path == "/sample_id" for e in result.errors)

    # --- 2. learning_sample_family_non_empty ---
    def test_pass_learning_sample_family_non_empty(self):
        sample = create_min_valid_sample()
        result = validate_learning_sample(sample)
        assert result.valid is True

    # Note: Pydantic Enum prevents invalid strings. 
    # We can't easily test "empty string" or "invalid enum" if Pydantic enforces it at construction.
    # But we can test if we somehow bypass it or if the field is None (if optional, but it's required).
    # For the sake of the validator logic test, we can try to force it if possible, or accept that Pydantic handles it.
    # However, the validator has explicit checks. Let's try to mock or force.
    # Since we can't assign invalid enum to the field, we might skip this FAIL test for strict Pydantic models
    # OR we can use `construct` to bypass validation if needed, but `sample_family` is typed.
    # Let's assume for this test suite we are testing the validator's behavior on *malformed* data that somehow got in.
    # We can use `sample.sample_family = ""` if we cast or ignore types, but runtime Pydantic might complain.
    # Actually, Pydantic models are runtime enforced on assignment usually.
    # We will skip the "invalid enum" test if Pydantic catches it, but we can test "None" if we allow it in type but fail in validator.
    # But types.py says it is required. 
    # Let's try to use a mock object or just rely on the fact that if we *could* set it, it would fail.
    # For now, we'll try to set it and see. If it raises ValueError, we catch it? No, we want validator to return error.
    # If Pydantic raises, then the validator isn't reached.
    # The user requirement is "Validator must return error". 
    # If Pydantic raises, we might need to wrap construction in try/except in the application, but here we test the validator.
    # We will construct a sample using .construct() to bypass validation for testing purposes.
    def test_fail_learning_sample_family_non_empty(self):
        sample = create_min_valid_sample()
        # Bypass Pydantic validation
        object.__setattr__(sample, 'sample_family', "") 
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_family_non_empty"] for e in result.errors)

    # --- 3. learning_sample_created_at_iso ---
    def test_pass_learning_sample_created_at_iso(self):
        sample = create_min_valid_sample()
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_created_at_iso(self):
        sample = create_min_valid_sample()
        # Set to None to simulate missing/invalid
        object.__setattr__(sample, 'created_at', None)
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_created_at_iso"] for e in result.errors)

    # --- 4. learning_sample_has_input_section ---
    def test_pass_learning_sample_has_input_section(self):
        sample = create_min_valid_sample()
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_has_input_section(self):
        sample = create_min_valid_sample()
        sample.input = None # type: ignore
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_has_input_section"] for e in result.errors)
        assert any(e.path == "/input" for e in result.errors)

    # --- 5. learning_sample_has_output_section ---
    def test_pass_learning_sample_has_output_section(self):
        sample = create_min_valid_sample()
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_has_output_section(self):
        sample = create_min_valid_sample()
        sample.output = None # type: ignore
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_has_output_section"] for e in result.errors)
        assert any(e.path == "/output" for e in result.errors)

    # --- 6. learning_sample_feedback_label_valid ---
    def test_pass_learning_sample_feedback_label_valid(self):
        sample = create_min_valid_sample()
        sample.meta.human_feedback_label = "approved"
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_feedback_label_valid(self):
        sample = create_min_valid_sample()
        sample.meta.human_feedback_label = "good" # Invalid
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_feedback_label_valid"] for e in result.errors)
        assert any(e.path == "/meta/human_feedback_label" for e in result.errors)

    # --- 7. learning_sample_source_flow_non_empty ---
    def test_pass_learning_sample_source_flow_non_empty(self):
        sample = create_min_valid_sample()
        sample.meta.source_flow_id = "flow-123"
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_sample_source_flow_non_empty(self):
        sample = create_min_valid_sample()
        sample.meta.source_flow_id = ""
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_sample_source_flow_non_empty"] for e in result.errors)
        assert any(e.path == "/meta/source_flow_id" for e in result.errors)

    # --- 8. learning_intent_has_intent_id ---
    def test_pass_learning_intent_has_intent_id(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.intent_resolution
        sample.input = {"intent_id": "intent-001"}
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_intent_has_intent_id(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.intent_resolution
        sample.input = {}
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_intent_has_intent_id"] for e in result.errors)
        assert any(e.path == "/input/intent_id" for e in result.errors)

    # --- 9. learning_intent_quality_label_valid ---
    def test_pass_learning_intent_quality_label_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.intent_resolution
        sample.output = {"resolution_quality_label": "good"}
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_intent_quality_label_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.intent_resolution
        sample.output = {"resolution_quality_label": "excellent"}
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_intent_quality_label_valid"] for e in result.errors)
        assert any(e.path == "/output/resolution_quality_label" for e in result.errors)

    # --- 10. learning_delta_has_delta_id ---
    def test_pass_learning_delta_has_delta_id(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {"delta_id": "delta-001"}
        sample.output = {"impact_scope": "local"}
        sample.state = {"risk_level": "low"}
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_delta_has_delta_id(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {}
        sample.output = {"impact_scope": "local"}
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_delta_has_delta_id"] for e in result.errors)
        assert any(e.path == "/input/delta_id" for e in result.errors)

    # --- 11. learning_delta_scope_valid ---
    def test_pass_learning_delta_scope_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {"delta_id": "delta-001"}
        sample.output = {"impact_scope": "global"}
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_delta_scope_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {"delta_id": "delta-001"}
        sample.output = {"impact_scope": "universe"}
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_delta_scope_valid"] for e in result.errors)
        assert any(e.path == "/output/impact_scope" for e in result.errors)

    # --- 12. learning_delta_risk_valid ---
    def test_pass_learning_delta_risk_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {"delta_id": "delta-001"}
        sample.output = {"impact_scope": "local"}
        sample.state = {"risk_level": "critical"}
        result = validate_learning_sample(sample)
        assert result.valid is True

    def test_fail_learning_delta_risk_valid(self):
        sample = create_min_valid_sample()
        sample.sample_family = LearningEventFamily.delta_impact
        sample.input = {"delta_id": "delta-001"}
        sample.output = {"impact_scope": "local"}
        sample.state = {"risk_level": "apocalyptic"}
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert any(e.error_code == LEARN_INV["learning_delta_risk_valid"] for e in result.errors)
        assert any(e.path == "/state/risk_level" for e in result.errors)

    # --- System Tests ---

    def test_system_multi_error_accumulation(self):
        sample = create_min_valid_sample()
        sample.sample_id = UUID("550e8400-e29b-11d4-a716-446655440000") # v1 UUID
        object.__setattr__(sample, 'created_at', None) # Missing date
        result = validate_learning_sample(sample)
        assert result.valid is False
        assert len(result.errors) >= 2
        codes = [e.error_code for e in result.errors]
        assert LEARN_INV["learning_sample_id_is_uuid"] in codes
        assert LEARN_INV["learning_sample_created_at_iso"] in codes

    def test_system_stable_ordering(self):
        sample = create_min_valid_sample()
        sample.sample_id = UUID("550e8400-e29b-11d4-a716-446655440000")
        object.__setattr__(sample, 'created_at', None)
        
        result1 = validate_learning_sample(sample)
        result2 = validate_learning_sample(sample)
        
        codes1 = [e.error_code for e in result1.errors]
        codes2 = [e.error_code for e in result2.errors]
        
        assert codes1 == codes2
