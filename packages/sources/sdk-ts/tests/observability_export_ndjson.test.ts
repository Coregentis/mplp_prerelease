/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { describe, it, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { exportNDJSON } from '../src/observability/exporter';
import { EventFamily, MplpEvent } from '../src/observability/types';

describe('Observability Export', () => {
    const events: MplpEvent[] = [
        {
            event_id: uuidv4(),
            event_type: 'Event1',
            event_family: EventFamily.RuntimeExecution,
            timestamp: new Date().toISOString(),
            payload: { id: 1 }
        },
        {
            event_id: uuidv4(),
            event_type: 'Event2',
            event_family: EventFamily.Methodology, // Using Methodology as placeholder for trace-like event
            timestamp: new Date().toISOString(),
            payload: { id: 2 }
        }
    ];

    it('should export valid NDJSON', () => {
        const output = exportNDJSON(events);
        const lines = output.split('\n');

        expect(lines).toHaveLength(2);

        const json1 = JSON.parse(lines[0]);
        expect(json1.event_type).toBe('Event1');

        const json2 = JSON.parse(lines[1]);
        expect(json2.event_type).toBe('Event2');
    });
});
