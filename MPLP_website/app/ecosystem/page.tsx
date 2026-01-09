import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { InfoCard } from "@/components/ui/info-card";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BackToAnchor } from "@/components/ui/back-to-anchor";
import { JsonLd } from "@/components/seo/json-ld";
import { IconSearch, IconPackage, IconShield, IconDoorOpen, IconRocket, IconGlobe } from "@/components/ui/icons";
import { siteConfig, DOCS_URLS } from "@/lib/site-config";
import { EcosystemNotice } from "@/components/notices";

export const metadata: Metadata = {
    title: "Ecosystem | MPLP Protocol",
    description: "SDKs, developer tools, and reference runtimes that support adoption of the MPLP protocol standard.",
    alternates: {
        canonical: `${siteConfig.url}/ecosystem`,
    },
};

const sdks = [
    {
        name: "MPLP Python SDK",
        desc: "Reference SDK for building MPLP-conformant agents in Python. Provides canonical data models and utilities enabling protocol-level validation and structured execution scaffolding.",
        link: "https://pypi.org/project/mplp-sdk/",
        docsLink: DOCS_URLS.sdkDocs,
        packages: [
            { name: "mplp-sdk", desc: "Canonical Python entry (PyPI)" },
        ],
    },
    {
        name: "MPLP TypeScript SDK",
        desc: "Reference SDK for implementing MPLP protocol semantics in TypeScript. Provides strongly-typed definitions and execution scaffolding aligned with the MPLP specification.",
        link: "https://www.npmjs.com/package/@mplp/sdk-ts",
        docsLink: DOCS_URLS.sdkDocs,
        primaryPackages: [
            { name: "@mplp/sdk-ts", desc: "Main developer entry" },
            { name: "@mplp/core", desc: "Protocol primitives & types" },
            { name: "@mplp/schema", desc: "Schema validators" },
            { name: "@mplp/coordination", desc: "Coordination & state-machine helpers" },
            { name: "@mplp/modules", desc: "L2 governance module helpers" },
            { name: "@mplp/conformance", desc: "Conformance kit & validation tooling" },
            { name: "@mplp/runtime-minimal", desc: "Minimal reference runtime" },
            { name: "@mplp/devtools", desc: "CLI & debugging tools" },
        ],
        integrationPackages: [
            { name: "@mplp/integration-llm-http", desc: "HTTP LLM Client Adapter" },
            { name: "@mplp/integration-storage-fs", desc: "File System Storage Adapter" },
            { name: "@mplp/integration-storage-kv", desc: "Key-Value Storage Adapter" },
            { name: "@mplp/integration-tools-generic", desc: "Generic Tool Executor" },
        ],
    },
];

const tools = [
    {
        name: "Inspector",
        desc: "Visual inspection tool for observing MPLP executions. Enables developers to examine protocol states, lifecycle transitions, and inter-agent interactions in a structured and traceable form.",
        Icon: IconSearch,
        gradient: "grad-cyan",
    },
    {
        name: "Registry",
        desc: "Decentralized registry for discovering protocol-defined agents and capabilities. Supports semantic lookup and capability metadata aligned with MPLP module definitions.",
        Icon: IconPackage,
        gradient: "grad-blue",
    },
    {
        name: "Validator",
        desc: "Tool for producing verification evidence from agent executions. Evaluates behavior against Golden Flow scenarios as described in the specification.",
        Icon: IconShield,
        gradient: "grad-emerald",
    },
    {
        name: "Gateway",
        desc: "Protocol-aware gateway for routing and mediating external interactions. Provides a controlled boundary between MPLP executions and external systems while preserving protocol semantics.",
        Icon: IconDoorOpen,
        gradient: "grad-indigo",
    },
];

const runtimes = [
    {
        name: "Reference Runtimes",
        desc: "Reference execution runtimes that demonstrate how MPLP semantics can be composed into a complete execution lifecycle, without prescribing a single implementation.",
        status: "Reference",
        Icon: IconRocket,
        gradient: "grad-cyan",
    },
    {
        name: "Community Runtimes",
        desc: "Third-party execution runtimes implementing MPLP semantics, developed and maintained by the community with varying degrees of protocol coverage.",
        status: "Community",
        Icon: IconGlobe,
        gradient: "grad-amber",
    },
];

