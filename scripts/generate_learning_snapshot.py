import json
import yaml
import hashlib
import os
import sys

# Paths relative to repo root
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SCHEMA_PATH = os.path.join(REPO_ROOT, "schemas/v2/learning/mplp-learning-sample-core.schema.json")
TAXONOMY_PATH = os.path.join(REPO_ROOT, "schemas/v2/taxonomy/learning-taxonomy.yaml")

TS_TARGET = os.path.join(REPO_ROOT, "packages/sources/sdk-ts/src/learning/truth_snapshot.json")
PY_TARGET = os.path.join(REPO_ROOT, "packages/sources/sdk-py/src/mplp/learning/truth_snapshot.json")

def calculate_sha256(filepath):
    with open(filepath, 'rb') as f:
        return hashlib.sha256(f.read()).hexdigest()

def main():
    print(f"Generating Truth Snapshot from:")
    print(f"  Schema: {SCHEMA_PATH}")
    print(f"  Taxonomy: {TAXONOMY_PATH}")

    # 1. Read Schema Meta
    with open(SCHEMA_PATH, 'r', encoding='utf-8') as f:
        schema = json.load(f)
        meta = schema.get('x-mplp-meta', {})
        if not meta:
            print("ERROR: x-mplp-meta not found in schema")
            sys.exit(1)

    # 2. Calculate Taxonomy Hash
    taxonomy_hash = calculate_sha256(TAXONOMY_PATH)

    # 3. Construct Snapshot
    snapshot = {
        "protocol_version": meta.get("protocolVersion"),
        "governance": meta.get("governance"),
        "frozen": meta.get("frozen"),
        "freeze_date": meta.get("freezeDate"),
        "learning_taxonomy_sha256": taxonomy_hash,
        "schema_bundle_sha256": None, # Placeholder as per instructions
        "schema_bundle_hash_method": "none"
    }

    # Validate
    if not snapshot["protocol_version"]:
        print("ERROR: protocolVersion missing")
        sys.exit(1)

    # 4. Write to Targets
    content = json.dumps(snapshot, indent=2, sort_keys=True)
    
    # TS
    os.makedirs(os.path.dirname(TS_TARGET), exist_ok=True)
    with open(TS_TARGET, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Wrote snapshot to {TS_TARGET}")

    # Py
    os.makedirs(os.path.dirname(PY_TARGET), exist_ok=True)
    with open(PY_TARGET, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Wrote snapshot to {PY_TARGET}")

if __name__ == "__main__":
    main()
