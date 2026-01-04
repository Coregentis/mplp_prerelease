#!/usr/bin/env node
/**
 * MPLP Evidence Chain Validator
 * DGP-13 Automation Script
 * 
 * This script validates that documentation claims link to actual code evidence.
 * It does NOT produce compliance verdicts - only semantic observations per DGP-00.
 * 
 * Usage: node scripts/validate-evidence-chain.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

const DOCS_PATH = 'docs/docs';
const SCHEMA_PATH = 'schemas/v2';
const SDK_PATH = 'packages/sources/sdk-ts';

/**
 * Extract frontmatter from markdown file
 */
function extractFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (!match) return null;
    try {
        return yaml.parse(match[1]);
    } catch (e) {
        return null;
    }
}

/**
 * Check if a path exists
 */
function evidenceExists(relativePath) {
    const fullPath = path.join(process.cwd(), relativePath);
    return fs.existsSync(fullPath);
}

/**
 * Validate a single documentation file
 */
function validateFile(filePath) {
    const frontmatter = extractFrontmatter(filePath);
    if (!frontmatter) {
        return { file: filePath, status: 'NO_FRONTMATTER', issues: [] };
    }

    const issues = [];
    const docType = frontmatter.doc_type;

    // Normative files MUST have trace evidence
    if (docType === 'normative') {
        if (!frontmatter.trace) {
            issues.push('MISSING_TRACE: Normative document without trace block');
        } else {
            if (frontmatter.trace.schema && !evidenceExists(frontmatter.trace.schema)) {
                issues.push(`MISSING_EVIDENCE: Schema not found at ${frontmatter.trace.schema}`);
            }
            if (frontmatter.trace.tests && !evidenceExists(frontmatter.trace.tests)) {
                issues.push(`MISSING_EVIDENCE: Tests not found at ${frontmatter.trace.tests}`);
            }
        }
    }

    return {
        file: filePath,
        docType: docType || 'UNKNOWN',
        status: issues.length === 0 ? 'PASS' : 'OBSERVATION',
        issues
    };
}

/**
 * Recursively find all markdown files
 */
function findMarkdownFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findMarkdownFiles(fullPath, files);
        } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
            files.push(fullPath);
        }
    }
    return files;
}

/**
 * Main execution
 */
function main() {
    console.log('=== DGP-13 Evidence Chain Validation ===\n');
    console.log('NOTE: This produces semantic observations, not compliance verdicts.\n');

    const files = findMarkdownFiles(DOCS_PATH);
    const results = files.map(validateFile);

    const summary = {
        total: results.length,
        pass: results.filter(r => r.status === 'PASS').length,
        observations: results.filter(r => r.status === 'OBSERVATION').length,
        noFrontmatter: results.filter(r => r.status === 'NO_FRONTMATTER').length
    };

    console.log('--- Summary ---');
    console.log(`Total files: ${summary.total}`);
    console.log(`Pass: ${summary.pass}`);
    console.log(`With observations: ${summary.observations}`);
    console.log(`No frontmatter: ${summary.noFrontmatter}\n`);

    // Show observations
    const withIssues = results.filter(r => r.issues.length > 0);
    if (withIssues.length > 0) {
        console.log('--- Observations ---');
        for (const result of withIssues) {
            console.log(`\n${result.file} (${result.docType}):`);
            for (const issue of result.issues) {
                console.log(`  - ${issue}`);
            }
        }
    }

    console.log('\n=== Validation Complete ===');
}

main();
