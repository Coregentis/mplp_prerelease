from typing import Optional
from uuid import uuid4
from datetime import datetime, timezone
from ..observability.types import MplpEvent
from .types import LearningSample, LearningEventFamily, LearningSampleMeta

def collect_learning_sample(event: MplpEvent) -> Optional[LearningSample]:
    """
    Derives a LearningSample from an MplpEvent if applicable.
    Strictly follows Route B: Minimum Set.
    """
    payload = event.payload
    
    # 1. Intent Resolution
    if event.event_type == 'SAPlanEvaluated':
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.intent_resolution,
            created_at=datetime.now(timezone.utc),
            input={
                "intent_id": payload.get("plan_id", "unknown-intent"),
                "raw_request_summary": "Derived from SAPlanEvaluated"
            },
            output={
                "final_intent_summary": "Plan Generated",
                "plan_id": payload.get("plan_id"),
                "plan_step_count": payload.get("step_count")
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    # 2. Delta Impact
    if event.event_type in ['ImpactAnalysisEvent', 'DeltaIntentEvent']:
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.delta_impact,
            created_at=datetime.now(timezone.utc),
            input={
                "delta_id": payload.get("delta_id", "unknown-delta"),
                "intent_id": payload.get("intent_id", "unknown-intent"),
                "change_summary": payload.get("change_summary", "Unknown change")
            },
            output={
                "actual_impact_summary": payload.get("impact_summary", "Pending analysis"),
                "impact_scope": payload.get("impact_scope", "local")
            },
            state={
                "risk_level": payload.get("risk_level", "low")
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    # 3. Pipeline Outcome
    if event.event_type == 'SAStepCompleted':
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.pipeline_outcome,
            created_at=datetime.now(timezone.utc),
            input={
                "pipeline_id": payload.get("execution_id"),
                "stage_id": payload.get("step_id"),
                "stage_config": {"agent_role": payload.get("executor_kind")}
            },
            output={
                "status": "completed",
                "duration_ms": payload.get("duration_ms")
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    # 4. Confirm Decision
    if event.event_type == 'ConfirmDecisionAdded':
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.confirm_decision,
            created_at=datetime.now(timezone.utc),
            input={
                "confirm_id": payload.get("confirm_id", "unknown-confirm"),
                "target_type": payload.get("target_type", "plan"),
                "target_id": payload.get("target_id", "unknown-target")
            },
            output={
                "decision": payload.get("decision", "approve"),
                "reasoning": payload.get("reasoning", "No reasoning provided")
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    # 5. Graph Evolution
    if event.event_type == 'GraphUpdateEvent':
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.graph_evolution,
            created_at=datetime.now(timezone.utc),
            input={
                "trigger_event_id": event.event_id,
                "change_type": payload.get("change_type", "node_added")
            },
            output={
                "nodes_added": payload.get("nodes_added", 0),
                "edges_added": payload.get("edges_added", 0)
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    # 6. Multi-Agent Coordination
    if event.event_type == 'MAPSessionCompleted':
        return LearningSample(
            sample_id=uuid4(),
            sample_family=LearningEventFamily.multi_agent_coordination,
            created_at=datetime.now(timezone.utc),
            input={
                "session_id": payload.get("session_id", "unknown-session"),
                "coordination_mode": payload.get("mode", "turn_based"),
                "participant_count": payload.get("participant_count", 2)
            },
            output={
                "total_turns": payload.get("total_turns", 0),
                "outcome": payload.get("outcome", "success")
            },
            meta=LearningSampleMeta(
                source_flow_id=payload.get("execution_id"),
                source_event_ids=[event.event_id]
            )
        )

    return None
