# © 2025 Bangshi Beijing Network Technology Limited Company
# Licensed under the Apache License, Version 2.0.

import json
from typing import List, Union, Optional
from .types import MplpEvent

def export_ndjson(events: List[MplpEvent], filepath: Optional[str] = None) -> Optional[str]:
    """
    Exports events to NDJSON format.
    One JSON object per line.
    If filepath is provided, writes to file.
    Otherwise returns the string.
    """
    lines = [event.json() for event in events]
    output = '\n'.join(lines)
    
    if filepath:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(output)
        return None
    
    return output
