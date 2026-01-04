# MPLP v1.0.0 FROZEN
# Governance: MPGC

import pytest
from uuid import uuid4
from datetime import datetime, timezone
from mplp.models.core import Context, Plan, PlanStep, MAPSession, MAPParticipant
from mplp.models.common import Metadata
from mplp.runtime.sa_profile import validate_sa_profile
from mplp.coordination.map_profile import validate_map_profile

# Mock Metadata
def get_meta():
    return Metadata(
        protocol_version="1.0.0",
        schema_version="1.0.0",
        frozen=True,
        governance="MPGC",
        layer="Tools"
    )

def test_sa_profile_validation_valid():
    context_id = uuid4()
    context = Context(
        meta=get_meta(),
        context_id=context_id,
        root={},
        title="Test Context",
        status="active"
    )
    
    plan = Plan(
        meta=get_meta(),
        plan_id=uuid4(),
        context_id=context_id,
        title="Test Plan",
        objective="Test",
        status="pending",
        steps=[
            PlanStep(step_id=uuid4(), description="Step 1", agent_role="coder")
        ]
    )
    
    result = validate_sa_profile(context, plan)
    assert result.valid
    assert len(result.errors) == 0

def test_sa_profile_validation_invalid_context_status():
    context_id = uuid4()
    context = Context(
        meta=get_meta(),
        context_id=context_id,
        root={},
        title="Test Context",
        status="draft" # Invalid for execution
    )
    
    plan = Plan(
        meta=get_meta(),
        plan_id=uuid4(),
        context_id=context_id,
        title="Test Plan",
        objective="Test",
        status="pending",
        steps=[
            PlanStep(step_id=uuid4(), description="Step 1", agent_role="coder")
        ]
    )
    
    result = validate_sa_profile(context, plan)
    assert not result.valid
    assert any("sa_context_must_be_active" in e for e in result.errors)

def test_map_profile_validation_valid():
    session = MAPSession(
        collab_id=uuid4(),
        mode="orchestrated",
        status="draft",
        created_at=datetime.now(timezone.utc),
        participants=[
            MAPParticipant(participant_id="p1", role_id=uuid4(), kind="agent"),
            MAPParticipant(participant_id="p2", role_id=uuid4(), kind="agent")
        ]
    )
    
    result = validate_map_profile(session)
    assert result.valid
    assert len(result.errors) == 0

def test_map_profile_validation_invalid_participants():
    session = MAPSession(
        collab_id=uuid4(),
        mode="orchestrated",
        status="draft",
        created_at=datetime.now(timezone.utc),
        participants=[
            MAPParticipant(participant_id="p1", role_id=uuid4(), kind="agent")
        ] # Only 1 participant
    )
    
    result = validate_map_profile(session)
    assert not result.valid
    assert any("map_session_requires_multiple_participants" in e for e in result.errors)
