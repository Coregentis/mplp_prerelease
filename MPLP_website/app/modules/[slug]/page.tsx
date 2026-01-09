import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { modules } from "@/lib/content/modules";
import { getModuleDocUrl, siteConfig } from "@/lib/site-config";
import { notFound } from "next/navigation";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Metadata } from "next";
import { ModuleIcons, ModuleGradients, IconArrowRight } from "@/components/ui/icons";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";

export function generateStaticParams() {
    return modules.map((module) => ({
        slug: module.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const moduleData = modules.find((m) => m.id === slug);

    if (!moduleData) {
        return {};
    }

    // C-level modules get simpler title without "Specification"
    const title = moduleData.seoTier === "C"
        ? `${moduleData.name} | MPLP Protocol`
        : `${moduleData.name} | MPLP Protocol Specification`;

    return {
        title,
        description: moduleData.metaDescription || moduleData.desc,
        alternates: {
            canonical: `${siteConfig.url}/modules/${slug}`,
        },
    };
}


export default async function ModuleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const moduleData = modules.find((m) => m.id === slug);

    if (!moduleData) {
        notFound();
        return null;
    }

    const Icon = ModuleIcons[moduleData.id];
    const gradient = ModuleGradients[moduleData.id];

    // TechArticle JSON-LD (A-level modules only)
    const techArticleSchema = moduleData.seoTier === "A" ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": `${moduleData.name} Specification`,
        "about": "MPLP Protocol Module Specification",
        "url": `${siteConfig.url}/modules/${moduleData.id}`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/modules/${moduleData.id}`
        },
        "articleSection": "Modules",
        "isPartOf": [
            { "@id": `${siteConfig.url}#website` },
            {
                "@type": "CollectionPage",
                "@id": `${siteConfig.url}/modules`,
                "name": "MPLP Protocol Modules",
                "url": `${siteConfig.url}/modules`
            }
        ],
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    } : null;

    return (
        <Shell>
            {techArticleSchema && <JsonLd data={techArticleSchema} />}
            <ScrollReveal animation="fade-in">
                <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <Breadcrumb items={[
                        { label: "Modules", href: "/modules" },
                        { label: moduleData.name, href: `/modules/${moduleData.id}` }
                    ]} />
                </div>
                <PageHeader
                    title={moduleData.name}
                    subtitle={moduleData.purpose}
                    kicker={`Module: ${moduleData.id}`}
                >
                    <div className="flex items-center gap-4 mt-6">
                        <span className="inline-flex items-center rounded-full border border-mplp-emerald/20 bg-mplp-emerald/10 px-3 py-1 text-sm font-medium text-mplp-emerald">
                            Status: {moduleData.status}
                        </span>
                        <div className="p-2 rounded-xl bg-mplp-dark-soft border border-mplp-border">
                            {Icon && <Icon className="h-10 w-10" style={{ stroke: `url(#${gradient})`, filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.1))' }} />}
                        </div>
                    </div>
                </PageHeader>
            </ScrollReveal>

            {/* Usage Boundary (Informative) */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                        <p className="text-sm text-mplp-text-muted">
                            <strong className="text-mplp-text">Usage Boundary:</strong> This page provides an evaluative summary and a canonical schema excerpt for convenience.
                            The authoritative, versioned specification remains on docs.mplp.io. MPGC does not issue certifications, badges, or endorsements;
                            adoption and conformance are self-assessed by the adopting organization.
                        </p>
                    </div>
                </div>
            </ContentSection>

            <ContentSection className="pt-8 sm:pt-12">
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Protocol Role Section */}
                        {moduleData.protocolRole && (
                            <ScrollReveal delay={100}>
                                <SectionHeader
                                    eyebrow="Definition"
                                    title="Protocol Role"
                                    description="The normative responsibility of this module."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none">
                                    <MDXRemote source={moduleData.protocolRole} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Purpose & Scope Section (C-Level modules) */}
                        {moduleData.purposeAndScope && (
                            <ScrollReveal delay={100}>
                                <SectionHeader
                                    eyebrow="Definition"
                                    title="Purpose & Scope"
                                    description="What this module exists for."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none">
                                    <MDXRemote source={moduleData.purposeAndScope} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Non-Goals Section (C-Level modules) */}
                        {moduleData.nonGoals && (
                            <ScrollReveal delay={110}>
                                <SectionHeader
                                    eyebrow="Boundary"
                                    title="Non-Goals"
                                    description="What this module is NOT."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                                    <MDXRemote source={moduleData.nonGoals} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Interaction Model Section */}
                        {moduleData.interactionModel && (
                            <ScrollReveal delay={150}>
                                <SectionHeader
                                    eyebrow="Architecture"
                                    title="Interaction Model"
                                    description="Dependencies and event emissions."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none">
                                    <MDXRemote source={moduleData.interactionModel} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Normative Constraints Section */}
                        {moduleData.normativeConstraints && (
                            <ScrollReveal delay={200}>
                                <SectionHeader
                                    eyebrow="Conformance"
                                    title="Normative Constraints"
                                    description="MUST / SHOULD / MUST NOT requirements."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none p-6 rounded-xl border border-mplp-border bg-slate-950/30">
                                    <MDXRemote source={moduleData.normativeConstraints} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Key Constraints Section (B-Level modules) */}
                        {moduleData.keyConstraints && (
                            <ScrollReveal delay={210}>
                                <SectionHeader
                                    eyebrow="Conformance"
                                    title="Key Constraints"
                                    description="Essential requirements for this module."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none p-6 rounded-xl border border-mplp-border bg-slate-950/30">
                                    <MDXRemote source={moduleData.keyConstraints} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Invariants Section (Context-specific) */}
                        {moduleData.invariants && (
                            <ScrollReveal delay={220}>
                                <SectionHeader
                                    eyebrow="Stability"
                                    title="Context Invariants"
                                    description="Stability guarantees that define the module."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none p-6 rounded-xl border border-mplp-border bg-slate-950/30">
                                    <MDXRemote source={moduleData.invariants} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Failure Semantics Section (Context-specific) */}
                        {moduleData.failureSemantics && (
                            <ScrollReveal delay={230}>
                                <SectionHeader
                                    eyebrow="Error Handling"
                                    title="Failure Semantics"
                                    description="What happens when constraints are violated."
                                />
                                <div className="mt-6 prose prose-invert prose-mplp max-w-none p-4 rounded-xl border border-mplp-error/30 bg-mplp-error/5">
                                    <MDXRemote source={moduleData.failureSemantics} />
                                </div>
                            </ScrollReveal>
                        )}

                        {/* Schema Section */}
                        <ScrollReveal delay={250}>
                            <SectionHeader
                                eyebrow="Specification"
                                title="Canonical Schema"
                                description="The normative JSON structure for this module."
                            />
                            <div className="mt-6 rounded-xl border border-mplp-border bg-slate-950 p-6 overflow-hidden">
                                <pre className="text-sm text-mplp-text-muted font-mono overflow-x-auto">
                                    {JSON.stringify(moduleData.schema, null, 2)}
                                </pre>
                            </div>
                        </ScrollReveal>

                        {/* Lifecycle Section */}
                        <ScrollReveal delay={200}>
                            <SectionHeader
                                eyebrow="Behavior"
                                title="Lifecycle"
                                description="Valid states and transitions."
                            />
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="p-6 rounded-xl border border-mplp-border bg-slate-950/50">
                                    <h4 className="font-semibold text-mplp-text mb-4">Status Enum</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {moduleData.lifecycle.statusEnum.map((status: string) => (
                                            <span key={status} className="px-2 py-1 rounded bg-slate-900 border border-mplp-border text-xs text-mplp-blue-soft font-mono">
                                                {status}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {moduleData.lifecycle.semantics && (
                                    <div className="p-6 rounded-xl border border-mplp-border bg-slate-950/50">
                                        <h4 className="font-semibold text-mplp-text mb-2">Semantics</h4>
                                        <p className="text-sm text-mplp-text-muted">{moduleData.lifecycle.semantics}</p>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <ScrollReveal delay={300} className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                            <h3 className="font-semibold text-mplp-text mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <Button variant="secondary" className="w-full justify-start" href={getModuleDocUrl(moduleData.id)} external>
                                    View Full Spec
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" href="/modules">
                                    ← Back to Modules
                                </Button>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </ContentSection>

            {/* Enterprise Evaluation Path (Close the loop) */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <div className="mplp-card p-6">
                        <div className="flex items-center justify-between gap-6 flex-wrap">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-mplp-text-muted mb-2">
                                    Evaluation Path
                                </p>
                                <p className="text-sm text-mplp-text-muted">
                                    Governance → Conformance → Golden Flows → Adoption Signals
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/enterprise"
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-mplp-blue-soft/15 text-mplp-blue-soft border border-mplp-blue-soft/30 hover:bg-mplp-blue-soft/20 transition-colors"
                                >
                                    Enterprise Guide <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/governance/overview"
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-slate-950/40 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                                >
                                    Governance <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/conformance"
                                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold bg-slate-950/40 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                                >
                                    Conformance <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/golden-flows" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors inline-flex items-center gap-2">
                                    Golden Flows <IconArrowRight className="h-4 w-4" />
                                </Link>
                                <Link href="/adoption" className="text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors inline-flex items-center gap-2">
                                    Adoption <IconArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
