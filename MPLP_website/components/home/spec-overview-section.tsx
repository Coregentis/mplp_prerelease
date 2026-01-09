import Link from "next/link";
import { Container } from "@/components/layout/container";
import { DOCS_URLS } from "@/lib/site-config";

const specItems = [
    {
        title: "4-Layer Architecture",
        description: "L1–L4: Core Protocol, Coordination, Runtime, Integration.",
        href: DOCS_URLS.architecture,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
        ),
    },
    {
        title: "10 Coordination Modules",
        description: "Context, Plan, Confirm, Trace, Role, Dialog, Collab, Extension, Core, Network.",
        href: DOCS_URLS.contextModule,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
    {
        title: "11 Kernel Duties",
        description: "Cross-cutting OS-level guarantees for runtime conformance.",
        href: DOCS_URLS.conformance,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        title: "AEL / VSL / PSG",
        description: "Execution Loop, State Layer, and Project Semantic Graph.",
        href: DOCS_URLS.l1ToL4,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
    },
    {
        title: "SA & MAP Profiles",
        description: "Normative profiles for single-agent and multi-agent runtime conformance.",
        href: DOCS_URLS.saProfile,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
    },
    {
        title: "Golden Flows",
        description: "Reference lifecycle playbooks from intent to integration.",
        href: DOCS_URLS.goldenFlows,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: "JSON Schemas",
        description: "29 normative schemas defining all protocol structures.",
        href: DOCS_URLS.overview,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    {
        title: "Conformance Checklist",
        description: "Step-by-step guide to achieving MPLP conformance.",
        href: DOCS_URLS.conformance,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
    },
];

export function SpecOverviewSection() {
    return (
        <section className="py-24 bg-slate-950 border-t border-slate-900">
            <Container>
                <div className="text-center mb-16">
                    <span className="text-blue-500 font-semibold tracking-wider uppercase text-sm mb-2 block">The Specification</span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        What&apos;s in the Spec?
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        MPLP v1.0.0 is a comprehensive protocol specification. Here&apos;s everything it includes.
                    </p>
                </div>

                {/* Spec Items Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {specItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
