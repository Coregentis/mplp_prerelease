#!/usr/bin/env node
/**
 * semantic-tiering.mjs
 * WG-05: Semantic Tiering Gate for Website Governance System
 * 
 * Purpose: Prevent MPLP from being indexed as "framework/solution" by
 * enforcing profile-specific language policies on high-weight excerpt positions.
 * 
 * Excerpt Positions Scanned:
 * - metadata.title / metadata.description (from export const metadata)
 * - h1 (PageHeader title or first <h1>, or data-wg05-h1 anchor)
 * - hero.lead (first <p> in Hero section, or data-wg05-lead anchor)
 * - cta.primary (first <Button> in Hero section, or data-wg05-cta anchor)
 * 
 * Semantic Model:
 * - `enforcement` (strict/standard/relaxed) determines result level (FAIL/WARN/PASS)
 * - `mode` (BLOCKING/NON_BLOCKING via WG05_STRICT) determines CI exit code
 * - SHADOW mode still produces true FAIL/WARN results, just doesn't block CI
 * 
 * Usage:
 *   npm run verify:semantic-tier:warn   # Shadow mode (exit 0, report only)
 *   npm run verify:semantic-tier        # Blocking mode (exit 1 on FAIL)
 * 
 * Environment Variables:
 *   WG05_STRICT=1        Enable blocking mode (exits 1 on FAIL)
 *   EVIDENCE_DIR=path    Output evidence files to specified directory
 *   RUN_ID=WEB-*         Run ID for scoped evidence naming
 *   VERBOSE=1            Show waived hits in console output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOCKING = process.env.WG05_STRICT === '1';
const PROJECT_ROOT = path.resolve(__dirname, '../..');
const GOV_ROOT = path.resolve(PROJECT_ROOT, '../governance/05-website-governance');
const PROFILE_PATH = path.join(GOV_ROOT, 'WEBSITE_PAGE_PROFILE.yaml');
const WAIVER_PATH = path.join(GOV_ROOT, 'waivers/WG-05.yaml');
const APP_DIR = path.join(PROJECT_ROOT, 'app');

const EVIDENCE_DIR = process.env.EVIDENCE_DIR || null;
const RUN_ID = process.env.RUN_ID || `WEB-SEMANTIC-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

console.log('\n[WG-05] Running semantic tiering governance gate...');
console.log(`Mode: ${BLOCKING ? 'BLOCKING (CI gate)' : 'NON_BLOCKING (shadow mode)'}`);
console.log(`Run ID: ${RUN_ID}\n`);

// ============================================================
// LOAD POLICY & WAIVERS
// ============================================================
let policy;
let waivers = { waivers: [], excerpt_waivers: [] };

try {
    const profileContent = fs.readFileSync(PROFILE_PATH, 'utf-8');
    policy = yaml.load(profileContent);
    console.log(`Loaded ${Object.keys(policy.profiles).length} profiles from WEBSITE_PAGE_PROFILE.yaml`);
} catch (err) {
    console.error(`❌ Failed to load profile policy: ${err.message}`);
    process.exit(1);
}

try {
    if (fs.existsSync(WAIVER_PATH)) {
        const waiverContent = fs.readFileSync(WAIVER_PATH, 'utf-8');
        waivers = yaml.load(waiverContent);
        console.log(`Loaded ${waivers.waivers?.length || 0} waivers from WG-05.yaml`);
    }
} catch (err) {
    console.warn(`⚠️  Could not load waivers: ${err.message}`);
}

// ============================================================
// FIND PAGE FILES
// ============================================================
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

// ============================================================
// DERIVE ROUTE FROM FILE PATH
// ============================================================
function deriveRoute(filePath) {
    let route = filePath
        .replace(APP_DIR, '')
        .replace('/page.tsx', '')
        .replace(/\/\([^)]+\)/g, ''); // Remove route groups like /(marketing)

    if (route === '') route = '/';
    return route;
}

// ============================================================
// MATCH PAGE TO PROFILE
// ============================================================
function getPageConfig(route) {
    // Find matching page config
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
            // Merge overrides
            const merged = { ...baseProfile, ...pageConfig.overrides };
            merged.profileName = pageConfig.profile;

            // Handle prohibited_phrases_add
            if (pageConfig.overrides?.prohibited_phrases_add) {
                merged.prohibited_phrases = [
                    ...(baseProfile.prohibited_phrases || []),
                    ...pageConfig.overrides.prohibited_phrases_add
                ];
            }

            return merged;
        }
    }

    // Default to positioning profile (strictest)
    return {
        ...policy.profiles.positioning,
        profileName: 'positioning'
    };
}

// ============================================================
// CHECK WAIVER
// ============================================================
function isWaived(route, position, phrase) {
    const allWaivers = [...(waivers.waivers || []), ...(waivers.excerpt_waivers || [])];

    for (const waiver of allWaivers) {
        if (waiver.path === route &&
            waiver.phrase.toLowerCase() === phrase.toLowerCase()) {
            // Body waivers don't apply to excerpt positions
            if (waiver.position === 'body' && position !== 'body') {
                continue;
            }
            return waiver;
        }
    }
    return null;
}

// ============================================================
// EXTRACT EXCERPT POSITIONS FROM FILE
// Supports explicit anchors (data-wg05-*) with fallback to heuristics
// ============================================================
function extractExcerptPositions(content) {
    const positions = {};

    // Extract metadata.title
    const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) {
        positions['metadata.title'] = titleMatch[1];
    }

    // Extract metadata.description
    const descMatch = content.match(/description:\s*["'`]([^"'`]+)["'`]/);
    if (descMatch) {
        positions['metadata.description'] = descMatch[1];
    }

    // Extract h1: Try anchor first, then heuristics
    // Anchor pattern: data-wg05-h1="text content"
    const h1AnchorMatch = content.match(/data-wg05-h1=["']([^"']+)["']/);
    if (h1AnchorMatch) {
        positions['h1'] = h1AnchorMatch[1];
    } else {
        // Fallback: PageHeader title prop
        const pageHeaderMatch = content.match(/PageHeader[^>]*title=["'`]([^"'`]+)["'`]/);
        if (pageHeaderMatch) {
            positions['h1'] = pageHeaderMatch[1];
        } else {
            // Fallback: SectionHeader in Hero context
            const sectionHeaderMatch = content.match(/function\s+HeroSection[\s\S]*?title=["'`]([^"'`]+)["'`]/);
            if (sectionHeaderMatch) {
                positions['h1'] = sectionHeaderMatch[1];
            }
        }
    }

    // Extract hero.lead: Try anchor first, then heuristics
    // Anchor pattern: data-wg05-lead="text content"
    const leadAnchorMatch = content.match(/data-wg05-lead=["']([^"']+)["']/);
    if (leadAnchorMatch) {
        positions['hero.lead'] = leadAnchorMatch[1];
    } else {
        // Fallback: first description in Hero
        const heroLeadMatch = content.match(/function\s+HeroSection[\s\S]*?description=["'`]([^"'`]+)["'`]/);
        if (heroLeadMatch) {
            positions['hero.lead'] = heroLeadMatch[1];
        }
    }

    // Extract cta.primary: Try anchor first, then heuristics
    // Anchor pattern: data-wg05-cta="text content"
    const ctaAnchorMatch = content.match(/data-wg05-cta=["']([^"']+)["']/);
    if (ctaAnchorMatch) {
        positions['cta.primary'] = ctaAnchorMatch[1];
    } else {
        // Fallback: first Button text in Hero
        const ctaMatch = content.match(/function\s+HeroSection[\s\S]*?<Button[^>]*>([^<]+)</);
        if (ctaMatch) {
            positions['cta.primary'] = ctaMatch[1].trim();
        } else {
            // Fallback for homepage: Button with DOCS_URLS.home
            const buttonMatch = content.match(/<Button[^>]*href=\{DOCS_URLS\.home\}[^>]*>([^<]+)</);
            if (buttonMatch) {
                positions['cta.primary'] = buttonMatch[1].trim();
            }
        }
    }

    return positions;
}

// ============================================================
// CHECK PHRASE MATCHES
// ============================================================
function findMatches(text, prohibitedPhrases) {
    const matches = [];
    if (!text) return matches;

    const normalizedText = text.toLowerCase();

    for (const phrase of prohibitedPhrases) {
        const normalizedPhrase = phrase.toLowerCase();
        // Handle variants: quick start, quickstart, quick-start
        const variants = [
            normalizedPhrase,
            normalizedPhrase.replace(/\s+/g, ''),
            normalizedPhrase.replace(/\s+/g, '-')
        ];

        for (const variant of variants) {
            if (normalizedText.includes(variant)) {
                matches.push(phrase);
                break;
            }
        }
    }

    return [...new Set(matches)]; // Dedupe
}

// ============================================================
// MAIN SCAN
// ============================================================
const scanTimestamp = new Date().toISOString();
const pageFiles = findPageFiles(APP_DIR);
console.log(`Scanning ${pageFiles.length} page.tsx files...\n`);

const results = [];
let totalFails = 0;
let totalWarns = 0;
let totalPassed = 0;

for (const filePath of pageFiles) {
    const route = deriveRoute(filePath);
    const config = getPageConfig(route);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Skip relaxed enforcement
    if (config.enforcement === 'relaxed') {
        totalPassed++;
        continue;
    }

    const excerptPositions = extractExcerptPositions(content);
    const prohibitedPhrases = config.prohibited_phrases || [];
    const checkPositions = config.excerpt_positions || [];

    const pageResult = {
        path: route,
        profile: config.profileName,
        enforcement: config.enforcement || 'standard',
        status: 'PASS',
        violations: [],
        waivers_applied: []
    };

    // Check each excerpt position
    for (const positionId of checkPositions) {
        const text = excerptPositions[positionId];
        if (!text) continue;

        const matches = findMatches(text, prohibitedPhrases);

        for (const phrase of matches) {
            const waiver = isWaived(route, positionId, phrase);

            if (waiver) {
                pageResult.waivers_applied.push({
                    position: positionId,
                    phrase,
                    waiver_code: waiver.code
                });
            } else {
                pageResult.violations.push({
                    position: positionId,
                    phrase,
                    text: text.substring(0, 100)
                });
            }
        }
    }

    // Determine status based on enforcement level
    // CRITICAL: enforcement determines result level, not mode
    if (pageResult.violations.length > 0) {
        if (config.enforcement === 'strict') {
            pageResult.status = 'FAIL';
            totalFails++;
        } else {
            // standard enforcement: violations are WARN
            pageResult.status = 'WARN';
            totalWarns++;
        }
    } else {
        pageResult.status = 'PASS';
        totalPassed++;
    }

    results.push(pageResult);
}

// ============================================================
// OUTPUT SUMMARY
// ============================================================
console.log('─'.repeat(60));
console.log('WG-05 SEMANTIC TIERING SCAN RESULTS');
console.log('─'.repeat(60));
console.log(`Total pages:   ${pageFiles.length}`);
console.log(`Passed:        ${totalPassed}`);
console.log(`Warned:        ${totalWarns}`);
console.log(`Failed:        ${totalFails}`);
console.log(`Mode:          ${BLOCKING ? 'BLOCKING' : 'NON_BLOCKING'}`);
console.log('─'.repeat(60));

// Report failures (always show, regardless of mode)
const failedResults = results.filter(r => r.status === 'FAIL');
if (failedResults.length > 0) {
    console.log('\n❌ FAILURES (strict enforcement violations):\n');
    for (const result of failedResults) {
        console.log(`  ${result.path} [${result.profile}/${result.enforcement}]`);
        for (const v of result.violations) {
            console.log(`    → ${v.position}: "${v.phrase}"`);
            console.log(`      "${v.text}..."`);
        }
        console.log('');
    }
}

// Report warnings
const warnResults = results.filter(r => r.status === 'WARN');
if (warnResults.length > 0) {
    console.log('\n⚠️  WARNINGS (standard enforcement violations):\n');
    for (const result of warnResults) {
        console.log(`  ${result.path} [${result.profile}/${result.enforcement}]`);
        for (const v of result.violations) {
            console.log(`    → ${v.position}: "${v.phrase}"`);
        }
        console.log('');
    }
}

// Report waivers (verbose)
if (process.env.VERBOSE === '1') {
    const waivedResults = results.filter(r => r.waivers_applied.length > 0);
    if (waivedResults.length > 0) {
        console.log('\n✓ WAIVERS APPLIED:\n');
        for (const result of waivedResults) {
            for (const w of result.waivers_applied) {
                console.log(`  ${result.path}:${w.position} [${w.waiver_code}] "${w.phrase}"`);
            }
        }
    }
}

// ============================================================
// GENERATE REPORT (schema aligned with Gate Spec)
// ============================================================
const report = {
    gate: 'WG-05',
    version: policy.version,
    schema_version: '1.0.0',
    generatedAt: scanTimestamp,
    runId: RUN_ID,
    mode: BLOCKING ? 'BLOCKING' : 'NON_BLOCKING',
    summary: {
        totalPages: pageFiles.length,
        passed: totalPassed,
        warned: totalWarns,
        failed: totalFails
    },
    results: results.filter(r => r.status !== 'PASS' || r.waivers_applied.length > 0)
};

// Write to public directory
const reportPath = path.join(PROJECT_ROOT, 'public', 'wg-05-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\nReport written to: ${reportPath}`);

// Write evidence if directory specified
if (EVIDENCE_DIR) {
    if (!fs.existsSync(EVIDENCE_DIR)) {
        fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
    }
    const evidencePath = path.join(EVIDENCE_DIR, `${RUN_ID}.report.json`);
    fs.writeFileSync(evidencePath, JSON.stringify(report, null, 2));
    console.log(`Evidence written to: ${evidencePath}`);
}

// ============================================================
// EXIT (mode determines CI behavior, not result classification)
// ============================================================
if (totalFails > 0) {
    if (BLOCKING) {
        console.log('\n❌ BLOCKED: WG-05 FAIL violations found. CI gate blocked.');
        process.exit(1);
    } else {
        console.log('\n⚠️  WG-05 FAIL violations found (non-blocking mode — CI passes, but failures recorded for upgrade path).');
        process.exit(0);
    }
} else if (totalWarns > 0) {
    console.log('\n⚠️  WG-05 WARN violations present (standard enforcement).');
    process.exit(0);
} else {
    console.log('\n✅ PASS: WG-05 semantic tiering gate passed. All excerpt positions clean.');
    process.exit(0);
}
