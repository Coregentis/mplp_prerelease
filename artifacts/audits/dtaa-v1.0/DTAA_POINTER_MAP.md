# DTAA Pointer Map

**Date**: 2026-01-05
**Reference**: SOP-DTAA-06 Phase 6.2a
**Purpose**: Map MUST/SHALL statements to schema pointers for remediation

---

## Pointer Sources

| Schema File | Primary Fields |
|:---|:---|
| `mplp-plan.schema.json` | plan_id, context_id, steps, status |
| `mplp-trace.schema.json` | trace_id, context_id, plan_id, events |
| `mplp-confirm.schema.json` | confirm_id, target_id, status |
| `mplp-collab.schema.json` | collab_id, participants, mode |
| `mplp-context.schema.json` | context_id, status |
| `mplp-core.schema.json` | core_id, status |
| `schemas/v2/invariants/*.yaml` | SA/MAP invariants |

---

## Pointer Map (MUST/SHALL → Schema)

### Category A: Normative Pages (Keep MUST + Add Pointer)

| Statement Pattern | Schema File | JSON Pointer | Source File |
|:---|:---|:---|:---|
| Plan MUST reference valid context_id | mplp-plan.schema.json | #/properties/context_id | l2-coordination-governance.md |
| Trace MUST reference context_id and plan_id | mplp-trace.schema.json | #/properties/context_id, #/properties/plan_id | l2-coordination-governance.md |
| Confirm MUST reference target_id | mplp-confirm.schema.json | #/properties/target_id | l2-coordination-governance.md |
| Collab MUST have ≥2 participants | mplp-collab.schema.json | #/properties/participants | l2-coordination-governance.md |
| participants[*].role_id MUST be UUIDs | mplp-collab.schema.json | #/properties/participants/items/properties/role_id | l2-coordination-governance.md |
| Collab mode MUST be valid enum | mplp-collab.schema.json | #/properties/mode | l2-coordination-governance.md |
| Implementations MUST adhere to lifecycle rules | sa-invariants.yaml | (invariant reference) | l2-coordination-governance.md |
| VSL MUST support async get/set | runtime-minimal interface | (code reference) | l3-execution-orchestration.md |
| AEL MUST return Promise | runtime-minimal interface | (code reference) | l3-execution-orchestration.md |
| Events MUST pass Integration invariants | integration-invariants.yaml | (invariant reference) | integration-spec.md |
| Integration events MUST identify source | mplp-tool-event.schema.json | #/properties/source | l4-integration-infra.md |
| Runtimes MUST emit pipeline_stage events | event-taxonomy.yaml | pipeline_stage | l1-core-protocol.md |
| Runtimes MUST emit graph_update events | event-taxonomy.yaml | graph_update | l1-core-protocol.md |

---

### Category B: Informative Pages (Downgrade MUST → SHOULD)

| Statement Pattern | Current Location | Action |
|:---|:---|:---|
| L3 runtime MUST enforce L2 state transition rules | l1-l4-deep-dive.md:209 | Downgrade to SHOULD |
| VSL MUST ensure PSG updates are atomic | l1-l4-deep-dive.md:396 | Downgrade to SHOULD |
| Runtime MUST preserve causal ordering | l1-l4-deep-dive.md:453 | Downgrade to SHOULD |
| AEL MUST enforce resource limits | l1-l4-deep-dive.md:531 | Downgrade to SHOULD |
| §6 "Normative Requirements" title | l1-l4-deep-dive.md:392 | Rename to "Schema-Derived Constraints (Informative)" |

---

### Category C: External Interoperability (Rewrite + Clarify)

| Statement Pattern | Current Location | Action |
|:---|:---|:---|
| When exporting to W3C, implementations MUST | runtime-trace-format.md:122 | Rewrite as SHOULD + "not a protocol obligation" |
| Every MPLP-conformant module MUST emit | module-event-matrix.md:200 | Add pointer to event-taxonomy.yaml |

---

## Invariant References

| Invariant ID | File | Description |
|:---|:---|:---|
| sa_plan_context_binding | sa-invariants.yaml | Plan must reference valid Context |
| sa_trace_context_binding | sa-invariants.yaml | Trace must reference valid Context |
| sa_trace_plan_binding | sa-invariants.yaml | Trace must reference valid Plan |
| map_session_requires_multiple_participants | map-invariants.yaml | Collab must have ≥2 participants |
| map_role_ids_are_uuids | map-invariants.yaml | Role IDs must be UUID v4 |
| map_collab_mode_valid | map-invariants.yaml | Collab mode must be valid enum |

---

## Usage

1. **Category A**: Find statement → Insert Schema Anchor block below
2. **Category B**: Find statement → Replace MUST with SHOULD + add note
3. **Category C**: Find statement → Rewrite for interoperability

---

**Evidence ID**: DTAA-P6.2a-2026-01-05
