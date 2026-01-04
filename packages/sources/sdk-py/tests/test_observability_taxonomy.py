# © 2026 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

import pytest
from mplp.observability.types import EventFamily

def test_event_family_count():
    """Verify exactly 12 event families exist."""
    assert len(EventFamily) == 12

def test_event_family_members():
    """Verify specific members match Truth Source."""
    families = [e.value for e in EventFamily]
    expected = [
        'import_process',
        'intent',
        'delta_intent',
        'impact_analysis',
        'compensation_plan',
        'methodology',
        'reasoning_graph',
        'pipeline_stage',
        'graph_update',
        'runtime_execution',
        'cost_budget',
        'external_integration'
    ]
    for item in expected:
        assert item in families
