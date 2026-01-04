# © 2025 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

import pytest
import json
from uuid import uuid4
from datetime import datetime
from mplp.observability.types import MplpEvent, EventFamily
from mplp.observability.exporter import export_ndjson

def test_export_ndjson():
    events = [
        MplpEvent(
            event_id=str(uuid4()),
            event_type="Event1",
            event_family=EventFamily.RUNTIME_EXECUTION,
            timestamp=datetime.utcnow().isoformat() + "Z",
            payload={"id": 1}
        ),
        MplpEvent(
            event_id=str(uuid4()),
            event_type="Event2",
            event_family=EventFamily.METHODOLOGY,
            timestamp=datetime.utcnow().isoformat() + "Z",
            payload={"id": 2}
        )
    ]

    output = export_ndjson(events)
    lines = output.split('\n')
    assert len(lines) == 2
    
    json1 = json.loads(lines[0])
    assert json1['event_type'] == 'Event1'
    
    json2 = json.loads(lines[1])
    assert json2['event_type'] == 'Event2'
