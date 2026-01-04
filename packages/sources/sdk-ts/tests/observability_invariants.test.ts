/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 */

import { describe, it, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { validateEvent } from '../src/observability/validator';
import { EventFamily, MplpEvent } from '../src/observability/types';

describe('Observability Taxonomy & Invariants', () => {
    const validEvent: MplpEvent = {
        event_id: uuidv4(),
        event_type: 'TestEvent',
        event_family: EventFamily.RuntimeExecution,
        timestamp: new Date().toISOString(),
        payload: {
            execution_id: uuidv4(),
            executor_kind: 'agent',
            status: 'running'
        }
    };

    it('should pass for valid event', () => {
        const result = validateEvent(validEvent);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail for invalid event ID (obs_event_id_is_uuid)', () => {
        const invalid = { ...validEvent, event_id: 'invalid' };
        const result = validateEvent(invalid);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('obs_event_id_is_uuid'));
    });

    it('should fail for empty event type (obs_event_type_non_empty)', () => {
        const invalid = { ...validEvent, event_type: '' };
        const result = validateEvent(invalid);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('obs_event_type_non_empty'));
    });

    it('should fail for invalid event family (obs_event_family_valid)', () => {
        const invalid = { ...validEvent, event_family: 'InvalidFamily' as any };
        const result = validateEvent(invalid);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('obs_event_family_valid'));
    });

    it('should fail for invalid timestamp (obs_timestamp_iso_format)', () => {
        const invalid = { ...validEvent, timestamp: '2025/12/29' };
        const result = validateEvent(invalid);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('obs_timestamp_iso_format'));
    });

    // Conditional Invariants
    describe('RuntimeExecutionEvent Invariants', () => {
        it('should fail if missing execution_id (obs_runtime_event_has_execution_id)', () => {
            const invalid = { ...validEvent, payload: { ...validEvent.payload, execution_id: undefined } };
            const result = validateEvent(invalid);
            expect(result.valid).toBe(false);
            expect(result.errors).toContainEqual(expect.stringContaining('obs_runtime_event_has_execution_id'));
        });

        it('should fail if invalid executor_kind (obs_runtime_executor_kind_valid)', () => {
            const invalid = { ...validEvent, payload: { ...validEvent.payload, executor_kind: 'invalid' } };
            const result = validateEvent(invalid);
            expect(result.valid).toBe(false);
            expect(result.errors).toContainEqual(expect.stringContaining('obs_runtime_executor_kind_valid'));
        });

        it('should fail if invalid status (obs_runtime_status_valid)', () => {
            const invalid = { ...validEvent, payload: { ...validEvent.payload, status: 'invalid' } };
            const result = validateEvent(invalid);
            expect(result.valid).toBe(false);
            expect(result.errors).toContainEqual(expect.stringContaining('obs_runtime_status_valid'));
        });
    });
});
