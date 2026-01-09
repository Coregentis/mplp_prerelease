import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { InfoCard } from "@/components/ui/info-card";
import { BackToAnchor } from "@/components/ui/back-to-anchor";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Why MPLP? | The Multi-Agent Lifecycle Protocol",
    description: "The MPLP specification describes a lifecycle model for multi-agent systems. Learn about the coordination challenges MPLP addresses.",
    alternates: {
        canonical: `${siteConfig.url}/why-mplp`,
    },
};

export default function WhyMplpPage() {
    const pageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Why MPLP?",
        "about": "Rationale and problem statement for the Multi-Agent Lifecycle Protocol",
        "url": `${siteConfig.url}/why-mplp`,
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={pageSchema} />

            {/* Breadcrumb */}
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: "FAQ", href: "/faq" },
                    { label: "Why MPLP?", href: "/why-mplp" }
                ]} />
            </div>

            <PageHeader
                title="Why MPLP?"
                subtitle="AI agents don&apos;t just need prompts. They need a lifecycle protocol to ensure consistency, observability, and governance."
                kicker="The Problem"
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <BackToAnchor href="/faq" label="FAQ" />
            </div>

            <ContentSection>
                <SectionHeader
                    eyebrow="The Crisis"
                    title="The Multi-Agent Coordination Crisis"
                    description="As organizations move from single-agent chat to complex multi-agent systems, they hit the same structural failures. Without a protocol, every team builds their own ad-hoc orchestration layer."
                    align="center"
                />

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <InfoCard title="Context Drift">
                        Agents lose context across long-running tasks. Without a shared semantic state, instructions degrade over time, leading to hallucinations and task failure.
                    </InfoCard>
                    <InfoCard title="Black Box Execution">
                        Most agent runs are opaque. When something goes wrong, it&apos;s impossible to trace the decision chain or audit the specific prompt that caused the error.
                    </InfoCard>
                    <InfoCard title="Vendor Lock-in">
                        Framework APIs change constantly. Building directly on a specific vendor&apos;s SDK locks your architecture to their roadmap and pricing.
                    </InfoCard>
                    <InfoCard title="Security Gaps">
                        Agents often have unrestricted access to tools. Without a governance layer, there are no checks on what actions an agent can take or what data it can access.
                    </InfoCard>
                    <InfoCard title="Integration Hell">
                        Connecting different models, vector databases, and tools requires custom glue code for every combination, creating a brittle and unmaintainable codebase.
                    </InfoCard>
                    <InfoCard title="No Standard Handover">
                        Agents struggle to hand off tasks to one another. There is no standard format for passing context, state, and intent between different agent roles.
                    </InfoCard>
                </div>
            </ContentSection>

            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="The Solution"
                    title="A Protocol-First Approach"
                    description="The MPLP specification proposes a vendor-neutral approach for how agents plan, coordinate, execute, and govern their work. See docs for protocol details."
                    align="center"
                />

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-mplp-text">Standardized Lifecycle</h3>
                        <p className="text-mplp-text-muted">
                            The MPLP protocol describes a lifecycle approach: <strong>Intent → Plan → Execute → Verify</strong>. This model ensures that every action is deliberate, traceable, and governed by policy.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-mplp-text-muted">
                            <li>Shared semantic context across all agents</li>
                            <li>Explicit planning and confirmation steps</li>
                            <li>Structured execution traces for auditability</li>
                        </ul>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-mplp-text">Modular Governance</h3>
                        <p className="text-mplp-text-muted">
                            Instead of a monolithic framework, MPLP offers a set of composable modules for specific governance needs. You can adopt the whole protocol or just the parts you need.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-mplp-text-muted">
                            <li><strong>Context Module:</strong> Manages shared state</li>
                            <li><strong>Trace Module:</strong> Records execution history</li>
                            <li><strong>Role Module:</strong> Defines agent permissions</li>
                        </ul>
                        <div className="mt-6">
                            <Link
                                href="/governance/agentos-protocol"
                                className="mplp-card group block p-5 border-mplp-blue-soft/20 hover:border-mplp-blue-soft/40 transition-colors"
                            >
                                <p className="text-xs font-bold uppercase tracking-widest text-mplp-text-muted mb-2">
                                    Governance Core
                                </p>
                                <h4 className="text-lg font-bold text-mplp-text group-hover:text-mplp-blue-soft transition-colors">
                                    The Agent OS Protocol
                                </h4>
                                <p className="mt-2 text-sm text-mplp-text-muted leading-relaxed">
                                    A protocol-level framing: MPLP governs agent frameworks and runtimes by enforcing lifecycle contracts—Plan, Confirm, Trace, and audit-grade semantics.
                                </p>
                                <p className="mt-4 text-sm font-semibold text-mplp-blue-soft">
                                    Read Agent OS Protocol →
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </ContentSection>

            <ContentSection>
                <SectionHeader
                    eyebrow="Comparison"
                    title="MPLP vs. The Rest"
                    description="See how MPLP compares to ad-hoc scripts and proprietary frameworks."
                    align="center"
                    className="mx-auto"
                />

                <div className="mt-12 overflow-hidden rounded-2xl border border-mplp-border bg-slate-950/80">
                    <div className="grid grid-cols-4 border-b border-mplp-border bg-slate-900/50 p-4 text-sm font-semibold text-mplp-text">
                        <div>Feature</div>
                        <div>Ad-hoc Scripts</div>
                        <div>Agent Frameworks</div>
                        <div className="text-mplp-blue">MPLP Protocol</div>
                    </div>
                    <div className="divide-y divide-mplp-border">
                        <ComparisonRow
                            feature="Standardization"
                            adhoc="None"
                            framework="Vendor-specific"
                            mplp="Open Standard"
                        />
                        <ComparisonRow
                            feature="Observability"
                            adhoc="Manual logging"
                            framework="Built-in (Opaque)"
                            mplp="Structural Trace"
                        />
                        <ComparisonRow
                            feature="Interoperability"
                            adhoc="Low"
                            framework="Ecosystem-locked"
                            mplp="Universal"
                        />
                        <ComparisonRow
                            feature="Governance"
                            adhoc="None"
                            framework="Basic permissions"
                            mplp="Policy-as-Code"
                        />
                        <ComparisonRow
                            feature="Long-running"
                            adhoc="Fragile"
                            framework="Stateful (Memory)"
                            mplp="Durable Context"
                        />
                        <ComparisonRow
                            feature="Conformance Tests"
                            adhoc="None"
                            framework="Unit tests only"
                            mplp="Golden Flows (Normative)"
                        />
                        <ComparisonRow
                            feature="Evidence Chain"
                            adhoc="None"
                            framework="Logs only"
                            mplp="Plan → Confirm → Trace"
                        />
                    </div>
                </div>
            </ContentSection>

            {/* Governance CTA (make the AgentOS link hard to miss) */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Governance"
                    title="If you are deploying agents in production, governance cannot be optional."
                    description="See how MPLP treats frameworks, runtimes, and transports as governed objects—and how the Evidence Chain makes auditability structural."
                    align="center"
                    className="mx-auto"
                />
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/governance/agentos-protocol"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-mplp-blue-soft/15 text-mplp-blue-soft border border-mplp-blue-soft/30 hover:bg-mplp-blue-soft/20 transition-colors"
                    >
                        Agent OS Protocol →
                    </Link>
                    <Link
                        href="/governance/evidence-chain"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-slate-950/50 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                    >
                        Evidence Chain →
                    </Link>
                    <Link
                        href="/governance/governed-stack"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-slate-950/50 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                    >
                        Governed Stack →
                    </Link>
                    <Link
                        href="/conformance"
                        className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-mplp-emerald/15 text-mplp-emerald border border-mplp-emerald/30 hover:bg-mplp-emerald/20 transition-colors"
                    >
                        View Conformance Model →
                    </Link>
                </div>
            </ContentSection>
        </Shell>
    );
}

function ComparisonRow({ feature, adhoc, framework, mplp }: { feature: string, adhoc: string, framework: string, mplp: string }) {
    return (
        <div className="grid grid-cols-4 p-4 text-sm text-mplp-text-muted hover:bg-slate-900/30 transition-colors">
            <div className="font-medium text-mplp-text">{feature}</div>
            <div>{adhoc}</div>
            <div>{framework}</div>
            <div className="font-semibold text-mplp-blue-soft">{mplp}</div>
        </div>
    );
}
