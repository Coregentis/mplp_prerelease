#!/usr/bin/env node
/**
 * Fix empty description fields in markdown frontmatter
 * Run: node scripts/fix-empty-descriptions.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '../docs/docs');

// Description mappings for files with empty descriptions
const DESCRIPTION_MAP = {
    'meta/release/mplp-v0.9-to-v1.0-migration-guide.md': 'Migration guide for upgrading from MPLP v0.9 to v1.0, covering breaking changes, schema updates, and checklist.',
    'meta/release/mplp-v1.0.0-release-notes.md': 'Release notes for MPLP Protocol v1.0.0 including new features, breaking changes, and installation instructions.',
    'meta/release/mplp-v1.0.0-known-issues.md': 'Known issues and limitations in MPLP v1.0.0 with workarounds and planned fixes.',
    'meta/release/maintainer-guide.md': 'Guide for MPLP maintainers covering release process, review guidelines, and frozen specification rules.',
    'meta/release/mplp-v1.0-docs-governance-summary.md': 'Summary of documentation governance policies for MPLP v1.0 including structure and authority.',
    'guides/conformance-guide.md': 'Step-by-step guide for achieving MPLP protocol conformance at L1, L2, and L3 levels.',
    'guides/runtime/ael.md': 'Action Execution Layer (AEL) reference for runtime implementers.',
    'guides/runtime/vsl.md': 'Value State Layer (VSL) reference for state persistence implementations.',
    'guides/sdk/py-sdk-guide.md': 'Python SDK guide for mplp package including installation, usage, and API reference.',
    'guides/sdk/java-sdk-guide.md': 'Java SDK guide for MPLP including Gradle/Maven setup and core APIs.',
    'guides/sdk/go-sdk-guide.md': 'Go SDK guide for MPLP including module installation and usage patterns.',
    'guides/sdk/codegen-from-schema.md': 'Guide for generating type-safe code from MPLP JSON schemas in multiple languages.',
    'guides/examples/learning-notes/learning-feedback-overview.md': 'Overview of the MPLP learning feedback loop including sample collection and training.',
    'guides/examples/risk-confirmation-flow.md': 'Example flow demonstrating human-in-the-loop confirmation for high-risk actions.',
    'guides/examples/error-recovery-flow.md': 'Example flow demonstrating error handling and recovery patterns in MPLP.',
};

function fixEmptyDescription(filePath, description) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if has empty description
    if (!content.includes('description: ""')) {
        console.log(`⏭️  Skipped (no empty description): ${filePath}`);
        return false;
    }

    const newContent = content.replace(
        /description: ""/,
        `description: "${description}"`
    );

    fs.writeFileSync(filePath, newContent);
    console.log(`✅ Fixed description: ${filePath}`);
    return true;
}

function main() {
    let modified = 0;
    let skipped = 0;
    let errors = 0;

    for (const [relativePath, description] of Object.entries(DESCRIPTION_MAP)) {
        const fullPath = path.join(DOCS_ROOT, relativePath);

        if (!fs.existsSync(fullPath)) {
            console.error(`❌ File not found: ${fullPath}`);
            errors++;
            continue;
        }

        try {
            if (fixEmptyDescription(fullPath, description)) {
                modified++;
            } else {
                skipped++;
            }
        } catch (err) {
            console.error(`❌ Error processing ${fullPath}:`, err.message);
            errors++;
        }
    }

    console.log('\n--- Summary ---');
    console.log(`Modified: ${modified}`);
    console.log(`Skipped: ${skipped}`);
    console.log(`Errors: ${errors}`);
}

main();
