/**
 * WEB-GOV Gate: No Hardcoded URLs
 * 
 * Run ID: WEB-GOV-RUN-2026-01-06-01
 * Authority: MPGC
 * 
 * This script enforces CONST-001 by ensuring all docs.mplp.io and 
 * github.com/Coregentis/MPLP-Protocol URLs are sourced from lib/site-config.ts
 * 
 * Usage: node scripts/governance/no-hardcoded-urls.mjs
 * Exit: 0 = PASS, 1 = FAIL with violations listed
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

const TARGET_DIRS = ["app", "components", "lib"];

// Files where hardcoded URLs are allowed
const ALLOW_FILES = new Set([
    path.join(ROOT, "lib", "site-config.ts"),
]);

// Patterns that must not appear outside of allowed files
const PATTERNS = [
    "https://docs.mplp.io",
    "http://docs.mplp.io",
    "https://github.com/Coregentis/MPLP-Protocol",
    "http://github.com/Coregentis/MPLP-Protocol",
];

function walk(dir, files = []) {
    if (!fs.existsSync(dir)) return files;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            // Skip node_modules and hidden directories
            if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
                walk(p, files);
            }
        } else {
            files.push(p);
        }
    }
    return files;
}

function isSourceFile(file) {
    return /\.(ts|tsx|js|jsx)$/.test(file);
}

function scan() {
    const hits = [];

    for (const d of TARGET_DIRS) {
        const abs = path.join(ROOT, d);
        if (!fs.existsSync(abs)) continue;

        for (const file of walk(abs)) {
            if (!isSourceFile(file)) continue;
            if (ALLOW_FILES.has(file)) continue;

            const content = fs.readFileSync(file, "utf8");
            const lines = content.split("\n");

            for (const pattern of PATTERNS) {
                lines.forEach((line, idx) => {
                    if (line.includes(pattern)) {
                        hits.push({
                            file: path.relative(ROOT, file),
                            line: idx + 1,
                            pattern,
                            snippet: line.trim().slice(0, 80),
                        });
                    }
                });
            }
        }
    }

    return hits;
}

// Main execution
const strict = process.env.WEB_GOV_STRICT === "1";

console.log("\n[WEB-GOV] Running no-hardcoded-urls gate...");
console.log(`Mode: ${strict ? "STRICT (blocking)" : "SHADOW (warning only)"}\n`);

const hits = scan();

if (hits.length > 0) {
    if (strict) {
        console.error("❌ FAIL: Hardcoded URL violations detected\n");
    } else {
        console.warn("⚠️ WARN: Hardcoded URL violations detected (shadow mode)\n");
    }

    console.error("The following files contain hardcoded docs/repo URLs:\n");

    for (const h of hits) {
        console.error(`  ${h.file}:${h.line}`);
        console.error(`    Pattern: ${h.pattern}`);
        console.error(`    Snippet: ${h.snippet}`);
        console.error("");
    }

    console.error(`Total violations: ${hits.length}\n`);
    console.error("Fix: Import from lib/site-config.ts and use DocsKey/RepoKey references.\n");
    console.error("Allowed file: lib/site-config.ts\n");

    if (strict) {
        process.exit(1);
    } else {
        console.warn("Shadow mode: exiting with 0 (non-blocking)\n");
        process.exit(0);
    }
}

console.log("✅ PASS: No hardcoded URLs found outside lib/site-config.ts\n");
console.log(`Scanned directories: ${TARGET_DIRS.join(", ")}`);
console.log(`Patterns checked: ${PATTERNS.length}`);
console.log("");

process.exit(0);
