# MPLP v1.0.0 FROZEN
# Governance: MPGC

# Copyright 2025 邦士（北京）网络科技有限公司.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""
SUC-01: Schema-Model Alignment Tests
Verifies Python models match Truth Source schemas.
"""

import pytest
import json
import os
from typing import get_args
from pydantic import BaseModel, ValidationError
from mplp.models import Context, Plan, Confirm, Trace
from mplp.models.common import Metadata
from mplp.generated.cross_cutting import CrossCuttingConcern, CROSS_CUTTING_ENUM_VALUES

SCHEMAS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../schemas/v2"))

def load_schema(filename):
    path = os.path.join(SCHEMAS_DIR, filename)
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def check_alignment(model_cls: BaseModel, schema_filename: str):
    schema = load_schema(schema_filename)
    schema_props = set(schema.get("properties", {}).keys())
    model_props = set(model_cls.model_fields.keys())

    # Check if all schema properties exist in model
    missing_in_model = schema_props - model_props
    assert not missing_in_model, f"Model {model_cls.__name__} missing fields: {missing_in_model}"

    # Check required fields
    schema_required = set(schema.get("required", []))
    model_required = {
        name for name, field in model_cls.model_fields.items()
        if field.is_required()
    }
    
    missing_required = schema_required - model_required
    assert not missing_required, f"Model {model_cls.__name__} missing required status for: {missing_required}"

# --- Basic Alignment Tests ---

def test_context_alignment():
    check_alignment(Context, "mplp-context.schema.json")

def test_plan_alignment():
    check_alignment(Plan, "mplp-plan.schema.json")

def test_confirm_alignment():
    check_alignment(Confirm, "mplp-confirm.schema.json")

def test_trace_alignment():
    check_alignment(Trace, "mplp-trace.schema.json")

def test_metadata_alignment():
    check_alignment(Metadata, "common/metadata.schema.json")

# --- SUC-01: Enum Alignment Tests ---

def test_cross_cutting_enum_set_equality():
    """SUC-01: cross_cutting enum must exactly match schema."""
    schema = load_schema("common/metadata.schema.json")
    schema_enum = set(schema["properties"]["cross_cutting"]["items"]["enum"])
    
    # Get Literal type args
    literal_values = set(get_args(CrossCuttingConcern))
    
    assert schema_enum == literal_values, (
        f"Enum mismatch!\n"
        f"Schema: {sorted(schema_enum)}\n"
        f"Literal: {sorted(literal_values)}"
    )

def test_cross_cutting_enum_list_matches():
    """SUC-01: CROSS_CUTTING_ENUM_VALUES list must match schema."""
    schema = load_schema("common/metadata.schema.json")
    schema_enum = set(schema["properties"]["cross_cutting"]["items"]["enum"])
    list_values = set(CROSS_CUTTING_ENUM_VALUES)
    
    assert schema_enum == list_values, (
        f"List mismatch!\n"
        f"Schema: {sorted(schema_enum)}\n"
        f"List: {sorted(list_values)}"
    )

def test_cross_cutting_type_is_list():
    """SUC-01: cross_cutting must be List type, not Dict."""
    from typing import get_origin, get_args as typing_get_args
    import typing
    
    field = Metadata.model_fields["cross_cutting"]
    # The annotation should be Optional[List[...]]
    # We check that it's not Dict
    annotation = field.annotation
    
    # For Optional[List[X]], origin is Union, args are (List[X], NoneType)
    origin = get_origin(annotation)
    if origin is typing.Union:
        args = typing_get_args(annotation)
        # Filter out NoneType
        non_none_args = [a for a in args if a is not type(None)]
        if non_none_args:
            inner_type = non_none_args[0]
            inner_origin = get_origin(inner_type)
            assert inner_origin is list, f"cross_cutting must be List, got {inner_origin}"

# --- SUC-01: Negative Tests ---

def test_cross_cutting_rejects_invalid_value():
    """SUC-01: Invalid cross_cutting values must fail validation."""
    with pytest.raises(ValidationError):
        Metadata(
            protocol_version="1.0.0",
            schema_version="2.0.0",
            cross_cutting=["__illegal_value__"]
        )

def test_cross_cutting_accepts_valid_values():
    """SUC-01: Valid cross_cutting values must pass."""
    m = Metadata(
        protocol_version="1.0.0",
        schema_version="2.0.0",
        cross_cutting=["security", "transaction"]
    )
    assert m.cross_cutting == ["security", "transaction"]

def test_cross_cutting_accepts_all_enum_values():
    """SUC-01: All schema enum values must be accepted."""
    schema = load_schema("common/metadata.schema.json")
    all_values = schema["properties"]["cross_cutting"]["items"]["enum"]
    
    m = Metadata(
        protocol_version="1.0.0",
        schema_version="2.0.0",
        cross_cutting=all_values
    )
    assert len(m.cross_cutting) == 11
