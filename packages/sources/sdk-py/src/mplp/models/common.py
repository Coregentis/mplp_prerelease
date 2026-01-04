# MPLP v1.0.0 FROZEN
# Governance: MPGC

from typing import Optional, List
from pydantic import BaseModel, Field
from datetime import datetime, timezone

from mplp.generated.cross_cutting import CrossCuttingConcern

class Metadata(BaseModel):
    protocol_version: str
    schema_version: str
    created_at: Optional[datetime] = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: Optional[datetime] = None
    created_by: Optional[str] = None
    updated_by: Optional[str] = None
    tags: Optional[List[str]] = None
    cross_cutting: Optional[List[CrossCuttingConcern]] = None
    # Type fixed: List[Literal[...]] matches schema#/properties/cross_cutting

    class Config:
        extra = "forbid"  # Matches schema additionalProperties: false

