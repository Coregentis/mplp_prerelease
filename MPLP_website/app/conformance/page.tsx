import { StandardPage } from "@/components/layout/standard-page";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { NonCertificationNotice } from "@/components/notices";
import { CanonicalReferences } from "@/components/ui/canonical-references";
import { NextSteps } from "@/components/ui/next-steps";

export const metadata: Metadata = {
    title: "Conformance Model (Informative) | MPLP Standard",
    description: "The MPLP specification describes a three-level conformance model for interoperability. See docs for formal definitions.",
    alternates: {
        canonical: `${siteConfig.url}/conformance`,
    },
};

export default function ConformancePage() {
    // TechArticle JSON-LD for Conformance page
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Conformance Model (Informative) | MPLP Standard",
        "about": "MPLP conformance model overview (informational)",
        "url": `${siteConfig.url}/conformance`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/conformance`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <StandardPage
            title="Conformance Model"
            subtitle="The MPLP specification describes a three-level conformance model covering Schema (L1), Governance (L2), and Behavioral (L3) interoperability. See docs for formal requirements."
            kicker="Standards"
            breadcrumbs={[{ label: "Conformance", href: "/conformance" }]}
            jsonLd={techArticleSchema}
            backTo={{ href: "/governance/overview", label: "Governance" }}
            beforeHeader={<NonCertificationNotice />}
        >
            <ContentSection>
                {/* Informational overview only - see docs for normative requirements */}
                <p className="text-xs text-mplp-text-muted mb-6 text-center italic">
                    The following is an informational summary of the conformance model.
                    For formal requirements, see <a href={DOCS_URLS.home} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
                </p>
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                    {/* Level 1 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-blue-soft/5 text-mplp-blue-soft font-bold text-xl border border-mplp-blue-soft/10">L1</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Schema</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Data Interoperability</p>
                            </div>
                        </div>
                        <ul className="space-y-4 text-xs text-mplp-text-muted/90 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Schema alignment with JSON Schema definitions
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Coverage of the 10 protocol modules
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Identifier and invariant consistency
                            </li>
                        </ul>
                    </div>

                    {/* Level 2 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-indigo/5 text-mplp-indigo font-bold text-xl border border-mplp-indigo/10">L2</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Governance</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Policy Interoperability</p>
                            </div>
                        </div>
                        <ul className="space-y-4 text-xs text-mplp-text-muted/90 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Confirm semantics for gated actions
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Role and permission boundary patterns
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Governance signal emission patterns
                            </li>
                        </ul>
                    </div>

                    {/* Level 3 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-emerald/5 text-mplp-emerald font-bold text-xl border border-mplp-emerald/10">L3</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Behavioral</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Runtime Interoperability</p>
                            </div>
                        </div>
                        <ul className="space-y-4 text-xs text-mplp-text-muted/90 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Golden Flows 01–05 as verification scenarios
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                Structured, replayable execution traces
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-text-muted mt-0.5">→</span>
                                <Link href="/governance/positioning/semantic-drift-control" className="text-mplp-text hover:text-mplp-blue-soft underline decoration-mplp-border hover:decoration-mplp-blue-soft underline-offset-2 transition-all">Drift detection</Link> and recovery patterns
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            <ContentSection>
                <SectionHeader
                    eyebrow="Verification"
                    title="Explore Verification Evidence"
                    description="The documentation describes Golden Flows as protocol-level verification scenarios for assessing conformance. Evidence generation and evaluation are described in the docs."
                    className="mb-8"
                />
                <div className="max-w-4xl mx-auto text-center mt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button href={DOCS_URLS.testsOverview} variant="primary" size="lg" external>
                            Explore in Documentation
                        </Button>
                        <Button href="/golden-flows" variant="secondary" size="lg">
                            View Golden Flows
                        </Button>
                    </div>
                </div>
            </ContentSection>

            {/* Related Positioning */}
            <ContentSection>
                <div className="max-w-3xl mx-auto text-center border-t border-mplp-border pt-8">
                    <p className="text-sm text-mplp-text-muted">
                        Related Positioning:{" "}
                        <a className="text-mplp-blue-soft hover:underline" href="/governance/positioning/agentic-state-sovereignty">
                            Agentic State Sovereignty
                        </a>{" "}
                        ·{" "}
                        <a className="text-mplp-blue-soft hover:underline" href="/governance/positioning/semantic-drift-control">
                            Semantic Drift Control
                        </a>
                    </p>
                </div>
            </ContentSection>

            {/* Quick Links */}
            <ContentSection>
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                    {/* TERM-WAIVER: External docs URL - historical filename in external system */}
                    <Link href={`${DOCS_URLS.guides}/mplp-v1.0-compliance-checklist`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Conformance Checklist (v1.0)
                    </Link>
                    <Link href="/golden-flows" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Golden Flows
                    </Link>
                    <Link href="/enterprise" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Enterprise Evaluation
                    </Link>
                    <Link href="/modules" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Schemas Registry
                    </Link>
                    <Link href="/governance/agentos-protocol" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Agent OS Protocol
                    </Link>
                    <Link href="/governance/governed-stack" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Governed Stack
                    </Link>
                    <Link href="/governance/evidence-chain" className="flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-light transition-colors">
                        <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                        Evidence Chain
                    </Link>
                </div>
            </ContentSection>

            {/* Authority Chain */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <CanonicalReferences
                        docsKey="conformance"
                        repoKey="tests"
                        variant="full"
                    />

                    <NextSteps
                        docsKey="conformance"
                        repoKey="tests"
                        evidenceKey="goldenFlows"
                    />
                </div>
            </ContentSection>
        </StandardPage>
    );
}
