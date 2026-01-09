import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
    title: "Enterprise Evaluation Guide | MPLP Protocol",
    description: "Enterprise-grade governance evaluation for AI agent systems. MPLP protocol overview for architecture review, risk assessment, and due diligence.",
    alternates: {
        canonical: `${siteConfig.url}/enterprise`,
    },
};

export default function EnterprisePage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Enterprise Evaluation Guide",
        "about": "Enterprise governance evaluation for AI agent systems",
        "url": `${siteConfig.url}/enterprise`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/enterprise`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[{ label: "Enterprise", href: "/enterprise" }]} />
            </div>
            <PageHeader
                title="Enterprise Evaluation Guide"
                subtitle="An open, vendor-neutral protocol for governing multi-agent systems across planning, execution, and audit."
                kicker="MPLP — Enterprise-Grade Governance for AI Agents"
            />

            {/* Usage Guidance Box */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-6">
                        <h3 className="text-lg font-bold text-mplp-text mb-3">Intended Use</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">
                            This page is designed for enterprise stakeholders conducting:
                        </p>
                        <ul className="text-sm text-mplp-text-muted space-y-2 mb-4">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span><strong>Architecture review</strong> of multi-agent system designs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span><strong>Internal risk assessment</strong> for AI agent deployments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span><strong>Protocol evaluation</strong> for governance standards adoption</span>
                            </li>
                        </ul>
                        <p className="text-xs text-mplp-text-muted italic">
                            This is not a product pitch. MPLP does not issue certifications, badges, or endorsements.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Protocol Status */}
            <ContentSection background="surface">
                <div className="max-w-5xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="mplp-card bg-slate-950/40 p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="status-dot status-dot-frozen" />
                                <span className="text-[10px] font-bold text-mplp-text uppercase tracking-widest">Spec v1.0.0</span>
                            </div>
                            <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em]">Frozen / Governed</p>
                            <p className="text-[10px] text-mplp-text-muted/60 mt-2 font-mono">2025-12-03</p>
                        </div>
                        <div className="mplp-card bg-slate-950/40 p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="h-2 w-2 rounded-full bg-mplp-blue-soft" />
                                <span className="text-[10px] font-bold text-mplp-text uppercase tracking-widest">Evolution</span>
                            </div>
                            <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em]">RFC-based process</p>
                            <p className="text-[10px] text-mplp-text-muted/60 mt-2 font-mono">No breaking changes</p>
                        </div>
                        <div className="mplp-card bg-slate-950/40 p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <div className="h-2 w-2 rounded-full bg-mplp-indigo" />
                                <span className="text-[10px] font-bold text-mplp-text uppercase tracking-widest">Governance</span>
                            </div>
                            <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em]">MPGC Managed</p>
                            <p className="text-[10px] text-mplp-text-muted/60 mt-2 font-mono">Non-Certification</p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Section 2: The Enterprise Problem */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Context"
                    title="The Enterprise Challenge"
                    description="Why existing approaches fall short for governed AI agent systems."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Auditability Gap</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Multi-agent systems produce decisions without structured evidence trails.
                                {/* TERM-WAIVER: Enterprise context - refers to compliance departments */}
                                Risk and compliance teams cannot trace how an agent arrived at a particular action.
                            </p>
                        </div>
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Framework vs. Governance</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Agent frameworks are execution tools, not governance tools.
                                They optimize for capability, not for policy enforcement or lifecycle control.
                            </p>
                        </div>
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Runtime Opacity</h3>
                            <p className="text-sm text-mplp-text-muted">
                                {/* TERM-WAIVER: Enterprise context - refers to compliance functions */}
                                Risk, legal, and compliance functions cannot intervene during agent execution.
                                Decisions happen inside opaque runtime boundaries.
                            </p>
                        </div>
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Lifecycle Fragmentation</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Models, tools, and agents each follow different lifecycle semantics.
                                There is no unified contract for how they plan, execute, and report.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Section 3: What MPLP Is (and Is Not) */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Definition"
                    title="What MPLP Is — and Is Not"
                    description="Clear boundaries for protocol evaluation."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-8 max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
                    <div className="mplp-card p-6 border-mplp-emerald/30">
                        <h3 className="text-lg font-bold text-mplp-emerald mb-4">MPLP Is</h3>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>A <strong>lifecycle governance protocol</strong> for AI agents</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Defines <strong>Plan / Confirm / Trace</strong> execution semantics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Treats frameworks and runtimes as <strong>governed objects</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Vendor-neutral, <strong>open specification</strong></span>
                            </li>
                        </ul>
                    </div>
                    <div className="mplp-card p-6 border-mplp-border">
                        <h3 className="text-lg font-bold text-mplp-text-muted mb-4">MPLP Is Not</h3>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted mt-0.5">✗</span>
                                <span>A runtime or execution engine</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted mt-0.5">✗</span>
                                <span>An agent framework or SDK wrapper</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted mt-0.5">✗</span>
                                <span>A certification body or auditor</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted mt-0.5">✗</span>
                                {/* TERM-WAIVER: Negation context - explicitly stating what MPLP is NOT */}
                                <span>A compliance guarantee or legal shield</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Section 4: Governance as First-Class Layer */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Architecture"
                    title="Governance as a First-Class Layer"
                    description="MPLP defines three structural primitives for agent lifecycle control."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="mplp-card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-mplp-blue-soft/10 border border-mplp-blue-soft/30 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-blue-soft">P</span>
                            </div>
                            <h3 className="text-lg font-bold text-mplp-text mb-2">Plan</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Intent declaration and decision boundary.
                                What the agent intends to do, before execution.
                            </p>
                        </div>
                        <div className="mplp-card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-mplp-emerald/10 border border-mplp-emerald/30 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-emerald">C</span>
                            </div>
                            <h3 className="text-lg font-bold text-mplp-text mb-2">Confirm</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Risk gating and approval checkpoint.
                                Explicit authorization before state changes.
                            </p>
                        </div>
                        <div className="mplp-card p-6 text-center">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-mplp-indigo/10 border border-mplp-indigo/30 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-indigo">T</span>
                            </div>
                            <h3 className="text-lg font-bold text-mplp-text mb-2">Trace</h3>
                            <p className="text-sm text-mplp-text-muted">
                                Evidence-grade execution record.
                                Structured, replayable audit record.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/governance/evidence-chain" className="inline-flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            Evidence Chain
                        </Link>
                        <Link href="/governance/governed-stack" className="inline-flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            Governed Stack
                        </Link>
                        <Link href="/governance/agentos-protocol" className="inline-flex items-center gap-2 text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            <IconArrowRight className="h-4 w-4" />
                            Agent OS Protocol
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* TERM-WAIVER: Section comment retained for code organization - UI shows Conformance */}
            {/* Section 5: Verifiability & Conformance */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Verification"
                    title="Verifiability & Conformance"
                    description="MPLP defines conformance, not certifications."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Golden Flows</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">
                                Five normative lifecycle scenarios that define conformance behavior.
                                These are not demos—they are the canonical test cases.
                            </p>
                            <Link href="/golden-flows" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                                <IconArrowRight className="h-4 w-4" />
                                View Golden Flows
                            </Link>
                        </div>
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">Self-Verifiable</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">
                                Conformance is self-assessed and reproducible.
                                Organizations run the flows against their own implementations.
                            </p>
                            <Link href="/conformance" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                                <IconArrowRight className="h-4 w-4" />
                                View Conformance
                            </Link>
                        </div>
                        <div className="mplp-card p-6">
                            <h3 className="text-lg font-bold text-mplp-text mb-3">No Endorsements</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">
                                MPGC does not issue badges, certifications, or endorsements.
                                Protocol adoption is self-declared.
                            </p>
                            <Link href="/adoption" className="inline-flex items-center gap-2 text-sm text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                                <IconArrowRight className="h-4 w-4" />
                                View Adoption Signals
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 max-w-2xl mx-auto text-center">
                        <p className="text-sm text-mplp-text-muted">
                            For a formal definition of how MPLP relates to external standards, see the{" "}
                            <Link href="/standards/positioning" className="text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">
                                Standards Compatibility & Mapping Policy
                            </Link>.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Section 6: Adoption Signals */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Status"
                    title="Observable Signals"
                    description="Verifiable indicators of protocol maturity."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="mplp-card p-5">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider mb-1">Specification</p>
                            <p className="text-sm font-semibold text-mplp-text">v1.0.0 Frozen</p>
                            <p className="text-xs text-mplp-text-muted">2025-12-03</p>
                        </div>
                        <div className="mplp-card p-5">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider mb-1">Governance</p>
                            <p className="text-sm font-semibold text-mplp-text">MPGC</p>
                            <p className="text-xs text-mplp-text-muted">RFC-based</p>
                        </div>
                        <div className="mplp-card p-5">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider mb-1">SDKs</p>
                            <p className="text-sm font-semibold text-mplp-text">Published</p>
                            <p className="text-xs text-mplp-text-muted">npm / PyPI</p>
                        </div>
                        <div className="mplp-card p-5">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider mb-1">Standards</p>
                            <p className="text-sm font-semibold text-mplp-text">Mapped</p>
                            <p className="text-xs text-mplp-text-muted">ISO 42001 / NIST</p>
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <Link href="/adoption" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            View Full Adoption Signals →
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* CTA */}
            <ContentSection background="surface">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-mplp-text mb-4">Begin Evaluation</h2>
                    <p className="text-mplp-text-muted mb-8">
                        Start with the governance stance, validate against conformance flows,
                        then assess alignment with your organizational requirements.
                    </p>
                    <p className="text-xs text-mplp-text-muted mb-8">
                        Evaluation Path: Governance → Conformance → Golden Flows → Adoption Signals
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/governance/overview" variant="primary" size="lg">
                            Governance Overview
                        </Button>
                        <Button href="/conformance" variant="secondary" size="lg">
                            Conformance Framework
                        </Button>
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/architecture" className="text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            Architecture →
                        </Link>
                        <Link href="/modules" className="text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            Modules →
                        </Link>
                        <Link href="/golden-flows" className="text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            Golden Flows →
                        </Link>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
