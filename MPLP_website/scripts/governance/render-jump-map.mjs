#!/usr/bin/env node
/**
 * render-jump-map.mjs
 * Jump Map Renderer - Generates MD from YAML SSoT
 * 
 * Purpose: Generate WEBSITE_DOCS_REPO_JUMP_MAP.md from jump-map.yaml
 * to eliminate human-editable drift between YAML and MD views.
 * 
 * Usage:
 *   npm run render:jump-map           # Generate MD
 *   npm run verify:jump-map:rendered  # Verify MD matches YAML
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const YAML_PATH = path.join(__dirname, '../../../governance/05-website-governance/runs/WEB-GOV-RUN-2026-01-06-01/outputs/jump-map.yaml');
const MD_PATH = path.join(__dirname, '../../../governance/05-website-governance/runs/WEB-GOV-RUN-2026-01-06-01/outputs/WEBSITE_DOCS_REPO_JUMP_MAP.md');

/**
 * Parse jump-map.yaml (simple parser)
 */
function parseJumpMapYaml(yamlContent) {
    const metadata = {
        version: null,
        run_id: null,
        authority: null,
        created: null,
        frozen: null
    };

    // Extract metadata
    const versionMatch = yamlContent.match(/^version:\s*(\d+)/m);
    const runIdMatch = yamlContent.match(/^run_id:\s*(.+)/m);
    const authorityMatch = yamlContent.match(/^authority:\s*(.+)/m);
    const createdMatch = yamlContent.match(/^created:\s*(.+)/m);
    const frozenMatch = yamlContent.match(/^frozen:\s*(.+)/m);

    if (versionMatch) metadata.version = versionMatch[1];
    if (runIdMatch) metadata.run_id = runIdMatch[1].trim();
    if (authorityMatch) metadata.authority = authorityMatch[1].trim();
    if (createdMatch) metadata.created = createdMatch[1].trim();
    if (frozenMatch) metadata.frozen = frozenMatch[1].trim() === 'true';

    // Parse entries
    const entries = [];
    const entryBlocks = yamlContent.split(/^\s*-\s*website_path:/gm).slice(1);

    for (const block of entryBlocks) {
        const lines = block.split('\n');
        const entry = {
            website_path: null,
            page_role: null,
            docsKey: null,
            repoKey: null,
            evidenceKey: null,
            required_notices: [],
            notes: []
        };

        entry.website_path = lines[0].trim();

        for (const line of lines) {
            const pageRoleMatch = line.match(/^\s*page_role:\s*(.+)/);
            const docsKeyMatch = line.match(/^\s*docsKey:\s*(\w+)/);
            const repoKeyMatch = line.match(/^\s*repoKey:\s*(\w+)/);
            const evidenceKeyMatch = line.match(/^\s*evidenceKey:\s*(\w+)/);
            const noticeMatch = line.match(/^\s*-\s*(\w+Notice)/);
            const noteMatch = line.match(/^\s*-\s*([^-].+)$/);

            if (pageRoleMatch) entry.page_role = pageRoleMatch[1].trim();
            if (docsKeyMatch) entry.docsKey = docsKeyMatch[1];
            if (repoKeyMatch) entry.repoKey = repoKeyMatch[1];
            if (evidenceKeyMatch) entry.evidenceKey = evidenceKeyMatch[1];
            if (noticeMatch && line.includes('Notice')) {
                entry.required_notices.push(noticeMatch[1]);
            }
        }

        if (entry.website_path) {
            entries.push(entry);
        }
    }

    return { metadata, entries };
}

/**
 * Generate MD content from parsed YAML
 */
