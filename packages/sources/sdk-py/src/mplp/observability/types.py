# © 2026 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

from enum import Enum
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field, validator
from datetime import datetime

class EventFamily(str, Enum):
    """
    Event Families as defined in schemas/v2/taxonomy/event-taxonomy.yaml
    Strict alignment: 12 families
    """
    IMPORT_PROCESS = 'import_process'
    INTENT = 'intent'
    DELTA_INTENT = 'delta_intent'
    IMPACT_ANALYSIS = 'impact_analysis'
    COMPENSATION_PLAN = 'compensation_plan'
    METHODOLOGY = 'methodology'
    REASONING_GRAPH = 'reasoning_graph'
    PIPELINE_STAGE = 'pipeline_stage'
    GRAPH_UPDATE = 'graph_update'
    RUNTIME_EXECUTION = 'runtime_execution'
    COST_BUDGET = 'cost_budget'
    EXTERNAL_INTEGRATION = 'external_integration'

class MplpEvent(BaseModel):
    """
    Base Event Model for MPLP Observability.
    Derived from schemas/v2/events/*.schema.json (common fields)
    """
    event_id: str = Field(..., description="UUID v4")
    event_type: str = Field(..., min_length=1)
    event_family: EventFamily
    timestamp: str = Field(..., description="ISO 8601")
    payload: Dict[str, Any]

    class Config:
        use_enum_values = True
