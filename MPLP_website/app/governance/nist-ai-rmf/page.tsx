import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { GovernanceNav } from "@/components/governance/governance-nav";

export const metadata: Metadata = {
    title: "NIST AI RMF Alignment | MPLP Protocol",
    description: "Reference mapping between NIST AI Risk Management Framework functions and MPLP protocol modules. MPLP is not reviewed or validated by NIST.",
    alternates: {
        canonical: `${siteConfig.url}/governance/nist-ai-rmf`,
    },
};

export default function NistAiRmfPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "NIST AI RMF Alignment Reference",
        "about": "MPLP protocol alignment with NIST AI Risk Management Framework",
        "url": `${siteConfig.url}/governance/nist-ai-rmf`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/nist-ai-rmf`
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
                    { label: "NIST AI RMF", href: "/governance/nist-ai-rmf" }
                ]} />
            </div>
            <PageHeader
                title="NIST AI RMF Alignment"
                subtitle="A reference mapping between NIST AI Risk Management Framework functions and MPLP protocol mechanisms."
                kicker="Standards Alignment"
            />

            {/* Usage Boundary (Informative) - C4-1 */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">
                            Usage Boundary
                        </h3>
                        <p className="text-sm text-mplp-text-muted leading-relaxed">
                            This page presents an <strong>informative reference mapping</strong> between MPLP protocol
                            modules and the NIST AI Risk Management Framework (AI RMF).
                            {/* TERM-WAIVER: External standard context - regulatory compliance */}
                            It does <strong>not</strong> assert conformity, certification, or regulatory compliance.
                        </p>
                        <p className="mt-3 text-sm text-mplp-text-muted leading-relaxed">
                            MPLP provides <strong>structural governance primitives</strong> that organizations
                            may use as part of their internal risk management practices.
                            All risk determinations, controls, and disclosures remain the responsibility of
                            the adopting organization.
                        </p>
                        <p className="mt-3 text-sm text-mplp-text-muted leading-relaxed">
                            This reference follows the <Link href="/standards/positioning" className="text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">MPLP Standards Compatibility & Mapping Policy</Link>.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Disclaimer - CRITICAL */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border-2 border-mplp-warning/50 bg-mplp-warning/5 p-8">
                        <h2 className="text-xl font-bold text-mplp-warning mb-4">Important Disclaimer</h2>
                        <div className="space-y-4 text-mplp-text-muted">
                            <p>
                                <strong className="text-mplp-text">This document is NOT an endorsement, certification, or validation by NIST.</strong>
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>MPLP is not reviewed, endorsed, or validated by the National Institute of Standards and Technology (NIST).</li>
                                <li>This alignment mapping is provided for <strong>informational purposes only</strong>.</li>
                                <li>Organizations implementing the AI RMF should conduct their own assessment of applicable controls.</li>
                                <li>Use of MPLP does not guarantee or imply alignment with NIST AI RMF.</li>
                            </ul>
                            <p className="pt-4 border-t border-mplp-warning/30">
                                The mapping below illustrates how MPLP protocol mechanisms <strong>may support</strong> organizations in addressing certain AI RMF functions.
                                It is the responsibility of each organization to assess applicability to their specific context.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* NIST AI RMF Overview */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Framework Overview"
                    title="NIST AI RMF: Four Core Functions"
                    description="The AI Risk Management Framework defines four high-level functions for managing AI risks."
                    align="center"
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="mplp-card p-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-mplp-blue-soft/10 text-mplp-blue-soft font-bold text-2xl">G</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">GOVERN</h3>
                        <p className="text-sm text-mplp-text-muted">Cultivate a culture of risk management; establish governance structures.</p>
                    </div>
                    <div className="mplp-card p-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-mplp-indigo/10 text-mplp-indigo font-bold text-2xl">M</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">MAP</h3>
                        <p className="text-sm text-mplp-text-muted">Context and scope; understand risks in system design.</p>
                    </div>
                    <div className="mplp-card p-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-mplp-emerald/10 text-mplp-emerald font-bold text-2xl">M</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">MEASURE</h3>
                        <p className="text-sm text-mplp-text-muted">Assess, analyze, and track AI risks and impacts.</p>
                    </div>
                    <div className="mplp-card p-6 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-mplp-warning/10 text-mplp-warning font-bold text-2xl">M</div>
                        <h3 className="text-lg font-bold text-mplp-text mb-2">MANAGE</h3>
                        <p className="text-sm text-mplp-text-muted">Allocate resources; prioritize and respond to risks.</p>
                    </div>
                </div>
            </ContentSection>

            {/* Function → MPLP Mapping */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Reference Mapping"
                    title="AI RMF Functions → MPLP Modules"
                    description="Illustrative mapping between framework functions and protocol mechanisms. This is not an exhaustive mapping."
                    align="center"
                />
                <div className="mt-12 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-mplp-border bg-slate-900/50">
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">AI RMF Function</th>
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">Key Objectives</th>
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">MPLP Modules & Mechanisms</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mplp-border text-sm">
                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4">
                                    <span className="font-semibold text-mplp-blue-soft">GOVERN</span>
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Policies, accountability, organizational culture
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    <strong className="text-mplp-text">Role Module</strong> (authority boundaries),
                                    <strong className="text-mplp-text"> Context Module</strong> (governance constraints),
                                    RFC governance process
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4">
                                    <span className="font-semibold text-mplp-indigo">MAP</span>
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    System context, stakeholders, risk identification
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    <strong className="text-mplp-text">Context Module</strong> (scope definition),
                                    <strong className="text-mplp-text"> Plan Module</strong> (intent declaration),
                                    Role + Context constraints
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4">
                                    <span className="font-semibold text-mplp-emerald">MEASURE</span>
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Testing, evaluation, metrics, monitoring
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    <strong className="text-mplp-text">Trace Module</strong> (observable events),
                                    <strong className="text-mplp-text"> Golden Flows</strong> (reference test suites),
                                    Structured audit trails
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4">
                                    <span className="font-semibold text-mplp-warning">MANAGE</span>
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Risk response, mitigation, continuous improvement
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    <strong className="text-mplp-text">Confirm Module</strong> (authorization gates),
                                    <strong className="text-mplp-text"> Evidence Chain</strong> (accountability),
                                    Version governance
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ContentSection>

            {/* Final Note */}
            <ContentSection background="surface">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-mplp-text-muted">
                        For authoritative information on the NIST AI Risk Management Framework, refer to the official NIST publication.
                    </p>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/nist-ai-rmf" />
            </ContentSection>

            {/* Enterprise Evaluation Path (C4-2) */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-mplp-text mb-3">Enterprise Evaluation Path</h2>
                    <p className="text-mplp-text-muted mb-8">
                        Use this standards mapping as an input to your internal review. MPLP provides reference mappings and
                        verifiable governance semantics—without certifications or endorsements.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/enterprise" variant="primary" size="lg">
                            Enterprise Evaluation Guide
                        </Button>
                        <Button href="/governance/overview" variant="secondary" size="lg">
                            Governance Overview
                        </Button>
                        <Button href="/conformance" variant="secondary" size="lg">
                            Conformance Framework
                        </Button>
                    </div>

                    <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
                        <Link href="/golden-flows" className="text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            Golden Flows →
                        </Link>
                        <Link href="/adoption" className="text-mplp-text-muted hover:text-mplp-blue-soft transition-colors">
                            Adoption Signals →
                        </Link>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
