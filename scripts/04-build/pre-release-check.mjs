#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";

const ROOT = process.cwd();

function runNode(scriptRelPath, args = []) {
    const scriptPath = path.resolve(ROOT, scriptRelPath);
    if (!fs.existsSync(scriptPath)) {
        return Promise.resolve({
            ok: false,
            name: scriptRelPath,
            code: 1,
            output: `Missing script: ${scriptRelPath}`,
        });
    }

    return new Promise((resolve) => {
        const p = spawn(process.execPath, [scriptPath, ...args], {
            stdio: ["ignore", "pipe", "pipe"],
            env: process.env,
        });

        let out = "";
        p.stdout.on("data", (d) => (out += d.toString()));
        p.stderr.on("data", (d) => (out += d.toString()));

        p.on("close", (code) => {
            resolve({
                ok: code === 0,
                name: scriptRelPath,
                code: code ?? 1,
                output: out.trim(),
            });
        });
    });
}

function printHeader() {
    console.log("============================================================");
    console.log("MPLP Pre-Release Check Suite");
    console.log("Authority: scripts/pre-release-check.mjs");
    console.log("Mode:", process.env.CI ? "CI" : "LOCAL");
    console.log("============================================================");
}

function printResult(r) {
    const status = r.ok ? "PASS" : "FAIL";
    console.log(`\n[${status}] ${r.name}`);
    if (r.output) console.log(r.output);
}

async function main() {
    printHeader();

    // Order is intentional: governance invariants → semantics → mappings → UI rules
    const checks = [
        "scripts/update-frozen-headers.mjs",
        "scripts/semantic/semantic-lint.mjs",
        "scripts/semantic/mapping-health.mjs",
        "scripts/verify-governance-styling.mjs",
        "scripts/verify-footer-compliance.mjs",
    ];

    const results = [];
    for (const c of checks) {
        // You can pass flags here if your scripts accept them.
        const r = await runNode(c);
        results.push(r);
        printResult(r);
    }

    const failed = results.filter((r) => !r.ok);
    console.log("\n============================================================");
    if (failed.length === 0) {
        console.log("FINAL VERDICT: PASS — Release eligible.");
        console.log("============================================================\n");
        process.exit(0);
    } else {
        console.log(`FINAL VERDICT: FAIL — ${failed.length} check(s) failed.`);
        console.log("Release is blocked until failures are remediated.");
        console.log("============================================================\n");
        process.exit(1);
    }
}

main().catch((e) => {
    console.error("\n[FATAL] pre-release-check crashed:", e);
    process.exit(1);
});
