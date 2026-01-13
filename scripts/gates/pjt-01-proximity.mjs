#!/usr/bin/env node
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const GATE_ID = "PJT-01";
const MAX_DELTA = 3;

const CLAIM_CATALOG_PATH = "governance/06-artifacts/CLAIM_CATALOG.v1.0.0.json";
const ALLOWLIST_PATH = "Validation_Lab/data/curated-runs/allowlist.yaml";

function mustRead(filePath) {
    if (!fs.existsSync(filePath)) throw new Error(`Missing file: ${filePath}`);
    return fs.readFileSync(filePath, "utf-8");
}

function loadJson(filePath) {
    return JSON.parse(mustRead(filePath));
}

function loadAllowlistLines(filePath) {
    const content = mustRead(filePath);
    return content.split(/\r?\n/);
}

function buildRunIdLineMap(allowlistLines) {
    // 1-based line numbers for human-readability
    const map = new Map();
    for (let i = 0; i < allowlistLines.length; i++) {
        const line = allowlistLines[i];
        const m = line.match(/^\s*-\s*run_id:\s*([^\s#]+)\s*$/) || line.match(/^\s*run_id:\s*([^\s#]+)\s*$/);
        if (m) map.set(m[1], i + 1);
    }
    return map;
}

function extractAllowlistLineClaims(obj, acc = []) {
    // Find any string like "...allowlist.yaml:L53" or "...allowlist.yaml#L53"
    if (typeof obj === "string") {
        const m = obj.match(/allowlist\.yaml(?:#|:)?L(\d+)/);
        if (m) acc.push({ raw: obj, claimedLine: Number(m[1]) });
        return acc;
    }
    if (Array.isArray(obj)) {
        for (const it of obj) extractAllowlistLineClaims(it, acc);
        return acc;
    }
    if (obj && typeof obj === "object") {
        for (const k of Object.keys(obj)) extractAllowlistLineClaims(obj[k], acc);
    }
    return acc;
}

function main() {
    console.log(`\n=== ${GATE_ID} Proximity (±${MAX_DELTA} lines) ===`);

    const claimCatalog = loadJson(CLAIM_CATALOG_PATH);
    const allowlistLines = loadAllowlistLines(ALLOWLIST_PATH);
    const runIdLineMap = buildRunIdLineMap(allowlistLines);

    // We validate proximity for any catalog entries that include a "truth_source"
    // which references allowlist.yaml line numbers.
    const refs = extractAllowlistLineClaims(claimCatalog);

    if (refs.length === 0) {
        console.log(`⚠️ WARN: No allowlist.yaml:L<n> references found in claim catalog (skip).`);
        console.log(`✅ PASS: ${GATE_ID}`);
        return;
    }

    // Additionally, we try to bind claimed line refs to an actual run_id by scanning nearby lines.
    // Strategy: for each claimed line, search downwards for first run_id within 20 lines.
    const violations = [];

    for (const ref of refs) {
        const startIdx = Math.max(0, ref.claimedLine - 1);
        const endIdx = Math.min(allowlistLines.length - 1, startIdx + 20);

        let boundRunId = null;
        for (let i = startIdx; i <= endIdx; i++) {
            const m = allowlistLines[i].match(/^\s*-\s*run_id:\s*([^\s#]+)\s*$/) || allowlistLines[i].match(/^\s*run_id:\s*([^\s#]+)\s*$/);
            if (m) {
                boundRunId = m[1];
                break;
            }
        }

        if (!boundRunId) {
            violations.push({
                type: "unbound_ref",
                message: `Cannot bind claimed line L${ref.claimedLine} to a run_id within next 20 lines`,
                raw: ref.raw,
            });
            continue;
        }

        const actualLine = runIdLineMap.get(boundRunId);
        if (!actualLine) {
            violations.push({
                type: "missing_run_id",
                message: `run_id not found in allowlist map: ${boundRunId}`,
                raw: ref.raw,
            });
            continue;
        }

        const delta = Math.abs(actualLine - ref.claimedLine);
        if (delta > MAX_DELTA) {
            violations.push({
                type: "proximity_violation",
                run_id: boundRunId,
                claimed: ref.claimedLine,
                actual: actualLine,
                delta,
                raw: ref.raw,
            });
        }
    }

    if (violations.length > 0) {
        console.error(`\n❌ FAIL: ${GATE_ID}`);
        for (const v of violations) console.error(`- ${JSON.stringify(v)}`);
        process.exit(1);
    }

    console.log(`✅ PASS: ${GATE_ID} (all allowlist line references within ±${MAX_DELTA})`);
}

try {
    main();
} catch (e) {
    console.error(`\n❌ FAIL: ${GATE_ID}\n${e.message}\n`);
    process.exit(1);
}
