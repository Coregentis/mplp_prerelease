/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */

// --- Base Types ---

export interface Context {
    id: string;
    status: 'active' | 'archived' | 'draft';
    [key: string]: any;
}

export interface Plan {
    id: string;
    context_id: string;
    steps: PlanStep[];
    [key: string]: any;
}

export interface PlanStep {
    step_id: string;
    agent_role: string;
    description?: string;
    [key: string]: any;
}

export interface Trace {
    id: string;
    context_id: string;
    plan_id: string;
    events: any[];
    [key: string]: any;
}

export interface ExecutionResult {
    status: 'completed' | 'failed' | 'running';
    artifacts: any;
    [key: string]: any;
}

// --- Event Types ---

export interface MplpEvent {
    event_type: string;
    event_family: string;
    timestamp: string;
    payload: Record<string, any>;
}

export interface SAEvent extends MplpEvent {
    sa_id: string;
}

export interface MAPEvent extends MplpEvent {
    session_id: string;
}

// --- MAP Types ---

export type CollabMode = 'broadcast' | 'round_robin' | 'orchestrated' | 'swarm' | 'pair';

export interface MAPParticipant {
    participant_id: string;
    role_id: string;
    kind: 'agent' | 'human' | 'system' | 'external';
    [key: string]: any;
}

export interface MAPSession {
    collab_id: string;
    mode: CollabMode;
    participants: MAPParticipant[];
    status: 'draft' | 'active' | 'suspended' | 'completed' | 'cancelled';
    context_id?: string;
    created_at: string;
    [key: string]: any;
}

export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
