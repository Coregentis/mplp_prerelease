import React from "react";
import { StandardPage } from "@/components/layout/standard-page";
import { ContentSection } from "@/components/ui/content-section";
import { modules } from "@/lib/content/modules";
import Link from "next/link";
import type { Metadata } from "next";
import { ModuleIcons, ModuleGradients, IconArrowRight } from "@/components/ui/icons";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { CanonicalReferences } from "@/components/ui/canonical-references";
import { NextSteps } from "@/components/ui/next-steps";

export const metadata: Metadata = {
    title: "Protocol Modules | MPLP Standard",
    description: "The ten normative modules that define the MPLP protocol standard, covering execution semantics, governance, extensibility, and protocol boundaries.",
    alternates: {
        canonical: `${siteConfig.url}/modules`,
    },
};

export default function ModulesPage() {
    // CollectionPage JSON-LD with all 10 modules in hasPart
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Protocol Modules",
        "description": "The ten normative modules that define the MPLP protocol standard.",
        "about": "Normative modules defining the MPLP protocol standard",
        "url": `${siteConfig.url}/modules`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/modules`
        },
        "articleSection": "Modules",
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` },
        "hasPart": modules.map(m => ({
            "@type": "WebPage",
            "@id": `${siteConfig.url}/modules/${m.id}`,
            "name": `${m.name} Module`,
            "url": `${siteConfig.url}/modules/${m.id}`
        }))
    };

    return (
        <StandardPage
            title="Protocol Modules"
            subtitle="The 10 normative modules that define the MPLP standard. While all modules are normative, some define core execution semantics, others provide governance, extension, or protocol boundaries."
            kicker="Components"
            breadcrumbs={[{ label: "Modules", href: "/modules" }]}
            jsonLd={collectionSchema}
        >
            {/* Usage Boundary (Informative) */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                        <p className="text-sm text-mplp-text-muted">
                            <strong className="text-mplp-text">Usage Boundary:</strong> This page is an informative index for evaluation and navigation.
                            It is not a replacement for the Official documentation entry (v1.0 Frozen) on docs.mplp.io, and it does not constitute endorsement,
                            certification, or implementation guarantees by MPGC.
                        </p>
                    </div>
                </div>
            </ContentSection>

            <ContentSection>
                <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
                    {modules.map((module) => {
                        const Icon = ModuleIcons[module.id];
                        const gradient = ModuleGradients[module.id];

                        return (
                            <Link key={module.id} href={`/modules/${module.id}`} className="group block h-full">
                                <div className="h-full rounded-2xl border border-mplp-border bg-slate-950/50 p-4 sm:p-6 transition-all hover:border-mplp-blue-soft/30 hover:bg-slate-900/50 hover:shadow-glow-hover hover:-translate-y-1">
                                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                                        <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-mplp-dark-soft border border-mplp-border group-hover:border-mplp-blue-soft/30 transition-colors">
                                            {Icon && <Icon className="h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" style={{ stroke: `url(#${gradient})`, filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.1))' }} />}
                                        </div>
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-medium border ${module.status === 'Frozen'
                                            ? 'bg-mplp-emerald/10 text-mplp-emerald border-mplp-emerald/20'
                                            : 'bg-mplp-warning/10 text-mplp-warning border-mplp-warning/20'
                                            }`}>
                                            {module.status}
                                        </span>
                                    </div>
                                    <h3 className="text-base sm:text-xl font-bold text-mplp-text mb-1 sm:mb-2 group-hover:text-mplp-blue-soft transition-colors">
                                        {module.name}
                                    </h3>
                                    <p className="text-mplp-text-muted text-xs sm:text-sm leading-relaxed">
                                        {module.desc}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
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

            {/* Authority Chain */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <CanonicalReferences
                        docsKey="home"
                        repoKey="schemas"
                        variant="full"
                    />

                    <NextSteps
                        docsKey="home"
                        repoKey="schemas"
                        evidenceKey="goldenFlows"
                    />
                </div>
            </ContentSection>
        </StandardPage>
    );
}
