# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import Any, List, Dict, Optional
from datetime import datetime
from uuid import uuid4
from ..models.core import Context, Plan
from .sa_profile import validate_sa_profile
from ..observability.types import MplpEvent, EventFamily
from ..observability.validator import validate_event
from ..observability.exporter import export_ndjson
from ..learning.collector import LearningCollector

class ExecutionResult:
    def __init__(self, status: str, artifacts: Any):
        self.status = status
        self.artifacts = artifacts

class ExecutionEngine:
    def __init__(self):
        self.event_log: List[MplpEvent] = []
        # Default disabled as per Route B
        self.learning_collector = LearningCollector(enabled=False)

    def emit_event(self, event: MplpEvent):
        validation = validate_event(event)
        if not validation.valid:
            print(f"[Observability] Invalid event emitted: {validation.errors}")
            # In strict mode, we might throw here. For now, we warn.
        self.event_log.append(event)
        
        # Hook point
        self.learning_collector.on_event(event)

    def get_events(self) -> List[MplpEvent]:
        return self.event_log

    def export_events(self) -> str:
        return export_ndjson(self.event_log) or ""

    def run_single_agent(self, context: Context, plan: Plan) -> ExecutionResult:
        self.event_log = []
        sa_id = f"sa-{uuid4()}"
        start_time = datetime.utcnow()

        # Helper to create typed events
        def create_event(event_type: str, family: EventFamily, payload: Dict[str, Any]) -> MplpEvent:
            return MplpEvent(
                event_id=str(uuid4()),
                event_type=event_type,
                event_family=family,
                timestamp=datetime.utcnow().isoformat() + "Z",
                payload=payload
            )

        # 1. Emit SAInitialized
        self.emit_event(create_event('SAInitialized', EventFamily.RUNTIME_EXECUTION, {
            'execution_id': sa_id,
            'executor_kind': 'agent',
            'status': 'pending',
            'runtime_version': '1.0.6',
            'capabilities': ['code.write', 'code.review']
        }))

        # 2. Validate Invariants (Pre-execution)
        validation = validate_sa_profile(context, plan)
        if not validation.valid:
            print(f"SA Profile Validation Failed: {validation.errors}")
            return ExecutionResult(status="failed", artifacts={'errors': validation.errors})

        # 3. Emit SAContextLoaded
        self.emit_event(create_event('SAContextLoaded', EventFamily.RUNTIME_EXECUTION, {
            'execution_id': sa_id,
            'executor_kind': 'agent',
            'status': 'running',
            'context_id': str(context.context_id),
            'context_status': context.status
        }))

        # 4. Emit SAPlanEvaluated
        self.emit_event(create_event('SAPlanEvaluated', EventFamily.RUNTIME_EXECUTION, {
            'execution_id': sa_id,
            'executor_kind': 'agent',
            'status': 'running',
            'plan_id': str(plan.plan_id),
            'step_count': len(plan.steps),
            'execution_order': [str(s.step_id) for s in plan.steps]
        }))

        # 5. Execute Steps
        steps_succeeded = 0
        steps_failed = 0

        for step in plan.steps:
            # Emit SAStepStarted
            self.emit_event(create_event('SAStepStarted', EventFamily.RUNTIME_EXECUTION, {
                'execution_id': sa_id,
                'executor_kind': 'agent',
                'status': 'running',
                'step_id': str(step.step_id),
                'agent_role': step.agent_role,
                'order_index': plan.steps.index(step)
            }))

            try:
                # Simulate execution
                print(f"Executing step {step.step_id} ({step.agent_role})...")
                # Simulate work...
                
                # Emit SAStepCompleted
                self.emit_event(create_event('SAStepCompleted', EventFamily.RUNTIME_EXECUTION, {
                    'execution_id': sa_id,
                    'executor_kind': 'agent',
                    'status': 'completed',
                    'step_id': str(step.step_id),
                    'duration_ms': 100
                }))
                steps_succeeded += 1
            except Exception as e:
                # Emit SAStepFailed
                self.emit_event(create_event('SAStepFailed', EventFamily.RUNTIME_EXECUTION, {
                    'execution_id': sa_id,
                    'executor_kind': 'agent',
                    'status': 'failed',
                    'step_id': str(step.step_id),
                    'error_message': str(e)
                }))
                steps_failed += 1

            # Emit SATraceEmitted
            # Mapping TraceEvent to RuntimeExecution family as per 12-family constraint
            self.emit_event(create_event('SATraceEmitted', EventFamily.RUNTIME_EXECUTION, {
                'execution_id': sa_id,
                'executor_kind': 'agent',
                'status': 'running',
                'trace_id': f"trace-{uuid4()}",
                'events_written': len(self.event_log)
            }))

        # 6. Emit SACompleted
        status = 'completed' if steps_failed == 0 else 'failed'
        self.emit_event(create_event('SACompleted', EventFamily.RUNTIME_EXECUTION, {
            'execution_id': sa_id,
            'executor_kind': 'agent',
            'status': status,
            'plan_id': str(plan.plan_id),
            'steps_executed': steps_succeeded + steps_failed,
            'steps_succeeded': steps_succeeded,
            'steps_failed': steps_failed,
            'total_duration_ms': (datetime.utcnow() - start_time).total_seconds() * 1000
        }))

        return ExecutionResult(status=status, artifacts={'events': self.event_log})
