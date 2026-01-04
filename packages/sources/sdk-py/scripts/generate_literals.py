#!/usr/bin/env python3
"""
Generate Literal types from MPLP schema enums.

This script reads enum values from Truth Source schemas and generates
Python Literal types for Pydantic models.

Usage:
    python scripts/generate_literals.py

Output:
    src/mplp/generated/cross_cutting.py
"""

import json
import os
from datetime import datetime, timezone
from pathlib import Path

# Paths
SCRIPT_DIR = Path(__file__).parent
SDK_ROOT = SCRIPT_DIR.parent
SCHEMAS_DIR = SDK_ROOT.parent.parent.parent / "schemas" / "v2"
GENERATED_DIR = SDK_ROOT / "src" / "mplp" / "generated"

# Schema sources
CROSS_CUTTING_SCHEMA = SCHEMAS_DIR / "common" / "metadata.schema.json"
CROSS_CUTTING_POINTER = "#/properties/cross_cutting/items/enum"

def load_schema(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_bundle_hash() -> str:
    """Read bundle hash from _manifests if available."""
    hash_file = SCHEMAS_DIR / "_manifests" / "bundle" / "truth-source-bundle.sha256"
    if hash_file.exists():
        with open(hash_file, "r") as f:
            line = f.readline()
            if line.startswith("sha256:"):
                return line.strip()
    return "sha256:unknown"

def generate_cross_cutting():
    """Generate cross_cutting.py from schema enum."""
    schema = load_schema(CROSS_CUTTING_SCHEMA)
    
    # Extract enum values
    enum_values = schema["properties"]["cross_cutting"]["items"]["enum"]
    
    # Build Literal string
    literal_args = ",\n    ".join(f'"{v}"' for v in enum_values)
    list_values = ",\n    ".join(f'"{v}"' for v in enum_values)
    
    bundle_hash = get_bundle_hash()
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    
    content = f'''# AUTO-GENERATED - DO NOT EDIT MANUALLY
# Source: schemas/v2/common/metadata.schema.json
# JSON Pointer: {CROSS_CUTTING_POINTER}
# Bundle Hash: {bundle_hash}
# Generated: {timestamp}
# Generator: Phase 5 SUC-01 schema-first codegen
#
# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import Literal

# Cross-cutting concerns enum ({len(enum_values)} values)
# Must match schemas/v2/common/metadata.schema.json#/properties/cross_cutting/items/enum
CrossCuttingConcern = Literal[
    {literal_args},
]

# For runtime validation and iteration
CROSS_CUTTING_ENUM_VALUES = [
    {list_values},
]
'''
    
    output_path = GENERATED_DIR / "cross_cutting.py"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    print(f"✅ Generated: {output_path}")
    print(f"   Enum values: {len(enum_values)}")
    print(f"   Bundle hash: {bundle_hash}")

def main():
    print("=== MPLP Literal Generator ===")
    print(f"Schemas dir: {SCHEMAS_DIR}")
    print(f"Output dir:  {GENERATED_DIR}")
    print()
    
    generate_cross_cutting()
    
    print()
    print("Done. Run 'git diff' to check for changes.")

if __name__ == "__main__":
    main()
