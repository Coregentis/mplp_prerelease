#!/usr/bin/env node
/**
 * Website → Docs link checker
 * - Scans source files for docs.mplp.io links and /docs/... links
 * - Verifies with HTTP HEAD (fallback GET)
 * - Emits a deterministic report + exit code for CI gating
 *
 * Usage:
 *   node scripts/check-doc-links.mjs
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// Adjust for your Next.js layout
const SCAN_DIRS = ["app", "components", "lib"].map((d) =>
    path.join(ROOT, d)
);

const DOCS_HOST = "docs.mplp.io";
const DOCS_ORIGIN = "https://docs.mplp.io";

// Match:
// 1) https://docs.mplp.io/docs/...
// 2) //docs.mplp.io/docs/...
// 3) "/docs/..." (relative paths that your website uses to point to docs site)
// 4) 'docs.mplp.io/docs/...'
const LINK_REGEX =
    /(https?:\/\/docs\.mplp\.io\/docs\/[a-zA-Z0-9\-._~!$&'()*+,;=:@\/%]+)|(\/\/docs\.mplp\.io\/docs\/[a-zA-Z0-9\-._~!$&'()*+,;=:@\/%]+)|(["'`]\s*\/docs\/[a-zA-Z0-9\-._~!$&'()*+,;=:@\/%]+)|((?<!https?:\/\/)docs\.mplp\.io\/docs\/[a-zA-Z0-9\-._~!$&'()*+,;=:@\/%]+)/g;

const SKIP_DIRS = new Set(["node_modules", ".next", "dist", "build", ".git"]);

function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
        if (SKIP_DIRS.has(e.name)) continue;
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p, out);
        else if (e.isFile()) {
            // only scan likely text sources
            if (/\.(tsx|ts|jsx|js|md|mdx|json|yml|yaml|html|css)$/.test(e.name)) out.push(p);
        }
    }
    return out;
}

function normalizeLink(raw) {
    let s = raw.trim();

    // remove wrapping quotes if present
    s = s.replace(/^["'`]\s*/, "").replace(/\s*["'`]$/, "");

    // protocol-relative
    if (s.startsWith("//")) s = "https:" + s;

    // bare host
    if (s.startsWith(DOCS_HOST)) s = "https://" + s;

    // relative /docs/...
    if (s.startsWith("/docs/")) s = DOCS_ORIGIN + s;

    return s;
}

async function headOrGet(url) {
    // HEAD first
    try {
        const r = await fetch(url, { method: "HEAD", redirect: "manual" });
        return r.status;
    } catch (_) {
        // fallback GET
        try {
            const r = await fetch(url, { method: "GET", redirect: "manual" });
            return r.status;
        } catch (err) {
            return 999; // network error
        }
    }
}

async function main() {
    const files = SCAN_DIRS.flatMap((d) => walk(d, []));
    const hits = new Map(); // url -> {count, refs: [{file,line}]}

    for (const f of files) {
        const text = fs.readFileSync(f, "utf8");
        const lines = text.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const m = line.match(LINK_REGEX);
            if (!m) continue;

            for (const raw of m) {
                const url = normalizeLink(raw);
                if (!url.includes(DOCS_HOST)) continue;
                const item = hits.get(url) || { count: 0, refs: [] };
                item.count += 1;
                item.refs.push({ file: path.relative(ROOT, f), line: i + 1 });
                hits.set(url, item);
            }
        }
    }

    const urls = [...hits.keys()].sort();
    if (urls.length === 0) {
        console.log("[docs-link-check] No docs links found. (Is this expected?)");
        process.exit(0);
    }

    console.log(`[docs-link-check] Found ${urls.length} unique docs URLs. Checking...`);

    const results = [];
    for (const url of urls) {
        const status = await headOrGet(url);
        results.push({ url, status, refs: hits.get(url).refs });
        process.stdout.write('.');
    }
    console.log(' done');

    const broken = results.filter((r) => r.status >= 400);
    const redirects = results.filter((r) => r.status >= 300 && r.status < 400);

    const report = {
        checked: results.length,
        broken: broken.length,
        redirects: redirects.length,
        generated_at: new Date().toISOString(),
        results,
    };

    fs.writeFileSync("docs-link-report.json", JSON.stringify(report, null, 2));
    console.log(`[docs-link-check] checked=${results.length} broken=${broken.length} redirects=${redirects.length}`);

    if (redirects.length) {
        console.log("\n[docs-link-check] Redirecting URLs (301/302):");
        for (const r of redirects) {
            console.log(`- ${r.status} ${r.url}`);
            for (const ref of r.refs.slice(0, 3)) console.log(`    at ${ref.file}:${ref.line}`);
            if (r.refs.length > 3) console.log(`    (+${r.refs.length - 3} more refs)`);
        }
    }

    if (broken.length) {
        console.log("\n[docs-link-check] Broken URLs:");
        for (const b of broken) {
            console.log(`- ${b.status} ${b.url}`);
            for (const r of b.refs.slice(0, 5)) console.log(`    at ${r.file}:${r.line}`);
            if (b.refs.length > 5) console.log(`    (+${b.refs.length - 5} more refs)`);
        }
        process.exit(2);
    }

    if (redirects.length > 0) {
        console.log("\nWARNING: Some URLs redirect. Consider updating to final URLs.");
        process.exit(1);
    }
}

main().catch((e) => {
    console.error("[docs-link-check] fatal:", e);
    process.exit(1);
});
