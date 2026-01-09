import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Protocol Evaluation | MPLP Protocol",
    description:
        "How MPLP is evaluated through Golden Flows as verification scenarios. MPGC does not certify or endorse — evaluation is performed by implementers or third parties.",
    alternates: {
        canonical: `${siteConfig.url}/standards/protocol-evaluation`,
    },
};

export default function ProtocolEvaluationPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "How MPLP Is Evaluated",
        "description": "MPLP provides Golden Flows as protocol-level verification scenarios. Evaluation may be performed by implementers, enterprises, or independent third parties — MPGC does not certify or endorse implementations.",
        "disambiguatingDescription": "MPLP and MPGC do not certify products, endorse vendors, or provide audit opinions. MPLP defines protocol specifications and verification scenarios; evaluation may be performed by implementers, enterprises, or independent third parties.",
        "url": `${siteConfig.url}/standards/protocol-evaluation`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/standards/protocol-evaluation`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` },
        "inLanguage": "en"
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: "Standards", href: "/standards/positioning" },
                    { label: "Protocol Evaluation", href: "/standards/protocol-evaluation" }
                ]} />
            </div>
            <PageHeader
                title="How MPLP Is Evaluated"
                subtitle="Golden Flows are verification scenarios, not certification criteria. Evaluation is open to all."
                kicker="Policy (T4)"
            />

            {/* T0 Identity Anchor */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border-2 border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-8 mb-8">
                        <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Protocol Identity (T0)</p>
                        <p className="text-lg text-mplp-text font-medium">
                            MPLP is the lifecycle protocol for AI agent systems — the Agent OS Protocol that defines how agents are created, operated, audited, and decommissioned.
                        </p>
                    </div>

                    <SectionHeader
                        eyebrow="Section 1"
                        title="Evaluation Philosophy"
                        align="center"
                    />
                    <div className="mt-8 prose prose-invert max-w-none">
                        <p className="text-mplp-text-muted leading-relaxed">
                            MPLP is an <strong className="text-mplp-text">open protocol specification</strong>. It defines lifecycle semantics and provides verification scenarios (Golden Flows) that anyone can use to evaluate protocol conformance.
                        </p>
                        <p className="text-mplp-text-muted leading-relaxed mt-4">
                            <strong className="text-mplp-text">There is no centralized evaluation authority.</strong> Evaluation may be performed by:
                        </p>
                        <ul className="text-mplp-text-muted mt-4 space-y-2">
                            <li>• <strong className="text-mplp-text">Implementers</strong> — self-assessment during development</li>
                            <li>• <strong className="text-mplp-text">Enterprises</strong> — internal evaluation during adoption</li>
                            <li>• <strong className="text-mplp-text">Independent third parties</strong> — external audit or assessment</li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Key Invariants: INV-04 + INV-05 */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 2"
                        title="Core Invariants"
                        align="center"
                    />
                    <div className="mt-8 space-y-6">
                        {/* INV-04 */}
                        <div className="rounded-2xl border border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-blue-soft mb-3">INV-04</p>
                            <p className="text-lg text-mplp-text font-medium">
                                Golden Flows are protocol-level verification scenarios, not certification criteria.
                            </p>
                        </div>
                        {/* INV-05 */}
                        <div className="rounded-2xl border border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-blue-soft mb-3">INV-05</p>
                            <p className="text-lg text-mplp-text font-medium">
                                MPGC governs the frozen specification; it does not certify, endorse, or audit vendors.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Mandatory Disclaimer DISC-01 */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Mandatory Notice"
                        title="Important Disclaimer"
                        align="center"
                    />
                    <div className="mt-8">
                        <div className="rounded-2xl border-2 border-mplp-warning/50 bg-mplp-warning/5 p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-warning mb-3">DISC-01: No Certification</p>
                            <p className="text-mplp-text-muted leading-relaxed">
                                <strong className="text-mplp-text">MPLP and MPGC do not certify products, endorse vendors, or provide audit opinions.</strong> MPLP defines protocol specifications and verification scenarios; evaluation may be performed by implementers, enterprises, or independent third parties.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Golden Flows as Evaluation Tool */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 3"
                        title="Golden Flows: The Verification Standard"
                        align="center"
                    />
                    <div className="mt-8">
                        <p className="text-mplp-text-muted leading-relaxed mb-6">
                            Golden Flows (GF-01 through GF-05) define canonical lifecycle scenarios that exercise the protocol&apos;s core invariants. They serve as <strong className="text-mplp-text">verification scenarios</strong> — not certification checklists.
                        </p>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <div className="mplp-card p-4">
                                <p className="text-sm font-bold text-mplp-text">GF-01</p>
                                <p className="text-xs text-mplp-text-muted">Intent to Plan Transition</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-bold text-mplp-text">GF-02</p>
                                <p className="text-xs text-mplp-text-muted">Governed Execution</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-bold text-mplp-text">GF-03</p>
                                <p className="text-xs text-mplp-text-muted">Multi-Agent Coordination</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-bold text-mplp-text">GF-04</p>
                                <p className="text-xs text-mplp-text-muted">Drift Detection &amp; Recovery</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-bold text-mplp-text">GF-05</p>
                                <p className="text-xs text-mplp-text-muted">Runtime Integration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Evaluation Resources */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 4"
                        title="Evaluation Resources"
                        align="center"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <Link href="/golden-flows" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Golden Flows</h3>
                            <p className="text-sm text-mplp-text-muted">Normative verification scenarios (GF-01 → GF-05)</p>
                        </Link>
                        <Link href="/conformance" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Conformance Checklist</h3>
                            <p className="text-sm text-mplp-text-muted">Self-assessment guidance for implementations</p>
                        </Link>
                        <Link href="/enterprise" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Enterprise Evaluation Guide</h3>
                            <p className="text-sm text-mplp-text-muted">Practical adoption guidance for organizations (T2)</p>
                        </Link>
                        <Link href="/governance/overview" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Governance Overview</h3>
                            <p className="text-sm text-mplp-text-muted">MPGC authority and protocol management</p>
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* Meta Footer */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-xl border border-mplp-border bg-slate-950/30 p-6">
                        <div className="grid gap-4 md:grid-cols-3 text-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Status</p>
                                <p className="text-sm font-semibold text-mplp-text">Informative (T4)</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Applies to</p>
                                <p className="text-sm font-semibold text-mplp-text">MPLP Protocol v1.0.0</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Last Updated</p>
                                <p className="text-sm font-semibold text-mplp-text">2025-12-23</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
