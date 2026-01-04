/**
 * © 2025 Bangshi Beijing Network Technology Limited Company
 * Licensed under the Apache License, Version 2.0.
 *
 * This file is part of the MPLP reference implementation.
 * It is NOT part of the frozen protocol specification.
 */

import { MAPSession, ValidationResult } from '../types';
import { validate as uuidValidate } from 'uuid';

/**
 * Validates a Multi-Agent (MAP) session against the MAP Profile invariants.
 * 
 * Invariants enforced:
 * 1. map_session_requires_multiple_participants: participants.length >= 2
 * 2. map_collab_mode_valid: mode in ['broadcast', 'round_robin', 'orchestrated', 'swarm', 'pair']
 * 3. map_session_id_is_uuid: collab_id is UUID v4
 * 4. map_participants_have_role_ids: All participants have role_id
 * 5. map_role_ids_are_uuids: All role_ids are UUID v4
 * 6. map_participant_ids_are_non_empty: All participant_ids are non-empty
 * 7. map_participant_kind_valid: kind in ['agent', 'human', 'system', 'external']
 */
export function validateMAPProfile(session: MAPSession): ValidationResult {
    const errors: string[] = [];

    // 1. map_session_requires_multiple_participants
    if (!session.participants || session.participants.length < 2) {
        errors.push(`map_session_requires_multiple_participants: Session has ${session.participants?.length || 0} participants, expected >= 2`);
    }

    // 2. map_collab_mode_valid
    const validModes = ['broadcast', 'round_robin', 'orchestrated', 'swarm', 'pair'];
    if (!validModes.includes(session.mode)) {
        errors.push(`map_collab_mode_valid: Invalid mode '${session.mode}'`);
    }

    // 3. map_session_id_is_uuid
    if (!uuidValidate(session.collab_id)) {
        errors.push(`map_session_id_is_uuid: Session ID ${session.collab_id} is not a valid UUID v4`);
    }

    // Participant validation
    if (session.participants) {
        session.participants.forEach((p, index) => {
            // 4. map_participants_have_role_ids
            if (!p.role_id) {
                errors.push(`map_participants_have_role_ids: Participant at index ${index} missing role_id`);
            }

            // 5. map_role_ids_are_uuids
            if (p.role_id && !uuidValidate(p.role_id)) {
                errors.push(`map_role_ids_are_uuids: Role ID ${p.role_id} is not a valid UUID v4`);
            }

            // 6. map_participant_ids_are_non_empty
            if (!p.participant_id || p.participant_id.trim() === '') {
                errors.push(`map_participant_ids_are_non_empty: Participant at index ${index} has empty participant_id`);
            }

            // 7. map_participant_kind_valid
            const validKinds = ['agent', 'human', 'system', 'external'];
            if (!validKinds.includes(p.kind)) {
                errors.push(`map_participant_kind_valid: Invalid kind '${p.kind}' for participant ${p.participant_id}`);
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors
    };
}
