#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";

// CodeQL fix: Helper to check file existence without TOCTOU
function fileExists(filePath) {
    try {
        fs.accessSync(filePath, fs.constants.R_OK);
        return true;
    } catch {
        return false;
    }
}


const GATE_ID = "PJT-03";
const ALLOWLIST_PATH = "Validation_Lab/data/curated-runs/allowlist.yaml";

function readText(p) {
    if (!fileExists(p)) throw new Error(`Missing file: ${p}`);
    return fs.readFileSync(p, "utf-8");
}

function loadAllowlist(filepath) {
    const doc = yaml.load(readText(filepath));
    if (Array.isArray(doc)) return doc;
    if (doc && Array.isArray(doc.runs)) return doc.runs;
    throw new Error("Unsupported allowlist structure");
}

function isLegacy(run) {
    // legacy runs in your data are frozen and usually end with "-pass"
    return run.status === "frozen" || (typeof run.run_id === "string" && run.run_id.endsWith("-pass"));
}

function isV02(run) {
    return typeof run.run_id === "string" && run.run_id.includes("-official-v0.2");
}

function isReproduced(run) {
    return (
        run.status === "active" &&
        run.substrate_claim_level === "reproduced" &&
        run.substrate_execution === "reproduced"
    );
}

function isDeclared(run) {
    // includes static evidence / eligible for upgrade
    return (
        isV02(run) &&
        (run.substrate_claim_level === "declared" || run.substrate_execution === "static" || run.status === "downgraded" || run.status === "eligible_for_upgrade")
    );
}

function main() {
    console.log(`\n=== ${GATE_ID} Stats Classification ===`);

    const runs = loadAllowlist(ALLOWLIST_PATH);

    const legacyExcluded = runs.filter(isLegacy).length;

    const v02Runs = runs.filter(isV02);
    const reproduced = v02Runs.filter(isReproduced);
    const declared = v02Runs.filter(isDeclared);

    // Fail-fast: A2A must NOT be counted as reproduced
    const a2aInReproduced = reproduced.filter(r => r.substrate === "a2a").map(r => r.run_id);
    if (a2aInReproduced.length > 0) {
        throw new Error(`A2A incorrectly counted as reproduced: ${a2aInReproduced.join(", ")}`);
    }

    // Expected summary (per your plan)
    const summary = {
        reproduced_count: reproduced.length,
        declared_count: declared.length,
        legacy_excluded_count: legacyExcluded,
        reproduced_runs: reproduced.map(r => r.run_id),
        declared_runs: declared.map(r => r.run_id),
    };

    console.log(JSON.stringify(summary, null, 2));

    // You can choose to hard-enforce expected counts here:
    // reproduced=2 (LangChain, MCP), declared=1 (A2A), legacy_excluded=3
    const expected = { reproduced: 2, declared: 1, legacy: 3 };
    if (summary.reproduced_count !== expected.reproduced) {
        throw new Error(`Unexpected reproduced_count: ${summary.reproduced_count} (expected ${expected.reproduced})`);
    }
    if (summary.declared_count !== expected.declared) {
        throw new Error(`Unexpected declared_count: ${summary.declared_count} (expected ${expected.declared})`);
    }
    if (summary.legacy_excluded_count !== expected.legacy) {
        throw new Error(`Unexpected legacy_excluded_count: ${summary.legacy_excluded_count} (expected ${expected.legacy})`);
    }

    console.log(`✅ PASS: ${GATE_ID}`);
}

try {
    main();
} catch (e) {
    console.error(`\n❌ FAIL: ${GATE_ID}\n${e.message}\n`);
    process.exit(1);
}
