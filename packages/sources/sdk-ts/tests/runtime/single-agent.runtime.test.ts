import { describe, it, expect } from 'vitest';
import { ExecutionEngine } from '@mplp/runtime';
import { Context, Plan } from '@mplp/types';
import contextJson from '../fixtures/flow_01/context.json';
import planJson from '../fixtures/flow_01/plan.json';

describe('Runtime: Single Agent Flow', () => {
    it('should execute a single agent plan successfully', async () => {
        const { v4: uuidv4 } = require('uuid');

        const context: Context = {
            id: uuidv4(),
            status: 'active'
        };

        const plan: Plan = {
            id: uuidv4(),
            context_id: context.id,
            steps: [
                { step_id: uuidv4(), agent_role: 'coder' }
            ]
        };

        const engine = new ExecutionEngine();
        const result = await engine.runSingleAgent(context, plan);

        expect(result).toBeDefined();
        expect(result.status).toBe('completed');
        expect(result.artifacts).toBeDefined();
        expect(result.artifacts.events).toBeDefined();
        expect(result.artifacts.events.length).toBeGreaterThan(0);
    });
});
