#!/usr/bin/env node
/**
 * Batch add sidebar_position to markdown files
 * Run: node scripts/fix-sidebar-position.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DOCS_ROOT = path.resolve(__dirname, '../docs/docs');

// Define sidebar_position by directory and file ordering
const POSITION_MAP = {
    // meta/ root
    'meta/faq.md': 1,
    'meta/roadmap.md': 2,

    // meta/release/
    'meta/release/mplp-v1.0.0-release-notes.md': 1,
    'meta/release/mplp-v0.9-to-v1.0-migration-guide.md': 2,
    'meta/release/docs-freeze-declaration-v1.0.md': 3,
    'meta/release/mplp-v1.0.0-known-issues.md': 4,
    'meta/release/editorial-policy.md': 5,
    'meta/release/maintainer-guide.md': 6,
    'meta/release/mplp-v1.0-docs-governance-summary.md': 7,
    'meta/release/LEARNING_ATTESTATION_v1.0.0.md': 8,

    // meta/redirects/
    'meta/redirects/REDIRECT_MANIFEST.md': 1,
    'meta/redirects/LINK_FIX_LEDGER.md': 2,

    // specification/ root level matrices
    'specification/normative-coverage-report.md': 90,
    'specification/semantic-anchor-registry.md': 91,
    'specification/semantic-alignment-overview.md': 92,
    'specification/spec-to-eval-matrix.md': 93,
    'specification/module-to-duty-matrix.md': 94,
    'specification/flow-to-duty-matrix.md': 95,

    // guides/ root
    'guides/conformance-guide.md': 1,
    'guides/conformance-checklist.md': 2,
    'guides/evaluation-guide.md': 3,

    // guides/enterprise/
    'guides/enterprise/enterprise-scenarios.md': 1,
    'guides/enterprise/non-goals.md': 2,

    // guides/runtime/
    'guides/runtime/runtime-glue-overview.md': 1,
    'guides/runtime/psg.md': 2,
    'guides/runtime/ael.md': 3,
    'guides/runtime/vsl.md': 4,
    'guides/runtime/drift-and-rollback.md': 5,
    'guides/runtime/module-psg-paths.md': 6,
    'guides/runtime/crosscut-psg-event-binding.md': 7,
    'guides/runtime/skeleton/index.md': 8,

    // guides/sdk/
    'guides/sdk/ts-sdk-guide.md': 1,
    'guides/sdk/py-sdk-guide.md': 2,
    'guides/sdk/go-sdk-guide.md': 3,
    'guides/sdk/java-sdk-guide.md': 4,
    'guides/sdk/schema-mapping-standard.md': 5,
    'guides/sdk/codegen-from-schema.md': 6,
    'guides/sdk/implementation-maturity-matrix.md': 7,

    // guides/adoption/
    'guides/adoption/adoption-signals.md': 1,
    'guides/adoption/non-goals.md': 2,

    // guides/examples/
    'guides/examples/vendor-neutral-llm-integration.md': 2,
    'guides/examples/tool-execution-integration.md': 3,
    'guides/examples/risk-confirmation-flow.md': 4,
    'guides/examples/error-recovery-flow.md': 5,
    'guides/examples/multi-agent-collab-flow.md': 6,

    // guides/examples/learning-notes/
    'guides/examples/learning-notes/learning-overview.md': 1,
    'guides/examples/learning-notes/learning-sample-schema.md': 2,
    'guides/examples/learning-notes/learning-collection-points.md': 3,
    'guides/examples/learning-notes/learning-invariants.md': 4,
    'guides/examples/learning-notes/learning-feedback-overview.md': 5,

    // governance/
    'governance/evidence-baseline.md': 1,

    // evaluation/tests/
    'evaluation/tests/golden-test-suite-overview.md': 1,
    'evaluation/tests/golden-test-suite-details.md': 2,
    'evaluation/tests/golden-fixture-format.md': 3,
    'evaluation/tests/golden-flow-registry.md': 4,

    // evaluation/governance/
    'evaluation/governance/protocol-governance.md': 1,
    'evaluation/governance/protocol-truth-index.md': 2,
    'evaluation/governance/versioning-policy.md': 3,
    'evaluation/governance/security-policy.md': 4,
    'evaluation/governance/license-governance.md': 5,
    'evaluation/governance/contributing.md': 6,
    'evaluation/governance/compatibility-matrix.md': 7,
    'evaluation/governance/documentation-projection.md': 8,
    'evaluation/governance/EXTERNAL_TRUST_OVERVIEW.md': 9,

    // evaluation/conformance/
    'evaluation/conformance/conformance-model.md': 1,
    'evaluation/conformance/evidence-model.md': 2,
    'evaluation/conformance/evaluation-dimensions.md': 3,
    'evaluation/conformance/results-and-status.md': 4,
};

function addSidebarPosition(filePath, position) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if already has sidebar_position
    if (content.includes('sidebar_position')) {
        console.log(`⏭️  Skipped (already has): ${filePath}`);
        return false;
    }

    // Check if has frontmatter
    const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (fmMatch) {
        // Insert sidebar_position after opening ---
        const newContent = content.replace(
            /^---\n/,
            `---\nsidebar_position: ${position}\n`
        );
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Added sidebar_position: ${position} to ${filePath}`);
        return true;
    } else {
        // No frontmatter, add new one
        const newContent = `---\nsidebar_position: ${position}\n---\n\n${content}`;
        fs.writeFileSync(filePath, newContent);
        console.log(`✅ Created frontmatter with sidebar_position: ${position} for ${filePath}`);
        return true;
    }
}

function main() {
    let modified = 0;
    let skipped = 0;
    let errors = 0;

    for (const [relativePath, position] of Object.entries(POSITION_MAP)) {
        const fullPath = path.join(DOCS_ROOT, relativePath);

        if (!fs.existsSync(fullPath)) {
            console.error(`❌ File not found: ${fullPath}`);
            errors++;
            continue;
        }

        try {
            if (addSidebarPosition(fullPath, position)) {
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
    console.log(`Total: ${modified + skipped + errors}`);
}

main();
