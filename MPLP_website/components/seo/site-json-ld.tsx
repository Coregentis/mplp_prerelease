import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";

/**
 * Site-Level JSON-LD
 * 
 * Provides global structured data for search engines and AI systems:
 * - WebSite schema with SearchAction
 * - Organization schema for MPGC
 * 
 * Zero normative language - pure metadata.
 */
export function SiteJsonLd() {
    const website = {
        "@type": "WebSite",
        "@id": `${siteConfig.url}#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: "Official discovery and positioning site for the MPLP protocol. Normative definitions live at docs.mplp.io.",
        publisher: { "@id": `${siteConfig.url}#mpgc` },
        potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    const organization = {
        "@type": "Organization",
        "@id": `${siteConfig.url}#mpgc`,
        name: "MPLP Protocol Governance Committee (MPGC)",
        url: `${siteConfig.url}/governance/overview`,
        description: "Governance body for the MPLP protocol specification. Does not certify, endorse, or audit implementations. Not a certification authority.",
        sameAs: [
            DOCS_URLS.home,
            REPO_URLS.root,
        ],
    };

    const specSeries = {
        "@type": "CreativeWorkSeries",
        "@id": `${siteConfig.url}#specification`,
        name: "MPLP Protocol Specification",
        description: "The Multi-Agent Lifecycle Protocol specification series, defining lifecycle governance for AI agent systems.",
        version: "1.0.0",
        publisher: { "@id": `${siteConfig.url}#mpgc` },
        url: DOCS_URLS.home,
        mainEntityOfPage: DOCS_URLS.home,
        sameAs: REPO_URLS.root,
        citation: [
            { "@id": `${siteConfig.url}#website` }
        ]
    };

    const sourceCode = {
        "@type": "SoftwareSourceCode",
        "@id": `${siteConfig.url}#repo`,
        name: "MPLP Protocol Repository",
        description: "Source code repository containing MPLP schemas, validator source, and governance constitution.",
        codeRepository: REPO_URLS.root,
        programmingLanguage: ["TypeScript", "Python", "JSON Schema"],
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        publisher: { "@id": `${siteConfig.url}#mpgc` },
        mainEntityOfPage: REPO_URLS.root,
    };

    const definedTerm = {
        "@type": "DefinedTerm",
        "@id": `${siteConfig.url}#mplp-term`,
        name: "Multi-Agent Lifecycle Protocol",
        alternateName: "MPLP",
        description: "The lifecycle governance interface for AI agents.",
        disambiguatingDescription: "MPLP is not a software license and does not define licensing terms. It is a protocol specification for agent lifecycle management.",
        inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: "MPLP Glossary",
            url: `${siteConfig.url}/assets/geo/mplp-entity.json`,
        },
    };

    const graphContent = {
        "@context": "https://schema.org",
        "@graph": [
            website,
            organization,
            specSeries,
            sourceCode,
            definedTerm,
        ],
    };

    return (
        <JsonLd data={graphContent} id="jsonld-site-graph" />
    );
}
