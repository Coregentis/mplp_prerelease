/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */

import { describe, it, expect } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { validateSAProfile } from '../src/runtime/sa_profile';
import { validateMAPProfile } from '../src/coordination/map_profile';
import { Context, Plan, MAPSession } from '../src/types';

describe('SA Profile Validation', () => {
    const validContext: Context = {
        id: uuidv4(),
        status: 'active'
    };

    const validPlan: Plan = {
        id: uuidv4(),
        context_id: validContext.id,
        steps: [
            { step_id: uuidv4(), agent_role: 'coder' }
        ]
    };

    it('should pass for valid inputs', () => {
        const result = validateSAProfile(validContext, validPlan);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail if context ID is invalid', () => {
        const invalidContext = { ...validContext, id: 'invalid-uuid' };
        const result = validateSAProfile(invalidContext, validPlan);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('sa_requires_context'));
    });

    it('should fail if context status is not active', () => {
        const invalidContext = { ...validContext, status: 'draft' as const };
        const result = validateSAProfile(invalidContext, validPlan);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('sa_context_must_be_active'));
    });

    it('should fail if plan context binding mismatch', () => {
        const invalidPlan = { ...validPlan, context_id: uuidv4() };
        const result = validateSAProfile(validContext, invalidPlan);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('sa_plan_context_binding'));
    });
});

describe('MAP Profile Validation', () => {
    const validSession: MAPSession = {
        collab_id: uuidv4(),
        mode: 'orchestrated',
        status: 'draft',
        created_at: new Date().toISOString(),
        participants: [
            { participant_id: 'p1', role_id: uuidv4(), kind: 'agent' },
            { participant_id: 'p2', role_id: uuidv4(), kind: 'agent' }
        ]
    };

    it('should pass for valid inputs', () => {
        const result = validateMAPProfile(validSession);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('should fail if fewer than 2 participants', () => {
        const invalidSession = { ...validSession, participants: [validSession.participants[0]] };
        const result = validateMAPProfile(invalidSession);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('map_session_requires_multiple_participants'));
    });

    it('should fail if mode is invalid', () => {
        const invalidSession = { ...validSession, mode: 'invalid_mode' as any };
        const result = validateMAPProfile(invalidSession);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('map_collab_mode_valid'));
    });

    it('should fail for invalid session ID', () => {
        const invalidSession = { ...validSession, collab_id: 'invalid-uuid' };
        const result = validateMAPProfile(invalidSession);
        expect(result.valid).toBe(false);
        expect(result.errors).toContainEqual(expect.stringContaining('map_session_id_is_uuid'));
    });
});
