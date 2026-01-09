import { Container } from "@/components/layout/container";
import { Button } from "@/components/common/button";
import { DOCS_URLS } from "@/lib/site-config";
import Link from "next/link";

export function ArchitectureSection() {
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Protocol <span className="text-blue-400">Architecture</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        A layered protocol design separating normative invariants from behavioral runtimes.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
                    {/* L1: Core Protocol (Large Card) */}
                    <Link
                        href={DOCS_URLS.l1CoreProtocol}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:col-span-8 bg-glass rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-all group relative overflow-hidden block"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">L1</span>
                                <span className="text-blue-400 text-xs font-bold tracking-wider uppercase">Normative</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Core Protocol</h3>
                            <p className="text-slate-400 mb-6 max-w-lg">
                                The stable foundation defining schemas, invariants, and event families. This is the OS kernel contract.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["29 JSON Schemas", "5 Invariant Rules", "12 Event Families"].map(item => (
                                    <span key={item} className="px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-sm rounded-full">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>

                    {/* L2: Coordination (Tall Card) */}
                    <Link
                        href={DOCS_URLS.moduleInteractions}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:col-span-4 row-span-2 bg-glass rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all group relative overflow-hidden block"
                    >
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-purple-500/20 transition-all" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">L2</span>
                                <span className="text-purple-400 text-xs font-bold tracking-wider uppercase">Normative</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">Coordination</h3>
                            <p className="text-slate-400 mb-6">
                                10 modular components structuring multi-agent behavior and governance.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["Context", "Plan", "Confirm", "Trace", "Role", "Dialog", "Collab", "Extension", "Core", "Network"].map(item => (
                                    <span key={item} className="px-2 py-1 bg-slate-800/50 border border-slate-700 text-slate-300 text-xs rounded-md">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>

                    {/* L3: Runtime Glue (Medium Card) */}
                    <Link
                        href={DOCS_URLS.runtimeOverview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:col-span-4 bg-glass rounded-2xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden block"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">L3</span>
                                <span className="text-cyan-400 text-xs font-bold tracking-wider uppercase">Behavioral</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Runtime Glue</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                AEL, VSL, and PSG implementation layers.
                            </p>
                        </div>
                    </Link>

                    {/* L4: Integration (Medium Card) */}
                    <Link
                        href={DOCS_URLS.l4IntegrationInfra}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="lg:col-span-4 bg-glass rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/50 transition-all group relative overflow-hidden block"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">L4</span>
                                <span className="text-emerald-400 text-xs font-bold tracking-wider uppercase">Optional</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">Integration</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Adapters for external tools & CI/CD.
                            </p>
                        </div>
                    </Link>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button href={DOCS_URLS.architecture} variant="outline" size="lg" external className="border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 hover:bg-blue-500/10">
                        Explore Full Architecture →
                    </Button>
                </div>
            </Container>
        </section>
    );
}
