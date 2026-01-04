# AUTO-GENERATED - DO NOT EDIT MANUALLY
# Source: schemas/v2/common/metadata.schema.json
# JSON Pointer: #/properties/cross_cutting/items/enum
# Bundle Hash: sha256:78ea3511cee7cacebff416b5ad6179358032d5322e5991523b5f8d6257d10354
# Generated: 2026-01-04T16:18:00Z
# Generator: Phase 5 SUC-01 schema-first codegen
#
# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import Literal

# Cross-cutting concerns enum (11 values)
# Must match schemas/v2/common/metadata.schema.json#/properties/cross_cutting/items/enum
CrossCuttingConcern = Literal[
    "coordination",
    "error-handling",
    "event-bus",
    "learning-feedback",
    "observability",
    "orchestration",
    "performance",
    "protocol-versioning",
    "security",
    "state-sync",
    "transaction",
]

# For runtime validation and iteration
CROSS_CUTTING_ENUM_VALUES = [
    "coordination",
    "error-handling",
    "event-bus",
    "learning-feedback",
    "observability",
    "orchestration",
    "performance",
    "protocol-versioning",
    "security",
    "state-sync",
    "transaction",
]
