#!/usr/bin/env node
/**
 * MPLP Website Semantic Lint Gate
 * Version: 1.0.0
 * Authority: MPGC (Release Gate-0)
 * 
 * This script enforces semantic governance rules for mplp.io website.
 * Exit 0 = PASS, Exit 1 = FAIL
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "../..");

// Configuration
const CONFIG = {
    anchorsPath: "governance/semantic/semantic-positioning-anchors.yaml",

    // Forbidden terms - critical identity violations only
    forbiddenTerms: [
        "MPLP compliant",
        "MPLP-compliant"
    ],

    // Allowed contexts
    allowedContextPatterns: [
        /forbidden.*patterns/i,
        /forbidden_terms/i,
        /lint_hooks/i,
        /seo-jsonld-contract\.md/i,
        /CHANGELOG\.md/i,
        /Replaced.*instances/i,
        /forbidden.*term/i,
        /semantic-lint\.mjs/i,
        /"MPLP-compliant"/i,
        /`MPLP-compliant`/i,
        /patterns:\s*$/i
    ],

    // URL standard
    forbiddenURL: "https://mplp.io",
    canonicalURL: "https://www.mplp.io",

    // JSON-LD whitelist
    jsonLdWhitelist: [
        "Organization", "SoftwareSourceCode", "TechArticle", "Specification",
        "FAQPage", "WebSite", "WebPage", "DefinedTerm", "DefinedTermSet"
    ],
    jsonLdForbidden: [
        "Product", "Service", "Certification", "Offer", "Review", "Rating"
    ],

    // T0 invariants
    t0Checks: [
        {
            file: "app/page.tsx",
            mustContain: ["lifecycle protocol", "Agent OS Protocol"]
        }
    ]
};

// Excluded directories
const excludedDirNames = [
    "node_modules", ".next", "dist", "build", ".git"
];
const excludedFileNames = ["package-lock.json", "pnpm-lock.yaml"];

function readFile(filePath) {
    try {
        return fs.readFileSync(path.join(ROOT, filePath), "utf8");
    } catch {
        return null;
    }
}

function getAllFiles() {
    const results = [];

    function walk(currentDir) {
        if (!fs.existsSync(currentDir)) return;

        const items = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory() && excludedDirNames.includes(item.name)) continue;
            if (!item.isDirectory() && excludedFileNames.includes(item.name)) continue;

            const fullPath = path.join(currentDir, item.name);
            const relativePath = path.relative(ROOT, fullPath);

            if (item.isDirectory()) {
                walk(fullPath);
            } else {
                const ext = path.extname(item.name).slice(1);
                const validExts = ["md", "mdx", "ts", "tsx", "js", "jsx", "json", "yaml", "yml"];
                if (validExts.includes(ext)) {
                    results.push({ path: relativePath, fullPath });
                }
            }
        }
    }

    walk(ROOT);
    return results;
}

function log(level, message) {
    const prefix = { info: "ℹ️", warn: "⚠️", error: "❌", pass: "✅" }[level] || "";
    console.log(`${prefix} [WEBSITE-LINT] ${message}`);
}

function checkForbiddenTerms(files) {
    log("info", "Checking forbidden terms...");
    const violations = [];

    for (const file of files) {
        const content = readFile(file.path);
        if (!content) continue;

        const isDocumentation = CONFIG.allowedContextPatterns.some(p => p.test(file.path));
        if (isDocumentation) continue;

        for (const term of CONFIG.forbiddenTerms) {
            const regex = new RegExp(term, "gi");
            if (content.match(regex)) {
                const lines = content.split("\n");
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].toLowerCase().includes(term.toLowerCase())) {
                        const context = lines.slice(Math.max(0, i - 2), i + 3).join("\n");
                        const isAllowed = CONFIG.allowedContextPatterns.some(p => p.test(context));
                        if (!isAllowed) {
                            violations.push({ file: file.path, line: i + 1, term });
                        }
                    }
                }
            }
        }
    }

    if (violations.length > 0) {
        log("error", `Found ${violations.length} forbidden term violation(s)`);
        violations.slice(0, 10).forEach(v => console.log(`   ${v.file}:${v.line} - "${v.term}"`));
        return false;
    }

    log("pass", "No forbidden terms found");
    return true;
}

function checkCanonicalURL(files) {
    log("info", "Checking URL standardization...");
    const violations = [];

    for (const file of files) {
        const content = readFile(file.path);
        if (!content) continue;

        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
            // Extract URLs and check origin properly (not substring)
            const urlMatches = lines[i].match(/https?:\/\/[^\s"'<>]+/g) || [];
            for (const urlStr of urlMatches) {
                try {
                    const url = new URL(urlStr);
                    // Check if URL is non-www mplp.io (should be www.mplp.io)
                    if (url.hostname === 'mplp.io') {
                        const isDocumentation = CONFIG.allowedContextPatterns.some(p => p.test(lines[i]));
                        if (!isDocumentation) {
                            violations.push({ file: file.path, line: i + 1 });
                        }
                    }
                } catch {
                    // Invalid URL, skip
                }
            }
        }
    }

    if (violations.length > 0) {
        log("error", `Found ${violations.length} non-canonical URL(s)`);
        violations.slice(0, 10).forEach(v => console.log(`   ${v.file}:${v.line}`));
        return false;
    }

    log("pass", "All URLs use canonical format (www.mplp.io)");
    return true;
}

function checkT0Invariants() {
    log("info", "Checking T0 invariants...");
    const violations = [];

    for (const check of CONFIG.t0Checks) {
        const content = readFile(check.file);
        if (!content) {
            violations.push({ file: check.file, issue: "File not found" });
            continue;
        }

        for (const must of check.mustContain) {
            if (!content.toLowerCase().includes(must.toLowerCase())) {
                violations.push({ file: check.file, issue: `Missing: "${must}"` });
            }
        }
    }

    if (violations.length > 0) {
        log("error", `Found ${violations.length} T0 invariant violation(s)`);
        violations.forEach(v => console.log(`   ${v.file}: ${v.issue}`));
        return false;
    }

    log("pass", "T0 invariants verified");
    return true;
}

function checkJsonLdTypes(files) {
    log("info", "Checking JSON-LD schema types...");
    const violations = [];

    const jsonLdFiles = files.filter(f => f.path.endsWith(".tsx") || f.path.endsWith(".ts"));

    for (const file of jsonLdFiles) {
        const content = readFile(file.path);
        if (!content || !content.includes('"@context"')) continue;

        const typeMatches = content.matchAll(/"@type"\s*:\s*"([^"]+)"/g);

        for (const match of typeMatches) {
            const type = match[1];
            if (CONFIG.jsonLdForbidden.includes(type)) {
                violations.push({ file: file.path, type });
            }
        }
    }

    if (violations.length > 0) {
        log("error", `Found ${violations.length} JSON-LD type violation(s)`);
        return false;
    }

    log("pass", "JSON-LD types comply with whitelist");
    return true;
}

async function main() {
    console.log("\n" + "=".repeat(50));
    console.log("MPLP Website Semantic Lint Gate v1.0.0");
    console.log("=".repeat(50) + "\n");

    log("info", "Scanning files...");
    const files = getAllFiles();
    log("info", `Found ${files.length} files to check`);

    const results = [
        checkForbiddenTerms(files),
        checkCanonicalURL(files),
        checkT0Invariants(),
        checkJsonLdTypes(files)
    ];

    console.log("\n" + "-".repeat(50));

    if (results.every(r => r)) {
        log("pass", "ALL CHECKS PASSED");
        console.log("-".repeat(50) + "\n");
        process.exit(0);
    } else {
        log("error", "SEMANTIC LINT FAILED");
        console.log("-".repeat(50) + "\n");
        process.exit(1);
    }
}

main().catch(e => {
    console.error(e);
    process.exit(1);
});
