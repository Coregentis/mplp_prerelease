/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { v4 as uuidv4 } from 'uuid';
import { Context, Plan, ExecutionResult } from '../types';
import { validateSAProfile } from './sa_profile';
import { validateEvent } from '../observability/validator';
import { exportNDJSON } from '../observability/exporter';
import { MplpEvent, EventFamily } from '../observability/types';

import { LearningCollector } from '../learning/collector';

export class ExecutionEngine {
    private eventLog: MplpEvent[] = [];
    public learningCollector: LearningCollector;

    constructor() {
        // Default disabled as per Route B
        this.learningCollector = new LearningCollector({ enabled: false });
    }

    private emitEvent(event: MplpEvent): void {
        const validation = validateEvent(event);
        if (!validation.valid) {
            console.warn(`[Observability] Invalid event emitted: ${validation.errors.join(', ')}`);
            // In strict mode, we might throw here. For now, we warn.
        }
        this.eventLog.push(event);

        // Hook point
        this.learningCollector.onEvent(event);
    }

    public getEvents(): MplpEvent[] {
        return this.eventLog;
    }

    public exportEvents(): string {
        return exportNDJSON(this.eventLog);
    }

    /**
     * Executes a plan in a single-agent context, enforcing SA Profile invariants.
     */
    async runSingleAgent(context: Context, plan: Plan): Promise<ExecutionResult> {
        this.eventLog = [];
        const saId = `sa-${uuidv4()}`;
        const startTime = Date.now();

        // Helper to create typed events
        const createEvent = (type: string, family: EventFamily, payload: any): MplpEvent => ({
            event_id: uuidv4(),
            event_type: type,
            event_family: family,
            timestamp: new Date().toISOString(),
            payload
        });

        // 1. Emit SAInitialized
        this.emitEvent(createEvent('SAInitialized', EventFamily.RuntimeExecution, {
            execution_id: saId,
            executor_kind: 'agent',
            status: 'pending',
            runtime_version: '1.0.6',
            capabilities: ['code.write', 'code.review']
        }));

        // 2. Validate Invariants (Pre-execution)
        const validation = validateSAProfile(context, plan);
        if (!validation.valid) {
            console.error('SA Profile Validation Failed:', validation.errors);
            return {
                status: 'failed',
                artifacts: { errors: validation.errors }
            };
        }

        // 3. Emit SAContextLoaded
        this.emitEvent(createEvent('SAContextLoaded', EventFamily.RuntimeExecution, {
            execution_id: saId,
            executor_kind: 'agent',
            status: 'running',
            context_id: context.id,
            context_status: context.status
        }));

        // 4. Emit SAPlanEvaluated
        this.emitEvent(createEvent('SAPlanEvaluated', EventFamily.RuntimeExecution, {
            execution_id: saId,
            executor_kind: 'agent',
            status: 'running',
            plan_id: plan.id,
            step_count: plan.steps.length,
            execution_order: plan.steps.map(s => s.step_id)
        }));

        // 5. Execute Steps
        let stepsSucceeded = 0;
        let stepsFailed = 0;

        for (const step of plan.steps) {
            // Emit SAStepStarted
            this.emitEvent(createEvent('SAStepStarted', EventFamily.RuntimeExecution, {
                execution_id: saId,
                executor_kind: 'agent',
                status: 'running',
                step_id: step.step_id,
                agent_role: step.agent_role,
                order_index: plan.steps.indexOf(step)
            }));

            try {
                // Simulate execution (placeholder for actual agent logic)
                console.log(`Executing step ${step.step_id} (${step.agent_role})...`);
                await new Promise(resolve => setTimeout(resolve, 100)); // Simulate work

                // Emit SAStepCompleted
                this.emitEvent(createEvent('SAStepCompleted', EventFamily.RuntimeExecution, {
                    execution_id: saId,
                    executor_kind: 'agent',
                    status: 'completed',
                    step_id: step.step_id,
                    duration_ms: 100
                }));
                stepsSucceeded++;
            } catch (error) {
                // Emit SAStepFailed
                this.emitEvent(createEvent('SAStepFailed', EventFamily.RuntimeExecution, {
                    execution_id: saId,
                    executor_kind: 'agent',
                    status: 'failed',
                    step_id: step.step_id,
                    error_message: error instanceof Error ? error.message : 'Unknown error'
                }));
                stepsFailed++;
            }

            // Emit SATraceEmitted (per step or batch)
            // Mapping TraceEvent to RuntimeExecution family as per 12-family constraint
            this.emitEvent(createEvent('SATraceEmitted', EventFamily.RuntimeExecution, {
                execution_id: saId,
                executor_kind: 'agent',
                status: 'running', // Trace emission is part of running state
                trace_id: `trace-${uuidv4()}`,
                events_written: this.eventLog.length
            }));
        }

        // 6. Emit SACompleted
        const finalStatus = stepsFailed === 0 ? 'completed' : 'failed';
        this.emitEvent(createEvent('SACompleted', EventFamily.RuntimeExecution, {
            execution_id: saId,
            executor_kind: 'agent',
            status: finalStatus,
            plan_id: plan.id,
            steps_executed: stepsSucceeded + stepsFailed,
            steps_succeeded: stepsSucceeded,
            steps_failed: stepsFailed,
            total_duration_ms: Date.now() - startTime
        }));

        return {
            status: finalStatus,
            artifacts: {
                events: this.eventLog
            }
        };
    }
}
