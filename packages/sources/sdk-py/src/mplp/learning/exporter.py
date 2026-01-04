import json
import hashlib
import os
from typing import List, Optional, Dict, Any, Literal, Tuple
from datetime import datetime, timezone
from pydantic import BaseModel
from .types import LearningSample
from .validator import validate_learning_sample

ExportMode = Literal["fail_fast", "skip_invalid"]

class ExportOptions(BaseModel):
    mode: ExportMode = "fail_fast"

class LearningManifestLite(BaseModel):
    protocol_version: str
    governance: str
    frozen: bool
    freeze_date: str
    exported_at: str
    count: int
    invalid_count: int
    ndjson_sha256: str
    learning_taxonomy_sha256: str
    schema_bundle_sha256: Optional[str]
    schema_bundle_hash_method: Literal["sha256", "none"]
    notes: Optional[List[str]] = []

def read_truth_meta() -> Dict[str, Any]:
    # Load from truth_snapshot.json in the same directory
    current_dir = os.path.dirname(__file__)
    snapshot_path = os.path.join(current_dir, "truth_snapshot.json")
    
    with open(snapshot_path, 'r', encoding='utf-8') as f:
        snapshot = json.load(f)
        
    return {
        "protocol_version": snapshot["protocol_version"],
        "governance": snapshot["governance"],
        "frozen": snapshot["frozen"],
        "freeze_date": snapshot["freeze_date"],
        "schema_bundle_sha256": snapshot["schema_bundle_sha256"],
        "schema_bundle_hash_method": snapshot["schema_bundle_hash_method"],
        "learning_taxonomy_sha256": snapshot["learning_taxonomy_sha256"],
    }

def canonical_json_line(obj: Any) -> str:
    # Pydantic models to dict first
    if isinstance(obj, BaseModel):
        data = obj.model_dump(mode='json') # handles datetime serialization etc
    else:
        data = obj
    
    # Sort keys and compact separators
    return json.dumps(data, separators=(',', ':'), sort_keys=True)

def sha256_hex(data: bytes | str) -> str:
    if isinstance(data, str):
        data = data.encode('utf-8')
    return hashlib.sha256(data).hexdigest()

def validate_export_samples(samples: List[LearningSample], options: Optional[ExportOptions] = None) -> Tuple[List[LearningSample], List[Tuple[int, Any]]]:
    valid = []
    invalid = []
    mode = options.mode if options else "fail_fast"

    for i, sample in enumerate(samples):
        result = validate_learning_sample(sample)
        if result.valid:
            valid.append(sample)
        else:
            invalid.append((i, result.errors))
            if mode == "fail_fast":
                break
    return valid, invalid

class LearningExportValidationError(Exception):
    def __init__(self, message, code, invalid_count, first_error_index, details):
        super().__init__(message)
        self.code = code
        self.invalid_count = invalid_count
        self.first_error_index = first_error_index
        self.details = details

def export_learning_ndjson(samples: List[LearningSample], options: Optional[ExportOptions] = None) -> str:
    valid, invalid = validate_export_samples(samples, options)
    mode = options.mode if options else "fail_fast"

    if mode == "fail_fast" and invalid:
        first_error = invalid[0]
        raise LearningExportValidationError(
            message=f"Validation failed for sample at index {first_error[0]}",
            code="LEARNING_EXPORT_VALIDATION_FAILED",
            invalid_count=len(invalid),
            first_error_index=first_error[0],
            details=first_error[1]
        )

    if not valid:
        return ""

    lines = [canonical_json_line(s) for s in valid]
    return "\n".join(lines) + "\n"

def generate_learning_manifest_lite(samples: List[LearningSample], ndjson: str, options: Optional[ExportOptions] = None) -> LearningManifestLite:
    # Re-validate to get counts (or trust caller, but we need invalid_count)
    valid, invalid = validate_export_samples(samples, options)
    
    meta = read_truth_meta()
    
    return LearningManifestLite(
        **meta,
        exported_at=datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'), # Ensure ISO format
        count=len(valid),
        invalid_count=len(invalid),
        ndjson_sha256=sha256_hex(ndjson),
        notes=[]
    )
