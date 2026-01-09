/**
 * PR-07: Semantic Lint — Authority & Terminology Guardrail
 * 
 * This script prevents semantic drift by enforcing:
 * 1. Forbidden terms (compliant, certified, pass/fail)
 * 2. Forbidden JSON-LD schema types (Product, Service, Certification)
 * 3. Required T0 identity anchors (Multi-Agent Lifecycle Protocol, Agent OS Protocol)
 * 
 * Run: npm run semantic:lint
 * CI: Blocks merge on failure
 */

import * as fs from "fs";
import * as path from "path";

const ROOT = process.cwd();

// ============================================================
// 1. FORBIDDEN TERMS (DGP-00 aligned)
// ============================================================
const FORBIDDEN_TERMS = [
    // Compliance language
    "mplp compliant",
    "mplp-compliant",
    "is compliant with mplp",
    "mplp certified",
    "mplp-certified",
    "certified by mplp",
    // Pass/fail language
    "passes mplp",
    "fails mplp",
    "mplp pass",
    "mplp fail",
    // Mandate language
    "must comply with mplp",
    "required to comply",
];

// Terms that are OK in context (negative assertions, governance docs)
const ALLOWED_CONTEXT_PATTERNS = [
    /does not certify/i,
    /no certification/i,
    /not.*compliant/i,
    /avoid.*compliant/i,
    /should not.*compliant/i,
    /forbidden.*term/i,
    /prohibited.*language/i,
];

// ============================================================
// 2. FORBIDDEN JSON-LD SCHEMA TYPES
// ============================================================
const FORBIDDEN_SCHEMA_TYPES = [
    '"@type": "Product"',
    '"@type":"Product"',
    '"@type": "Service"',
    '"@type":"Service"',
    '"@type": "Certification"',
    '"@type":"Certification"',
];

// ============================================================
// 3. REQUIRED T0 IDENTITY ANCHORS
// ============================================================
const REQUIRED_T0_ANCHORS = [
    "Multi-Agent Lifecycle Protocol",
    "Agent OS Protocol",
];

// ============================================================
// FILE SCANNING
// ============================================================
const SCAN_EXTENSIONS = [".ts", ".tsx", ".md", ".mdx", ".json"];
const EXCLUDE_DIRS = ["node_modules", ".next", ".git", "dist", "build"];
// Files that define rules (self-referential) or governance docs should not trigger errors
const EXCLUDE_FILES = [
    "semantic-lint.ts",
    "seo-jsonld-constraints.md",
    "seo-jsonld-contract.md",
    "CHANGELOG.md",
    "DGP-00_GOVERNANCE_ADDENDUM",
    "GOVERNANCE_STATEMENT.md",
    "GOVERNANCE_LAYERS.md",
];

function walkDir(dir: string, files: string[] = []): string[] {
    try {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            if (EXCLUDE_DIRS.includes(entry) || entry.startsWith(".")) continue;
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                walkDir(fullPath, files);
            } else if (SCAN_EXTENSIONS.some(ext => fullPath.endsWith(ext))) {
                // Skip excluded files
                if (EXCLUDE_FILES.some(excluded => entry.includes(excluded))) continue;
                files.push(fullPath);
            }
        }
    } catch {
        // Ignore permission errors
    }
    return files;
}

function isAllowedContext(content: string, term: string): boolean {
    // Check if the term appears in an allowed context (governance rule definition)
    const lines = content.split("\n");
    for (const line of lines) {
        if (line.toLowerCase().includes(term.toLowerCase())) {
            // Check if this line is in an allowed context
            for (const pattern of ALLOWED_CONTEXT_PATTERNS) {
                if (pattern.test(line)) {
                    return true;
                }
            }
            // Check if it's a FAQ question (asking about the term)
            if (line.includes("question:") || line.includes("Can a system be")) {
                return true;
            }
        }
    }
    return false;
}

// ============================================================
// MAIN LINT LOGIC
// ============================================================
function main() {
    console.log("🔍 Semantic Lint — Authority & Terminology Check\n");

    const files = walkDir(ROOT);
    const errors: string[] = [];
    let foundT0 = false;
    let scannedCount = 0;

    for (const file of files) {
        const content = fs.readFileSync(file, "utf8");
        const relativePath = path.relative(ROOT, file);
        scannedCount++;

        // Check forbidden terms
        for (const term of FORBIDDEN_TERMS) {
            if (content.toLowerCase().includes(term.toLowerCase())) {
                if (!isAllowedContext(content, term)) {
                    errors.push(`❌ Forbidden term "${term}" in ${relativePath}`);
                }
            }
        }

        // Check forbidden JSON-LD schema types
        for (const schema of FORBIDDEN_SCHEMA_TYPES) {
            if (content.includes(schema)) {
                errors.push(`❌ Forbidden JSON-LD schema ${schema} in ${relativePath}`);
            }
        }

        // Check T0 identity anchors
        if (REQUIRED_T0_ANCHORS.some(anchor => content.includes(anchor))) {
            foundT0 = true;
        }
    }

    // T0 anchor check
    if (!foundT0) {
        errors.push("❌ No T0 semantic anchor found (Multi-Agent Lifecycle Protocol / Agent OS Protocol)");
    }

    // Results
    console.log(`📁 Scanned ${scannedCount} files\n`);

    if (errors.length > 0) {
        console.error("🚫 Semantic Lint FAILED:\n");
        errors.forEach(e => console.error(`  ${e}`));
        console.error("\n");
        process.exit(1);
    }

    console.log("✅ Semantic lint passed — authority & terminology intact.\n");
    console.log("   ✓ No forbidden terms (DGP-00)");
    console.log("   ✓ No forbidden JSON-LD schema types");
    console.log("   ✓ T0 identity anchors present");
    process.exit(0);
}

main();
