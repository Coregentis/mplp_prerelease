import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { GovernanceNav } from "@/components/governance/governance-nav";

export const metadata: Metadata = {
    title: "Agent OS Protocol | MPLP Protocol",
    description: "MPLP as Agent OS Protocol: a protocol-level operating system for agent lifecycle governance, not a runtime OS.",
    alternates: {
        canonical: `${siteConfig.url}/governance/agentos-protocol`,
    },
};

export default function AgentOSProtocolPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Agent OS Protocol Definition",
        "about": "Protocol-level OS definition for agent lifecycle governance",
        "url": `${siteConfig.url}/governance/agentos-protocol`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/agentos-protocol`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: "Governance", href: "/governance" },
                    { label: "Agent OS Protocol", href: "/governance/agentos-protocol" }
                ]} />
            </div>
            <PageHeader
                title="Agent OS Protocol"
                subtitle="MPLP is a protocol-level operating system for agent lifecycle governance. It defines a vendor-neutral semantic contract that runtimes and agents are designed to respect."
                kicker="Constitutional Definition"
            />

            {/* Protocol OS vs Runtime OS */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Core Distinction"
                    title="Protocol-level OS vs Runtime OS"
                    description="MPLP operates at the protocol level, not the runtime level. This distinction is fundamental to understanding its role in the agent ecosystem."
                    align="center"
                />
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="mplp-card p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-mplp-blue-soft/10 flex items-center justify-center text-mplp-blue-soft font-bold">P</div>
                            <h3 className="text-xl font-bold text-mplp-text">Protocol-level OS (MPLP)</h3>
                        </div>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-1">✓</span>
                                <span>Defines <strong className="text-mplp-text">what is expected to be true</strong> across interoperable implementations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-1">✓</span>
                                <span>Specifies <strong className="text-mplp-text">lifecycle semantics</strong>, not execution mechanics</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-1">✓</span>
                                <span>Enforces <strong className="text-mplp-text">governance boundaries</strong> across vendors</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-1">✓</span>
                                <span>Enables <strong className="text-mplp-text">interoperability</strong> through shared contracts</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mplp-card p-8 border-mplp-border/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded-xl bg-slate-700/50 flex items-center justify-center text-mplp-text-muted font-bold">R</div>
                            <h3 className="text-xl font-bold text-mplp-text-muted">Runtime OS (Others)</h3>
                        </div>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="mt-1">○</span>
                                <span>Defines <strong>how to execute</strong> specific operations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1">○</span>
                                <span>Provides <strong>execution engines</strong> and runtime environments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1">○</span>
                                <span>Manages <strong>resources and scheduling</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="mt-1">○</span>
                                <span>Vendor-specific, framework-dependent</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Protocol–Runtime Layering Relationship */}
            {/* 
                PURPOSE: This section exists to prevent misinterpretation of MPLP as a competing 
                runtime or execution system. It defines the structural dependency relationship 
                between MPLP and Agent Runtimes / Agent OS implementations.
                SEMANTIC: Clarification (Non-breaking)
            */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Structural Relationship"
                    title="Protocol–Runtime Layering Relationship"
                    description="MPLP is a protocol-level semantic substrate that operates beneath agent runtimes and operating systems, defining lifecycle governance rather than execution behavior."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    {/* Dependency Stack */}
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                        <h4 className="font-semibold text-mplp-text mb-4 text-center">Agent Ecosystem Dependency Stack</h4>
                        <div className="space-y-2 font-mono text-sm">
                            <div className="p-3 rounded-lg bg-slate-900/50 border border-mplp-border text-mplp-text-muted text-center">
                                Agent Applications
                            </div>
                            <div className="text-center text-mplp-text-muted">↑</div>
                            <div className="p-3 rounded-lg bg-slate-900/50 border border-mplp-border text-mplp-text-muted text-center">
                                Agent Frameworks
                            </div>
                            <div className="text-center text-mplp-text-muted">↑</div>
                            <div className="p-3 rounded-lg bg-slate-900/50 border border-mplp-border text-mplp-text-muted text-center">
                                Agent Runtime / Agent Operating Systems
                            </div>
                            <div className="text-center text-mplp-text-muted">↑</div>
                            <div className="p-3 rounded-lg bg-mplp-blue-soft/10 border border-mplp-blue-soft/30 text-mplp-blue-soft text-center font-semibold">
                                MPLP — Agent OS Protocol (Lifecycle &amp; Governance Semantics)
                            </div>
                            <div className="text-center text-mplp-text-muted">↑</div>
                            <div className="p-3 rounded-lg bg-slate-900/50 border border-mplp-border text-mplp-text-muted text-center">
                                Models / Tools / Infrastructure
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-mplp-text-muted text-center">
                            Agent runtimes and operating systems may differ in execution models, but all can rely on MPLP to provide shared lifecycle semantics, governance boundaries, and auditability.
                        </p>
                    </div>

                    {/* Clarification Box */}
                    <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6">
                        <h4 className="font-semibold text-mplp-text mb-3 flex items-center gap-2">
                            <span className="text-amber-500">⚠</span>
                            Clarification: What MPLP Is Not
                        </h4>
                        <ul className="space-y-2 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error mt-0.5">✗</span>
                                <span>MPLP does <strong className="text-mplp-text">NOT replace</strong> agent runtimes or execution systems</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error mt-0.5">✗</span>
                                <span>MPLP does <strong className="text-mplp-text">NOT schedule or execute</strong> agents</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error mt-0.5">✗</span>
                                <span>MPLP is designed to be <strong className="text-mplp-text">embedded, not deployed</strong> as a standalone system</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-xs text-mplp-text-muted border-t border-amber-500/20 pt-4">
                            MPLP defines the semantic contract that runtimes implement. It is a governance layer, not a competing execution platform.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Agent Stack Four Layers */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Architecture"
                    title="Agent Stack: Four Layers"
                    description="MPLP defines a layered architecture that separates concerns and enables governance at each level."
                    align="center"
                />
                <div className="mt-12 grid gap-4 md:grid-cols-4">
                    <div className="mplp-card text-center p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-blue-soft/10 text-mplp-blue-soft font-bold text-xl">L1</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">Core Protocol</h3>
                        <p className="text-sm text-mplp-text-muted">Lifecycle primitives, semantic frames, and invariants.</p>
                    </div>
                    <div className="mplp-card text-center p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-indigo/10 text-mplp-indigo font-bold text-xl">L2</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">Coordination</h3>
                        <p className="text-sm text-mplp-text-muted">Modular governance primitives: Context, Plan, Confirm, Trace...</p>
                    </div>
                    <div className="mplp-card text-center p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-emerald/10 text-mplp-emerald font-bold text-xl">L3</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">Execution</h3>
                        <p className="text-sm text-mplp-text-muted">Execution runtimes and state handling that implement MPLP semantics (informative).</p>
                    </div>
                    <div className="mplp-card text-center p-6">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-warning/10 text-mplp-warning font-bold text-xl">L4</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">Integration</h3>
                        <p className="text-sm text-mplp-text-muted">Models, tools, infrastructure, and external systems.</p>
                    </div>
                </div>
            </ContentSection>

            {/* Governs, Not Executes */}
            <ContentSection>
                <div className="max-w-3xl mx-auto text-center">
                    <SectionHeader
                        eyebrow="Core Principle"
                        title="Governs, Not Executes"
                        description="This is the defining characteristic of MPLP as an Agent OS Protocol."
                        align="center"
                    />
                    <div className="mt-8 rounded-3xl border border-mplp-blue-soft/30 bg-gradient-to-r from-mplp-blue-soft/10 via-mplp-dark to-mplp-indigo/10 p-8">
                        <blockquote className="text-xl font-medium text-mplp-text italic">
                            &ldquo;MPLP does not execute agents. It governs their lifecycle semantics so that every conforming runtime shares a common understanding of state, intent, and behavior boundaries.&rdquo;
                        </blockquote>
                        <p className="mt-4 text-sm text-mplp-text-muted">
                            — MPLP Protocol Governance Committee
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <h4 className="font-semibold text-mplp-text mb-2">Semantic Authority</h4>
                            <p className="text-sm text-mplp-text-muted">MPLP defines the meaning of lifecycle events, not how they are processed.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <h4 className="font-semibold text-mplp-text mb-2">Vendor Neutrality</h4>
                            <p className="text-sm text-mplp-text-muted">Any runtime can implement MPLP semantics, regardless of underlying technology.</p>
                        </div>
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <h4 className="font-semibold text-mplp-text mb-2">Governance Properties</h4>
                            <p className="text-sm text-mplp-text-muted">When adopted, lifecycle behavior can be made observable and auditable through shared semantics.</p>
                        </div>
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

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/agentos-protocol" />
            </ContentSection>
        </Shell >
    );
}
