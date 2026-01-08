#!/usr/bin/env node
/**
 * MPLP Docs: Mermaid Build-Time SVG Renderer
 * 
 * Scans docs/ for ```mermaid blocks, generates light/dark SVGs,
 * and replaces blocks with <MermaidDiagram id="..." /> components.
 * 
 * Part of Day 2 P1-5 Performance Optimization
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '../..');
const DOCS_ROOT = path.join(ROOT, 'docs');
const DOCS_DIR = path.join(DOCS_ROOT, 'docs');
const STATIC_MERMAID_DIR = path.join(DOCS_ROOT, 'static/mermaid');

// Mermaid themes for light/dark
const MERMAID_CONFIG_LIGHT = {
    theme: 'default',
};

const MERMAID_CONFIG_DARK = {
    theme: 'dark',
    themeVariables: {
        primaryColor: '#2563EB',
        primaryTextColor: '#F9FAFB',
        primaryBorderColor: '#1F2937',
        signalColor: '#60A5FA',
        signalTextColor: '#F9FAFB',
        background: '#0B1120',
        mainBkg: '#111827',
        secondBkg: '#1F2937',
        lineColor: '#374151',
        border1: '#374151',
        border2: '#4B5563',
        arrowheadColor: '#9CA3AF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
    },
};

console.log('🎨 MPLP Mermaid Renderer - Build-Time SVG Generation');
console.log('========================================\\n');

// Ensure output directory exists
if (!fs.existsSync(STATIC_MERMAID_DIR)) {
    fs.mkdirSync(STATIC_MERMAID_DIR, { recursive: true });
    console.log(`✓ Created ${STATIC_MERMAID_DIR}`);
}

// Directories to skip during traversal
const SKIP_DIRS = new Set([
    'node_modules',
    '.git',
    '.docusaurus',
    'build',
    'static',
    'dist',
    '.next',
    '.cache',
]);

// Find all markdown/mdx files recursively
function findDocsFiles(dir) {
    const results = [];

    function walk(currentDir) {
        try {
            const entries = fs.readdirSync(currentDir, { withFileTypes: true });

            for (const entry of entries) {
                const fullPath = path.join(currentDir, entry.name);

                if (entry.isDirectory()) {
                    // Skip excluded directories
                    if (SKIP_DIRS.has(entry.name)) continue;
                    // Skip mermaid output directory
                    if (entry.name === 'mermaid') continue;
                    // Recurse into subdirectories
                    walk(fullPath);
                } else if (entry.isFile()) {
                    // Only process .md and .mdx files
                    if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
                        results.push(fullPath);
                    }
                }
            }
        } catch (error) {
            console.error(`Warning: Cannot read directory ${currentDir}: ${error.message}`);
        }
    }

    walk(dir);

    // Hard fail if no files found - prevents silent failures
    if (results.length === 0) {
        throw new Error(
            `Found 0 markdown files in ${dir}\n` +
            `This indicates a path resolution or traversal bug.\n` +
            `Check that DOCS_DIR points to the correct location.`
        );
    }

    return results;
}

// Extract meaningful alt text from mermaid code or context
function extractAltText(code, content, startIndex) {
    // 1. Check for title in mermaid syntax (e.g., "%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor': '#bb2528' }} }%%
    // or "---\ntitle: Description\n---")
    const titleMatch = code.match(/^---\s*\ntitle:\s*(.+?)\s*\n---/m) ||
        code.match(/%%.*title["']?:\s*["']?([^"',}]+)/i);
    if (titleMatch) {
        return titleMatch[1].trim();
    }

    // 2. Extract graph type and first meaningful label
    const graphTypeMatch = code.match(/^(graph|flowchart|sequenceDiagram|classDiagram|stateDiagram|erDiagram|gantt|pie)\s/i);
    if (graphTypeMatch) {
        const type = graphTypeMatch[1];
        // Try to extract first node label for context
        const labelMatch = code.match(/[\[\(\{]([^\]\)\}\n]+)[\]\)\}]/);
        if (labelMatch && labelMatch[1].length < 50) {
            return `${type.charAt(0).toUpperCase() + type.slice(1)} diagram: ${labelMatch[1].trim()}`;
        }
        return `${type.charAt(0).toUpperCase() + type.slice(1)} diagram`;
    }

    // 3. Look for preceding heading in markdown
    const precedingText = content.substring(Math.max(0, startIndex - 500), startIndex);
    const headingMatch = precedingText.match(/#+\s+([^\n]+)\s*$/m);
    if (headingMatch) {
        return `Diagram: ${headingMatch[1].trim()}`;
    }

    // 4. Default fallback
    return 'Architecture diagram';
}

// Extract mermaid blocks from content
function extractMermaidBlocks(content) {
    const blocks = [];
    const regex = /```mermaid\n([\s\S]*?)\n```/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        blocks.push({
            fullMatch: match[0],
            code: match[1].trim(),
            startIndex: match.index,
        });
    }

    return blocks;
}

// Generate SHA256 hash for diagram content
function generateDiagramId(code) {
    return crypto.createHash('sha256').update(code).digest('hex').substring(0, 16);
}

// Render Mermaid to SVG using mmdc CLI
function renderMermaidToSVG(code, theme, outputPath) {
    const tempInputFile = path.join(STATIC_MERMAID_DIR, `temp-${Date.now()}.mmd`);
    const configFile = path.join(STATIC_MERMAID_DIR, `temp-config-${Date.now()}.json`);

    try {
        // Write temp diagram file
        fs.writeFileSync(tempInputFile, code);

        // Write temp config file
        const config = theme === 'light' ? MERMAID_CONFIG_LIGHT : MERMAID_CONFIG_DARK;
        fs.writeFileSync(configFile, JSON.stringify(config));

        // Run mmdc (may need puppeteer-config for CI)
        const command = `npx -y @mermaid-js/mermaid-cli@latest -i "${tempInputFile}" -o "${outputPath}" -c "${configFile}" -b transparent`;

        execSync(command, { stdio: 'pipe' });

        // Cleanup temp files
        fs.unlinkSync(tempInputFile);
        fs.unlinkSync(configFile);

        return true;
    } catch (error) {
        console.error(`   ✗ Failed to render: ${error.message}`);
        // Cleanup on error
        if (fs.existsSync(tempInputFile)) fs.unlinkSync(tempInputFile);
        if (fs.existsSync(configFile)) fs.unlinkSync(configFile);
        return false;
    }
}

// Process a single file
function processFile(filePath) {
    const relativePath = path.relative(ROOT, filePath);
    let content = fs.readFileSync(filePath, 'utf8');
    const blocks = extractMermaidBlocks(content);

    if (blocks.length === 0) {
        return { processed: false };
    }

    console.log(`\\n📄 ${relativePath}`);
    console.log(`   Found ${blocks.length} Mermaid diagram(s)`);

    let modified = false;
    const replacements = [];

    for (const block of blocks) {
        const diagramId = generateDiagramId(block.code);
        const lightPath = path.join(STATIC_MERMAID_DIR, `${diagramId}.light.svg`);
        const darkPath = path.join(STATIC_MERMAID_DIR, `${diagramId}.dark.svg`);

        // Check if SVGs already exist
        if (fs.existsSync(lightPath) && fs.existsSync(darkPath)) {
            console.log(`   ✓ Cached: ${diagramId}`);
        } else {
            console.log(`   🎨 Rendering: ${diagramId}`);

            // Render light theme
            if (renderMermaidToSVG(block.code, 'light', lightPath)) {
                console.log(`      → light.svg`);
            }

            // Render dark theme
            if (renderMermaidToSVG(block.code, 'dark', darkPath)) {
                console.log(`      → dark.svg`);
            }
        }

        // Extract meaningful alt text
        const altText = extractAltText(block.code, content, block.startIndex);

        // Prepare replacement
        const replacement = `<MermaidDiagram id="${diagramId}" alt="${altText}" />`;
        replacements.push({
            original: block.fullMatch,
            replacement,
        });

        modified = true;
    }

    // Apply replacements
    if (modified) {
        for (const { original, replacement } of replacements) {
            content = content.replace(original, replacement);
        }

        fs.writeFileSync(filePath, content);
        console.log(`   ✓ Updated file with ${replacements.length} component(s)`);
    }

    return { processed: true, count: blocks.length };
}

// Main execution
function main() {
    const files = findDocsFiles(DOCS_DIR);
    console.log(`Found ${files.length} documentation files\\n`);

    let totalDiagrams = 0;
    let filesProcessed = 0;

    for (const file of files) {
        const result = processFile(file);
        if (result.processed) {
            filesProcessed++;
            totalDiagrams += result.count;
        }
    }

    console.log('\\n========================================');
    console.log(`✨ Complete!`);
    console.log(`   Files processed: ${filesProcessed}`);
    console.log(`   Diagrams rendered: ${totalDiagrams}`);
    console.log(`   Output: docs/static/mermaid/`);
    console.log('========================================\\n');
}

main();
