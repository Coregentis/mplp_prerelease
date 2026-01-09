import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { BackToAnchor } from "@/components/ui/back-to-anchor";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { GovernanceNav } from "@/components/governance/governance-nav";
import { PositioningNotice } from "@/components/ui/positioning-notice";

export const metadata: Metadata = {
    title: "Agentic State Sovereignty | MPLP Positioning",
    description: "MPLP positioning on agent state ownership: State belongs to the Protocol, execution belongs to the Runtime.",
    alternates: {
        canonical: `${siteConfig.url}/governance/positioning/agentic-state-sovereignty`,
    },
};

export default function AgenticStateSovereigntyPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Agentic State Sovereignty",
        "about": "Protocol positioning on agent state ownership and portability",
        "url": `${siteConfig.url}/governance/positioning/agentic-state-sovereignty`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/positioning/agentic-state-sovereignty`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <BackToAnchor href="/governance/overview" label="Governance" />
                <Breadcrumb items={[
                    { label: "Governance", href: "/governance/overview" },
                    { label: "Positioning", href: "/governance/overview" },
                    { label: "State Sovereignty", href: "/governance/positioning/agentic-state-sovereignty" }
                ]} />
            </div>

            {/* Positioning Notice */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <PositioningNotice variant="callout" />
            </div>

            <PageHeader
                title="Agentic State Sovereignty"
                subtitle="State belongs to the Protocol. Execution belongs to the Runtime."
                kicker="Architectural Positioning"
            />

            {/* Problem Statement */}
            <ContentSection>
                <SectionHeader
                    eyebrow="The Problem"
                    title="Who Owns an Agent’s State?"
                    description="In today’s agent frameworks, state is implicitly owned by the runtime."
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <p className="text-lg text-mplp-text-muted mb-6">
                        Agent memory, context, task history, and execution state are often:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-mplp-text-muted mb-8">
                        <li>Encoded in runtime-specific data structures</li>
                        <li>Persisted in proprietary formats</li>
                        <li>Tightly coupled to a specific orchestration engine</li>
                    </ul>
                    <p className="text-lg text-mplp-text-muted mb-6">
                        As a result:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-mplp-text-muted mb-8">
                        <li>Agents are <strong>not portable</strong></li>
                        <li>Memory cannot be reliably migrated across runtimes</li>
                        <li>Vendor lock-in becomes structural, not incidental</li>
                    </ul>
                    <div className="p-6 rounded-2xl border border-mplp-error/30 bg-mplp-error/5">
                        <p className="text-mplp-text font-medium text-center">
                            This creates a fundamental architectural flaw: the “identity” of an agent is inseparable from the tool that executes it.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* MPLP Positioning */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Core Principle"
                    title="State Belongs to the Protocol"
                    description="MPLP adopts a different architectural stance."
                    align="center"
                />
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-mplp-blue-soft/30 bg-gradient-to-r from-mplp-blue-soft/10 via-mplp-dark to-mplp-indigo/10 p-10 text-center">
                        <blockquote className="text-2xl font-bold text-mplp-text mb-6">
                            &ldquo;State belongs to the Protocol. Execution belongs to the Runtime.&rdquo;
                        </blockquote>
                        <div className="grid gap-6 md:grid-cols-3 text-left mt-8">
                            <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                                <h4 className="font-semibold text-mplp-text mb-2">Semantic Definition</h4>
                                <p className="text-sm text-mplp-text-muted">The <em>meaning</em> and <em>structure</em> of agent state are defined at the protocol layer.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                                <h4 className="font-semibold text-mplp-text mb-2">Execution Scope</h4>
                                <p className="text-sm text-mplp-text-muted">The runtime is responsible only for execution, scheduling, and resource management.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                                <h4 className="font-semibold text-mplp-text mb-2">No Ownership</h4>
                                <p className="text-sm text-mplp-text-muted">No runtime is considered the canonical owner of agent memory.</p>
                            </div>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-mplp-text-muted">
                        In MPLP, <strong>state is a semantic construct</strong>, not an implementation artifact.
                    </p>
                </div>
            </ContentSection>

            {/* Protocol-Level State Definition */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Architecture"
                    title="Protocol-Level State Definition"
                    description="MPLP introduces protocol-defined structures that describe agent state in a runtime-neutral way."
                    align="center"
                />
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="mplp-card p-8">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">Protocol Structures</h3>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Context frames</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Lifecycle stages</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Semantic relationships between tasks, decisions, and outcomes</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mplp-card p-8">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">What These Define</h3>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span><strong>What constitutes valid state</strong></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span><strong>How state evolves</strong> across the agent lifecycle</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span><strong>What information must be preserved</strong> for continuity and auditability</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-mplp-text-muted">
                        Runtimes may interpret or store this state differently, but <strong>they do not redefine its meaning</strong>.
                    </p>
                </div>
            </ContentSection>

            {/* Portability Goal */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Roadmap"
                    title="Portability as an Architectural Goal"
                    description="Portability is treated as a design objective, not a v1.0 promise."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="p-6 rounded-2xl border border-mplp-border bg-slate-950/50">
                        <h4 className="font-semibold text-mplp-text mb-4">Agentic State Sovereignty does NOT claim that:</h4>
                        <ul className="space-y-2 text-sm text-mplp-text-muted mb-6">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted">✗</span>
                                <span>All runtimes can interchange state seamlessly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted">✗</span>
                                <span>Any existing implementation is fully portable today</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-text-muted">✗</span>
                                <span>Migration is lossless or automatic</span>
                            </li>
                        </ul>
                        <h4 className="font-semibold text-mplp-text mb-4 border-t border-mplp-border pt-4">Instead, MPLP establishes:</h4>
                        <ul className="space-y-2 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft">✓</span>
                                <span>A <strong>protocol-level boundary</strong> for state semantics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft">✓</span>
                                <span>A <strong>shared reference model</strong> that runtimes may choose to support</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft">✓</span>
                                <span>A foundation upon which portability can be incrementally achieved</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Why This Matters */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Impact"
                    title="Why This Matters"
                    description="By separating state from execution, MPLP enables a healthier ecosystem."
                    align="center"
                />
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Long-lived Agents</h3>
                        <p className="text-sm text-mplp-text-muted">Agents that outlast specific tools or framework versions.</p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Auditable Memory</h3>
                        <p className="text-sm text-mplp-text-muted">Memory that is not locked to a vendor&apos;s proprietary format.</p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Fair Competition</h3>
                        <p className="text-sm text-mplp-text-muted">Future ecosystems where runtimes compete on execution quality, not data captivity.</p>
                    </div>
                </div>
                <div className="mt-12 max-w-3xl mx-auto text-center">
                    <p className="text-xl font-medium text-mplp-text">
                        &ldquo;Agents should not lose their memory when their runtime changes.&rdquo;
                    </p>
                    <p className="mt-4 text-mplp-text-muted">
                        MPLP defines agent state as a protocol concern, leaving execution strategies to interchangeable runtimes.
                    </p>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/positioning/agentic-state-sovereignty" />
            </ContentSection>
        </Shell>
    );
}
