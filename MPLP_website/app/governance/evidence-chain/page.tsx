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
    title: "Evidence Chain | MPLP Protocol",
    description: "Plan, Confirm, and Trace form the MPLP Evidence Chain — the governance mechanism that supports auditability and governance assurance in agent systems.",
    alternates: {
        canonical: `${siteConfig.url}/governance/evidence-chain`,
    },
};

export default function EvidenceChainPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Evidence Chain",
        "about": "Plan, Confirm, Trace governance mechanism for auditability",
        "url": `${siteConfig.url}/governance/evidence-chain`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/evidence-chain`
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
                    { label: "Evidence Chain", href: "/governance/evidence-chain" }
                ]} />
            </div>
            <PageHeader
                title="Evidence Chain"
                subtitle="Plan → Confirm → Trace: The governance triad that transforms agent actions into auditable, accountable records."
                kicker="Governance Core"
            />

            {/* What is the Evidence Chain */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Definition"
                    title="What is the Evidence Chain?"
                    description="The Evidence Chain is MPLP&apos;s answer to the fundamental governance question: How do we demonstrate what an agent intended, what was authorized, and what actually happened?"
                    align="center"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-mplp-blue-soft/30 bg-gradient-to-r from-mplp-blue-soft/5 via-mplp-dark to-mplp-indigo/5 p-8">
                        <p className="text-lg text-mplp-text-muted leading-relaxed">
                            In traditional software, audit trails are often implemented as an afterthought. In agent systems, they must be <strong className="text-mplp-text">structural</strong>.
                            The Evidence Chain supports that every agent action is preceded by explicit intent (<strong className="text-mplp-blue-soft">Plan</strong>),
                            authorized by governance boundaries (<strong className="text-mplp-emerald">Confirm</strong>),
                            and recorded with schema-defined semantics (<strong className="text-mplp-warning">Trace</strong>).
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* The Three Pillars */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Governance Triad"
                    title="Plan · Confirm · Trace"
                    description="Each pillar serves a distinct governance function. Together, they form a continuous chain of evidence."
                    align="center"
                />
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {/* Plan */}
                    <div className="mplp-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-xl bg-mplp-blue-soft/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-blue-soft">P</span>
                            </div>
                            <h3 className="text-xl font-bold text-mplp-text">Plan</h3>
                        </div>
                        <p className="text-mplp-text-muted mb-4">
                            <strong className="text-mplp-text">Intent Declaration</strong>
                        </p>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span>Declares <strong>what</strong> the agent intends to do</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span>Specifies <strong>why</strong> (intent rationale)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-blue-soft mt-0.5">→</span>
                                <span>Defines <strong>scope</strong> and constraints</span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-6 border-t border-mplp-border">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Governance Role</p>
                            <p className="text-sm text-mplp-text mt-1">Pre-execution intent capture</p>
                        </div>
                    </div>

                    {/* Confirm */}
                    <div className="mplp-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-xl bg-mplp-emerald/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-emerald">C</span>
                            </div>
                            <h3 className="text-xl font-bold text-mplp-text">Confirm</h3>
                        </div>
                        <p className="text-mplp-text-muted mb-4">
                            <strong className="text-mplp-text">Authorization Gate</strong>
                        </p>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">→</span>
                                <span>Validates against <strong>governance policies</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">→</span>
                                <span>Checks <strong>permission boundaries</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald mt-0.5">→</span>
                                <span>Records <strong>authorization decision</strong></span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-6 border-t border-mplp-border">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Governance Role</p>
                            <p className="text-sm text-mplp-text mt-1">Execution authorization</p>
                        </div>
                    </div>

                    {/* Trace */}
                    <div className="mplp-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-12 w-12 rounded-xl bg-mplp-warning/10 flex items-center justify-center">
                                <span className="text-2xl font-bold text-mplp-warning">T</span>
                            </div>
                            <h3 className="text-xl font-bold text-mplp-text">Trace</h3>
                        </div>
                        <p className="text-mplp-text-muted mb-4">
                            <strong className="text-mplp-text">Structured Record</strong>
                        </p>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-warning mt-0.5">→</span>
                                <span>Records <strong>what happened</strong> (actions, decisions)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-warning mt-0.5">→</span>
                                <span>Captures <strong>state transitions</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-warning mt-0.5">→</span>
                                <span>Supports <strong>review and reconstruction</strong></span>
                            </li>
                        </ul>
                        <div className="mt-6 pt-6 border-t border-mplp-border">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Governance Role</p>
                            <p className="text-sm text-mplp-text mt-1">Post-execution evidence</p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Why Evidence Chain Matters */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Audit Readiness"
                    title="Why Evidence Chains Matter"
                    description="In regulated environments, the ability to demonstrate intent, authorization, and execution is often required."
                />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-3">Regulatory Assurance</h3>
                        <p className="text-mplp-text-muted text-sm">
                            Auditors often require evidence that agent actions were authorized and within policy boundaries. The Evidence Chain provides structured evidence to support verification.
                        </p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-3">Incident Investigation</h3>
                        <p className="text-mplp-text-muted text-sm">
                            When something goes wrong, the Evidence Chain enables precise reconstruction of the decision path that led to the outcome.
                        </p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-3">Accountability</h3>
                        <p className="text-mplp-text-muted text-sm">
                            Each link in the chain is attributed: who (or what) made the decision, under what authority, and with what constraints.
                        </p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-3">Trust Foundation</h3>
                        <p className="text-mplp-text-muted text-sm">
                            Organizations can deploy agent systems with confidence, knowing that governance is operationalized through explicit lifecycle gates and records.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/evidence-chain" />
            </ContentSection>
        </Shell>
    );
}
