import { StandardPage } from "@/components/layout/standard-page";
import { ContentSection } from "@/components/ui/content-section";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { PositioningNotice } from "@/components/notices";
import { NextSteps } from "@/components/ui/next-steps";

export const metadata: Metadata = {
    title: "MPLP Definition — Canonical Positioning (Informative)",
    description: "The MPLP specification describes a POSIX-like lifecycle governance model for AI agent systems. This page provides the canonical positioning anchor. For formal definitions, see docs.mplp.io.",
    alternates: {
        canonical: `${siteConfig.url}/definition`,
    },
    openGraph: {
        title: "MPLP Definition — Canonical Positioning",
        description: "MPLP: A POSIX-like lifecycle governance specification for AI agent systems.",
        url: `${siteConfig.url}/definition`,
        type: "article",
    },
};

export default function DefinitionPage() {
    // @graph binding: WebPage ↔ DefinedTerm ↔ Organization (MPGC)
    // This establishes the canonical positioning anchor for machine understanding
    const definitionSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/definition#webpage`,
                "url": `${siteConfig.url}/definition`,
                "name": "MPLP Definition — Canonical Positioning",
                "description": "The MPLP specification describes a POSIX-like lifecycle governance model for AI agent systems.",
                "mainEntity": { "@id": `${siteConfig.url}/definition#term` },
                "isPartOf": { "@id": `${siteConfig.url}#website` },
                "publisher": { "@id": `${siteConfig.url}#mpgc` },
                "inLanguage": "en"
            },
            {
                "@type": "DefinedTerm",
                "@id": `${siteConfig.url}/definition#term`,
                "name": "MPLP (Multi-Agent Lifecycle Protocol)",
                "description": "A POSIX-like lifecycle governance specification for AI agent systems, describing how agent work may be planned, coordinated, executed, and governed across lifecycle boundaries.",
                "url": `${siteConfig.url}/definition`,
                "sameAs": [
                    DOCS_URLS.home,
                    REPO_URLS.root
                ],
                "inDefinedTermSet": {
                    "@type": "DefinedTermSet",
                    "@id": `${DOCS_URLS.home}#termset`,
                    "name": "MPLP Protocol Specification",
                    "url": DOCS_URLS.home
                }
            },
            {
                "@type": "Organization",
                "@id": `${siteConfig.url}#mpgc`,
                "name": "MPLP Protocol Governance Committee (MPGC)",
                "url": `${siteConfig.url}/governance/overview`,
                "sameAs": [
                    DOCS_URLS.home,
                    REPO_URLS.root
                ]
            }
        ]
    };

    return (
        <StandardPage
            title="MPLP Definition"
            subtitle="Canonical Positioning (Informative)"
            kicker="Anchor"
            breadcrumbs={[{ label: "Definition", href: "/definition" }]}
            jsonLd={definitionSchema}
        >
            <ContentSection>
                <PositioningNotice />

                {/* One-Sentence Definition */}
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 p-8 rounded-2xl border border-mplp-border bg-slate-950/50">
                        <h2 className="text-2xl font-bold text-mplp-text mb-4">What is MPLP?</h2>
                        <p className="text-lg text-mplp-text-muted leading-relaxed">
                            <strong className="text-mplp-text">The MPLP specification describes a POSIX-like lifecycle governance model for AI agent systems.</strong>{" "}
                            It describes structural patterns for how agents are planned, coordinated, executed, and governed —
                            without prescribing specific implementations or runtime behaviors.
                        </p>
                        <p className="text-sm text-mplp-text-muted/70 mt-4 italic">
                            For formal definitions, see{" "}
                            <a href={DOCS_URLS.home} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
                        </p>
                    </div>

                    {/* IS / IS NOT */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="p-6 rounded-xl border border-mplp-emerald/30 bg-mplp-emerald/5">
                            <h3 className="text-lg font-bold text-mplp-emerald mb-4">MPLP IS</h3>
                            <ul className="space-y-3 text-sm text-mplp-text-muted">
                                <li className="flex items-start gap-3">
                                    <span className="text-mplp-emerald mt-0.5">→</span>
                                    A <strong className="text-mplp-text">POSIX-like specification</strong> for agent lifecycle governance
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-mplp-emerald mt-0.5">→</span>
                                    A <strong className="text-mplp-text">semantic contract</strong> (schemas, signals, invariants)
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-mplp-emerald mt-0.5">→</span>
                                    <strong className="text-mplp-text">Evidence-based</strong> verification via Golden Flows
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-mplp-emerald mt-0.5">→</span>
                                    <strong className="text-mplp-text">Vendor-neutral</strong> and implementation-agnostic
                                </li>
                            </ul>
                        </div>
                        <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5">
                            <h3 className="text-lg font-bold text-red-400 mb-4">MPLP IS NOT</h3>
                            <ul className="space-y-3 text-sm text-mplp-text-muted">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-0.5">✕</span>
                                    A framework, SDK, or runtime
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-0.5">✕</span>
                                    A platform or hosted service
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-0.5">✕</span>
                                    {/* TERM-WAIVER: Negation context - listing what MPLP is NOT */}
                                    A certification or compliance program
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 mt-0.5">✕</span>
                                    A networking protocol like TCP/IP
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* POSIX-like Positioning Snippet */}
                    <div className="mb-12 p-8 rounded-2xl border border-mplp-indigo/30 bg-mplp-indigo/5 group hover:bg-mplp-indigo/10 transition-colors text-center">
                        <h2 className="text-2xl font-bold text-mplp-text mb-4 text-center">The POSIX Analogy</h2>
                        <p className="text-mplp-text-muted leading-relaxed mb-6">
                            Conceptualizing MPLP through the lens of system-level interfaces. Like POSIX for operating systems,
                            MPLP provides the standard lifecycle interface for Agent OS stability.
                        </p>
                        <Link href="/posix-analogy" className="text-sm font-bold text-mplp-indigo uppercase tracking-widest hover:text-mplp-blue-light transition-colors flex items-center gap-2">
                            Explore Analogy <span>→</span>
                        </Link>
                    </div>

                    {/* Evidence-Based Verification */}
                    <div className="mb-12 p-8 rounded-2xl border border-mplp-border bg-slate-950/30 text-center">
                        <h2 className="text-2xl font-bold text-mplp-text mb-4 text-center">Evidence-Based Verification</h2>
                        <p className="text-mplp-text-muted leading-relaxed mb-4">
                            Conformance to the MPLP specification is evaluated via evidence produced by <strong className="text-mplp-text">Golden Flows</strong> —
                            protocol-level verification scenarios that produce structured, replayable evidence.
                        </p>
                        <p className="text-sm text-mplp-text-muted/80">
                            The specification describes 5 core Golden Flows (GF-01 through GF-05) that validate lifecycle behavior across
                            agent deployment, coordination, and governance scenarios.
                        </p>
                        <p className="text-xs text-mplp-text-muted/70 mt-4 italic">
                            For verification requirements and evidence formats, see{" "}
                            <a href={DOCS_URLS.testsOverview} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">Golden Test Suite Overview</a>.
                        </p>
                    </div>

                    {/* Canonical References */}
                    <div className="p-8 rounded-2xl border border-mplp-border bg-gradient-to-br from-slate-950 to-slate-900 text-center">
                        <h2 className="text-2xl font-bold text-mplp-text mb-6">Canonical References</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <a
                                href={DOCS_URLS.home}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl border border-mplp-border hover:border-mplp-blue-soft/50 transition-colors group"
                            >
                                <div className="text-xs font-bold text-mplp-text-muted uppercase tracking-wider mb-2">Formal Definition (Docs)</div>
                                <div className="text-mplp-text font-semibold group-hover:text-mplp-blue-soft transition-colors">docs.mplp.io</div>
                                <p className="text-xs text-mplp-text-muted/70 mt-1">Protocol specification with normative requirements</p>
                            </a>
                            <a
                                href={REPO_URLS.root}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-4 rounded-xl border border-mplp-border hover:border-mplp-blue-soft/50 transition-colors group"
                            >
                                <div className="text-xs font-bold text-mplp-text-muted uppercase tracking-wider mb-2">Source of Truth (Repo)</div>
                                <div className="text-mplp-text font-semibold group-hover:text-mplp-blue-soft transition-colors">GitHub Repository</div>
                                <p className="text-xs text-mplp-text-muted/70 mt-1">Schemas, tests, and versioned specifications</p>
                            </a>
                            <Link
                                href="/conformance"
                                className="p-4 rounded-xl border border-mplp-border hover:border-mplp-blue-soft/50 transition-colors group"
                            >
                                <div className="text-xs font-bold text-mplp-text-muted uppercase tracking-wider mb-2">Conformance Model</div>
                                <div className="text-mplp-text font-semibold group-hover:text-mplp-blue-soft transition-colors">Verification Overview</div>
                                <p className="text-xs text-mplp-text-muted/70 mt-1">Informational overview of the three-level model</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Footer Notice */}
            <ContentSection>
                <div className="max-w-4xl mx-auto text-center border-t border-mplp-border pt-8">
                    <p className="text-xs text-mplp-text-muted/60">
                        <strong>Canonical Anchor Notice:</strong> This page serves as the canonical positioning anchor for external references.
                        Official documentation entry is maintained at{" "}
                        <a href={DOCS_URLS.home} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
                        Ultimate source of truth:{" "}
                        <a href={REPO_URLS.root} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">GitHub Repository</a>.
                    </p>
                </div>
            </ContentSection>

            {/* Authority Chain - NextSteps */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <NextSteps
                        docsKey="overview"
                        repoKey="root"
                        evidenceKey="goldenFlows"
                    />
                </div>
            </ContentSection>
        </StandardPage>
    );
}
