from enum import Enum
from typing import Dict, Any, Optional, List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel, Field

class LearningEventFamily(str, Enum):
    """
    Learning Sample Families
    Strictly aligned with schemas/v2/taxonomy/learning-taxonomy.yaml IDs
    """
    intent_resolution = "intent_resolution"
    delta_impact = "delta_impact"
    pipeline_outcome = "pipeline_outcome"
    confirm_decision = "confirm_decision"
    graph_evolution = "graph_evolution"
    multi_agent_coordination = "multi_agent_coordination"

class LearningSampleMeta(BaseModel):
    """
    Learning Sample Metadata
    Derived from schemas/v2/learning/mplp-learning-sample-core.schema.json
    """
    source_flow_id: Optional[str] = None
    source_event_ids: Optional[List[UUID]] = None
    project_id: Optional[UUID] = None
    human_feedback_label: Optional[str] = None # Enum: approved, rejected, not_reviewed
    quality_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    
    class Config:
        extra = "allow"

class LearningSample(BaseModel):
    """
    Learning Sample Structure
    Derived from schemas/v2/learning/mplp-learning-sample-core.schema.json
    Note: Schema defines a flat structure for core fields.
    """
    sample_id: UUID
    sample_family: LearningEventFamily
    created_at: datetime
    
    input: Dict[str, Any]
    output: Dict[str, Any]
    state: Optional[Dict[str, Any]] = None
    
    meta: Optional[LearningSampleMeta] = None
