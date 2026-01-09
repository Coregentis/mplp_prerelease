import React from "react";
import { Shell } from "@/components/layout/shell";
import { ContentSection } from "@/components/ui/content-section";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Metadata } from "next";
import { siteConfig, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { JsonLd, generateProtocolSchema } from "@/components/seo/json-ld";
import { PositioningNotice } from "@/components/notices";


export const metadata: Metadata = {
    title: "MPLP — Multi-Agent Lifecycle Protocol | The Agent OS Protocol",
    description: "MPLP is a vendor-neutral lifecycle protocol for AI agent systems — The Agent OS Protocol. This website provides discovery and positioning only. Normative specifications live in the documentation; the repository is the source of truth. Not a framework, not a runtime, not a platform.",
    alternates: {
        canonical: `${siteConfig.url}`,
    },
};

export default function Home() {
    const protocolSchema = generateProtocolSchema();

    return (
        <Shell>
            <JsonLd data={protocolSchema} />
            <HeroSection />
            <ProtocolStatusSection />

            <ContentSection>
                <ProblemSection />
            </ContentSection>

            <ContentSection background="surface">
                <ArchitectureSection />
            </ContentSection>

            <ContentSection>
                <ModulesSection />
            </ContentSection>

            <ContentSection background="surface">
                <OrientationSection />
            </ContentSection>

            <ContentSection>
                <GoldenFlowsSection />
            </ContentSection>

            <ContentSection background="surface">
                <EcosystemSection />
            </ContentSection>

            <ContentSection>
                <FinalCtaSection />
            </ContentSection>

            <PositioningNotice />
        </Shell>
    );
}

// 1. Hero Section
function HeroSection() {
    return (
        <section className="relative overflow-hidden flex flex-col min-h-[80vh] justify-center">
            {/* Structural Background */}
            <div className="absolute inset-0 -z-10 bg-mplp-dark" />
            <div className="absolute inset-0 -z-10 bg-mesh opacity-60" />
            <div className="absolute inset-0 -z-10 bg-grid opacity-20" />

            {/* Premium Glow Spots */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-mplp-blue-soft/15 blur-[120px] rounded-full opacity-60 pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-mplp-indigo/10 blur-[100px] rounded-full opacity-40 pointer-events-none" />

            {/* Subtle Blueprint Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mplp-blue-soft/40 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20 pb-12 md:pt-32 md:pb-24">
                <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    {/* Copy - Statement of Purpose */}
                    <ScrollReveal animation="fade-in-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-mplp-blue-soft/30 bg-mplp-blue-soft/10 text-[10px] font-bold uppercase tracking-[0.2em] text-mplp-blue-soft mb-6 shadow-glow">
                            <span className="h-1.5 w-1.5 rounded-full bg-mplp-blue-soft animate-pulse" />
                            Protocol Specification v1.0.0
                        </div>

                        <div className="mb-6">
                            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.4em] text-mplp-text-muted/80 mb-3">Multi-Agent Lifecycle Protocol</p>
                            <h1 className="font-bold text-mplp-text mb-4 leading-[1.1] tracking-tight">
                                <span className="block text-4xl sm:text-6xl lg:text-7xl text-gradient pb-4 whitespace-nowrap">
                                    The Agent OS Protocol
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.35em] text-mplp-blue-soft/90">The Lifecycle Standard for AI Systems</p>
                        </div>

                        <p className="max-w-xl text-base sm:text-lg leading-relaxed text-mplp-text-muted mb-8">
                            MPLP is a vendor-neutral lifecycle protocol for AI agent systems.
                            It makes plans, confirmations, and traces observable and comparable across implementations—without tying you to any framework or vendor.
                        </p>

                        <p className="text-sm font-semibold text-mplp-blue-soft/80 tracking-wide mb-10 flex items-center gap-2">
                            <span className="h-px w-8 bg-mplp-blue-soft/40" />
                            Not a framework. Not a runtime. Not a platform.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <Button href={DOCS_URLS.home} external variant="primary" size="lg" className="px-10 h-14 text-base shadow-glow-hover">
                                Read Specification
                            </Button>
                            <Button href="/governance/overview" variant="secondary" size="lg" className="px-10 h-14 text-base border-mplp-border/60 hover:bg-mplp-dark-soft transition-all">
                                Governance Entry
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-mplp-border/30 max-w-lg">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mplp-text-muted mb-2">Status</p>
                                <p className="text-xs font-bold text-mplp-text">Frozen / Stable</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mplp-text-muted mb-2">License</p>
                                <p className="text-xs font-bold text-mplp-text">Apache 2.0</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-mplp-text-muted mb-2">Org</p>
                                <p className="text-xs font-bold text-mplp-text">MPGC Governed</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Architecture Blueprint - Premium Visual */}
                    <ScrollReveal animation="fade-in-up" delay={200} className="relative hidden lg:block">
                        <div className="mplp-card relative border-mplp-border/40 bg-glass shadow-2xl p-2 group hover:border-mplp-blue-soft/40 transition-all duration-500">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-mplp-blue-soft/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-mplp-blue-soft animate-pulse shadow-[0_0_8px_var(--mplp-blue-soft)]" />
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mplp-text-muted">
                                            Protocol Hierarchy
                                        </p>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] border-mplp-border/40 text-mplp-text-muted bg-mplp-dark/50">REF: SPEC-01</Badge>
                                </div>

                                <div className="space-y-4">
                                    <LayerRow label="L1 · Core Protocol" desc="Lifecycle primitives and semantic invariants." />
                                    <LayerRow label="L2 · Coordination" desc="Governance: Context, Plan, Confirm." />
                                    <LayerRow label="L3 · Runtime" desc="AEL loops and VSL state/value logic." />
                                    <LayerRow label="L4 · Integration" desc="Models, tools, and adapters." isLast />
                                </div>

                                <div className="mt-8 pt-6 border-t border-mplp-border/30 flex justify-between items-center">
                                    <p className="text-[9px] text-mplp-text-muted/40 font-mono tracking-tighter uppercase">Protocol-Id: 2b60cf...7abf80</p>
                                    <Link href="/architecture" className="text-[11px] font-bold uppercase tracking-widest text-mplp-blue-soft hover:text-mplp-blue-light transition-all flex items-center gap-1.5 group/link">
                                        Exploration
                                        <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background Elements */}
                        <div className="absolute -inset-4 bg-mplp-blue-soft/5 blur-2xl -z-10 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