export default function EcosystemPage() {
    // CollectionPage with SoftwareSourceCode for SDKs (Breadcrumb auto-injected by component)
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "MPLP Ecosystem",
        "about": "SDKs, tools, and runtimes supporting adoption of the MPLP protocol",
        "url": `${siteConfig.url}/ecosystem`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/ecosystem`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "author": { "@id": `${siteConfig.url}#mpgc` },
        "hasPart": [
            { "@type": "SoftwareSourceCode", "name": "MPLP Python SDK", "url": "https://pypi.org/project/mplp-sdk/" },
            { "@type": "SoftwareSourceCode", "name": "MPLP TypeScript SDK", "url": "https://www.npmjs.com/package/@mplp/sdk-ts" }
        ]
    };

    return (
        <Shell>
            <JsonLd data={collectionSchema} />
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <BackToAnchor href="/references" label="References" />
                <Breadcrumb items={[{ label: "Ecosystem", href: "/ecosystem" }]} />
            </div>
            <PageHeader
                title="Ecosystem"
                subtitle="SDKs, developer tools, and reference runtimes that support adoption of the MPLP protocol standard."
                kicker="Adoption"
            />

            {/* Ecosystem Notice - Non-normative disclaimer */}
            <ContentSection>
                <EcosystemNotice />
            </ContentSection>

            {/* Official SDKs Section */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Reference SDKs"
                    title="Official Libraries"
                    description="Reference implementations for building protocol-conformant agents."
                    align="center"
                    className="mb-12"
                />
                <div className="grid gap-8 md:grid-cols-2">
                    {sdks.map((sdk) => (
                        <div key={sdk.name} className="rounded-2xl border border-mplp-border bg-slate-950/50 p-8 transition-all hover:border-mplp-blue-soft/30">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-mplp-text">{sdk.name}</h3>
                            </div>
                            <p className="text-mplp-text-muted mb-6">{sdk.desc}</p>

                            <div className="mb-6">
                                <p className="text-xs font-semibold text-mplp-text-muted uppercase tracking-wider mb-3">
                                    Primary Packages ({sdk.primaryPackages?.length || sdk.packages?.length || 0})
                                </p>
                                <div className="grid gap-2">
                                    {(sdk.primaryPackages || sdk.packages || []).map((pkg) => (
                                        <div key={pkg.name} className="flex items-center px-3 py-2 rounded bg-slate-900 border border-mplp-border">
                                            <div className="flex items-center gap-2">
                                                <code className="text-xs text-mplp-blue-soft font-mono">{pkg.name}</code>
                                                <span className="text-xs text-mplp-text-muted hidden sm:inline">— {pkg.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {sdk.integrationPackages && sdk.integrationPackages.length > 0 && (
                                    <>
                                        <p className="text-xs font-semibold text-mplp-text-muted uppercase tracking-wider mt-4 mb-3">
                                            Integration Packages ({sdk.integrationPackages.length})
                                        </p>
                                        <div className="grid gap-2">
                                            {sdk.integrationPackages.map((pkg) => (
                                                <div key={pkg.name} className="flex items-center px-3 py-2 rounded bg-slate-900/50 border border-mplp-border/50">
                                                    <div className="flex items-center gap-2">
                                                        <code className="text-xs text-mplp-cyan font-mono">{pkg.name}</code>
                                                        <span className="text-xs text-mplp-text-muted hidden sm:inline">— {pkg.desc}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-4">
                                <Button variant="secondary" size="sm" href={sdk.link} external>View Package</Button>
                                <Button variant="ghost" size="sm" href={sdk.docsLink} external>Read Docs</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* Developer Tools Section */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Adoption Tooling"
                    title="Developer Tools"
                    description="Utilities for observing, validating, and mediating protocol executions."
                    align="center"
                    className="mb-12"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <InfoCard key={tool.name} title={tool.name} icon={
                            <tool.Icon className="h-6 w-6" style={{ stroke: `url(#${tool.gradient})`, filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.1))' }} />
                        }>
                            {tool.desc}
                        </InfoCard>
                    ))}
                </div>
            </ContentSection>

            {/* Execution Runtimes Section */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Execution"
                    title="Runtimes"
                    description="Reference and community runtimes for complete MPLP execution lifecycles."
                    align="center"
                    className="mb-12"
                />
                <div className="grid gap-6 md:grid-cols-2">
                    {runtimes.map((runtime) => (
                        <div key={runtime.name} className="rounded-2xl border border-mplp-border bg-slate-950/50 p-6 transition-all hover:border-mplp-blue-soft/30">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2 rounded-xl bg-mplp-dark-soft border border-mplp-border">
                                    <runtime.Icon className="h-8 w-8" style={{ stroke: `url(#${runtime.gradient})`, filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.1))' }} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-mplp-text">{runtime.name}</h3>
                                    <span className={`text-xs font-medium ${runtime.status === 'Reference' ? 'text-mplp-blue-soft' : 'text-mplp-text-muted'}`}>
                                        {runtime.status}
                                    </span>
                                </div>
                            </div>
                            <p className="text-mplp-text-muted text-sm">{runtime.desc}</p>
                        </div>
                    ))}
                </div>
            </ContentSection>

            {/* Governance & Standards Section */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Governance & Standards"
                    title="Protocol Governance"
                    description="MPLP governance model, standards alignment, and lifecycle contracts."
                    align="center"
                    className="mb-12"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <a href="/governance/overview" className="mplp-card p-6 hover:border-mplp-blue-soft/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Governance Overview</h3>
                        <p className="text-sm text-mplp-text-muted">What MPLP governs, what it doesn&apos;t, and how the protocol evolves.</p>
                    </a>
                    <a href="/governance/agentos-protocol" className="mplp-card p-6 hover:border-mplp-blue-soft/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Agent OS Protocol</h3>
                        <p className="text-sm text-mplp-text-muted">The constitutional definition: Protocol OS vs Runtime OS.</p>
                    </a>
                    <a href="/governance/evidence-chain" className="mplp-card p-6 hover:border-mplp-emerald/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Evidence Chain</h3>
                        <p className="text-sm text-mplp-text-muted">Plan → Confirm → Trace: the governance triad for auditability.</p>
                    </a>
                    <a href="/governance/governed-stack" className="mplp-card p-6 hover:border-mplp-indigo/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Governed Stack</h3>
                        <p className="text-sm text-mplp-text-muted">How MPLP relates to MCP, orchestrators, and runtimes.</p>
                    </a>
                    <a href="/governance/iso-iec-42001" className="mplp-card p-6 hover:border-mplp-warning/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">ISO/IEC 42001</h3>
                        <p className="text-sm text-mplp-text-muted">Alignment reference for AI management systems.</p>
                    </a>
                    <a href="/governance/nist-ai-rmf" className="mplp-card p-6 hover:border-mplp-warning/50 transition-colors block">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">NIST AI RMF</h3>
                        <p className="text-sm text-mplp-text-muted">Alignment reference for AI risk management.</p>
                    </a>
                </div>
            </ContentSection>
        </Shell>
    );
}
