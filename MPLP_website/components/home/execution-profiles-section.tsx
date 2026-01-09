import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/common/section-title";
import { DOCS_URLS } from "@/lib/site-config";

const profiles = [
    {
        id: "SA",
        title: "Single Agent",
        description: "Deterministic single agent execution.",
        features: [
            "Linear reasoning",
            "Self-correction",
            "Direct tool use",
            "Simple memory"
        ],
        color: "bg-blue-600",
        bg: "bg-blue-900/20",
        border: "border-blue-500/30",
        href: DOCS_URLS.saProfile,
    },
    {
        id: "MAP",
        title: "Multi-Agent Protocol",
        description: "Governed multi-agent collaboration.",
        features: [
            "Role-based delegation",
            "Consensus mechanisms",
            "Shared semantic graph",
            "Cross-agent governance"
        ],
        color: "bg-purple-600",
        bg: "bg-purple-900/20",
        border: "border-purple-500/30",
        href: DOCS_URLS.mapProfile,
    }
];

export function ExecutionProfilesSection() {
    return (
        <section className="py-24 bg-slate-950 border-t border-slate-800/50">
            <Container>
                <SectionTitle
                    badge="Execution Modes"
                    title="Execution Profiles"
                    subtitle="MPLP defines two normative execution profiles to ensure consistent behavior across different agent complexities."
                />

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {profiles.map((profile) => (
                        <Link
                            key={profile.id}
                            href={profile.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative overflow-hidden rounded-2xl border ${profile.border} p-8 hover:shadow-lg hover:border-opacity-50 transition-all duration-300 ${profile.bg} backdrop-blur-sm block group`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 text-white group-hover:opacity-20 transition-opacity">
                                {profile.id === "SA" ? (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )}
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 ${profile.color} text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                                        <span className="text-xl font-bold">{profile.id}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">{profile.title}</h3>
                                        <p className="text-slate-400 text-sm">{profile.description}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {profile.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${profile.color}`} />
                                            <span className="text-slate-300 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <Link
                        href={DOCS_URLS.home}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                        View Profiles Documentation
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </Container>
        </section>
    );
}
