import Link from "next/link";
import { Container } from "@/components/layout/container";
import { DOCS_URLS } from "@/lib/site-config";

const reasons = [
    {
        title: "Beyond Prompt Engineering",
        description: "Move from ad-hoc prompts to structured lifecycle management. MPLP defines phases, states, and invariants that prompts alone cannot guarantee.",
        connection: "→ Enabled by L1 lifecycle schema",
        href: DOCS_URLS.l1CoreProtocol,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        title: "Lifecycle Control",
        description: "Define how agents spawn, plan, execute, coordinate, and terminate. Each phase has explicit contracts and governance hooks.",
        connection: "→ Powered by 10 coordination modules",
        href: DOCS_URLS.moduleInteractions,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
        ),
    },
    {
        title: "Observable by Design",
        description: "Every action emits structured events. Built-in tracing, audit logs, and drift detection give you full visibility into agent behavior.",
        connection: "→ Guaranteed by 11 Kernel Duties",
        href: DOCS_URLS.kernelDuties,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
        ),
    },
    {
        title: "Vendor-Neutral",
        description: "Works with any LLM, framework, or runtime. MPLP is a protocol layer that sits above implementation choices.",
        connection: "→ Abstracted via L4 Integration Layer",
        href: DOCS_URLS.l4IntegrationInfra,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
    },
];

export function WhySection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <Container>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm">
                        <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">Why MPLP?</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        A Protocol, Not a Framework
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        MPLP defines the &apos;what&apos; and &apos;why&apos; of agent lifecycles. Frameworks provide the &apos;how&apos;. Use both together.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {reasons.map((reason) => (
                        <div
                            key={reason.title}
                            className="group p-8 bg-glass rounded-2xl hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-blue-500/20 transition-all" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-blue-900/50 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-blue-400 group-hover:text-blue-300 transition-all duration-300 shadow-glow">
                                    {reason.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                                <p className="text-slate-400 mb-6 leading-relaxed">{reason.description}</p>
                                <Link
                                    href={reason.href}
                                    className="text-sm text-blue-400 font-semibold hover:text-blue-300 transition-colors inline-flex items-center gap-2 group-hover:translate-x-1 duration-300"
                                    target="_blank"
                                >
                                    {reason.connection}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
