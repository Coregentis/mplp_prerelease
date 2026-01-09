/**
 * PR-03: JSON-LD Structure Tree
 * Authority & Semantic Alignment - Definitional Authority Surface
 * 
 * This file generates the JSON-LD structure that positions mplp.io as the
 * definitional authority for "Agent OS Protocol", enabling:
 * - AI recognition as definitional source
 * - Sitelinks generation for brand searches
 * - DefinedTermSet for semantic attribution
 * 
 * Governance Constraints (DGP-00 aligned):
 * - NO Product/Service/Certification schema types
 * - NO pass/fail/endorsement language
 * - T0 SSOT as single source
 */

import { siteConfig } from "@/lib/site-config";

type JsonLdData = Record<string, unknown>;

// T0 SSOT - Canonical semantic anchors (frozen)
export const T0 = {
    fullName: "MPLP — Multi-Agent Lifecycle Protocol",
    definition: "The Canonical Lifecycle Protocol Specification for AI Agent Systems",
    slogan: "The Agent OS Protocol",
    oneLiner: "MPLP defines the canonical lifecycle semantics for AI agent systems — the Agent OS Protocol.",
} as const;

// 7 Sitelinks Anchor Pages (stable URLs)
export const ANCHOR_PAGES = [
    { path: "/architecture", name: "Architecture", description: "Architecture overview for MPLP as a lifecycle protocol." },
    { path: "/modules", name: "Modules", description: "Core modules of MPLP as a lifecycle protocol." },
    { path: "/kernel-duties", name: "Kernel Duties", description: "The 11 kernel duties describing lifecycle governance semantics." },
    { path: "/golden-flows", name: "Golden Flows", description: "Verification scenarios illustrating lifecycle semantics (non-adjudicative)." },
    { path: "/governance", name: "Governance", description: "Governance principles and interpretive boundaries (no certification)." },
    { path: "/faq", name: "FAQ", description: "FAQ including AI citation guidance and definitional boundaries." },
    { path: "/references", name: "References", description: "Citation contexts and external references (non-endorsement)." },
] as const;

function absUrl(path: string): string {
    return `${siteConfig.url}${path}`;
}

/**
 * DefinedTermSet - Establishes MPLP as definitional authority for key terms
 */
export function jsonLdDefinedTermSet(): JsonLdData {
    return {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${siteConfig.url}#defined-terms`,
        name: "Agent OS Protocol — Defined Terms",
        description: "Definitional terms used by MPLP to describe Agent OS-class systems.",
        hasDefinedTerm: [
            {
                "@type": "DefinedTerm",
                "@id": `${siteConfig.url}#term-agent-os-protocol`,
                name: "Agent OS Protocol",
                description: T0.oneLiner,
                inDefinedTermSet: { "@id": `${siteConfig.url}#defined-terms` },
            },
            {
                "@type": "DefinedTerm",
                "@id": `${siteConfig.url}#term-mplp`,
                name: "Multi-Agent Lifecycle Protocol (MPLP)",
                description: `${T0.definition}. ${T0.slogan}`,
                inDefinedTermSet: { "@id": `${siteConfig.url}#defined-terms` },
            },
            {
                "@type": "DefinedTerm",
                "@id": `${siteConfig.url}#term-lifecycle-protocol`,
                name: "Lifecycle Protocol",
                description: "A protocol specification defining how AI agents are created, operated, audited, and decommissioned.",
                inDefinedTermSet: { "@id": `${siteConfig.url}#defined-terms` },
            },
        ],
    };
}

/**
 * WebSite with hasPart → 7 anchor pages
 * Establishes the structure tree for sitelinks
 */
export function jsonLdWebSiteWithAnchors(): JsonLdData {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: T0.fullName,
        url: siteConfig.url,
        description: `${T0.oneLiner} ${T0.definition}. ${T0.slogan}`,
        inLanguage: "en",
        publisher: { "@id": `${siteConfig.url}#mpgc` },
        hasPart: ANCHOR_PAGES.map((anchor) => ({
            "@type": "WebPage",
            "@id": `${siteConfig.url}${anchor.path}#page`,
            name: `${anchor.name} | ${T0.fullName}`,
            url: absUrl(anchor.path),
            description: anchor.description,
            isPartOf: { "@id": `${siteConfig.url}#website` },
        })),
    };
}

/**
 * Home WebPage - Binds isPartOf/about/hasPart
 * This is what positions mplp.io as "definitional authority surface"
 */
export function jsonLdHomeWebPage(): JsonLdData {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${siteConfig.url}#home`,
        url: siteConfig.url,
        name: T0.fullName,
        description: `${T0.oneLiner} Explore Architecture, Modules, Kernel Duties, Golden Flows, Governance, FAQ, and References.`,
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": `${siteConfig.url}#defined-terms` },
        hasPart: ANCHOR_PAGES.map((anchor) => ({
            "@type": "WebPage",
            "@id": `${siteConfig.url}${anchor.path}#page`,
            name: anchor.name,
            url: absUrl(anchor.path),
        })),
        mainEntity: { "@id": `${siteConfig.url}#defined-terms` },
    };
}

/**
 * FAQPage generator - Structure ready, content populated in PR-05
 */
export function jsonLdFAQPage(mainEntity: JsonLdData[] = []): JsonLdData {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/faq#faqpage`,
        url: absUrl("/faq"),
        name: `FAQ | ${T0.fullName}`,
        description: "Frequently asked questions about MPLP, including definitions, boundaries, and AI citation guidance.",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        about: { "@id": `${siteConfig.url}#defined-terms` },
        mainEntity,
    };
}

/**
 * References page as CollectionPage (non-endorsement)
 */
export function jsonLdReferencesPage(itemListElements: JsonLdData[] = []): JsonLdData {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/references#collection`,
        url: absUrl("/references"),
        name: `References | ${T0.fullName}`,
        description: "Citation contexts and external references for MPLP (non-endorsement).",
        isPartOf: { "@id": `${siteConfig.url}#website` },
        mainEntity: {
            "@type": "ItemList",
            itemListElement: itemListElements,
        },
    };
}

/**
 * Generate the complete homepage structured data bundle
 */
export function generateHomepageJsonLd(): JsonLdData[] {
    return [
        jsonLdDefinedTermSet(),
        jsonLdWebSiteWithAnchors(),
        jsonLdHomeWebPage(),
    ];
}

/**
 * Stringify helper for script injection
 */
export function toJsonLdScript(ld: JsonLdData): string {
    return JSON.stringify(ld, null, 0);
}
