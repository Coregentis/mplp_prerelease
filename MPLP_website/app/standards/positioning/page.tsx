import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
    title: "Standards Compatibility & Mapping Policy | MPLP Protocol",
    description:
        "Defines how MPLP relates to external standards through mapping, compatibility, and protocol-level enablement. Informative only.",
    alternates: {
        canonical: `${siteConfig.url}/standards/positioning`,
    },
};

export default function StandardsPositioningPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Standards Compatibility & Mapping Policy",
        "about": "Protocol-level relationship between MPLP and external standards",
        "url": `${siteConfig.url}/standards/positioning`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/standards/positioning`
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
                    { label: "Standards Positioning", href: "/standards/positioning" }
                ]} />
            </div>
            <PageHeader
                title="Standards Compatibility & Mapping Policy"
                subtitle="Defines how MPLP relates to external standards, frameworks, and regulatory references. Informative only."
                kicker="Policy"
            />

            {/* Section 1: Purpose */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 1"
                        title="Purpose of This Page"
                        align="center"
                    />
                    <div className="mt-8 prose prose-invert max-w-none">
                        <p className="text-mplp-text-muted leading-relaxed">
                            This page defines how the <strong className="text-mplp-text">Multi-Agent Lifecycle Protocol (MPLP)</strong> relates to external standards, frameworks, and regulatory references.
                        </p>
                        <p className="text-mplp-text-muted leading-relaxed mt-4">
                            Its sole purpose is to <strong className="text-mplp-text">prevent misinterpretation</strong>.
                        </p>
                        <div className="mt-6 rounded-2xl border border-mplp-border bg-slate-950/50 p-6">
                            <p className="text-sm text-mplp-text-muted leading-relaxed">
                                {/* TERM-WAIVER: Negation context - explicitly stating what MPLP is NOT */}
                                <strong className="text-mplp-text">MPLP is not a compliance standard.</strong><br />
                                <strong className="text-mplp-text">MPLP does not issue certifications.</strong><br />
                                <strong className="text-mplp-text">MPLP does not replace external governance or regulatory regimes.</strong>
                            </p>
                        </div>
                        <p className="text-mplp-text-muted leading-relaxed mt-6">
                            Instead, MPLP defines <strong className="text-mplp-text">protocol-level lifecycle semantics and mechanisms</strong> that may be <em>mapped to</em>, <em>compatible with</em>, or <em>capable of supporting</em> requirements articulated by external standards.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Section 2: Core Positioning */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 2"
                        title="Core Positioning (Normative Statement)"
                        align="center"
                    />
                    <div className="mt-8">
                        <div className="rounded-2xl border-2 border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-8">
                            <p className="text-lg text-mplp-text font-medium text-center">
                                External standards define objectives and expectations.<br />
                                MPLP defines protocol-level capabilities and evidence structures.
                            </p>
                        </div>
                        <p className="text-mplp-text-muted leading-relaxed mt-6 text-center">
                            The relationship between MPLP and any external standard is therefore <strong className="text-mplp-text">semantic and technical</strong>, not legal or declarative.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Section 3: Relationship Types */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 3"
                        title="Relationship Types"
                        description="To avoid ambiguity, MPLP explicitly distinguishes three different relationship types. All references to standards throughout the MPLP website and documentation follow this classification."
                        align="center"
                    />

                    {/* 3.1 Mapping */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">3.1 Mapping (Conceptual Correspondence)</h3>
                        <div className="mplp-card p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Definition</p>
                            <p className="text-mplp-text italic">
                                Mapping describes a conceptual correspondence between the intent of an external standard and one or more mechanisms defined by MPLP.
                            </p>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Key Properties</p>
                            <ul className="space-y-2 text-mplp-text-muted text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    <span>Mapping is <strong className="text-mplp-text">not 1:1</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    <span>Mapping is <strong className="text-mplp-text">not exhaustive</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    {/* TERM-WAIVER: Semantic distinction - mapping ≠ compliance */}
                                    <span>Mapping does <strong className="text-mplp-text">not imply compliance</strong></span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    <span>Mapping does <strong className="text-mplp-text">not imply certification</strong></span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 rounded-xl border border-mplp-border bg-slate-950/30 p-4">
                            <p className="text-sm text-mplp-text-muted">
                                Mapping exists to answer the question: <em>&quot;Which parts of the MPLP protocol are relevant to this type of requirement?&quot;</em>
                            </p>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Examples</p>
                            <ul className="space-y-2 text-mplp-text-muted text-sm">
                                <li>• <Link href="/governance/iso-iec-42001" className="text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">ISO/IEC 42001</Link> → Governance objectives ↔ MPLP Plan / Confirm / Trace</li>
                                <li>• <Link href="/governance/nist-ai-rmf" className="text-mplp-blue-soft hover:text-mplp-blue-light transition-colors">NIST AI RMF</Link> → Risk management functions ↔ MPLP lifecycle controls</li>
                            </ul>
                            <p className="text-xs text-mplp-text-muted mt-4">All mappings presented on this site are <strong className="text-mplp-text">illustrative</strong> and <strong className="text-mplp-text">informative</strong>.</p>
                        </div>
                    </div>

                    {/* 3.2 Compatibility */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">3.2 Compatibility (Technical Non-Conflict & Interoperability)</h3>
                        <div className="mplp-card p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Definition</p>
                            <p className="text-mplp-text italic">
                                Compatibility indicates that MPLP does not conflict with, and can technically interoperate with, existing technical standards.
                            </p>
                        </div>
                        <p className="text-mplp-text-muted text-sm mt-4">Compatibility addresses <strong className="text-mplp-text">technical coexistence</strong>, not governance claims.</p>
                        <div className="mt-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Key Properties</p>
                            <ul className="space-y-2 text-mplp-text-muted text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    {/* TERM-WAIVER: Semantic distinction - Compatibility ≠ compliance */}
                                    <span>Compatibility ≠ compliance</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    <span>Compatibility ≠ endorsement</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error">✕</span>
                                    <span>Compatibility introduces <strong className="text-mplp-text">no regulatory obligation</strong></span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Examples</p>
                            <ul className="space-y-2 text-mplp-text-muted text-sm">
                                <li>• <strong className="text-mplp-text">OpenTelemetry</strong> — MPLP trace semantics can be exported or observed using OpenTelemetry tooling</li>
                                <li>• <strong className="text-mplp-text">W3C standards</strong> — MPLP artifacts (JSON, events, schemas) follow open web specifications</li>
                                <li>• <strong className="text-mplp-text">IETF / Internet standards</strong> — MPLP operates within standard HTTP / JSON / event-driven infrastructures</li>
                            </ul>
                            <p className="text-xs text-mplp-text-muted mt-4">Compatibility means MPLP can be <strong className="text-mplp-text">embedded within existing ecosystems</strong> without friction.</p>
                        </div>

                        {/* 3.2.1 Technical Compatibility References */}
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-mplp-text mb-4">
                                3.2.1 Technical Compatibility References (Illustrative)
                            </h3>

                            <p className="text-mplp-text-muted text-sm mb-6 leading-relaxed">
                                The following references illustrate how MPLP protocol artifacts and lifecycle events
                                can be represented using widely adopted technical standards.
                                {/* TERM-WAIVER: Technical reference context - not governance claim */}
                                These references are <strong className="text-mplp-text">technical in nature</strong> and do not imply governance alignment,
                                {/* TERM-WAIVER: Technical reference context - not governance claim */}
                                compliance, or certification.
                            </p>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="mplp-card p-6">
                                    <h4 className="text-sm font-bold text-mplp-text mb-3">OpenTelemetry Mapping</h4>
                                    <ul className="text-sm text-mplp-text-muted space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>MPLP <code className="text-xs">Trace</code> events can be exported as OpenTelemetry spans</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>Plan / Confirm / Trace stages map to structured trace attributes</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>Evidence Chain artifacts can be emitted as correlated trace/log records</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>No OpenTelemetry-specific dependency is required by the protocol</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="mplp-card p-6">
                                    <h4 className="text-sm font-bold text-mplp-text mb-3">W3C & Web Standards</h4>
                                    <ul className="text-sm text-mplp-text-muted space-y-2">
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>All MPLP artifacts are JSON-serializable and deterministic</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>Schemas are versioned, machine-readable, and transport-agnostic</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>Event semantics follow standard event-driven web patterns</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-mplp-blue-soft mt-1">•</span>
                                            <span>Compatible with standard HTTP/JSON and message bus architectures</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <p className="text-xs text-mplp-text-muted mt-6 italic">
                                These references demonstrate technical interoperability only.
                                They do not constitute normative requirements or guarantees of compatibility.
                            </p>
                        </div>
                    </div>

                    {/* 3.3 Enablement */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-mplp-text mb-4">3.3 Enablement (Protocol-Level Capability Support)</h3>
                        <div className="mplp-card p-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Definition</p>
                            <p className="text-mplp-text italic">
                                Enablement means that certain capabilities required by external standards are natively supported by MPLP mechanisms.
                            </p>
                        </div>
                        <p className="text-mplp-text-muted text-sm mt-4">Enablement describes <strong className="text-mplp-text">what the protocol can do</strong>, not whether an implementation satisfies a requirement.</p>
                        <div className="mt-6">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-3">Examples</p>
                            <ul className="space-y-2 text-mplp-text-muted text-sm">
                                <li>• Traceability → <code className="text-mplp-blue-soft">Trace</code> module</li>
                                <li>• Human-in-the-loop control → <code className="text-mplp-blue-soft">Confirm</code> module</li>
                                <li>• Governance gates → <code className="text-mplp-blue-soft">Plan</code> + <code className="text-mplp-blue-soft">Confirm</code></li>
                                <li>• Audit replay → Structured, replayable execution records</li>
                            </ul>
                        </div>
                        <div className="mt-6 rounded-xl border border-mplp-warning/30 bg-mplp-warning/5 p-4">
                            <p className="text-sm text-mplp-text-muted">
                                <strong className="text-mplp-warning">Note:</strong> Enablement does not imply that any system built on MPLP is conformant. Conformance remains a responsibility of the implementing organization.
                            </p>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Section 4: Usage Boundaries */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 4"
                        title="Usage Boundaries (Mandatory Reading)"
                        align="center"
                    />
                    <div className="mt-8">
                        <div className="rounded-2xl border-2 border-mplp-warning/50 bg-mplp-warning/5 p-8">
                            <p className="text-sm font-bold uppercase tracking-wider text-mplp-text-muted mb-4">The following statements apply to all standard references on this site:</p>
                            <ul className="space-y-3 text-mplp-text-muted">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-warning font-bold">•</span>
                                    {/* TERM-WAIVER: Negation context - MPLP does not claim compliance */}
                                    <span>MPLP does <strong className="text-mplp-text">not</strong> claim compliance with any external standard or regulation.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-warning font-bold">•</span>
                                    <span>MPLP does <strong className="text-mplp-text">not</strong> issue certifications or conformity assessments.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-warning font-bold">•</span>
                                    <span>All mappings are <strong className="text-mplp-text">illustrative and non-exhaustive</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-warning font-bold">•</span>
                                    {/* TERM-WAIVER: Responsibility statement - compliance is on implementers */}
                                    <span>Responsibility for compliance remains with <strong className="text-mplp-text">implementing organizations and system integrators</strong>.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-warning font-bold">•</span>
                                    {/* TERM-WAIVER: Jurisdictional neutrality statement */}
                                    <span>MPLP intentionally avoids embedding <strong className="text-mplp-text">jurisdiction-specific</strong> or <strong className="text-mplp-text">version-locked</strong> compliance logic.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Section 5: Why This Positioning Matters */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 5"
                        title="Why This Positioning Matters"
                        align="center"
                    />
                    <div className="mt-8">
                        <p className="text-mplp-text-muted leading-relaxed">
                            Standards and protocols serve <strong className="text-mplp-text">different roles</strong>:
                        </p>
                        <div className="mt-6 rounded-2xl border border-mplp-blue-soft/30 bg-mplp-blue-soft/5 p-8 text-center">
                            <p className="text-lg text-mplp-text font-medium">
                                Standards describe what should be achieved.<br />
                                Protocols describe how systems can be structured to achieve it.
                            </p>
                        </div>
                        <p className="text-mplp-text-muted leading-relaxed mt-6">
                            MPLP operates strictly at the <strong className="text-mplp-text">protocol layer</strong>.
                        </p>
                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            <div className="mplp-card p-4">
                                <p className="text-sm font-semibold text-mplp-text mb-2">Vendor neutrality</p>
                                <p className="text-xs text-mplp-text-muted">No single vendor controls the protocol</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-semibold text-mplp-text mb-2">Long-term stability</p>
                                <p className="text-xs text-mplp-text-muted">Frozen specifications ensure backward compatibility</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-semibold text-mplp-text mb-2">Cross-jurisdiction applicability</p>
                                {/* TERM-WAIVER: Jurisdictional neutrality description */}
                                <p className="text-xs text-mplp-text-muted">No region-specific compliance logic embedded</p>
                            </div>
                            <div className="mplp-card p-4">
                                <p className="text-sm font-semibold text-mplp-text mb-2">Clear auditability boundaries</p>
                                <p className="text-xs text-mplp-text-muted">Protocol defines what can be observed, not what must be proved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Section 6: Future References */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Section 6"
                        title="Future References"
                        align="center"
                    />
                    <div className="mt-8">
                        <p className="text-mplp-text-muted leading-relaxed">
                            Additional standards (e.g. ISO/IEC 23894, ISO/IEC 27001, IEEE 7000-series) may be referenced in future revisions <strong className="text-mplp-text">only if</strong> they introduce governance or lifecycle requirements that intersect with protocol-level semantics.
                        </p>
                        <p className="text-mplp-text-muted leading-relaxed mt-4">
                            Such references will follow the same <strong className="text-mplp-text">Mapping / Compatibility / Enablement</strong> model defined on this page.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Related Positioning Pages */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        eyebrow="Related"
                        title="Related Positioning Pages"
                        align="center"
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <Link href="/standards/regulatory-positioning" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Regulatory Positioning</p>
                            <p className="text-xs text-mplp-text-muted">High-level regulatory framework mappings</p>
                        </Link>
                        <Link href="/standards/protocol-evaluation" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">Protocol Evaluation</p>
                            <p className="text-xs text-mplp-text-muted">How MPLP is evaluated via Golden Flows</p>
                        </Link>
                        <Link href="/standards/what-mplp-is-not" className="mplp-card p-4 hover:border-mplp-blue-soft/30 transition-all">
                            <p className="text-sm font-bold text-mplp-text">What MPLP Is NOT</p>
                            <p className="text-xs text-mplp-text-muted">Boundary clarifications</p>
                        </Link>
                    </div>
                </div>
            </ContentSection>

            {/* Section 7: Summary */}
            <ContentSection>
                <div className="max-w-4xl mx-auto text-center">
                    <SectionHeader
                        eyebrow="Section 7"
                        title="Summary"
                        align="center"
                    />
                    <div className="mt-8">
                        <div className="rounded-2xl border-2 border-mplp-emerald/30 bg-mplp-emerald/5 p-8">
                            <p className="text-xl text-mplp-text font-bold">
                                MPLP does not replace standards.<br />
                                MPLP makes systems capable of supporting them.
                            </p>
                        </div>
                        <p className="text-mplp-text-muted mt-6">
                            This page defines the <strong className="text-mplp-text">authoritative interpretation</strong> of all standard references related to the MPLP protocol.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Meta Footer */}
            <ContentSection background="surface">
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-xl border border-mplp-border bg-slate-950/30 p-6">
                        <div className="grid gap-4 md:grid-cols-3 text-center">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Status</p>
                                <p className="text-sm font-semibold text-mplp-text">Informative</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Applies to</p>
                                <p className="text-sm font-semibold text-mplp-text">MPLP Protocol v1.0.0</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-mplp-text-muted mb-1">Last Updated</p>
                                <p className="text-sm font-semibold text-mplp-text">2025-12-20</p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
