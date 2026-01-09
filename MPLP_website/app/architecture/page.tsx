import type { Metadata } from "next";
import Link from "next/link";
import { StandardPage } from "@/components/layout/standard-page";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { InfoCard } from "@/components/ui/info-card";
import { duties } from "@/lib/content/duties";
import { IconArrowRight } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site-config";
import { PositioningDisclaimer } from "@/components/notices";
import { CanonicalReferences } from "@/components/ui/canonical-references";
import { NextSteps } from "@/components/ui/next-steps";
import { DOCS_URLS, REPO_URLS } from "@/lib/site-config";


export const metadata: Metadata = {
    title: "Architecture | MPLP — Multi-Agent Lifecycle Protocol",
    description: "Describes the layered architecture model of MPLP, including core semantics, coordination, execution, and integration boundaries. See docs for formal definitions.",
    alternates: {
        canonical: `${siteConfig.url}/architecture`,
    },
};

export default function ArchitecturePage() {
    // TechArticle schema for Architecture page (Breadcrumb auto-injected by component)
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Protocol Architecture | MPLP Standard",
        "about": "Layered architecture describing the MPLP protocol standard",
        "url": `${siteConfig.url}/architecture`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/architecture`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <StandardPage
            title="Protocol Architecture"
            subtitle="The MPLP specification describes a four-layer architecture model (L1–L4) that separates protocol semantics, coordination, execution, and integration concerns. See docs for formal definitions."
            kicker="Specification"
            breadcrumbs={[{ label: "Architecture", href: "/architecture" }]}
            jsonLd={techArticleSchema}
            beforeHeader={<PositioningDisclaimer />}
        >
            <ContentSection>
                <SectionHeader
                    eyebrow="Protocol Topology"
                    title="The 4-Layer Model"
                    description="A layered separation of protocol semantics, governance, execution, and integration."
                />

                <div className="mt-16 grid gap-6 lg:grid-cols-2">
                    {/* Layer 1 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-blue-soft/5 text-mplp-blue-soft font-bold text-xl border border-mplp-blue-soft/10">L1</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Core Protocol</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Semantic Foundation (Normative)</p>
                            </div>
                        </div>
                        <p className="text-xs text-mplp-text-muted/90 leading-relaxed">
                            Defines stable protocol semantics and canonical data structures. L1 is the normative foundation of MPLP (schemas, invariants, and lifecycle primitives) and is independent of any execution environment.
                        </p>
                        <div className="mt-6 pt-6 border-t border-mplp-border/30">
                            <p className="text-[10px] text-mplp-text-muted/60 font-mono uppercase tracking-widest">
                                Versioned & Governed · RFC Required
                            </p>
                        </div>
                    </div>

                    {/* Layer 2 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-indigo/5 text-mplp-indigo font-bold text-xl border border-mplp-indigo/10">L2</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Coordination</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Rules Layer (Normative)</p>
                            </div>
                        </div>
                        <p className="text-xs text-mplp-text-muted/90 leading-relaxed">
                            Defines coordination and governance semantics for multi-agent execution. L2 constrains how agents collaborate, confirm actions, record structured traces, and comply with protocol-level duties.
                        </p>
                        <div className="mt-6 pt-6 border-t border-mplp-border/30">
                            <p className="text-[10px] text-mplp-text-muted/60 font-mono uppercase tracking-widest">
                                Composable Modules · Duty Enforced
                            </p>
                        </div>
                    </div>

                    {/* Layer 3 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-emerald/5 text-mplp-emerald font-bold text-xl border border-mplp-emerald/10">L3</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Execution Runtime</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Behavioral Layer (Non-Prescriptive)</p>
                            </div>
                        </div>
                        <p className="text-xs text-mplp-text-muted/90 leading-relaxed">
                            Defines how MPLP semantics are realized during execution. L3 covers runtime concerns such as AEL loops, VSL logic, and the Project Semantic Graph (PSG) to keep long-running behavior governable and replayable.
                        </p>
                        <div className="mt-6 pt-6 border-t border-mplp-border/30">
                            <p className="text-[10px] text-mplp-text-muted/60 font-mono uppercase tracking-widest">
                                Implementation Agnostic · Contract Driven
                            </p>
                        </div>
                    </div>

                    {/* Layer 4 */}
                    <div className="mplp-card bg-slate-950/40 p-8">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mplp-warning/5 text-mplp-warning font-bold text-xl border border-mplp-warning/10">L4</div>
                            <div>
                                <h3 className="text-sm font-bold text-mplp-text uppercase tracking-wider">Integration Layer</h3>
                                <p className="text-[10px] font-bold text-mplp-text-muted uppercase tracking-[0.2em] mt-1">Boundary Layer (Optional)</p>
                            </div>
                        </div>
                        <p className="text-xs text-mplp-text-muted/90 leading-relaxed">
                            Defines integration boundaries between MPLP and external systems (models, tools, APIs, infrastructure). L4 ensures integrations do not leak external concerns into the core protocol, and remain governed objects.
                        </p>
                        <div className="mt-6 pt-6 border-t border-mplp-border/30">
                            <p className="text-[10px] text-mplp-text-muted/60 font-mono uppercase tracking-widest">
                                External Boundaries · Governed I/O
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            <ContentSection>
                <SectionHeader
                    align="center"
                    eyebrow="Cross-Cutting"
                    title="Cross-Cutting Duties"
                    description="Protocol-level responsibilities that apply across L1–L3 (and constrain L4 integrations), ensuring observability, safety, and consistency throughout the execution lifecycle."
                />

                <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-3">
                    {duties.map((duty) => (
                        <InfoCard key={duty.id} title={`${duty.title}`}>
                            {duty.detail}
                        </InfoCard>
                    ))}
                </div>
            </ContentSection>

            {/* Next Steps */}
            <div className="py-16">
                <div className="flex flex-col items-center gap-6">
                    <Link
                        href="/modules"
                        className="flex items-center gap-3 text-mplp-text-muted hover:text-mplp-blue-light transition-colors"
                    >
                        <IconArrowRight className="h-5 w-5 text-mplp-blue-soft" />
                        See protocol modules
                    </Link>

                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/governance/agentos-protocol"
                            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-mplp-blue-soft/15 text-mplp-blue-soft border border-mplp-blue-soft/30 hover:bg-mplp-blue-soft/20 transition-colors"
                        >
                            Agent OS Protocol →
                        </Link>
                        <Link
                            href="/governance/governed-stack"
                            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-slate-950/50 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                        >
                            Governed Stack →
                        </Link>
                        <Link
                            href="/governance/evidence-chain"
                            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold bg-slate-950/50 text-mplp-text border border-mplp-border hover:border-mplp-blue-soft/30 transition-colors"
                        >
                            Evidence Chain →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Authority Chain */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <CanonicalReferences
                        docsKey="architecture"
                        repoKey="schemas"
                        variant="full"
                    />

                    <NextSteps
                        docsKey="architecture"
                        repoKey="schemas"
                        evidenceKey="goldenFlows"
                    />
                </div>
            </ContentSection>
        </StandardPage>
    );
}