// 1.5 Protocol Status Section
function ProtocolStatusSection() {
    return (
        <div className="bg-slate-950/30 border-b border-mplp-border/30 py-4">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-mplp-text-muted">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link href="/governance/overview" className="flex items-center gap-2 hover:text-mplp-blue-soft transition-colors">
                            <span className="status-dot status-dot-frozen" />
                            Protocol Status: Frozen
                        </Link>
                        <div className="h-3 w-px bg-mplp-border/50" />
                        <span className="text-mplp-text">v1.0.0-stable</span>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end items-center gap-x-6 gap-y-2">
                        <Link href="/governance/evidence-chain" className="hover:text-mplp-blue-soft transition-colors">
                            Evidence Chain
                        </Link>
                        <Link href="/conformance" className="hover:text-mplp-blue-soft transition-colors">
                            Conformance Model
                        </Link>
                        <div className="hidden md:block h-3 w-px bg-mplp-border/50" />
                        <span className="text-mplp-text/60">Auditable Specification</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LayerRow({ label, desc, isLast }: { label: string; desc: string; isLast?: boolean }) {
    return (
        <div className={`flex gap-4 rounded-xl border border-mplp-border/50 bg-slate-950/40 px-4 py-3 transition-colors hover:border-mplp-blue-soft/30 ${!isLast && "mb-2"}`}>
            <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-mplp-blue-soft/60" />
            <div>
                <p className="text-xs font-bold text-mplp-text uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-[11px] leading-relaxed text-mplp-text-muted/80">{desc}</p>
            </div>
        </div>
    );
}

// 2. Problem Section
function ProblemSection() {
    return (
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <ScrollReveal>
                <SectionHeader
                    eyebrow="The Governance Gap"
                    title="The bottleneck is not intelligence. It is lifecycle governance."
                    description="Multi-agent systems fail not because agents are weak, but because lifecycle semantics are undefined. These failures are structural outcomes of missing protocol-level invariants."
                />
                <div className="mt-10 pt-8 border-t border-mplp-border/30">
                    <p className="text-lg font-bold text-mplp-text mb-6">
                        Frameworks scale features.<br />
                        Protocols scale ecosystems.
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                        <Button href="/why-mplp" variant="secondary" className="border-mplp-border/50">
                            Read the Analysis →
                        </Button>
                        <Link href="/definition" className="text-sm text-mplp-blue-soft hover:underline">
                            View definition (positioning anchor) →
                        </Link>
                    </div>
                </div>
            </ScrollReveal>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2">
                <ScrollReveal delay={100} className="h-full"><ProblemCard title="State Drift" desc="Agents lose intent and constraints as state transitions occur without formal invariants." /></ScrollReveal>
                <ScrollReveal delay={200} className="h-full"><ProblemCard title="Hallucination Accumulation" desc="Errors compound across agent boundaries due to missing semantic validation frames." /></ScrollReveal>
                <ScrollReveal delay={300} className="h-full"><ProblemCard title="Orchestration Collapse" desc="Coordination complexity grows exponentially without a unified lifecycle protocol." /></ScrollReveal>
                <ScrollReveal delay={400} className="h-full"><ProblemCard title="Audit Black Holes" desc="Traceability is lost when lifecycle events are not governed by a canonical standard." /></ScrollReveal>
            </div>
        </div>
    );
}

function ProblemCard({ title, desc }: { title: string; desc: string }) {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    return (
        <article className="mplp-card mplp-card-hover group bg-mplp-dark-soft/40 p-6 sm:p-8" aria-labelledby={id}>
            <h3 id={id} className="text-sm font-bold text-mplp-text uppercase tracking-[0.2em] mb-4 group-hover:text-mplp-error transition-colors flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mplp-error/40 group-hover:bg-mplp-error group-hover:shadow-[0_0_8px_var(--mplp-error)] transition-colors" />
                {title}
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-mplp-text-muted/90 line-clamp-3">{desc}</p>
        </article>
    );
}

// 3. Architecture Section
function ArchitectureSection() {
    return (
        <div>
            <SectionHeader
                eyebrow="Protocol Topology"
                title="A Protocol Stack, Not a Framework Stack"
                description="MPLP sits above agent frameworks and below applications, defining lifecycle semantics that conformant systems are expected to respect. Formal definitions live in the documentation."
                className="mx-auto mb-12"
            />
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <ArchCard
                    layer="L1"
                    title="Core Protocol"
                    desc="Lifecycle primitives and semantic invariants."
                    color="text-mplp-blue-soft"
                    bg="bg-mplp-blue-soft/5"
                />
                <ArchCard
                    layer="L2"
                    title="Coordination"
                    desc="Governance primitives: Context, Plan, Confirm, Trace."
                    color="text-mplp-indigo"
                    bg="bg-mplp-indigo/5"
                />
                <ArchCard
                    layer="L3"
                    title="Execution"
                    desc="AEL loops, VSL logic, and Project Semantic Graph."
                    color="text-mplp-emerald"
                    bg="bg-mplp-emerald/5"
                />
                <ArchCard
                    layer="L4"
                    title="Integration"
                    desc="Models, tools, and external system adapters."
                    color="text-mplp-warning"
                    bg="bg-mplp-warning/5"
                />
            </div>
            <div className="mt-16 text-center">
                <Button href="/architecture" variant="primary" className="px-10">
                    Explore Architecture →
                </Button>
            </div>
        </div>
    );
}

function ArchCard({ layer, title, desc, color, bg }: { layer: string; title: string; desc: string; color: string; bg: string }) {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    return (
        <article className="mplp-card mplp-card-hover text-center bg-mplp-dark-soft/40 p-6 sm:p-8 h-full flex flex-col items-center" aria-labelledby={id}>
            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${bg} ${color} font-bold text-xl border border-current/20 shadow-glow group-hover:scale-110 transition-transform duration-500`} aria-hidden="true">
                {layer}
            </div>
            <h3 id={id} className="text-sm font-bold text-mplp-text uppercase tracking-[0.2em] mb-4">{title}</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-mplp-text-muted/90">{desc}</p>
        </article>
    );
}

import {
    IconArrowRight,
    IconBrain,
    IconCheck,
    IconCpu,
    IconMap,
    IconMask,
    IconMessage,
    IconNetwork,
    IconPlug,
    IconScroll,
    IconUsers
} from "@/components/ui/icons";

// 4. Modules Section (Reframed as Adoption)
function ModulesSection() {
    const modules = [
        { id: "context", name: "Context", gradient: "grad-cyan", icon: IconBrain, desc: "Initialize lifecycle constraints & objectives." },
        { id: "plan", name: "Plan", gradient: "grad-blue", icon: IconMap, desc: "Deterministic reasoning & orchestration intent." },
        { id: "confirm", name: "Confirm", gradient: "grad-emerald", icon: IconCheck, desc: "Governance, permissions, risk scoring." },
        { id: "trace", name: "Trace", gradient: "grad-amber", icon: IconScroll, desc: "Replayable reasoning & action audit." },
        { id: "role", name: "Role", gradient: "grad-indigo", icon: IconMask, desc: "Persona & capability definitions." },
        { id: "dialog", name: "Dialog", gradient: "grad-blue", icon: IconMessage, desc: "Structured reasoning boundaries." },
        { id: "collab", name: "Collab", gradient: "grad-cyan", icon: IconUsers, desc: "Multi-agent workflow semantics." },
        { id: "extension", name: "Extension", gradient: "grad-indigo", icon: IconPlug, desc: "Safe extensibility model." },
        { id: "core", name: "Core", gradient: "grad-slate", icon: IconCpu, desc: "Identity, invariants, protocol constants." },
        { id: "network", name: "Network", gradient: "grad-amber", icon: IconNetwork, desc: "Distributed agent communication." },
    ];

    return (
        <div>
            <ScrollReveal>
                <SectionHeader
                    eyebrow="Protocol Modules"
                    title="Modules are not features. They are lifecycle constraints."
                    description="Each module defines lifecycle constraints and evidence surfaces. Systems may adopt modules incrementally, but MPLP remains a protocol specification—not a framework."
                    className="mx-auto mb-12"
                />
            </ScrollReveal>

            {/* Adoption Steps */}
            <div className="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16">
                <ScrollReveal delay={100} className="h-full">
                    <AdoptionStep
                        step="1"
                        title="Trace (Evidence Surface)"
                        desc="Review the event model and replayable audit surface."
                        icon={IconScroll}
                        gradient="grad-amber"
                    />
                </ScrollReveal>
                <ScrollReveal delay={200} className="h-full">
                    <AdoptionStep
                        step="2"
                        title="Confirm (Governance Gate)"
                        desc="Understand confirmation gates and permission boundaries."
                        icon={IconCheck}
                        gradient="grad-emerald"
                    />
                </ScrollReveal>
                <ScrollReveal delay={300} className="h-full col-span-2 md:col-span-1">
                    <AdoptionStep
                        step="3"
                        title="Plan & Context (Lifecycle Semantics)"
                        desc="Learn how intent, plans, and constraints are represented."
                        icon={IconMap}
                        gradient="grad-blue"
                    />
                </ScrollReveal>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {modules.map((module, i) => (
                    <ScrollReveal key={module.id} delay={i * 50} className="h-full">
                        <Link href={`/modules/${module.id}`} className="mplp-card mplp-card-hover group relative overflow-hidden p-6 sm:p-8 block h-full">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="p-2 sm:p-3 rounded-xl bg-mplp-dark-soft border border-mplp-border group-hover:border-mplp-blue-soft/40 transition-colors shadow-sm">
                                    <module.icon className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-500 group-hover:scale-110" style={{ stroke: `url(#${module.gradient})`, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.05))' }} />
                                </div>
                                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-mplp-text-muted border-mplp-border/40">
                                    Frozen
                                </Badge>
                            </div>
                            <h3 className="text-base sm:text-xl font-bold text-mplp-text mb-3 group-hover:text-mplp-blue-light transition-colors tracking-tight">
                                {module.name} Module
                            </h3>
                            <p className="text-xs sm:text-sm text-mplp-text-muted leading-relaxed line-clamp-3">
                                {module.desc}
                            </p>

                            {/* Decorative Corner Glow */}
                            <div className="absolute -bottom-1 -right-1 h-12 w-12 bg-mplp-blue-soft/5 blur-xl group-hover:bg-mplp-blue-soft/10 transition-colors" />
                        </Link>
                    </ScrollReveal>
                ))}
            </div>
        </div>
    );
}

