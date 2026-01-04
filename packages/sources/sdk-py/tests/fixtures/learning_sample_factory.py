from uuid import UUID
from datetime import datetime
from mplp.learning.types import LearningSample, LearningEventFamily, LearningSampleMeta

def create_min_valid_sample() -> LearningSample:
    return LearningSample(
        sample_id=UUID("550e8400-e29b-41d4-a716-446655440000"),
        sample_family=LearningEventFamily.intent_resolution,
        created_at=datetime.fromisoformat("2025-01-01T00:00:00+00:00"),
        input={
            "intent_id": "intent-001"
        },
        output={
            "resolution_quality_label": "good"
        },
        state={
            "risk_level": "low"
        },
        meta=LearningSampleMeta(
            human_feedback_label="approved",
            source_flow_id="flow-01"
        )
    )
