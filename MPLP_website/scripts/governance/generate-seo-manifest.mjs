#!/usr/bin/env node
/**
 * generate-seo-manifest.mjs
 * Generates website-seo-manifest.json for SEO/GEO auditing
 * 
 * Output includes per-page:
 * - path, profile, title, description
 * - canonical, robots directive
 * - disclaimer_present, jsonld_types
 * 
 * Usage:
 *   npm run generate:seo-manifest
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const GOV_ROOT = path.resolve(PROJECT_ROOT, '../governance/05-website-governance');
const PROFILE_PATH = path.join(GOV_ROOT, 'WEBSITE_PAGE_PROFILE.yaml');
const APP_DIR = path.join(PROJECT_ROOT, 'app');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'public', 'website-seo-manifest.json');

console.log('\n[SEO-MANIFEST] Generating website SEO manifest...\n');

// Load profile policy
let policy;
try {
    const profileContent = fs.readFileSync(PROFILE_PATH, 'utf-8');
    policy = yaml.load(profileContent);
    console.log(`Loaded ${Object.keys(policy.profiles).length} profiles from WEBSITE_PAGE_PROFILE.yaml`);
} catch (err) {
    console.error(`❌ Failed to load profile policy: ${err.message}`);
    process.exit(1);
}

// Find page files
function findPageFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            findPageFiles(fullPath, files);
        } else if (entry.name === 'page.tsx') {
            files.push(fullPath);
        }
    }
    return files;
}

// Derive route from file path
function deriveRoute(filePath) {
    let route = filePath
        .replace(APP_DIR, '')
        .replace('/page.tsx', '')
        .replace(/\/\([^)]+\)/g, '');
    if (route === '') route = '/';
    return route;
}

// Get page config
function getPageConfig(route) {
    for (const pageConfig of policy.pages || []) {
        const pattern = pageConfig.path;
        const matchType = pageConfig.match || 'exact';

        let matches = false;
        if (matchType === 'exact') {
            matches = route === pattern;
        } else if (matchType === 'prefix') {
            const prefix = pattern.replace(/\*$/, '').replace(/\/$/, '');
            matches = route === prefix || route.startsWith(prefix + '/');
        }

        if (matches) {
            const baseProfile = policy.profiles[pageConfig.profile] || {};
            return {
                ...baseProfile,
                profileName: pageConfig.profile,
                ...pageConfig.overrides
            };
        }
    }

    return {
        ...policy.profiles.positioning,
        profileName: 'positioning'
    };
}

// Extract metadata from page content
function extractMetadata(content) {
    const result = {
        title: null,
        description: null,
        canonical: null,
        disclaimer_present: false,
        jsonld_types: []
    };

    // Extract title
    const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) {
        result.title = titleMatch[1];
    }

    // Extract description
    const descMatch = content.match(/description:\s*["'`]([^"'`]+)["'`]/);
    if (descMatch) {
        result.description = descMatch[1];
    }

    // Extract canonical
    const canonicalMatch = content.match(/canonical:\s*`([^`]+)`/);
    if (canonicalMatch) {
        result.canonical = canonicalMatch[1].replace(/\$\{siteConfig\.url\}/g, 'https://www.mplp.io');
    }

    // Check for disclaimer
    result.disclaimer_present =
        content.includes('NonCertificationNotice') ||
        content.includes('PositioningNotice') ||
        content.includes('Usage Boundary') ||
        content.includes('Important Disclaimer') ||
        content.includes('non-normative');

    // Extract JSON-LD types
    const jsonldMatches = content.matchAll(/"@type":\s*["']([^"']+)["']/g);
    for (const match of jsonldMatches) {
        if (!result.jsonld_types.includes(match[1])) {
            result.jsonld_types.push(match[1]);
        }
    }

    return result;
}

// Generate manifest
const pageFiles = findPageFiles(APP_DIR);
console.log(`Scanning ${pageFiles.length} page.tsx files...\n`);

const pages = [];

for (const filePath of pageFiles) {
    const route = deriveRoute(filePath);
    const config = getPageConfig(route);
    const content = fs.readFileSync(filePath, 'utf-8');
    const metadata = extractMetadata(content);

    pages.push({
        path: route,
        profile: config.profileName,
        enforcement: config.enforcement || 'standard',
        title: metadata.title,
        description: metadata.description,
        canonical: metadata.canonical,
        robots: config.robots || 'index,follow',
        title_suffix: config.title_suffix || '— MPLP',
        jsonld_page_type: config.jsonld_page_type || 'WebPage',
        jsonld_types_found: metadata.jsonld_types,
        requires_disclaimer: config.requires_disclaimer || false,
        disclaimer_present: metadata.disclaimer_present
    });
}

// Sort by path
pages.sort((a, b) => a.path.localeCompare(b.path));

const manifest = {
    version: policy.version,
    generatedAt: new Date().toISOString(),
    totalPages: pages.length,
    summary: {
        by_profile: {},
        by_enforcement: {},
        disclaimer_coverage: {
            required: 0,
            present: 0
        }
    },
    pages
};

// Calculate summary
for (const page of pages) {
    manifest.summary.by_profile[page.profile] = (manifest.summary.by_profile[page.profile] || 0) + 1;
    manifest.summary.by_enforcement[page.enforcement] = (manifest.summary.by_enforcement[page.enforcement] || 0) + 1;

    if (page.requires_disclaimer) {
        manifest.summary.disclaimer_coverage.required++;
        if (page.disclaimer_present) {
            manifest.summary.disclaimer_coverage.present++;
        }
    }
}

// Write manifest
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2));
console.log(`✅ Manifest written to: ${OUTPUT_PATH}`);
console.log(`   Total pages: ${manifest.totalPages}`);
console.log(`   By profile: ${JSON.stringify(manifest.summary.by_profile)}`);
console.log(`   By enforcement: ${JSON.stringify(manifest.summary.by_enforcement)}`);
console.log(`   Disclaimer coverage: ${manifest.summary.disclaimer_coverage.present}/${manifest.summary.disclaimer_coverage.required}`);
