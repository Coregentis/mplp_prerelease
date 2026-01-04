import { describe, test, expect, beforeEach } from 'vitest';
import { LearningCollector } from '../src/learning/collector';
import { collectLearningSample } from '../src/learning/hooks';
import { MplpEvent, EventFamily } from '../src/observability/types';
import { LearningEventFamily } from '../src/learning/types';

describe('Learning Collection Hooks', () => {
    let collector: LearningCollector;

    beforeEach(() => {
        collector = new LearningCollector({ enabled: true });
    });

    test('Disabled collector should not collect samples', () => {
        collector.setEnabled(false);
        const event: MplpEvent = {
            event_id: 'evt-1',
            event_type: 'SAPlanEvaluated',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: { plan_id: 'plan-1', step_count: 5 }
        };
        collector.onEvent(event);
        expect(collector.flush()).toHaveLength(0);
    });

    test('Intent Resolution: SAPlanEvaluated', () => {
        const event: MplpEvent = {
            event_id: 'evt-1',
            event_type: 'SAPlanEvaluated',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: { plan_id: 'plan-1', step_count: 5, execution_id: 'exec-1' }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.IntentResolution);
        expect(samples[0].input.intent_id).toBe('plan-1');
    });

    test('Pipeline Outcome: SAStepCompleted', () => {
        const event: MplpEvent = {
            event_id: 'evt-2',
            event_type: 'SAStepCompleted',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: {
                execution_id: 'exec-1',
                step_id: 'step-1',
                executor_kind: 'agent',
                duration_ms: 100
            }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.PipelineOutcome);
        expect(samples[0].output.status).toBe('completed');
    });

    test('Delta Impact: DeltaIntentEvent', () => {
        const event: MplpEvent = {
            event_id: 'evt-3',
            event_type: 'DeltaIntentEvent',
            event_family: EventFamily.RuntimeExecution, // Mock family
            timestamp: new Date().toISOString(),
            payload: {
                delta_id: 'delta-1',
                intent_id: 'intent-1',
                change_summary: 'change',
                impact_summary: 'impact',
                impact_scope: 'local',
                risk_level: 'low',
                execution_id: 'exec-1'
            }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.DeltaImpact);
        expect(samples[0].state?.risk_level).toBe('low');
    });

    test('Confirm Decision: ConfirmDecisionAdded', () => {
        const event: MplpEvent = {
            event_id: 'evt-4',
            event_type: 'ConfirmDecisionAdded',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: {
                confirm_id: 'conf-1',
                target_type: 'plan',
                target_id: 'plan-1',
                decision: 'approve',
                execution_id: 'exec-1'
            }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.ConfirmDecision);
        expect(samples[0].output.decision).toBe('approve');
    });

    test('Graph Evolution: GraphUpdateEvent', () => {
        const event: MplpEvent = {
            event_id: 'evt-5',
            event_type: 'GraphUpdateEvent',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: {
                change_type: 'node_added',
                nodes_added: 1,
                execution_id: 'exec-1'
            }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.GraphEvolution);
        expect(samples[0].output.nodes_added).toBe(1);
    });

    test('Multi-Agent Coordination: MAPSessionCompleted', () => {
        const event: MplpEvent = {
            event_id: 'evt-6',
            event_type: 'MAPSessionCompleted',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: {
                session_id: 'sess-1',
                mode: 'turn_based',
                participant_count: 3,
                total_turns: 10,
                outcome: 'success',
                execution_id: 'exec-1'
            }
        };
        collector.onEvent(event);
        const samples = collector.flush();
        expect(samples).toHaveLength(1);
        expect(samples[0].sample_family).toBe(LearningEventFamily.MultiAgentCoordination);
        expect(samples[0].output.total_turns).toBe(10);
    });

    test('Invalid Sample Dropped', () => {
        // Create an event that produces an invalid sample (missing required field)
        // We'll mock collectLearningSample to return an invalid sample for this test
        // Or we can rely on the fact that if we pass bad payload, the sample might be invalid
        // But collectLearningSample fills defaults.
        // Let's try to pass an invalid enum value if possible.

        const event: MplpEvent = {
            event_id: 'evt-bad',
            event_type: 'DeltaIntentEvent',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: {
                delta_id: 'delta-1',
                intent_id: 'intent-1',
                change_summary: 'change',
                impact_scope: 'invalid_scope', // Invalid Enum
                execution_id: 'exec-1'
            }
        };

        collector.onEvent(event);
        const samples = collector.flush();
        // Should be dropped because validation fails
        expect(samples).toHaveLength(0);
    });
});
