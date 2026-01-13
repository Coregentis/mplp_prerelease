#!/usr/bin/env node
import fs from "fs";
import yaml from "js-yaml";

const GATE_ID = "PJT-04";

const ALLOWLIST_PATH = "Validation_Lab/data/curated-runs/allowlist.yaml";
const REQUIRED_V02 = [
    "Validation_Lab/releases/v0.2/artifacts/equivalence/gf-01.json",
    "Validation_Lab/releases/v0.2/artifacts/evaluations/tool-call-flow.local-cli.md",
];

function readText(p) {
    if (!fs.existsSync(p)) throw new Error(`Missing file: ${p}`);
    return fs.readFileSync(p, "utf-8");
}

function loadAllowlist(filepath) {
    const doc = yaml.load(readText(filepath));
    if (Array.isArray(doc)) return doc;
    if (doc && Array.isArray(doc.runs)) return doc.runs;
    throw new Error("Unsupported allowlist structure");
}

function isV02(run) {
    return typeof run.run_id === "string" && run.run_id.includes("-official-v0.2");
}

function main() {
    console.log(`\n=== ${GATE_ID} Release Pre-Manifest ===`);

    // 1) Required v0.2 artifacts exist
    for (const p of REQUIRED_V02) {
        if (!fs.existsSync(p)) throw new Error(`Missing required v0.2 artifact: ${p}`);
    }
    console.log("✓ Required v0.2 artifacts exist");

    // 2) Ensure allowlist v0.2 runs do not reference v0.1 paths
    const runs = loadAllowlist(ALLOWLIST_PATH).filter(isV02);

    const badRefs = [];
    for (const r of runs) {
        const fieldsToCheck = ["equivalence_ref", "repro_ref"];
        for (const f of fieldsToCheck) {
            if (typeof r[f] === "string" && r[f].includes("/v0.1/")) {
                badRefs.push({ run_id: r.run_id, field: f, value: r[f] });
            }
        }
    }
    if (badRefs.length > 0) {
        throw new Error(`v0.2 runs reference v0.1 paths: ${JSON.stringify(badRefs, null, 2)}`);
    }
    console.log("✓ No v0.2 references to /v0.1/ found");

    // 3) Ensure equivalence_ref (if present) points to existing file
    const missing = [];
    for (const r of runs) {
        if (typeof r.equivalence_ref === "string") {
            const p = r.equivalence_ref.split("#")[0];
            if (!fs.existsSync(p)) missing.push({ run_id: r.run_id, equivalence_ref: p });
        }
    }
    if (missing.length > 0) throw new Error(`Missing equivalence_ref targets: ${JSON.stringify(missing, null, 2)}`);
    console.log("✓ All equivalence_ref targets exist");

    // 4) Status sanity (optional but useful)
    const badStatus = runs.filter(r => !["active", "downgraded", "pending", "eligible_for_upgrade"].includes(r.status));
    if (badStatus.length > 0) {
        throw new Error(`Unexpected v0.2 run statuses: ${badStatus.map(r => `${r.run_id}:${r.status}`).join(", ")}`);
    }
    console.log("✓ v0.2 statuses are sane (active/downgraded/pending)");

    console.log(`✅ PASS: ${GATE_ID}`);
}

try {
    main();
} catch (e) {
    console.error(`\n❌ FAIL: ${GATE_ID}\n${e.message}\n`);
    process.exit(1);
}
