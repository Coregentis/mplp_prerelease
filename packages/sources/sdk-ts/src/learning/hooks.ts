import { v4 as uuidv4 } from 'uuid';
import { MplpEvent, EventFamily } from '../observability/types';
import { LearningSample, LearningEventFamily } from './types';

/**
 * Derives a LearningSample from an MplpEvent if applicable.
 * Strictly follows Route B: Minimum Set.
 */
export function collectLearningSample(event: MplpEvent): LearningSample | null {
    // 1. Intent Resolution
    // Trigger: SAPlanEvaluated (proxy for intent resolution in SA flow)
    if (event.event_type === 'SAPlanEvaluated') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.IntentResolution,
            created_at: new Date().toISOString(),
            input: {
                intent_id: event.payload.plan_id || "unknown-intent", // Proxy
                raw_request_summary: "Derived from SAPlanEvaluated"
            },
            output: {
                final_intent_summary: "Plan Generated",
                plan_id: event.payload.plan_id,
                plan_step_count: event.payload.step_count
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    // 2. Delta Impact
    // Trigger: ImpactAnalysisEvent (hypothetical) or DeltaIntentEvent
    if (event.event_type === 'ImpactAnalysisEvent' || event.event_type === 'DeltaIntentEvent') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.DeltaImpact,
            created_at: new Date().toISOString(),
            input: {
                delta_id: event.payload.delta_id || "unknown-delta",
                intent_id: event.payload.intent_id || "unknown-intent",
                change_summary: event.payload.change_summary || "Unknown change"
            },
            output: {
                actual_impact_summary: event.payload.impact_summary || "Pending analysis",
                impact_scope: event.payload.impact_scope || "local"
            },
            state: {
                risk_level: event.payload.risk_level || "low"
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    // 3. Pipeline Outcome
    // Trigger: SAStepCompleted
    if (event.event_type === 'SAStepCompleted') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.PipelineOutcome,
            created_at: new Date().toISOString(),
            input: {
                pipeline_id: event.payload.execution_id,
                stage_id: event.payload.step_id,
                stage_config: { agent_role: event.payload.executor_kind }
            },
            output: {
                status: "completed",
                duration_ms: event.payload.duration_ms
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    // 4. Confirm Decision
    // Trigger: ConfirmDecisionAdded
    if (event.event_type === 'ConfirmDecisionAdded') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.ConfirmDecision,
            created_at: new Date().toISOString(),
            input: {
                confirm_id: event.payload.confirm_id || "unknown-confirm",
                target_type: event.payload.target_type || "plan",
                target_id: event.payload.target_id || "unknown-target"
            },
            output: {
                decision: event.payload.decision || "approve",
                reasoning: event.payload.reasoning || "No reasoning provided"
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    // 5. Graph Evolution
    // Trigger: GraphUpdateEvent
    if (event.event_type === 'GraphUpdateEvent') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.GraphEvolution,
            created_at: new Date().toISOString(),
            input: {
                trigger_event_id: event.event_id,
                change_type: event.payload.change_type || "node_added"
            },
            output: {
                nodes_added: event.payload.nodes_added || 0,
                edges_added: event.payload.edges_added || 0
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    // 6. Multi-Agent Coordination
    // Trigger: MAPSessionCompleted
    if (event.event_type === 'MAPSessionCompleted') {
        return {
            sample_id: uuidv4(),
            sample_family: LearningEventFamily.MultiAgentCoordination,
            created_at: new Date().toISOString(),
            input: {
                session_id: event.payload.session_id || "unknown-session",
                coordination_mode: event.payload.mode || "turn_based",
                participant_count: event.payload.participant_count || 2
            },
            output: {
                total_turns: event.payload.total_turns || 0,
                outcome: event.payload.outcome || "success"
            },
            meta: {
                source_flow_id: event.payload.execution_id,
                source_event_ids: [event.event_id]
            }
        };
    }

    return null;
}
