# © 2026 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

import pytest
from uuid import uuid4
from datetime import datetime
from mplp.observability.types import MplpEvent, EventFamily
from mplp.observability.validator import validate_event

@pytest.fixture
def valid_event():
    return MplpEvent(
        event_id=str(uuid4()),
        event_type="TestEvent",
        event_family=EventFamily.RUNTIME_EXECUTION,
        timestamp=datetime.utcnow().isoformat() + "Z",
        payload={
            "execution_id": str(uuid4()),
            "executor_kind": "agent",
            "status": "running"
        }
    )

def test_valid_event(valid_event):
    result = validate_event(valid_event)
    assert result.valid
    assert len(result.errors) == 0

def test_invalid_event_id(valid_event):
    valid_event.event_id = "invalid-uuid"
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_event_id_is_uuid" in e for e in result.errors)

def test_empty_event_type(valid_event):
    valid_event.event_type = ""
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_event_type_non_empty" in e for e in result.errors)

def test_invalid_timestamp(valid_event):
    valid_event.timestamp = "2025/12/30"
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_timestamp_iso_format" in e for e in result.errors)

def test_runtime_missing_execution_id(valid_event):
    del valid_event.payload["execution_id"]
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_runtime_event_has_execution_id" in e for e in result.errors)

def test_runtime_invalid_executor(valid_event):
    valid_event.payload["executor_kind"] = "invalid"
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_runtime_executor_kind_valid" in e for e in result.errors)

def test_pipeline_missing_id(valid_event):
    # Change to PipelineStage event
    valid_event.event_family = EventFamily.PIPELINE_STAGE
    valid_event.payload = {
        "stage_id": "stage-1",
        "stage_status": "pending"
    }
    # Missing pipeline_id
    result = validate_event(valid_event)
    assert not result.valid
    assert any("obs_pipeline_event_has_pipeline_id" in e for e in result.errors)
