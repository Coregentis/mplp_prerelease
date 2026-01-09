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
    title: "Semantic Drift Control | MPLP Positioning",
    description: "MPLP positioning on semantic drift: Drift is a Protocol Violation, not a Model Behavior Issue.",
    alternates: {
        canonical: `${siteConfig.url}/governance/positioning/semantic-drift-control`,
    },
};

export default function SemanticDriftControlPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Semantic Drift Control",
        "about": "Protocol positioning on semantic drift detection and handling",
        "url": `${siteConfig.url}/governance/positioning/semantic-drift-control`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/positioning/semantic-drift-control`
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
                    { label: "Drift Control", href: "/governance/positioning/semantic-drift-control" }
                ]} />
            </div>

            {/* Positioning Notice */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <PositioningNotice
                    variant="callout"
                    message="This page describes MPLP's architectural interpretation of semantic drift. It is not a guarantee of determinism or error-free execution."
                />
            </div>

            <PageHeader
                title="Semantic Drift Control"
                subtitle="Drift is a Protocol Violation, not a Model Behavior Issue."
                kicker="Architectural Positioning"
            />

            {/* Misdiagnosis of Hallucination */}
            <ContentSection>
                <SectionHeader
                    eyebrow="The Problem"
                    title="The Misdiagnosis of “Hallucination”"
                    description="Most agent systems treat incorrect or unstable behavior as a model problem."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <p className="text-lg text-mplp-text-muted mb-6">
                        Common responses include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-mplp-text-muted mb-8">
                        <li>Prompt tuning</li>
                        <li>Longer system instructions</li>
                        <li>Repeated reminders to “stay on task”</li>
                    </ul>
                    <div className="p-6 rounded-2xl border border-mplp-border bg-slate-950/50">
                        <p className="text-mplp-text font-medium text-center">
                            This approach assumes that drift is a psychological flaw of the model. MPLP takes a different view.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* MPLP Positioning */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Core Principle"
                    title="Drift Is a Protocol Violation"
                    description="Semantic drift is not merely a model error. It is a violation of a declared semantic contract."
                    align="center"
                />
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-mplp-blue-soft/30 bg-gradient-to-r from-mplp-blue-soft/10 via-mplp-dark to-mplp-indigo/10 p-10 text-center">
                        <blockquote className="text-2xl font-bold text-mplp-text mb-6">
                            &ldquo;When behavior deviates from boundaries, the issue is not “hallucination” — it is a contract breach at the protocol level.&rdquo;
                        </blockquote>
                        <p className="text-mplp-text-muted">
                            In MPLP, agents operate within <strong>explicitly defined lifecycle and semantic boundaries</strong>.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Semantic Contracts and Invariants */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Mechanism"
                    title="Semantic Contracts and Invariants"
                    description="MPLP introduces the concept of semantic contracts enforced through protocol-defined invariants."
                    align="center"
                />
                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    <div className="mplp-card p-8">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">Contract Definitions</h3>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Expected roles and responsibilities</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Allowed transitions between lifecycle states</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-mplp-blue-soft">•</span>
                                <span>Constraints on decision scope and authority</span>
                            </li>
                        </ul>
                    </div>
                    <div className="mplp-card p-8 border-mplp-error/20 bg-mplp-error/5">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">Drift Definition</h3>
                        <p className="text-sm text-mplp-text-muted mb-4">Drift occurs when:</p>
                        <ul className="space-y-3 text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error">⚠</span>
                                <span>An agent produces outputs outside its declared scope</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error">⚠</span>
                                <span>Lifecycle transitions occur without required confirmations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-error">⚠</span>
                                <span>Decisions violate previously established constraints</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Drift Detection as Protocol Concern */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Architecture"
                    title="Drift Detection Is a Protocol Concern"
                    description="MPLP treats drift detection as a first-class protocol responsibility, independent of prompt wording and orthogonal to model quality."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="p-6 rounded-2xl border border-mplp-border bg-slate-950/50">
                        <h4 className="font-semibold text-mplp-text mb-4">This enables runtimes to:</h4>
                        <ul className="space-y-2 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span>Detect deviation events <strong>deterministically</strong></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span>Trigger escalation, rollback, or human confirmation</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-mplp-emerald">✓</span>
                                <span>Record drift as an <strong>auditable event</strong>, not a silent failure</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* What MPLP Does NOT Claim */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Boundary"
                    title="What MPLP Does NOT Claim"
                    description="It is important to state explicitly what is out of scope."
                    align="center"
                />
                <div className="mt-8 max-w-3xl mx-auto">
                    <div className="grid gap-4 md:grid-cols-3 text-center">
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <span className="text-mplp-text-muted block mb-2">Uncertainty</span>
                            <p className="text-sm text-mplp-text">MPLP does <strong>not</strong> eliminate model uncertainty</p>
                        </div>
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <span className="text-mplp-text-muted block mb-2">Perfection</span>
                            <p className="text-sm text-mplp-text">MPLP does <strong>not</strong> guarantee perfect outputs</p>
                        </div>
                        <div className="p-4 rounded-xl border border-mplp-border bg-slate-950/30">
                            <span className="text-mplp-text-muted block mb-2">Evaluation</span>
                            <p className="text-sm text-mplp-text">MPLP does <strong>not</strong> replace model evaluation or testing</p>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-mplp-text-muted">
                        Instead, MPLP defines <strong>when uncertainty becomes unacceptable</strong> within a governed system.
                    </p>
                </div>
            </ContentSection>

            {/* Summary */}
            <ContentSection background="surface">
                <div className="max-w-3xl mx-auto text-center">
                    <SectionHeader
                        eyebrow="Conclusion"
                        title="From “Best Effort” to “Defined Failure”"
                        description="Without protocol-level drift control, agent systems operate on best effort."
                        align="center"
                    />
                    <div className="mt-8">
                        <p className="text-xl font-medium text-mplp-text mb-4">
                            &ldquo;You cannot fix drift by pleading with prompts.&rdquo;
                        </p>
                        <p className="text-mplp-text-muted">
                            MPLP reframes drift as a protocol-level event, enabling governed, auditable, and correctable agent behavior.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-4 md:grid-cols-3 text-left">
                        <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                            <h4 className="font-semibold text-mplp-text mb-1">Detectable</h4>
                            <p className="text-xs text-mplp-text-muted">Failure is visible</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                            <h4 className="font-semibold text-mplp-text mb-1">Classifiable</h4>
                            <p className="text-xs text-mplp-text-muted">Deviation is typed</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-950/50 border border-mplp-border">
                            <h4 className="font-semibold text-mplp-text mb-1">Structured</h4>
                            <p className="text-xs text-mplp-text-muted">Intervention is defined</p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/positioning/semantic-drift-control" />
            </ContentSection>
        </Shell>
    );
}
