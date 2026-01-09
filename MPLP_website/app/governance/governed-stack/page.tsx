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
    title: "Governed Stack | MPLP Protocol",
    description:
        "How MPLP relates to MCP, agent frameworks, and runtimes. These are governed objects in a lifecycle, not competitors.",
    alternates: {
        canonical: `${siteConfig.url}/governance/governed-stack`,
    },
};

export default function GovernedStackPage() {
    const techArticleSchema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: "MPLP Governed Stack",
        about:
            "Strategic positioning of MPLP relative to agent frameworks, runtimes, and tool protocols as governed objects",
        url: `${siteConfig.url}/governance/governed-stack`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/governance/governed-stack`,
        },
        isPartOf: { "@id": `${siteConfig.url}#website` },
        publisher: { "@id": `${siteConfig.url}#mpgc` },
        author: { "@id": `${siteConfig.url}#mpgc` },
    };

    return (
        <Shell>
            <JsonLd data={techArticleSchema} />

            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <Breadcrumb
                    items={[
                        { label: "Governance", href: "/governance" },
                        { label: "Governed Stack", href: "/governance/governed-stack" },
                    ]}
                />
            </div>

            <PageHeader
                title="Governed Stack"
                subtitle="MPLP does not replace agent frameworks, MCP, or runtimes. It governs them — by enforcing lifecycle contracts (intent, authorization, audit) across the stack."
                kicker="Ecosystem Positioning"
            />

            {/* Core Principle */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Core Principle"
                    title="Governed Objects, Not Competitors"
                    description="MPLP is a protocol-layer governance shell: it defines what systems must prove (intent → authorization → evidence), not how they should be implemented."
                    align="center"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="rounded-3xl border border-mplp-blue-soft/30 bg-gradient-to-r from-mplp-blue-soft/5 via-mplp-dark to-mplp-indigo/5 p-8">
                        <p className="text-lg text-mplp-text-muted leading-relaxed">
                            Modern agent stacks are assembled from multiple layers: orchestration frameworks, tool
                            protocols, runtimes, and cloud platforms. The failure mode is not lack of features —
                            it is lack of <strong className="text-mplp-text">governable evidence</strong>.
                            <br />
                            <br />
                            MPLP makes the stack governable by enforcing lifecycle contracts:
                            <span className="font-semibold text-mplp-blue-soft"> Plan</span> (explicit intent),
                            <span className="font-semibold text-mplp-emerald"> Confirm</span> (policy & authorization),
                            <span className="font-semibold text-mplp-warning"> Trace</span> (auditable evidence).
                        </p>

                        <div className="mt-6 grid gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">
                                    What MPLP governs
                                </p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    lifecycle semantics, approvals, evidence, replayability
                                </p>
                            </div>
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">
                                    What others provide
                                </p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    orchestration, tools, execution, platform integrations
                                </p>
                            </div>
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Outcome</p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    vendor-neutral governance across heterogeneous stacks
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Conformance as a Kernel Responsibility */}
            {/* 
                SEMANTIC: Normative Clarification
                PURPOSE: Define conformance as a kernel-level duty, not an external plugin.
            */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Architecture"
                    title="Conformance as a Kernel Responsibility"
                    description="In MPLP, conformance is not implemented as an external plugin or optional middleware. It is a kernel-level responsibility enforced through protocol-defined lifecycle duties."
                    align="center"
                />
                <div className="mt-8 max-w-4xl mx-auto">
                    <div className="grid gap-8 md:grid-cols-2">
                        <div className="mplp-card p-6 border-mplp-emerald/20 bg-mplp-emerald/5">
                            <h3 className="text-lg font-semibold text-mplp-text mb-3">Kernel-Level Enforcement</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">
                                Conformance checks are baked into the agent&apos;s lifecycle loop. An agent cannot transition from <strong>Plan</strong> to <strong>Act</strong> without passing kernel-level authorization gates.
                            </p>
                            <ul className="space-y-2 text-sm text-mplp-text-muted">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-emerald mt-0.5">✓</span>
                                    <span><strong>11 Kernel Duties</strong> define mandatory checks</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-emerald mt-0.5">✓</span>
                                    <span><strong>Authorization Gates</strong> block unauthorized actions</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-emerald mt-0.5">✓</span>
                                    <span><strong>Evidence Chain</strong> is immutable and continuous</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mplp-card p-6 border-mplp-border/50 bg-slate-950/30">
                            <h3 className="text-lg font-semibold text-mplp-text-muted mb-3">Plugin-Level (Traditional)</h3>
                            <p className="text-sm text-mplp-text-muted mb-4">
                                {/* TERM-WAIVER: Architectural comparison - describes traditional patterns */}
                                In traditional architectures, compliance is often an &ldquo;afterthought&rdquo; wrapper or a sidecar proxy that can be bypassed or disabled.
                            </p>
                            <ul className="space-y-2 text-sm text-mplp-text-muted opacity-75">
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error mt-0.5">✗</span>
                                    {/* TERM-WAIVER: Architectural comparison - describes traditional patterns */}
                                    <span>Compliance logic external to agent state</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error mt-0.5">✗</span>
                                    <span>Can be bypassed by direct API calls</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-mplp-error mt-0.5">✗</span>
                                    <span>Audit trails are fragmented</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 p-4 rounded-xl border border-mplp-border bg-slate-950/50 text-center">
                        <p className="text-xs text-mplp-text-muted">
                            {/* TERM-WAIVER: Usage boundary - refers to regulatory compliance */}
                            <strong>Usage Boundary:</strong> This section clarifies architectural responsibility. It does not assert regulatory compliance for any specific implementation without independent audit.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Decision Tree */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Decision Guide"
                    title="How teams actually choose an agent stack"
                    description="Start with constraints (security, cloud lock-in, ops model), then pick execution components. MPLP is the governance shell that stays stable across those choices."
                    align="center"
                />

                <div className="mt-10 max-w-5xl mx-auto">
                    <div className="rounded-3xl border border-mplp-border bg-slate-950/50 p-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="mplp-card p-6">
                                <h3 className="text-lg font-semibold text-mplp-text mb-2">
                                    Step 1 — Identify hard constraints
                                </h3>
                                <ul className="space-y-2 text-sm text-mplp-text-muted">
                                    <li>• Regulated environment / audit required?</li>
                                    <li>• Multi-cloud or hybrid deployment?</li>
                                    <li>• Need strict RBAC / approval gates?</li>
                                    <li>• Need reproducibility & incident reconstruction?</li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-mplp-border">
                                    <p className="text-sm text-mplp-text">
                                        If any answer is &ldquo;yes&rdquo;, you need a governance shell. That is where MPLP sits.
                                    </p>
                                </div>
                            </div>

                            <div className="mplp-card p-6">
                                <h3 className="text-lg font-semibold text-mplp-text mb-2">
                                    Step 2 — Select execution components
                                </h3>
                                <ul className="space-y-2 text-sm text-mplp-text-muted">
                                    <li>• Orchestration: graphs / crews / planners</li>
                                    <li>• Tool protocol: MCP servers and connectors</li>
                                    <li>• Runtime: action execution & sandboxing</li>
                                    <li>• Platform: cloud-native or self-hosted</li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-mplp-border">
                                    <p className="text-sm text-mplp-text">
                                        These can change over time. MPLP keeps governance stable while components evolve.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 lg:grid-cols-4">
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">
                                    Fast prototyping
                                </p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    Pick a framework → wrap with MPLP when going to production
                                </p>
                            </div>
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">
                                    Enterprise governance
                                </p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    Start with MPLP → choose any orchestrator/runtime underneath
                                </p>
                            </div>
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Tool ecosystem</p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    Use MCP for tools → govern access & evidence via MPLP
                                </p>
                            </div>
                            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-4">
                                <p className="text-xs text-mplp-text-muted uppercase tracking-wider">
                                    Avoid lock-in
                                </p>
                                <p className="mt-1 text-sm text-mplp-text">
                                    Keep governance vendor-neutral → swap clouds/models safely
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* Stack Map */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Architecture View"
                    title="Protocol above, execution below"
                    description="MPLP sits above frameworks and tool protocols as a lifecycle governance layer. It does not compete with them — it makes them governable."
                    align="center"
                />
                <div className="mt-10 max-w-4xl mx-auto space-y-4 text-center">
                    <div className="rounded-xl border border-mplp-border bg-slate-950/50 p-4">
                        <span className="text-sm text-mplp-text-muted">Applications (your product)</span>
                    </div>
                    <div className="text-mplp-text-muted">↓</div>
                    <div className="rounded-xl border-2 border-mplp-blue-soft bg-mplp-blue-soft/10 p-4">
                        <span className="font-semibold text-mplp-blue-soft">
                            MPLP — Lifecycle Governance (Plan · Confirm · Trace)
                        </span>
                    </div>
                    <div className="text-mplp-text-muted">↓</div>
                    <div className="rounded-xl border border-mplp-border bg-slate-950/50 p-4">
                        <span className="text-sm text-mplp-text-muted">
                            Orchestration Frameworks & Runtimes (graphs, crews, operators)
                        </span>
                    </div>
                    <div className="text-mplp-text-muted">↓</div>
                    <div className="rounded-xl border border-mplp-border bg-slate-950/50 p-4">
                        <span className="text-sm text-mplp-text-muted">
                            Tool & Resource Protocols (e.g., MCP) + Connectors
                        </span>
                    </div>
                    <div className="text-mplp-text-muted">↓</div>
                    <div className="rounded-xl border border-mplp-border bg-slate-950/50 p-4">
                        <span className="text-sm text-mplp-text-muted">
                            Models, Infrastructure, Identity, Network
                        </span>
                    </div>
                </div>
            </ContentSection>

            {/* Governance Matrix */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Reference Matrix"
                    title="Governed objects and governance gaps"
                    description="What each system does well, what it typically does not guarantee, and what MPLP adds as a governance shell."
                    align="center"
                />
                <div className="mt-12 overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-mplp-border bg-slate-900/50">
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">System</th>
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">Primary job</th>
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">
                                    Typical governance gap
                                </th>
                                <th className="text-left p-4 text-sm font-semibold text-mplp-text">What MPLP governs</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-mplp-border text-sm">
                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4 font-semibold text-mplp-text">MCP</td>
                                <td className="p-4 text-mplp-text-muted">Tool/resource access standard</td>
                                <td className="p-4 text-mplp-text-muted">
                                    Access control and audit posture varies by deployment and server implementation
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Policy gates (
                                    <span className="text-mplp-emerald font-semibold">Confirm</span>), evidence trails (
                                    <span className="text-mplp-warning font-semibold">Trace</span>), scoped intent (
                                    <span className="text-mplp-blue-soft font-semibold">Plan</span>)
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4 font-semibold text-mplp-text">LangGraph / orchestration graphs</td>
                                <td className="p-4 text-mplp-text-muted">Workflow execution & state transitions</td>
                                <td className="p-4 text-mplp-text-muted">
                                    Great execution control, but &ldquo;audit-grade intent + approvals&rdquo; is not guaranteed by default
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Intent capture, approval gates, standardized trace semantics across frameworks
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4 font-semibold text-mplp-text">Agent Frameworks / Platforms</td>
                                <td className="p-4 text-mplp-text-muted">End-to-end platform integration</td>
                                <td className="p-4 text-mplp-text-muted">
                                    Strong platform guarantees, but portability and vendor-neutral governance may be constrained
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Vendor-neutral governance contracts; multi-cloud lifecycle portability
                                </td>
                            </tr>

                            <tr className="hover:bg-slate-900/30 transition-colors">
                                <td className="p-4 font-semibold text-mplp-text">Execution runtimes (operators)</td>
                                <td className="p-4 text-mplp-text-muted">Action execution & side-effects</td>
                                <td className="p-4 text-mplp-text-muted">
                                    Side-effects are where incidents happen — without formal gating, audit is post-hoc
                                </td>
                                <td className="p-4 text-mplp-text-muted">
                                    Mandatory confirmation before high-risk actions; replayable evidence chains
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </ContentSection>

            {/* Security Reality Check */}
            <ContentSection>
                <SectionHeader
                    eyebrow="Security Reality Check"
                    title="Why governance becomes urgent as ecosystems scale"
                    description="When tool ecosystems expand rapidly, security posture becomes uneven. Enterprises need a governance shell that enforces identity, authorization, and evidence — consistently."
                />
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">The pattern</h3>
                        <p className="text-sm text-mplp-text-muted">
                            Tool servers and connectors often emerge faster than security norms. The result is not
                            &ldquo;MCP is unsafe&rdquo; — the result is that{" "}
                            <strong className="text-mplp-text">security becomes optional in practice</strong>.
                        </p>
                    </div>
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">What MPLP changes</h3>
                        <p className="text-sm text-mplp-text-muted">
                            MPLP forces high-risk operations through{" "}
                            <strong className="text-mplp-text">Confirm</strong> gates, binds actions to explicit{" "}
                            <strong className="text-mplp-text">Plan</strong>, and records{" "}
                            <strong className="text-mplp-text">Trace</strong> evidence — regardless of which tool protocol or
                            framework you use.
                        </p>
                    </div>
                </div>
            </ContentSection>

            {/* Integration Recipes */}
            <ContentSection background="surface">
                <SectionHeader
                    eyebrow="Recipes"
                    title="Composable integrations that enterprises actually deploy"
                    description="Start with the components you already use. Add MPLP as the governance shell without replatforming."
                    align="center"
                />

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Recipe 1 — MPLP + MCP</h3>
                        <p className="text-sm text-mplp-text-muted">
                            Use MCP for tool/data access. Wrap tool calls with MPLP Plan/Confirm/Trace so every access is scoped,
                            authorized, and auditable.
                        </p>
                        <div className="mt-4 rounded-xl border border-mplp-border bg-slate-950/40 p-3">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Best for</p>
                            <p className="mt-1 text-sm text-mplp-text">tool ecosystems, connector-heavy stacks</p>
                        </div>
                    </div>

                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Recipe 2 — MPLP + Orchestrator</h3>
                        <p className="text-sm text-mplp-text-muted">
                            Keep your orchestrator (graphs/crews). MPLP standardizes lifecycle events and evidence semantics across runs,
                            enabling audit, replay, and governance at scale.
                        </p>
                        <div className="mt-4 rounded-xl border border-mplp-border bg-slate-950/40 p-3">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Best for</p>
                            <p className="mt-1 text-sm text-mplp-text">complex workflows, multi-step automation</p>
                        </div>
                    </div>

                    <div className="mplp-card p-6">
                        <h3 className="text-lg font-semibold text-mplp-text mb-2">Recipe 3 — MPLP for multi-cloud</h3>
                        <p className="text-sm text-mplp-text-muted">
                            When platforms differ, governance must not. MPLP provides vendor-neutral lifecycle contracts so stacks can
                            move across clouds without rewriting governance logic.
                        </p>
                        <div className="mt-4 rounded-xl border border-mplp-border bg-slate-950/40 p-3">
                            <p className="text-xs text-mplp-text-muted uppercase tracking-wider">Best for</p>
                            <p className="mt-1 text-sm text-mplp-text">hybrid environments, portability mandates</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 max-w-4xl mx-auto text-center">
                    <p className="text-sm text-mplp-text-muted">
                        Recommended next reads:{" "}
                        <a className="text-mplp-blue-soft hover:underline" href="/governance/evidence-chain">
                            Evidence Chain
                        </a>{" "}
                        ·{" "}
                        <a className="text-mplp-blue-soft hover:underline" href="/governance/nist-ai-rmf">
                            NIST AI RMF Alignment
                        </a>
                    </p>
                </div>
            </ContentSection>

            {/* Navigation */}
            <ContentSection>
                <GovernanceNav current="/governance/governed-stack" />
            </ContentSection>
        </Shell >
    );
}
