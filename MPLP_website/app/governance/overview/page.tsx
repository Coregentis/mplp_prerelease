import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { GovernanceNav } from "@/components/governance/governance-nav";
import Link from "next/link";
import { CanonicalReferences } from "@/components/ui/canonical-references";
import { NextSteps } from "@/components/ui/next-steps";
import { InvariantHighlight, ScopeBracket, NonGoalBracket } from "@/components/ui/callout";

export const metadata: Metadata = {
    title: "Governance Overview | MPLP Protocol",
    description: "MPLP governance stance: what we govern, what we don&apos;t govern, and how the protocol evolves through the RFC process.",
    alternates: {
        canonical: `${siteConfig.url}/governance/overview`,
    },
};

export default function GovernanceOverviewPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "MPLP Protocol Governance Overview",
        "about": "Protocol governance stance and RFC process",
        "url": `${siteConfig.url}/governance/overview`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/overview`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` }
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />
            <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={[
                    { label: "Governance", href: "/governance" },
                    { label: "Overview", href: "/governance/overview" }
                ]} />
            </div>
            <PageHeader
                title="Governance Overview"
                subtitle="MPLP is an open standard. Its evolution is governed by a normative RFC process, transparent versioning rules, and a commitment to stability."
                kicker="Governance Stance"
            />

            {/* Scope Boundary: Side-by-Side Comparison */}
            <ContentSection className="py-8 sm:py-12">
                <SectionHeader
                    eyebrow="Bounds"
                    title="Scope Boundary"
                    description="MPLP defines lifecycle semantics for interoperability while maintaining strict neutrality towards implementation details."
                    align="center"
                    className="mb-12"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    {/* In Scope */}
                    <div className="space-y-6">
                        <ScopeBracket title="What MPLP Governs" className="mb-0">
                            Lifecycle semantics that implementations adopt to achieve interoperable, observable agent behavior.
                        </ScopeBracket>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "Agent Lifecycle", desc: "Initialization, plan creation, and trace recording.", icon: "✓" },
                                { title: "Governance Semantics", desc: "Permission boundaries and coordination rules.", icon: "✓" },
                                { title: "Observability", desc: "Audit trails and lifecycle state transitions.", icon: "✓" },
                                { title: "Interoperability", desc: "Vendor-neutral coordination schemas.", icon: "✓" },
                            ].map((item) => (
                                <div key={item.title} className="mplp-card bg-slate-950/40 p-5 group hover:border-mplp-emerald/30 transition-colors">
                                    <h3 className="text-[11px] font-bold text-mplp-text uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <span className="text-mplp-emerald">{item.icon}</span> {item.title}
                                    </h3>
                                    <p className="text-[10px] leading-relaxed text-mplp-text-muted/80">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Out of Scope */}
                    <div className="space-y-6">
                        <NonGoalBracket title="What MPLP Does NOT Govern" className="mb-0">
                            MPLP is a protocol, not a framework. It defines governance boundaries, not implementation details.
                        </NonGoalBracket>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {[
                                { title: "Model Training", desc: "How LLMs are trained or fine-tuned.", icon: "✗", color: "text-mplp-error" },
                                { title: "Certification", desc: "MPLP does not issue certification badges.", icon: "✗", color: "text-mplp-error" },
                                { title: "Prompt Engineering", desc: "Internal prompt structures or optimization.", icon: "✗", color: "text-mplp-error" },
                                { title: "Runtime Execution", desc: "Governs semantics; runtimes execute code.", icon: "✗", color: "text-mplp-error" },
                            ].map((item) => (
                                <div key={item.title} className="mplp-card bg-slate-950/40 p-5 group hover:border-mplp-error/30 transition-colors">
                                    <h3 className="text-[11px] font-bold text-mplp-text uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <span className={item.color}>{item.icon}</span> {item.title}
                                    </h3>
                                    <p className="text-[10px] leading-relaxed text-mplp-text-muted/80">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* RFC Process */}
            <ContentSection className="py-8 sm:py-12">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <div className="space-y-12">
                        <div>
                            <SectionHeader
                                eyebrow="Process"
                                title="How We Evolve"
                                description="Changes to the protocol follow a strict Request for Comments (RFC) process. Anyone can propose a change, but it must pass through stages of review before adoption."
                            />

                            {/* RFC Steps - Enhanced Visuals */}
                            <div className="mt-8 relative">
                                {/* Connecting Line */}
                                <div className="absolute top-5 left-5 bottom-5 w-px bg-gradient-to-b from-mplp-blue-soft/20 via-mplp-blue-soft/10 to-transparent -z-10" />

                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-bg text-mplp-blue-soft border border-mplp-blue-soft/30 font-bold shadow-sm group-hover:bg-mplp-blue-soft group-hover:text-white transition-all duration-300">1</div>
                                        <div className="pt-2">
                                            <h4 className="font-bold text-mplp-text group-hover:text-mplp-blue-light transition-colors">Draft</h4>
                                            <p className="text-sm text-mplp-text-muted mt-1 leading-relaxed">Initial proposal (RFC). Open for community discussion, feedback, and red-lining.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-bg text-mplp-warning border border-mplp-warning/30 font-bold shadow-sm group-hover:bg-mplp-warning group-hover:text-white transition-all duration-300">2</div>
                                        <div className="pt-2">
                                            <h4 className="font-bold text-mplp-text group-hover:text-mplp-warning transition-colors">Review</h4>
                                            <p className="text-sm text-mplp-text-muted mt-1 leading-relaxed">Formal review by core maintainers. Normative changes are mutually agreed upon and refined.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mplp-bg text-mplp-emerald border border-mplp-emerald/30 font-bold shadow-sm group-hover:bg-mplp-emerald group-hover:text-white transition-all duration-300">3</div>
                                        <div className="pt-2">
                                            <h4 className="font-bold text-mplp-text group-hover:text-mplp-emerald transition-colors">Frozen</h4>
                                            <p className="text-sm text-mplp-text-muted mt-1 leading-relaxed">Spec is locked and versioned. No breaking changes allowed without a major version bump.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pl-16">
                                    <Button href={`${REPO_URLS.root}/issues`} variant="secondary" size="sm" external>View RFC Proposals</Button>
                                </div>
                            </div>
                        </div>

                        {/* Moved Evolution Policy Here for Balance */}
                        <div className="pt-10 border-t border-mplp-border/50">
                            <h4 className="text-sm font-bold text-mplp-text-muted uppercase tracking-wider mb-6">Versioning Rules</h4>
                            <InvariantHighlight title="Stability Invariant">
                                Breaking changes are strictly forbidden within the <code>v1.x</code> series. Any normative change that breaks backward compatibility with v1.0.0 implementations MUST be released as <code>v2.0.0</code>.
                            </InvariantHighlight>
                        </div>
                    </div>

                    {/* Protocol Status & Future Context */}
                    <div className="rounded-3xl border border-mplp-border bg-slate-950/50 p-8 h-full flex flex-col">
                        <h3 className="text-xl font-bold text-mplp-text mb-8">Protocol Status & Context</h3>

                        {/* Current Status */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-mplp-text-muted uppercase tracking-wider mb-3">Current Status</h4>
                            <div className="flex items-center gap-3 p-4 rounded-xl border border-mplp-emerald/30 bg-mplp-emerald/5">
                                <span className="h-2.5 w-2.5 rounded-full bg-mplp-emerald" />
                                <div>
                                    <p className="font-semibold text-mplp-text">v1.0.0 — Protocol Frozen</p>
                                    <p className="text-sm text-mplp-text-muted">Freeze date: 2025-12-03</p>
                                </div>
                            </div>
                        </div>



                        {/* Exploration Areas */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-mplp-text-muted uppercase tracking-wider mb-3">Exploration Areas (Non-Binding)</h4>
                            <div className="bg-mplp-blue-soft/5 border border-mplp-blue-soft/20 rounded-lg p-4 mb-4">
                                <p className="text-xs text-mplp-text-muted italic">
                                    The following areas are subjects of potential future exploration, subject to community interest and governance approval. No commitments are made.
                                </p>
                            </div>
                            <ul className="space-y-3 text-sm text-mplp-text-muted">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-blue-soft mt-0.5">→</span>
                                    <div>
                                        <span className="font-semibold text-mplp-text block">Multi-Agent Collaboration</span>
                                        <span className="text-xs opacity-80">Refining negotiation patterns and handoff protocols.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-blue-soft mt-0.5">→</span>
                                    <div>
                                        <span className="font-semibold text-mplp-text block">Learning & Optimization</span>
                                        <span className="text-xs opacity-80">Defining feedback loops and interaction surfaces.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-blue-soft mt-0.5">→</span>
                                    <div>
                                        <span className="font-semibold text-mplp-text block">Enterprise Extensions</span>
                                        <span className="text-xs opacity-80">Formalizing authority chains and auditability standards.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Related Pages */}
                        <div className="pt-4 border-t border-mplp-border flex flex-wrap gap-4 text-sm text-mplp-text-muted">
                            <Link href="/governance/evidence-chain" className="hover:text-mplp-blue-soft transition-colors">Evidence Chain →</Link>
                            <Link href="/conformance" className="hover:text-mplp-blue-soft transition-colors">Conformance Model →</Link>
                            <Link href="/golden-flows" className="hover:text-mplp-blue-soft transition-colors">Golden Flows →</Link>
                        </div>

                        {/* Positioning & Drift Control */}
                        <div className="pt-4 mt-4 border-t border-mplp-border">
                            <h4 className="text-sm font-semibold text-mplp-text-muted uppercase tracking-wider mb-3">Positioning & Drift Control</h4>
                            <div className="flex flex-wrap gap-4 text-sm text-mplp-text-muted">
                                <Link href="/governance/positioning/agentic-state-sovereignty" className="hover:text-mplp-blue-soft transition-colors">Agentic State Sovereignty →</Link>
                                <Link href="/governance/positioning/semantic-drift-control" className="hover:text-mplp-blue-soft transition-colors">Semantic Drift Control →</Link>
                            </div>
                        </div>

                        {/* Governance Evidence */}
                        <div className="pt-4 mt-4 border-t border-mplp-border">
                            <h4 className="text-sm font-semibold text-mplp-text-muted uppercase tracking-wider mb-3">Governance Evidence</h4>
                            <p className="text-xs text-mplp-text-muted/80 mb-3">
                                Website governance artifacts, baselines, and CI evidence are maintained in the protocol repository.
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-mplp-text-muted">
                                <a href={REPO_URLS.governance} target="_blank" rel="noopener noreferrer" className="hover:text-mplp-blue-soft transition-colors">
                                    Governance Repository →
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/overview" />
            </ContentSection>

            {/* Authority Chain */}
            <ContentSection className="py-8 sm:py-12">
                <div className="max-w-4xl mx-auto">
                    <CanonicalReferences
                        docsKey="governance"
                        repoKey="governance"
                        variant="full"
                    />

                    <NextSteps
                        docsKey="governance"
                        repoKey="governance"
                        evidenceKey="goldenFlows"
                    />
                </div>
            </ContentSection>
        </Shell>
    );
}
