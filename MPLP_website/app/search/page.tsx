import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
    title: "Search | MPLP Protocol",
    description: "Search the MPLP Protocol documentation and specifications.",
    alternates: {
        canonical: `${siteConfig.url}/search`,
    },
};

export default function SearchPage() {
    return (
        <Shell>
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Search | MPLP Protocol",
                    description: "Search the MPLP Protocol documentation and specifications.",
                    url: `${siteConfig.url}/search`,
                }}
            />
            <PageHeader
                title="Search"
                subtitle="Find specifications, modules, governance policies, and more."
                kicker="Documentation"
            />
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <p className="text-mplp-text-muted mb-8">
                    Use <kbd className="px-2 py-1 bg-mplp-dark-soft border border-mplp-border rounded text-xs font-mono">⌘K</kbd> or{" "}
                    <kbd className="px-2 py-1 bg-mplp-dark-soft border border-mplp-border rounded text-xs font-mono">Ctrl+K</kbd> to open the search modal from any page.
                </p>
                <p className="text-sm text-mplp-text-muted">
                    Search is powered by <a href="https://pagefind.app" target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">Pagefind</a> and indexes all protocol documentation.
                </p>
            </div>
        </Shell>
    );
}