function AdoptionStep({ step, title, desc, icon: Icon, gradient }: { step: string; title: string; desc: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; gradient: string }) {
    const id = title.toLowerCase().replace(/\s+/g, "-");
    return (
        <article className="relative p-6 sm:p-8 rounded-2xl border border-mplp-border bg-mplp-dark-soft/30 group hover:border-mplp-blue-soft/30 transition-all duration-300" aria-labelledby={id}>
            <div className="absolute -top-3 -left-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-mplp-dark border border-mplp-border text-xs sm:text-sm font-bold text-mplp-blue-soft shadow-glow" aria-hidden="true">
                {step}
            </div>
            <div className="mb-6 p-2 w-fit rounded-xl bg-mplp-dark-soft border border-mplp-border group-hover:border-mplp-blue-soft/40 transition-colors" aria-hidden="true">
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" style={{ stroke: `url(#${gradient})` }} />
            </div>
            <h3 id={id} className="text-base sm:text-xl font-bold text-mplp-text mb-3 tracking-tight">{title}</h3>
            <p className="text-xs sm:text-sm text-mplp-text-muted leading-relaxed">{desc}</p>
        </article>
    );
}

// 5. Orientation Section (Docs Pointer - NOT implementation)
function OrientationSection() {
    return (
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <ScrollReveal>
                <SectionHeader
                    eyebrow="Orientation"
                    title="Understand MPLP in 5 minutes — then evaluate with evidence."
                    description="MPLP defines lifecycle invariants and evidence formats (Plan/Confirm/Trace/Snapshots) so evaluations are comparable across substrates."
                    align="center"
                    className="mb-12"
                />

                <div className="mt-10 space-y-8">
                    <div className="p-4 rounded-xl border border-mplp-border/30 bg-slate-950/30">
                        <p className="text-sm text-mplp-text-muted">
                            This website provides discovery and positioning only.
                            Normative specifications and schemas live in the documentation; the repository is the source of truth.
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-6">
                    <Button href={DOCS_URLS.home} external variant="primary">
                        Read the Spec Index (Docs) →
                    </Button>
                    <Link href="/modules" className="text-xs font-bold text-mplp-text-muted hover:text-mplp-blue-soft transition-colors uppercase tracking-widest">
                        Explore Schemas
                    </Link>
                </div>
            </ScrollReveal>

            <div className="relative">
                <div className="absolute inset-0 bg-mplp-blue-soft/5 blur-3xl -z-10" />
                <div className="mplp-card bg-slate-950/60 border-mplp-border/50 p-8">
                    <h3 className="text-sm font-bold text-mplp-text uppercase tracking-widest mb-8 border-b border-mplp-border/30 pb-4">Next Steps (Docs)</h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-4 group">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-mplp-blue-soft/40 group-hover:bg-mplp-blue-soft transition-colors" />
                            <Link href={DOCS_URLS.home} target="_blank" rel="noopener noreferrer" className="text-xs text-mplp-text-muted hover:text-mplp-text transition-colors leading-relaxed">
                                Read the <strong>Specification Index</strong> (canonical entry in Docs).
                            </Link>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-mplp-blue-soft/40 group-hover:bg-mplp-blue-soft transition-colors" />
                            <Link href="/modules" className="text-xs text-mplp-text-muted hover:text-mplp-text transition-colors leading-relaxed">
                                Explore <strong>Module Schemas</strong> and semantic invariants.
                            </Link>
                        </li>
                        <li className="flex items-start gap-4 group">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-mplp-blue-soft/40 group-hover:bg-mplp-blue-soft transition-colors" />
                            <Link href="/golden-flows" className="text-xs text-mplp-text-muted hover:text-mplp-text transition-colors leading-relaxed">
                                View <strong>Golden Flows</strong> for conformance evaluation.
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

// 6. Golden Flows Section
function GoldenFlowsSection() {
    return (
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Column: Core Flows Only */}
            <div className="space-y-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mplp-blue-soft mb-4 flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-mplp-blue-soft" />
                    Core Protocol Flows
                </p>
                <ScrollReveal delay={100}><FlowRow id="FLOW-01" title="Single Agent – Happy Path" /></ScrollReveal>
                <ScrollReveal delay={200}><FlowRow id="FLOW-02" title="Single Agent – Large Plan" /></ScrollReveal>
                <ScrollReveal delay={300}><FlowRow id="FLOW-03" title="Single Agent – With Tools" /></ScrollReveal>
                <ScrollReveal delay={400}><FlowRow id="FLOW-04" title="Single Agent with LLM Enrichment" /></ScrollReveal>
                <ScrollReveal delay={500}><FlowRow id="FLOW-05" title="Single Agent with Confirm Required" /></ScrollReveal>
            </div>

            {/* Right Column: Evidence + Profile Suites */}
            <ScrollReveal>
                <SectionHeader
                    eyebrow="Protocol Conformance"
                    title="Evidence-Based Verification"
                    description="Unlike static frameworks, MPLP conformance is verified through dynamic Golden Flows—predefined scenario execution that produces replayable evidence of protocol lifecycle adherence."
                    align="left"
                    className="mb-8"
                />
                <div className="mplp-card p-6 border-mplp-blue-soft/20 bg-glass/40 mb-8">
                    <p className="text-sm text-mplp-text-muted leading-relaxed mb-6">
                        System providers execute these flows within a protocol-conformant runtime to generate
                        <strong> Proof of Governance</strong> (PoG) reports.
                    </p>
                    <Button
                        href="/conformance"
                        variant="secondary"
                        size="sm"
                        className="w-full border-mplp-border/60 hover:border-mplp-blue-soft/40"
                    >
                        Learn Conformance Model
                    </Button>
                </div>

                {/* Profile Suites (Moved here for balance) */}
                <div className="pt-6 border-t border-mplp-border/30">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-mplp-text-muted mb-6">Profile Suites</p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* SA Suite */}
                        <div className="space-y-3">
                            <h4 className="text-[11px] font-bold text-mplp-text/80 uppercase tracking-tight">SA Profile (2)</h4>
                            <div className="space-y-1">
                                <Link
                                    href="/golden-flows/sa-flow-01"
                                    className="flex items-center justify-between group/link px-3 py-2 rounded-lg bg-mplp-blue-soft/5 border border-mplp-blue-soft/10 hover:bg-mplp-blue-soft/10 transition-colors"
                                >
                                    <span className="text-[10px] text-mplp-text-muted group-hover/link:text-mplp-blue-soft transition-colors">SA Scenario 01-02</span>
                                    <span className="text-[10px] opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                                </Link>
                            </div>
                        </div>

                        {/* MAP Suite */}
                        <div className="space-y-3">
                            <h4 className="text-[11px] font-bold text-mplp-text/80 uppercase tracking-tight">MAP Profile (2)</h4>
                            <div className="space-y-1">
                                <Link
                                    href="/golden-flows/map-flow-01"
                                    className="flex items-center justify-between group/link px-3 py-2 rounded-lg bg-mplp-indigo/5 border border-mplp-indigo/10 hover:bg-mplp-indigo/10 transition-colors"
                                >
                                    <span className="text-[10px] text-mplp-text-muted group-hover/link:text-mplp-indigo transition-colors">MAP Scenario 01-02</span>
                                    <span className="text-[10px] opacity-0 group-hover/link:opacity-100 transition-opacity">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Semantic Guardrail Disclaimer */}
                    <div className="mt-6 px-4 py-3 rounded-xl border border-mplp-border/40 bg-mplp-dark-soft/20">
                        <p className="text-[10px] text-mplp-text-muted leading-relaxed italic">
                            Suites are scenario groupings for evidence-based self-evaluation, not certification categories.
                        </p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}

function FlowRow({ id, title }: { id: string; title: string }) {
    const slug = id.toLowerCase();
    return (
        <Link href={`/golden-flows/${slug}`} className="mplp-card flex items-center gap-6 py-4 transition-all hover:border-mplp-blue-soft/30 bg-slate-950/40 group">
            <span className="text-[10px] font-bold text-mplp-blue-soft uppercase tracking-widest min-w-[70px]">{id}</span>
            <div className="h-4 w-px bg-mplp-border/50" />
            <span className="text-sm font-bold text-mplp-text group-hover:text-mplp-blue-soft transition-colors">{title}</span>
        </Link>
    );
}

function ProfileFlowRow({ id, title }: { id: string; title: string }) {
    const slug = id.toLowerCase();
    return (
        <Link href={`/golden-flows/${slug}`} className="block py-2 px-3 rounded-lg border border-mplp-border/20 bg-slate-950/30 hover:border-mplp-blue-soft/30 transition-all group">
            <span className="text-[9px] font-bold text-mplp-indigo uppercase tracking-widest block">{id}</span>
            <span className="text-[11px] text-mplp-text-muted group-hover:text-mplp-text transition-colors">{title}</span>
        </Link>
    );
}

// 7. Ecosystem Section
function EcosystemSection() {
    return (
        <div className="text-center">
            <SectionHeader
                eyebrow="Ecosystem Topology"
                title="Built for Architects, Developers, and Auditors"
                description="The specification describes a structural approach for building observable and auditable agent systems. Canonical SDKs and schemas ensure rapid, safe integration."
                align="center"
                className="mx-auto mb-16"
            />

            <div className="mx-auto max-w-6xl">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-left">
                    <Link
                        href="/governance/overview"
                        className="mplp-card mplp-card-hover group block p-8 sm:p-10 bg-mplp-dark-soft/40 relative overflow-hidden"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mplp-text-muted mb-6">
                            Governance
                        </p>
                        <h3 className="text-sm font-bold text-mplp-text uppercase tracking-widest mb-6 group-hover:text-mplp-blue-soft transition-colors">
                            Evidence Chain
                        </h3>
                        <p className="text-xs sm:text-sm text-mplp-text-muted/90 leading-relaxed mb-8">
                            Plan → Confirm → Trace: audit-ready evidence for agent systems, aligned with ISO/IEC 42001 and NIST AI RMF.
                        </p>
                        <div className="text-[11px] font-bold text-mplp-blue-soft uppercase tracking-widest flex items-center gap-2 group/link">
                            Explore Governance <IconArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/ecosystem"
                        className="mplp-card mplp-card-hover group block p-8 sm:p-10 bg-mplp-dark-soft/40 relative overflow-hidden"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mplp-text-muted mb-6">
                            Resources
                        </p>
                        <h3 className="text-sm font-bold text-mplp-text uppercase tracking-widest mb-6 group-hover:text-mplp-blue-soft transition-colors">
                            SDKs & Schemas
                        </h3>
                        <p className="text-xs sm:text-sm text-mplp-text-muted/90 leading-relaxed mb-8">
                            Canonical SDKs and module schemas to implement MPLP incrementally without vendor lock-in.
                        </p>
                        <div className="text-[11px] font-bold text-mplp-blue-soft uppercase tracking-widest flex items-center gap-2 group/link">
                            Explore Ecosystem <IconArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        href="/governance/overview"
                        className="mplp-card mplp-card-hover group block p-8 sm:p-10 bg-mplp-dark-soft/40 relative overflow-hidden"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-mplp-text-muted mb-6">
                            Evolution
                        </p>
                        <h3 className="text-sm font-bold text-mplp-text uppercase tracking-widest mb-6 group-hover:text-mplp-blue-soft transition-colors">
                            Versioning Policy
                        </h3>
                        <p className="text-xs sm:text-sm text-mplp-text-muted/90 leading-relaxed mb-8">
                            Transparent evolution policy for the frozen v1.0.0 specification and forward-compatible extensions.
                        </p>
                        <div className="text-[11px] font-bold text-mplp-blue-soft uppercase tracking-widest flex items-center gap-2 group/link">
                            View Governance <IconArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-6">
                <Button href="/ecosystem" variant="secondary" className="border-mplp-border/50">
                    Ecosystem Registry
                </Button>
                <Button href="/governance/overview" variant="secondary" className="border-mplp-border/50">
                    Governance Framework
                </Button>
            </div>
        </div>
    );
}



// 9. Final CTA Section
function FinalCtaSection() {
    return (
        <div className="relative overflow-hidden rounded-[2.5rem] border border-mplp-border/60 bg-glass px-8 py-24 text-center sm:px-16 sm:py-32">
            {/* Structural Pattern */}
            <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

            <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mplp-text mb-8 tracking-tight">
                    Build against the <span className="text-mplp-blue-soft">Specification.</span>
                </h2>
                <p className="text-mplp-text-muted mb-12 max-w-2xl mx-auto text-lg sm:text-xl leading-relaxed">
                    Build agent systems that remain reliable, observable, and governable — even as models, frameworks, and vendors change.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <Button href={DOCS_URLS.home} external variant="primary" size="lg" className="px-12 h-14 text-base shadow-glow-hover">
                        Read Specification
                    </Button>
                    <Button href={REPO_URLS.root} external variant="secondary" size="lg" className="px-12 h-14 text-base border-mplp-border/60 hover:bg-mplp-dark-soft transition-all">
                        GitHub Repository
                    </Button>
                </div>
                <div className="mt-16 pt-10 border-t border-mplp-border/20 flex flex-wrap justify-center gap-10 text-[11px] font-bold uppercase tracking-[0.3em] text-mplp-text-muted/50">
                    <span className="hover:text-mplp-blue-soft transition-colors cursor-default">Protocol v1.0.0</span>
                    <span className="opacity-30">•</span>
                    <span className="hover:text-mplp-blue-soft transition-colors cursor-default">Apache 2.0</span>
                    <span className="opacity-30">•</span>
                    <span className="hover:text-mplp-blue-soft transition-colors cursor-default">MPGC Governed</span>
                </div>
            </div>
        </div>
    );
}