function generateMarkdown(yaml, yamlHash) {
    const { metadata, entries } = yaml;
    const now = new Date().toISOString().slice(0, 10);

    // Categorize entries
    const anchors = entries.filter(e => e.page_role === 'Anchor' || e.page_role === 'Canonical');
    const informative = entries.filter(e => e.page_role === 'Informative');

    let md = `<!-- GENERATED FROM jump-map.yaml — DO NOT EDIT MANUALLY -->
<!-- Source Hash: ${yamlHash} -->
<!-- Generated: ${new Date().toISOString()} -->

# Website ↔ Docs ↔ Repo Jump Map

**Run ID**: ${metadata.run_id}  
**Status**: ${metadata.frozen ? '✅ FROZEN' : '🔄 ACTIVE'} (Key-Driven CTA Enforced)  
**Authority**: ${metadata.authority}  
**Generated**: ${now}  
**Source**: \`jump-map.yaml\`

> **GOVERNANCE PROPERTY**: This file is AUTO-GENERATED from \`jump-map.yaml\`.  
> All edits MUST be made to the YAML source. Manual edits will be overwritten.

---

## Purpose

This document defines the mandatory cross-entry linking requirements for every website page. It serves as the mechanical enforcement layer for CONST-001 Three-Entry Model compliance.

---

## Jump Map — Anchor Pages (${anchors.length} entries)

| Website Path | Role | docsKey | repoKey | evidenceKey | Required Notices |
|--------------|------|---------|---------|-------------|------------------|
`;

    // Sort anchors by website_path
    anchors.sort((a, b) => a.website_path.localeCompare(b.website_path));

    for (const entry of anchors) {
        const notices = entry.required_notices.length > 0
            ? entry.required_notices.join(', ')
            : '—';
        md += `| \`${entry.website_path}\` | ${entry.page_role} | \`${entry.docsKey}\` | \`${entry.repoKey}\` | \`${entry.evidenceKey}\` | ${notices} |\n`;
    }

    md += `
---

## Jump Map — Informative Pages (${informative.length} entries)

| Website Path | Role | docsKey | repoKey | evidenceKey | Required Notices |
|--------------|------|---------|---------|-------------|------------------|
`;

    informative.sort((a, b) => a.website_path.localeCompare(b.website_path));

    for (const entry of informative) {
        const notices = entry.required_notices.length > 0
            ? entry.required_notices.join(', ')
            : '—';
        md += `| \`${entry.website_path}\` | ${entry.page_role} | \`${entry.docsKey}\` | \`${entry.repoKey}\` | \`${entry.evidenceKey}\` | ${notices} |\n`;
    }

    md += `
---

## SSoT Reference

> **Single Source of Truth**: \`lib/site-config.ts\`
>
> All \`docsKey\` and \`repoKey\` values MUST exist in \`DOCS_URLS\` and \`REPO_URLS\` respectively.

### Verification

\`\`\`bash
npm run verify:jump-map      # Validate YAML keys against SSoT
npm run render:jump-map      # Regenerate this MD from YAML
\`\`\`

---

## Enforcement Rules

1. **Primary Link Rule**: Every anchor page MUST use \`DOCS_URLS[docsKey]\`
2. **Repo Link Rule**: Implementation pages MUST use \`REPO_URLS[repoKey]\`
3. **No Hardcoding**: Page files MUST NOT contain hardcoded \`docs.mplp.io\` URLs
4. **Notice Requirement**: High F1/F3 risk pages MUST have disclaimer component
5. **MD Generation**: This file MUST be generated from \`jump-map.yaml\`, never manually edited

---

**End of Jump Map**

**© 2026 MPGC — MPLP Protocol Governance Committee**
`;

    return md;
}

/**
 * Calculate SHA-256 hash of content
 */
function hashContent(content) {
    return crypto.createHash('sha256').update(content).digest('hex').slice(0, 16);
}

// Main execution
console.log('\n[RENDER-JUMP-MAP] Generating MD from YAML...\n');

if (!fs.existsSync(YAML_PATH)) {
    console.error(`❌ jump-map.yaml not found: ${YAML_PATH}`);
    process.exit(1);
}

const yamlContent = fs.readFileSync(YAML_PATH, 'utf-8');
const yamlHash = hashContent(yamlContent);
const parsed = parseJumpMapYaml(yamlContent);

console.log(`Source: jump-map.yaml`);
console.log(`Source Hash: ${yamlHash}`);
console.log(`Entries: ${parsed.entries.length}`);
console.log(`Run ID: ${parsed.metadata.run_id}`);

const mdContent = generateMarkdown(parsed, yamlHash);

// Write MD
fs.writeFileSync(MD_PATH, mdContent);
console.log(`\n✅ Generated: WEBSITE_DOCS_REPO_JUMP_MAP.md`);
console.log(`   ${MD_PATH}`);

process.exit(0);
