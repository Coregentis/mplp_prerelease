import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, REPO_URLS } from "@/lib/site-config";
import Link from "next/link";
import { GovernanceNav } from "@/components/governance/governance-nav";

export const metadata: Metadata = {
    title: "Governance | MPLP Protocol Specification",
    description: "The normative governance model for MPLP protocol evolution, including RFC process, versioning rules, and stability policy.",
    alternates: {
        canonical: `${siteConfig.url}/governance`,
    },
};

const governancePages = [
    {
        title: "Overview",
        href: "/governance/overview",
        description: "What MPLP governs, what it doesn&apos;t, and how the protocol evolves.",
        color: "bg-mplp-blue-soft/10 text-mplp-blue-soft border-mplp-blue-soft/30",
    },
    {
        title: "Agent OS Protocol",
        href: "/governance/agentos-protocol",
        description: "Protocol-level OS definition: governs, not executes.",
        color: "bg-mplp-indigo/10 text-mplp-indigo border-mplp-indigo/30",
    },
    {
        title: "Evidence Chain",
        href: "/governance/evidence-chain",
        description: "Plan → Confirm → Trace: the governance triad for auditability.",
        color: "bg-mplp-emerald/10 text-mplp-emerald border-mplp-emerald/30",
    },
    {
        title: "Governed Stack",
        href: "/governance/governed-stack",
        description: "How MPLP governs and relates to LangGraph, MCP, Operator, and agent specifications.",
        color: "bg-mplp-cyan/10 text-mplp-cyan border-mplp-cyan/30",
    },
    {
        title: "ISO/IEC 42001",
        href: "/governance/iso-iec-42001",
        description: "Alignment reference with ISO AI management system objectives.",
        color: "bg-mplp-warning/10 text-mplp-warning border-mplp-warning/30",
    },
    {
        title: "NIST AI RMF",
        href: "/governance/nist-ai-rmf",
        description: "Mapping to NIST AI Risk Management Framework functions.",
        color: "bg-mplp-error/10 text-mplp-error border-mplp-error/30",
    },
];

export default function GovernancePage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Protocol Governance",
        "about": "Protocol governance model and RFC process",
        "url": `${siteConfig.url}/governance`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[{ label: "Governance", href: "/governance" }]} />
            </div>
            <PageHeader
                title="Governance"
                subtitle="MPLP is an open standard. Its evolution is governed by a normative RFC process, transparent versioning rules, and a commitment to stability."
                kicker="Protocol"
            />

            {/* Governance Navigation Cards */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Governance Framework"
                    title="Explore MPLP Governance"
                    description="Understand MPLP&apos;s governance stance, how it positions within the agent ecosystem, and how it aligns with international standards."
                    align="center"
                />
                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {governancePages.map((page) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="mplp-card group relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-glow-hover block"
                        >
                            <div className={`absolute top-0 left-0 w-1 h-full ${page.color.split(' ')[0]}`} />
                            <h3 className="text-xl font-bold text-mplp-text mb-2 group-hover:text-mplp-blue-light transition-colors">
                                {page.title}
                            </h3>
                            <p className="text-sm text-mplp-text-muted leading-relaxed">
                                {page.description}
                            </p>
                            <div className="mt-4 text-sm font-medium text-mplp-blue-soft group-hover:text-mplp-blue-light transition-colors">
                                Learn more →
                            </div>
                        </Link>
                    ))}
                </div>
            </ContentSection>

            {/* RFC Process Summary */}
            <ContentSection background="surface">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div>
                        <SectionHeader
                            eyebrow="Process"
                            title="How We Evolve"
                            description="Changes to the protocol follow a strict Request for Comments (RFC) process. Anyone can propose a change, but it must pass through stages of review before adoption."
                        />
                        <div className="mt-8 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-blue-soft/10 text-mplp-blue-soft border border-mplp-blue-soft/20 font-bold">1</div>
                                <div>
                                    <h4 className="font-semibold text-mplp-text">Draft</h4>
                                    <p className="text-sm text-mplp-text-muted">Initial proposal. Open for discussion and feedback.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-warning/10 text-mplp-warning border border-mplp-warning/20 font-bold">2</div>
                                <div>
                                    <h4 className="font-semibold text-mplp-text">Review</h4>
                                    <p className="text-sm text-mplp-text-muted">Formal review by core maintainers. Normative changes are refined.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-emerald/10 text-mplp-emerald border border-mplp-emerald/20 font-bold">3</div>
                                <div>
                                    <h4 className="font-semibold text-mplp-text">Frozen</h4>
                                    <p className="text-sm text-mplp-text-muted">Spec is locked. No breaking changes allowed without a major version bump.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button href={`${REPO_URLS.root}/issues`} external>View Active RFCs</Button>
                            <Button href="/governance/overview" variant="secondary">Read Full Overview →</Button>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-mplp-border bg-slate-950/50 p-8">
                        <h3 className="text-xl font-bold text-mplp-text mb-6">Protocol Status</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-mplp-border bg-slate-900/30">
                                <span className="h-2.5 w-2.5 rounded-full bg-mplp-emerald animate-pulse" />
                                <div>
                                    <p className="font-semibold text-mplp-text">v1.0.0 — Protocol Frozen</p>
                                    <p className="text-sm text-mplp-text-muted">Core Spec, Python SDK, TypeScript SDK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance" />
            </ContentSection>
        </Shell>
    );
}
