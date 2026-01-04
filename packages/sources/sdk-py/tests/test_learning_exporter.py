import pytest
import json
from uuid import UUID
from datetime import datetime
from mplp.learning.exporter import export_learning_ndjson, generate_learning_manifest_lite, sha256_hex, ExportOptions, LearningExportValidationError
from mplp.learning.types import LearningSample, LearningEventFamily, LearningSampleMeta
from .fixtures.learning_sample_factory import create_min_valid_sample

# Fixed Known Vector Sample
KNOWN_VECTOR_SAMPLE = LearningSample(
    sample_id=UUID("00000000-0000-4000-8000-000000000000"),
    sample_family=LearningEventFamily.intent_resolution,
    created_at=datetime.fromisoformat("2025-01-01T00:00:00.000+00:00"),
    input={
        "intent_id": "fixed-intent-id",
        "z_key": "check-sort",
        "a_key": "check-sort"
    },
    output={
        "resolution_quality_label": "good"
    },
    meta=LearningSampleMeta(
        human_feedback_label="approved"
    )
)

EXPECTED_NDJSON_LINE = '{"created_at":"2025-01-01T00:00:00.000Z","input":{"a_key":"check-sort","intent_id":"fixed-intent-id","z_key":"check-sort"},"meta":{"human_feedback_label":"approved"},"output":{"resolution_quality_label":"good"},"sample_family":"intent_resolution","sample_id":"00000000-0000-4000-8000-000000000000"}'

class TestLearningExporter:

    def test_export_ndjson_roundtrip_fail_fast(self):
        samples = [create_min_valid_sample(), create_min_valid_sample(), create_min_valid_sample()]
        ndjson = export_learning_ndjson(samples)
        
        assert ndjson.endswith('\n')
        lines = [l for l in ndjson.split('\n') if l]
        assert len(lines) == 3
        
        for line in lines:
            parsed = json.loads(line)
            # Basic check
            assert parsed['sample_family'] == 'intent_resolution'

    def test_export_fail_fast_blocks_on_invalid(self):
        valid = create_min_valid_sample()
        invalid = create_min_valid_sample()
        # Bypass Pydantic to create invalid state for validator
        object.__setattr__(invalid, 'sample_id', None)
        
        samples = [valid, invalid, valid]
        
        with pytest.raises(LearningExportValidationError) as excinfo:
            export_learning_ndjson(samples)
        
        err = excinfo.value
        assert err.code == "LEARNING_EXPORT_VALIDATION_FAILED"
        assert err.invalid_count >= 1
        assert err.first_error_index == 1

    def test_export_skip_invalid_outputs_only_valid_and_records_invalid_count_in_manifest(self):
        valid = create_min_valid_sample()
        invalid = create_min_valid_sample()
        object.__setattr__(invalid, 'sample_id', None)
        
        samples = [valid, invalid, valid]
        options = ExportOptions(mode="skip_invalid")
        
        ndjson = export_learning_ndjson(samples, options)
        manifest = generate_learning_manifest_lite(samples, ndjson, options)
        
        lines = [l for l in ndjson.split('\n') if l]
        assert len(lines) == 2
        assert manifest.count == 2
        assert manifest.invalid_count == 1
        assert manifest.ndjson_sha256 == sha256_hex(ndjson)

    def test_manifest_hash_matches_known_vector(self):
        ndjson = export_learning_ndjson([KNOWN_VECTOR_SAMPLE])
        expected = EXPECTED_NDJSON_LINE + '\n'
        
        assert ndjson == expected
        
        hash_val = sha256_hex(ndjson)
        assert hash_val == sha256_hex(expected)

    def test_manifest_contains_truth_meta_fields(self):
        samples = [create_min_valid_sample()]
        ndjson = export_learning_ndjson(samples)
        manifest = generate_learning_manifest_lite(samples, ndjson)
        
        assert manifest.protocol_version == "1.0.0"
        assert manifest.governance == "MPGC"
        assert manifest.frozen is True
        assert manifest.freeze_date == "2025-12-03"
        assert len(manifest.learning_taxonomy_sha256) == 64
