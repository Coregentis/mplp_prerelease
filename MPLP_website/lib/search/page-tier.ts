/**
 * Page Tier definitions for search result ranking.
 * T0/T1 content always ranks above T2/T3/T4.
 * @see /website-governance/SEARCH_POLICY.md
 */

export const PAGE_TIERS: Record<string, number> = {
    // T0 - Homepage
    '/': 0,

    // T1 - Core Protocol
    '/modules': 1,
    '/modules/context': 1,
    '/modules/plan': 1,
    '/modules/confirm': 1,
    '/modules/trace': 1,
    '/modules/role': 1,
    '/modules/dialog': 1,
    '/modules/collab': 1,
    '/modules/extension': 1,
    '/modules/core': 1,
    '/modules/network': 1,
    '/governance': 1,
    '/governance/overview': 1,
    '/governance/evidence-chain': 1,
    '/governance/governed-stack': 1,
    '/governance/agentos-protocol': 1,
    '/golden-flows': 1,
    '/golden-flows/flow-01': 1,
    '/golden-flows/flow-02': 1,
    '/golden-flows/flow-03': 1,
    '/golden-flows/flow-04': 1,
    '/golden-flows/flow-05': 1,
    '/compliance': 1,
    '/architecture': 1,
    '/why-mplp': 1,

    // T2 - Ecosystem & Blog
    '/ecosystem': 2,
    '/blog': 2,

    // T3 - Enterprise
    '/enterprise': 3,
    '/adoption': 3,

    // T4 - Standards Mappings
    '/standards/positioning': 4,
    '/governance/iso-iec-42001': 4,
    '/governance/nist-ai-rmf': 4,
};

/**
 * Get the tier for a given path.
 * Defaults to T2 (Medium) if not explicitly mapped.
 */
export function getPageTier(path: string): number {
    // Exact match
    if (PAGE_TIERS[path] !== undefined) {
        return PAGE_TIERS[path];
    }

    // Prefix match for dynamic routes
    for (const [prefix, tier] of Object.entries(PAGE_TIERS)) {
        if (path.startsWith(prefix + '/')) {
            return tier;
        }
    }

    // Default to T2
    return 2;
}

/**
 * Convert Pagefind build path to actual route.
 */
function pagefindUrlToRoute(url: string): string {
    let pathname = url;
    try {
        pathname = new URL(url, "http://localhost").pathname;
    } catch {
        // URL parsing failed, use as-is
    }

    pathname = pathname
        .replace(/^\/server\/app/, "")
        .replace(/^\/static\/app/, "")
        .replace(/\.html$/, "")
        .replace(/\/index$/, "/")
        .replace(/\/$/, "") || "/";

    return pathname;
}

/**
 * Sort search results by Page Tier, then by relevance score.
 */
export function sortByTierAndRelevance<T extends { url: string; score?: number }>(
    results: T[]
): T[] {
    return [...results].sort((a, b) => {
        const tierA = getPageTier(pagefindUrlToRoute(a.url));
        const tierB = getPageTier(pagefindUrlToRoute(b.url));

        if (tierA !== tierB) {
            return tierA - tierB; // Lower tier = higher priority
        }

        // Same tier: sort by score (higher is better)
        return (b.score ?? 0) - (a.score ?? 0);
    });
}
