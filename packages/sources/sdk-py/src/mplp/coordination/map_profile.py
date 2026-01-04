# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import List, NamedTuple
from ..models.core import MAPSession

class ValidationResult(NamedTuple):
    valid: bool
    errors: List[str]

def validate_map_profile(session: MAPSession) -> ValidationResult:
    """
    Validates a Multi-Agent (MAP) session against the MAP Profile invariants.
    
    Invariants enforced:
    1. map_session_requires_multiple_participants: participants.length >= 2
    2. map_collab_mode_valid: mode in ['broadcast', 'round_robin', 'orchestrated', 'swarm', 'pair'] (Enforced by Pydantic)
    3. map_session_id_is_uuid: collab_id is UUID v4 (Enforced by Pydantic)
    4. map_participants_have_role_ids: All participants have role_id (Enforced by Pydantic)
    5. map_role_ids_are_uuids: All role_ids are UUID v4 (Enforced by Pydantic)
    6. map_participant_ids_are_non_empty: All participant_ids are non-empty
    7. map_participant_kind_valid: kind in ['agent', 'human', 'system', 'external'] (Enforced by Pydantic)
    """
    errors = []

    # 1. map_session_requires_multiple_participants
    if not session.participants or len(session.participants) < 2:
        errors.append(f"map_session_requires_multiple_participants: Session has {len(session.participants) if session.participants else 0} participants, expected >= 2")

    # 6. map_participant_ids_are_non_empty
    if session.participants:
        for i, p in enumerate(session.participants):
            if not p.participant_id or not p.participant_id.strip():
                errors.append(f"map_participant_ids_are_non_empty: Participant at index {i} has empty participant_id")

    return ValidationResult(valid=len(errors) == 0, errors=errors)
