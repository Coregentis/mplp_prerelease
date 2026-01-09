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
    title: "What MPLP Is NOT | MPLP Protocol",
    description:
        "MPLP is not a framework, not a runtime, and not a platform. Clear boundary definitions to prevent adoption misconceptions.",
    alternates: {
        canonical: `${siteConfig.url}/standards/what-mplp-is-not`,
    },
};

export default function WhatMplpIsNotPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "What MPLP Is NOT",
        "description": "MPLP is not a framework, not a runtime, and not a platform. It is a protocol specification that defines lifecycle semantics for AI agent systems.",
        "url": `${siteConfig.url}/standards/what-mplp-is-not`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/standards/what-mplp-is-not`
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
                    { label: "What MPLP Is NOT", href: "/standards/what-mplp-is-not" }
                ]} />
            </div>
            <PageHeader
                title="What MPLP Is NOT"
                subtitle="Clear boundary definitions to prevent adoption misconceptions."
                kicker="Policy (T4)"
            />

            {/* INV-03 Hero - Verbatim */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border-2 border-mplp-error/30 bg-mplp-error/5 p-8 text-center">
                        <p className="text-2xl md:text-3xl font-bold text-mplp-text">
                            Not a framework. Not a runtime. Not a platform.
                        </p>
                        <p className="text-sm text-mplp-text-muted mt-4">INV-03 — Canonical Boundary Statement</p>
                    </div>
                </div>
            </ContentSection>

            {/* Detailed NOT statements */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 1"
                        title="What MPLP Is NOT"
                        description="These clarifications prevent common misconceptions and reduce adoption friction."
                        align="center"
                    />
                    <div className="mt-8 space-y-6">
                        <div className="mplp-card p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-mplp-error">✕</span>
                                <div>
                                    <h3 className="text-lg font-bold text-mplp-text mb-2">Not an Agent Framework</h3>
                                    <p className="text-sm text-mplp-text-muted leading-relaxed">
                                        MPLP does not provide agent orchestration, tool execution, or prompt management.
                                        Frameworks like LangChain, AutoGen, or CrewAI provide these capabilities.
                                        MPLP defines the <strong className="text-mplp-text">lifecycle semantics</strong> that make framework-built agents governable.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mplp-card p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-mplp-error">✕</span>
                                <div>
                                    <h3 className="text-lg font-bold text-mplp-text mb-2">Not a Hosted Runtime</h3>
                                    <p className="text-sm text-mplp-text-muted leading-relaxed">
                                        MPLP is not a cloud service, deployment platform, or hosted execution environment.
                                        It is a <strong className="text-mplp-text">protocol specification</strong> that defines how any runtime should behave.
                                        Reference implementations exist, but they are non-normative.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mplp-card p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-mplp-error">✕</span>
                                <div>
                                    <h3 className="text-lg font-bold text-mplp-text mb-2">Not a Platform</h3>
                                    <p className="text-sm text-mplp-text-muted leading-relaxed">
                                        MPLP is not a product, SaaS offering, or vendor-controlled ecosystem.
                                        It is a <strong className="text-mplp-text">vendor-neutral, open protocol</strong> that may be implemented by anyone.
                                        There is no platform lock-in.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mplp-card p-6">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl text-mplp-error">✕</span>
                                <div>
                                    {/* TERM-WAIVER: Negation context - Not a Certification or Compliance Tool */}
                                    <h3 className="text-lg font-bold text-mplp-text mb-2">Not a Certification or Compliance Tool</h3>
                                    <p className="text-sm text-mplp-text-muted leading-relaxed">
                                        {/* TERM-WAIVER: Negation context - describing what MPLP does NOT issue */}
                                        MPLP does not issue certifications, compliance badges, or regulatory approvals.
                                        <strong className="text-mplp-text">MPGC governs the specification</strong> — it does not certify, endorse, or audit vendors.
                                        Evaluation is performed by implementers, enterprises, or independent third parties.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* What MPLP IS - T0 Identity */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 2"
                        title="What MPLP IS"
                        align="center"
                    />
                    <div className="mt-8">
                        <div className="rounded-2xl border-2 border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-8">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Protocol Identity (T0)</p>
                            <p className="text-lg text-mplp-text font-medium leading-relaxed">
                                MPLP is the lifecycle protocol for AI agent systems — the Agent OS Protocol that defines how agents are created, operated, audited, and decommissioned.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                            <div className="mplp-card p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-mplp-emerald">✓</span>
                                    <p className="text-sm text-mplp-text-muted"><strong className="text-mplp-text">Protocol Specification</strong> — defines what, not how</p>
                                </div>
                            </div>
                            <div className="mplp-card p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-mplp-emerald">✓</span>
                                    <p className="text-sm text-mplp-text-muted"><strong className="text-mplp-text">Lifecycle Semantics</strong> — created → operated → audited → decommissioned</p>
                                </div>
                            </div>
                            <div className="mplp-card p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-mplp-emerald">✓</span>
                                    <p className="text-sm text-mplp-text-muted"><strong className="text-mplp-text">Vendor-Neutral</strong> — open protocol, no lock-in</p>
                                </div>
                            </div>
                            <div className="mplp-card p-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-mplp-emerald">✓</span>
                                    <p className="text-sm text-mplp-text-muted"><strong className="text-mplp-text">Verification Scenarios</strong> — Golden Flows for conformance testing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Cross References */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 3"
                        title="Learn More"
                        align="center"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <Link href="/why-mplp" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Why MPLP?</h3>
                            <p className="text-sm text-mplp-text-muted">The problem MPLP solves and why protocols matter</p>
                        </Link>
                        <Link href="/enterprise" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Enterprise Evaluation Guide</h3>
                            <p className="text-sm text-mplp-text-muted">Practical adoption guidance for organizations (T2)</p>
                        </Link>
                        <Link href="/architecture" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Architecture</h3>
                            <p className="text-sm text-mplp-text-muted">The four-layer protocol stack (L1–L4)</p>
                        </Link>
                        <Link href="/ecosystem" className="mplp-card p-6 hover:border-mplp-blue-soft/30 transition-all group">
                            <h3 className="text-lg font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-soft">Ecosystem</h3>
                            <p className="text-sm text-mplp-text-muted">How MPLP integrates with frameworks and tools</p>
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
