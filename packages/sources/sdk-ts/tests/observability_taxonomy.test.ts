/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { describe, it, expect } from 'vitest';
import { EventFamily } from '../src/observability/types';

describe('Observability Taxonomy', () => {
    it('should have all required EventFamilies', () => {
        const families = Object.values(EventFamily);
        expect(families).toContain('import_process');
        expect(families).toContain('intent');
        expect(families).toContain('delta_intent');
        expect(families).toContain('impact_analysis');
        expect(families).toContain('compensation_plan');
        expect(families).toContain('methodology');
        expect(families).toContain('reasoning_graph');
        expect(families).toContain('pipeline_stage');
        expect(families).toContain('graph_update');
        expect(families).toContain('runtime_execution');
        expect(families).toContain('cost_budget');
        expect(families).toContain('external_integration');
        expect(families).toHaveLength(12);
    });
});
