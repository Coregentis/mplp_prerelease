# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import List, Dict, Any, Optional, Union, Literal
from pydantic import BaseModel, Field, UUID4
from datetime import datetime
from .common import Metadata

# --- Base Models ---

class TraceSpan(BaseModel):
    """Trace Span - matches trace-base.schema.json"""
    trace_id: UUID4  # required
    span_id: UUID4   # required
    parent_span_id: Optional[UUID4] = None  # optional
    context_id: Optional[UUID4] = None      # optional
    attributes: Optional[Dict[str, Any]] = None  # optional
    
    class Config:
        extra = "forbid"  # Match schema additionalProperties: false

class Context(BaseModel):
    meta: Metadata
    context_id: UUID4
    root: Dict[str, Any]
    title: str
    status: Literal["active", "archived", "draft"]
    
    summary: Optional[str] = None
    owner_role: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    tags: Optional[List[str]] = None
    constraints: Optional[Dict[str, Any]] = None
    events: Optional[List[Any]] = None
    language: Optional[str] = None
    governance: Optional[Dict[str, Any]] = None

    class Config:
        extra = "allow"

class PlanStep(BaseModel):
    step_id: UUID4
    description: str
    agent_role: str  # Required by SA Profile
    status: Literal["pending", "running", "completed", "failed", "skipped"] = "pending"
    tool: Optional[str] = None
    args: Optional[Dict[str, Any]] = None
    
    class Config:
        extra = "allow"

class Plan(BaseModel):
    meta: Metadata
    plan_id: UUID4
    context_id: UUID4
    title: str
    objective: str
    status: Literal["draft", "pending", "approved", "rejected", "completed", "failed", "cancelled"]
    steps: List[PlanStep]
    
    requested_at: Optional[datetime] = None
    events: Optional[List[Any]] = None
    trace: Optional[Any] = None

    class Config:
        extra = "allow"

class Confirm(BaseModel):
    meta: Metadata
    confirm_id: UUID4
    target_id: UUID4
    target_type: str
    status: Literal["pending", "approved", "rejected"]
    requested_by_role: str
    reason: Optional[str] = None
    
    requested_at: datetime
    events: Optional[List[Any]] = None
    decisions: Optional[List[Any]] = None
    governance: Optional[Dict[str, Any]] = None
    trace: Optional[Any] = None

    class Config:
        extra = "allow"

class Trace(BaseModel):
    meta: Metadata
    trace_id: UUID4
    context_id: UUID4
    plan_id: UUID4
    status: Literal["running", "completed", "failed"]
    root_span: Optional[TraceSpan] = None
    events: List[Any] = Field(default_factory=list)
    
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    governance: Optional[Dict[str, Any]] = None
    segments: Optional[List[Any]] = None

    class Config:
        extra = "allow"

# --- MAP Models ---

class MAPParticipant(BaseModel):
    participant_id: str
    role_id: UUID4
    kind: Literal["agent", "human", "system", "external"]
    
    class Config:
        extra = "allow"

class MAPSession(BaseModel):
    collab_id: UUID4
    mode: Literal["broadcast", "round_robin", "orchestrated", "swarm", "pair"]
    participants: List[MAPParticipant]
    status: Literal["draft", "active", "suspended", "completed", "cancelled"]
    context_id: Optional[UUID4] = None
    created_at: datetime
    
    class Config:
        extra = "allow"

# --- Event Models ---

class MplpEvent(BaseModel):
    event_type: str
    event_family: str
    timestamp: datetime
    payload: Dict[str, Any]

    class Config:
        extra = "allow"

class SAEvent(MplpEvent):
    sa_id: str

class MAPEvent(MplpEvent):
    session_id: str
