import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/common/section-title";
import { DOCS_URLS } from "@/lib/site-config";

/**
 * 11 Kernel Duties (OS-Level Obligations) — MPLP v1.0.0 Frozen
 * = 9 Core Duties + AEL-duty + VSL-duty
 */
const kernelDuties = [
    {
        canonical: "coordination",
        label: "Lifecycle Coordination",
        description: "Multi-agent handoffs, turn-taking, and phase synchronization.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/coordination`,
    },
    {
        canonical: "error-handling",
        label: "Error Recovery",
        description: "Failure detection, recovery strategies, and retry logic.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/error-handling`,
    },
    {
        canonical: "event-bus",
        label: "Event Routing",
        description: "Event dispatch, pub/sub patterns, and message delivery.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/event-bus`,
    },
    {
        canonical: "orchestration",
        label: "Plan Orchestration",
        description: "Step sequencing, DAG execution, and dependency resolution.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/orchestration`,
    },
    {
        canonical: "performance",
        label: "Performance Tracking",
        description: "Latency, throughput, and token cost monitoring.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/performance`,
    },
    {
        canonical: "protocol-version",
        label: "Version Compatibility",
        description: "Protocol version checks and migration path handling.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/protocol-versioning`,
    },
    {
        canonical: "security",
        label: "Security & Access",
        description: "Role-based permissions, access control, and data safety.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/security`,
    },
    {
        canonical: "state-sync",
        label: "State Synchronization",
        description: "PSG consistency across distributed runtime components.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/state-sync`,
    },
    {
        canonical: "transaction",
        label: "Transaction Safety",
        description: "Atomicity, rollback, and compensation orchestration.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        href: `${DOCS_URLS.kernelDuties}/transaction`,
    },
    {
        canonical: "AEL-duty",
        label: "Execution Loop Guarantee",
        description: "AEL-level state transitions and phase invariants.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
        href: DOCS_URLS.ael,
    },
    {
        canonical: "VSL-duty",
        label: "Value State Integrity",
        description: "VSL-level value/reward consistency and persistence.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        href: DOCS_URLS.vsl,
    },
];

export function KernelDutiesSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
            </div>

            <Container className="relative z-10">
                <SectionTitle
                    badge="OS-Level Obligations"
                    title="11 Kernel Duties"
                    subtitle="Kernel Duties are the foundational requirements any MPLP-conformant runtime must fulfill. They span all layers (L1–L4) and ensure consistent, safe behavior."
                />

                {/* Duties Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                    {kernelDuties.map((duty) => (
                        <Link
                            key={duty.canonical}
                            href={duty.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-glass border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 block"
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-blue-900/50 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-blue-400 group-hover:text-blue-300 transition-all duration-300 shadow-glow">
                                    {duty.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-0.5 group-hover:text-blue-400 transition-colors">{duty.label}</h3>
                                    <p className="text-xs text-blue-400 font-mono mb-2 opacity-70">({duty.canonical})</p>
                                    <p className="text-sm text-slate-400">{duty.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Conformance Note */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 text-white rounded-xl p-6 text-center mb-8 shadow-lg backdrop-blur-sm">
                    <p className="text-lg">
                        <strong className="text-blue-300">Conformance Requirement:</strong> A runtime is MPLP-conformant only if it provides:
                        AEL / VSL / PSG, All 10 modules, All 11 Kernel Duties, SA & MAP profiles,
                        Governance shells, Drift detection, and Replayable trace.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Link
                        href={DOCS_URLS.conformance}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                        View Full Conformance Checklist
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
