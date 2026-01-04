import pytest
from datetime import datetime, timezone
from mplp.learning.collector import LearningCollector
from mplp.learning.types import LearningEventFamily
from mplp.observability.types import MplpEvent, EventFamily

class TestLearningCollectionHooks:
    
    @pytest.fixture
    def collector(self):
        return LearningCollector(enabled=True)

    def create_event(self, event_type, payload):
        return MplpEvent(
            event_id='evt-1',
            event_type=event_type,
            event_family=EventFamily.RUNTIME_EXECUTION,
            timestamp=datetime.now(timezone.utc).isoformat(),
            payload=payload
        )

    def test_disabled_collector_should_not_collect_samples(self, collector):
        collector.set_enabled(False)
        event = self.create_event('SAPlanEvaluated', {'plan_id': 'plan-1', 'step_count': 5})
        collector.on_event(event)
        assert len(collector.flush()) == 0

    def test_intent_resolution_sa_plan_evaluated(self, collector):
        event = self.create_event('SAPlanEvaluated', {'plan_id': 'plan-1', 'step_count': 5, 'execution_id': 'exec-1'})
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.intent_resolution
        assert samples[0].input['intent_id'] == 'plan-1'

    def test_pipeline_outcome_sa_step_completed(self, collector):
        event = self.create_event('SAStepCompleted', {
            'execution_id': 'exec-1', 
            'step_id': 'step-1', 
            'executor_kind': 'agent',
            'duration_ms': 100
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.pipeline_outcome
        assert samples[0].output['status'] == 'completed'

    def test_delta_impact_delta_intent_event(self, collector):
        event = self.create_event('DeltaIntentEvent', {
            'delta_id': 'delta-1', 
            'intent_id': 'intent-1', 
            'change_summary': 'change',
            'impact_summary': 'impact',
            'impact_scope': 'local',
            'risk_level': 'low',
            'execution_id': 'exec-1'
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.delta_impact
        assert samples[0].state['risk_level'] == 'low'

    def test_confirm_decision_added(self, collector):
        event = self.create_event('ConfirmDecisionAdded', {
            'confirm_id': 'conf-1', 
            'target_type': 'plan', 
            'target_id': 'plan-1',
            'decision': 'approve',
            'execution_id': 'exec-1'
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.confirm_decision
        assert samples[0].output['decision'] == 'approve'

    def test_graph_evolution_graph_update_event(self, collector):
        event = self.create_event('GraphUpdateEvent', {
            'change_type': 'node_added',
            'nodes_added': 1,
            'execution_id': 'exec-1'
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.graph_evolution
        assert samples[0].output['nodes_added'] == 1

    def test_multi_agent_coordination_map_session_completed(self, collector):
        event = self.create_event('MAPSessionCompleted', {
            'session_id': 'sess-1',
            'mode': 'turn_based',
            'participant_count': 3,
            'total_turns': 10,
            'outcome': 'success',
            'execution_id': 'exec-1'
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 1
        assert samples[0].sample_family == LearningEventFamily.multi_agent_coordination
        assert samples[0].output['total_turns'] == 10

    def test_invalid_sample_dropped(self, collector):
        event = self.create_event('DeltaIntentEvent', {
            'delta_id': 'delta-1', 
            'intent_id': 'intent-1', 
            'change_summary': 'change',
            'impact_scope': 'invalid_scope', # Invalid Enum
            'execution_id': 'exec-1'
        })
        collector.on_event(event)
        samples = collector.flush()
        assert len(samples) == 0
