import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getAllPostSlugs } from "@/lib/blog";
import { modules } from "@/lib/content/modules";
import { flows } from "@/lib/content/flows";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;

    // Static pages
    const staticPages = [
        "",
        "/definition",  // WG-05: Canonical anchor page for SEO/AI discoverability
        "/why-mplp",
        "/architecture",
        "/modules",

        // NEW: canonical pages (must be in sitemap if 200 + indexable)
        "/posix-analogy",
        "/specification",
        "/validation-lab",

        "/kernel-duties",  // PR-04: Added for sitelinks
        "/golden-flows",
        "/faq",            // PR-04: Added for sitelinks
        "/references",     // PR-04: Added for sitelinks
        "/ecosystem",
        "/governance",
        "/governance/overview",
        "/governance/agentos-protocol",
        "/governance/evidence-chain",
        "/governance/governed-stack",
        "/governance/iso-iec-42001",
        "/governance/nist-ai-rmf",
        "/conformance",
        // Removed: /adoption, /enterprise (redirect-only, avoid SEO confusion)
        "/standards/positioning",
        "/standards/regulatory-positioning",
        "/standards/protocol-evaluation",
        "/standards/what-mplp-is-not",
        "/governance/positioning/agentic-state-sovereignty",
        "/governance/positioning/semantic-drift-control",
        "/search",
        "/blog",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date("2026-01-08"),  // Freeze date for consistent crawling
        changeFrequency: "weekly" as const,
        priority:
            route === ""
                ? 1
                : route === "/definition"
                    ? 0.95
                    : route === "/specification"
                        ? 0.92
                        : route === "/posix-analogy"
                            ? 0.88
                            : route === "/validation-lab"
                                ? 0.88
                                : 0.8,
    }));

    // Module Detail Pages
    const modulePages = modules.map((module) => ({
        url: `${baseUrl}/modules/${module.id}`,
        lastModified: new Date("2026-01-08"),
        changeFrequency: "weekly" as const,
        priority: 0.9, // Higher priority for core specs
    }));

    // Golden Flow Detail Pages (use lowercase for route consistency)
    const flowPages = flows.map((flow) => ({
        url: `${baseUrl}/golden-flows/${flow.id.toLowerCase()}`,
        lastModified: new Date("2026-01-08"),
        changeFrequency: "weekly" as const,
        priority: 0.9, // Higher priority for normative flows
    }));

    // Blog posts
    const blogPosts = getAllPostSlugs().map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date("2026-01-08"),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticPages, ...modulePages, ...flowPages, ...blogPosts];
}
