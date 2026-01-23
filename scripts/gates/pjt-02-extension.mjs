#!/usr/bin/env node
import fs from "fs";
import path from "path";
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


const GATE_ID = "PJT-02";
const ALLOWLIST_PATH = "Validation_Lab/data/curated-runs/allowlist.yaml";

function mustExist(p) {
    if (!fileExists(p)) throw new Error(`Missing file: ${p}`);
}

function readText(p) {
    return fs.readFileSync(p, "utf-8");
}

function loadAllowlist(filepath) {
    const doc = yaml.load(readText(filepath));
    if (Array.isArray(doc)) return doc;
    if (doc && Array.isArray(doc.runs)) return doc.runs;
    throw new Error("Unsupported allowlist structure");
}

function isV02Run(run) {
    return typeof run.run_id === "string" && run.run_id.includes("-official-v0.2");
}

function normalizeReproPath(reproRef) {
    // strip fragment anchors (#...) if any
    return reproRef.split("#")[0];
}

function checkSh(filePath) {
    const content = readText(filePath);
    if (!content.startsWith("#!")) throw new Error(`.sh missing shebang: ${filePath}`);
    const st = fs.statSync(filePath);
    // executable bit: any of 0o111
    if ((st.mode & 0o111) === 0) throw new Error(`.sh not executable (chmod +x): ${filePath}`);
}

function checkMjs(filePath) {
    const content = readText(filePath);
    // Minimal ESM signal: import/export
    if (!/(\bimport\b|\bexport\b)/.test(content)) {
        throw new Error(`.mjs does not look like ESM (missing import/export): ${filePath}`);
    }
}

function checkPy(_filePath) {
    // shebang optional; existence already checked
    return;
}

function main() {
    console.log(`\n=== ${GATE_ID} Extension Checks ===`);
    mustExist(ALLOWLIST_PATH);

    const runs = loadAllowlist(ALLOWLIST_PATH).filter(isV02Run);

    if (runs.length === 0) {
        console.log("⚠️ WARN: No v0.2 runs found in allowlist (skip).");
        console.log(`✅ PASS: ${GATE_ID}`);
        return;
    }

    const checked = [];
    for (const run of runs) {
        if (!run.repro_ref) throw new Error(`${run.run_id}: missing repro_ref`);

        const reproPath = normalizeReproPath(run.repro_ref);
        mustExist(reproPath);

        const ext = path.extname(reproPath);
        if (ext === ".sh") checkSh(reproPath);
        else if (ext === ".mjs") checkMjs(reproPath);
        else if (ext === ".py") checkPy(reproPath);
        else {
            // allow future extensions, but warn
            console.log(`⚠️ WARN: Unknown repro_ref extension ${ext} for ${run.run_id}: ${reproPath}`);
        }

        checked.push({ run_id: run.run_id, repro_ref: reproPath });
    }

    console.log(`Checked ${checked.length} repro_ref targets:`);
    for (const c of checked) console.log(`  ✓ ${c.run_id}: ${c.repro_ref}`);

    console.log(`✅ PASS: ${GATE_ID}`);
}

try {
    main();
} catch (e) {
    console.error(`\n❌ FAIL: ${GATE_ID}\n${e.message}\n`);
    process.exit(1);
}
