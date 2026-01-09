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
    title: "Regulatory Positioning | MPLP Protocol",
    description:
        "High-level mapping of MPLP protocol capabilities to regulatory frameworks (EU AI Act, NIST AI RMF, ISO/IEC 42001). Informative only — not legal advice.",
    alternates: {
        canonical: `${siteConfig.url}/standards/regulatory-positioning`,
    },
};

export default function RegulatoryPositioningPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Regulatory Positioning",
        "description": "High-level mapping of MPLP protocol capabilities to regulatory frameworks. MPLP is a protocol specification that provides lifecycle primitives — it does not certify, endorse, or audit implementations.",
        "disambiguatingDescription": "MPLP and MPGC do not certify products, endorse vendors, or provide audit opinions. MPLP defines protocol specifications and verification scenarios; evaluation may be performed by implementers, enterprises, or independent third parties. This material is informational and does not constitute legal or regulatory advice.",
        "url": `${siteConfig.url}/standards/regulatory-positioning`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/standards/regulatory-positioning`
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
                    { label: "Regulatory Positioning", href: "/standards/regulatory-positioning" }
                ]} />
            </div>
            <PageHeader
                title="Regulatory Positioning"
                subtitle="High-level mapping of MPLP protocol capabilities to regulatory frameworks. Informative only."
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
                        title="Purpose of This Page"
                        align="center"
                    />
                    <div className="mt-8 prose prose-invert max-w-none">
                        <p className="text-mplp-text-muted leading-relaxed">
                            This page provides a <strong className="text-mplp-text">high-level, non-exhaustive mapping</strong> between MPLP protocol capabilities and objectives articulated by major regulatory frameworks.
                        </p>
                        <p className="text-mplp-text-muted leading-relaxed mt-4">
                            {/* TERM-WAIVER: Negation context - without claiming compliance */}
                            The purpose is to assist enterprises in understanding how MPLP&apos;s lifecycle primitives may <em>relate to</em>, <em>support</em>, or <em>enable</em> certain regulatory expectations — without claiming compliance or certification.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Mandatory Disclaimers DISC-01 + DISC-02 */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Mandatory Notice"
                        title="Important Disclaimers"
                        align="center"
                    />
                    <div className="mt-8 space-y-6">
                        {/* DISC-01 */}
                        <div className="rounded-2xl border-2 border-mplp-warning/50 bg-mplp-warning/5 p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-warning mb-3">DISC-01: No Certification</p>
                            <p className="text-mplp-text-muted leading-relaxed">
                                <strong className="text-mplp-text">MPLP and MPGC do not certify products, endorse vendors, or provide audit opinions.</strong> MPLP defines protocol specifications and verification scenarios; evaluation may be performed by implementers, enterprises, or independent third parties.
                            </p>
                        </div>
                        {/* DISC-02 */}
                        <div className="rounded-2xl border-2 border-mplp-warning/50 bg-mplp-warning/5 p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-warning mb-3">DISC-02: No Legal Advice</p>
                            <p className="text-mplp-text-muted leading-relaxed">
                                {/* TERM-WAIVER: Legal disclaimer - compliance determinations */}
                                <strong className="text-mplp-text">This material is informational and does not constitute legal or regulatory advice.</strong> Any regulatory mapping is high-level and non-exhaustive; organizations should consult qualified professionals for compliance determinations.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Regulatory Frameworks Overview */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 2"
                        title="Regulatory Framework Mappings"
                        description="MPLP protocol capabilities that may relate to regulatory objectives. All mappings are illustrative and non-exhaustive."
                        align="center"
                    />

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <Link href="/governance/iso-iec-42001" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">ISO/IEC 42001</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">AI Management System — governance objectives may map to MPLP Plan / Confirm / Trace primitives.</p>
                            <span className="text-xs font-bold text-mplp-blue-soft uppercase tracking-wider">View Mapping →</span>
                        </Link>

                        <Link href="/governance/nist-ai-rmf" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">NIST AI RMF</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">Risk Management Framework — lifecycle controls may support GOVERN/MAP/MEASURE/MANAGE functions.</p>
                            <span className="text-xs font-bold text-mplp-blue-soft uppercase tracking-wider">View Mapping →</span>
                        </Link>
                    </div>

                    <div className="mt-8 rounded-xl border border-mplp-border bg-slate-950/30 p-6">
                        <h4 className="text-sm font-bold text-mplp-text mb-3">EU AI Act (High-Level)</h4>
                        <p className="text-sm text-mplp-text-muted leading-relaxed">
                            {/* TERM-WAIVER: Negation context - not a compliance claim */}
                            The EU AI Act establishes risk-based requirements for AI systems. MPLP&apos;s Evidence Chain (Plan → Confirm → Trace) provides structured lifecycle artifacts that may support documentation and auditability expectations. <strong className="text-mplp-text">This is a high-level observation, not a compliance claim.</strong>
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Cross References */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 3"
                        title="Related Resources"
                        align="center"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <Link href="/standards/positioning" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Standards Positioning Policy</p>
                            <p className="text-xs text-mplp-text-muted">How MPLP relates to external standards</p>
                        </Link>
                        <Link href="/enterprise" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Enterprise Evaluation Guide</p>
                            <p className="text-xs text-mplp-text-muted">Practical adoption guidance for organizations (T2)</p>
                        </Link>
                        <Link href="/standards/protocol-evaluation" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Protocol Evaluation</p>
                            <p className="text-xs text-mplp-text-muted">How MPLP is evaluated via Golden Flows</p>
                        </Link>
                        <Link href="/governance/overview" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Governance Overview</p>
                            <p className="text-xs text-mplp-text-muted">MPGC authority and protocol management</p>
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* Meta Footer */}
            <ContentSection>
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
