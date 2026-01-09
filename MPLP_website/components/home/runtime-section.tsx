import { Container } from "@/components/layout/container";
import Link from "next/link";
import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/common/button";
import { DOCS_URLS } from "@/lib/site-config";

const runtimeComponents = [
    {
        abbr: "AEL",
        name: "Agent Execution Loop",
        description: "The main execution loop that schedules and coordinates lifecycle phases. Handles task dispatch, phase transitions, and event emission.",
        color: "border-l-mplp-blue",
        href: DOCS_URLS.ael,
    },
    {
        abbr: "VSL",
        name: "Value & State Layer",
        description: "Manages decisions, rewards, and critical state. Provides persistence, versioning, and conflict resolution for agent state.",
        color: "border-l-mplp-accent",
        href: DOCS_URLS.vsl,
    },
    {
        abbr: "PSG",
        name: "Project Semantic Graph",
        description: "The unified graph of Context, Plan, Confirm, Trace, and all module states. The single source of truth for the entire agent system.",
        color: "border-l-orange-500",
        href: DOCS_URLS.psg,
    },
];

export function RuntimeSection() {
    return (
        <section className="py-24 bg-slate-950">
            <Container>
                <SectionTitle
                    badge="Execution Layer"
                    title="Runtime Model: AEL · VSL · PSG"
                    subtitle="L3 (Runtime Glue) defines three core runtime components. Implementations may vary, but must produce conformant outcomes and expose L2 interfaces."
                />

                {/* Runtime Components */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {runtimeComponents.map((component) => (
                        <Link
                            key={component.abbr}
                            href={component.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block bg-glass border border-blue-500/20 border-l-4 ${component.color} rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all group`}
                        >
                            <div className="mb-4">
                                <span className="text-3xl font-bold text-white group-hover:scale-110 transition-transform inline-block">{component.abbr}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{component.name}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{component.description}</p>
                        </Link>
                    ))}
                </div>

                {/* Conformance Note */}
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-xl p-6 mb-4 backdrop-blur-sm">
                    <div className="flex items-start gap-4">
                        <div className="text-2xl">💡</div>
                        <div>
                            <p className="text-white font-medium mb-2">Implementation Freedom, Outcome Conformance</p>
                            <p className="text-slate-400">
                                MPLP does not mandate any specific runtime implementation.
                                A runtime is <strong className="text-blue-400">MPLP-conformant</strong> when it fulfills AEL + VSL + PSG behaviors
                                and satisfies all 11 Kernel Duties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Canonical Note */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 mb-8">
                    <p className="text-sm text-slate-500 text-center">
                        <strong className="text-slate-400">Canonical Note:</strong> Per MPLP v1.0.0, AEL and VSL are both <em>Kernel Duties</em> (AEL-duty, VSL-duty)
                        and <em>L3 Runtime Components</em>. This dual role ensures OS-level guarantees at the execution layer.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button href={DOCS_URLS.l1ToL4} variant="outline" size="lg" external className="border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10">
                        Deep Dive: L1–L4 Architecture →
                    </Button>
                </div>
            </Container>
        </section>
    );
}
