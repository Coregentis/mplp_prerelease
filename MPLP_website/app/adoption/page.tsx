import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, DOCS_URLS } from "@/lib/site-config";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
    title: "Adoption Signals | MPLP Protocol",
    description: "MPLP protocol adoption status: frozen specification, published SDKs, normative conformance flows, and governance mappings.",
    alternates: {
        canonical: `${siteConfig.url}/adoption`,
    },
};

export default function AdoptionPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Protocol Adoption Signals",
        "about": "Protocol adoption status and ecosystem readiness",
        "url": `${siteConfig.url}/adoption`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/adoption`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[{ label: "Adoption", href: "/adoption" }]} />
            </div>
            <PageHeader
                title="Adoption Signals"
                subtitle="Observable indicators of MPLP protocol maturity, ecosystem readiness, and governance structure. This page is informative, not an endorsement or certification statement."
                kicker="Protocol Status"
            />

            {/* Disclaimer */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6 text-center">
                        <p className="text-sm text-mplp-text-muted">
                            <strong className="text-mplp-text">Informative Notice:</strong> The signals below reflect observable protocol status.
                            They do not constitute endorsement, certification, or guarantee of any implementation.
                            Organizations are responsible for their own evaluation and adoption decisions.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Protocol Status */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Signal 1"
                    title="Protocol Specification"
                    description="The normative protocol specification has reached a stable, governed state."
                    align="center"
                />
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="mplp-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-3 w-3 rounded-full bg-mplp-emerald" />
                            <h3 className="text-lg font-bold text-mplp-text">Spec v1.0.0</h3>
                        </div>
                        <p className="text-sm text-mplp-text-muted mb-2">Status: <strong className="text-mplp-emerald">Frozen</strong></p>
                        <p className="text-sm text-mplp-text-muted">Freeze Date: 2025-12-03</p>
                    </div>
                    <div className="mplp-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-3 w-3 rounded-full bg-mplp-blue-soft" />
                            <h3 className="text-lg font-bold text-mplp-text">Governance</h3>
                        </div>
                        <p className="text-sm text-mplp-text-muted mb-2">Body: <strong className="text-mplp-text">MPGC</strong></p>
                        <p className="text-sm text-mplp-text-muted">Policy: No breaking changes in v1.x</p>
                    </div>
                    <div className="mplp-card p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-3 w-3 rounded-full bg-mplp-indigo" />
                            <h3 className="text-lg font-bold text-mplp-text">Evolution</h3>
                        </div>
                        <p className="text-sm text-mplp-text-muted mb-2">Process: <strong className="text-mplp-text">RFC-based</strong></p>
                        <p className="text-sm text-mplp-text-muted">Additive changes only via formal review</p>
                    </div>
                </div>
            </ContentSection>

            {/* SDK Status */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Signal 2"
                    title="Reference Implementations"
                    description="Official SDKs are published to standard package registries."
                    align="center"
                />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="mplp-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-mplp-text">Python SDK</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-mplp-emerald/10 text-mplp-emerald border border-mplp-emerald/30">Published</span>
                        </div>
                        <p className="text-sm text-mplp-text-muted mb-4">Available on PyPI as <code className="text-mplp-blue-soft">mplp-sdk</code></p>
                        <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm text-mplp-text-muted">
                            pip install mplp-sdk
                        </div>
                        <div className="mt-4">
                            <Link href="https://pypi.org/project/mplp-sdk/" target="_blank" rel="noopener noreferrer" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                                View on PyPI →
                            </Link>
                        </div>
                    </div>
                    <div className="mplp-card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-mplp-text">TypeScript SDK</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-mplp-emerald/10 text-mplp-emerald border border-mplp-emerald/30">Published</span>
                        </div>
                        <p className="text-sm text-mplp-text-muted mb-4">Available on npm as <code className="text-mplp-blue-soft">@mplp/sdk-ts</code></p>
                        <div className="bg-slate-900/50 rounded-lg p-3 font-mono text-sm text-mplp-text-muted">
                            npm install @mplp/sdk-ts
                        </div>
                        <div className="mt-4">
                            <Link href="https://www.npmjs.com/package/@mplp/sdk-ts" target="_blank" rel="noopener noreferrer" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                                View on npm →
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Link href={DOCS_URLS.sdkDocs} target="_blank" rel="noopener noreferrer" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                        View SDK Documentation →
                    </Link>
                </div>
            </ContentSection>

            {/* Conformance */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Signal 3"
                    title="Conformance Framework"
                    description="Normative test flows and conformance levels are defined and published."
                    align="center"
                />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-bold text-mplp-text mb-3">Golden Flows (01–05)</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">
                            Five normative lifecycle flows that define conformance behavior.
                            These are not examples—they are the canonical test cases for MPLP conformance.
                        </p>
                        <Link href="/golden-flows" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            View Golden Flows
                        </Link>
                        <div className="mt-3">
                            <Link href="/governance/evidence-chain" className="inline-flex items-center gap-2 text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                                <IconArrowRight className="h-4 w-4" />
                                Evidence Chain (Plan → Confirm → Trace)
                            </Link>
                        </div>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-bold text-mplp-text mb-3">Conformance Levels</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">
                            Three-tier conformance framework: Schema Conformance, Governance Conformance, and Behavioral Conformance.
                        </p>
                        <Link href="/conformance" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            View Conformance Levels
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* Governance Mappings */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Signal 4"
                    title="Standards Alignment"
                    description="Reference mappings to external governance frameworks are documented. All standard references follow MPLP&apos;s Mapping / Compatibility / Enablement model."
                    align="center"
                />
                <div className="mt-4 mb-8">
                    <Link href="/standards/positioning" className="text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                        View Standards Compatibility & Mapping Policy →
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-bold text-mplp-text mb-3">ISO/IEC 42001</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">
                            Informative alignment mapping between MPLP mechanisms and ISO/IEC 42001 AI management system objectives.
                        </p>
                        <Link href="/governance/iso-iec-42001" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            View ISO Alignment
                        </Link>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-bold text-mplp-text mb-3">NIST AI RMF</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">
                            Reference mapping between MPLP modules and the four functions of the NIST AI Risk Management Framework.
                        </p>
                        <Link href="/governance/nist-ai-rmf" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            View NIST Alignment
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* Usage Statement Template */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="For Adopters"
                    title="Protocol Alignment Statement"
                    description="A reference template for projects that wish to express alignment with MPLP semantics."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-8">
                        <p className="text-lg text-mplp-text italic text-center mb-6">
                            &ldquo;This system is designed to align with MPLP v1.0 lifecycle semantics.
                            Alignment is self-assessed and does not constitute certification by the MPLP Protocol Governance Committee.&rdquo;
                        </p>
                        <p className="text-sm text-mplp-text-muted text-center">
                            Projects may use this statement to indicate design alignment.
                            MPGC does not issue certifications, badges, or endorsements.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* CTA */}
            <ContentSection>
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-mplp-text mb-4">Ready to Evaluate?</h2>
                    <p className="text-mplp-text-muted mb-8">
                        Start with the governance stance, then verify via conformance flows.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/governance/overview" variant="primary" size="lg">
                            Governance Overview
                        </Button>
                        <Button href="/conformance" variant="secondary" size="lg">
                            Conformance Framework
                        </Button>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
