import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/common/section-title";
import Link from "next/link";
import { DOCS_URLS } from "@/lib/site-config";

const features = [
    {
        layer: "L1",
        name: "Invariants",
        description: "Core contracts that never change. The foundation of agent interoperability.",
        modules: ["Agent Schema", "Lifecycle States", "Message Contract"],
        href: DOCS_URLS.l1ToL4,
    },
    {
        layer: "L2",
        name: "Core Modules",
        description: "Essential capabilities every conformant agent must support.",
        modules: ["Task Execution", "State Management", "Communication"],
        href: DOCS_URLS.moduleInteractions,
    },
    {
        layer: "L3",
        name: "Optional Modules",
        description: "Extended capabilities for advanced use cases.",
        modules: ["Memory", "Tool Use", "Coordination", "Planning"],
        href: DOCS_URLS.moduleInteractions,
    },
    {
        layer: "L4",
        name: "Extensions",
        description: "Domain-specific and vendor extensions.",
        modules: ["Custom Profiles", "Runtime Adapters", "Telemetry Exporters"],
        href: DOCS_URLS.l4IntegrationInfra,
    },
];

export function FeaturesGrid() {
    return (
        <section className="py-20 bg-white">
            <Container>
                <SectionTitle
                    badge="Architecture"
                    title="4-Layer Protocol Architecture"
                    subtitle="MPLP organizes capabilities into a clear hierarchy: stable invariants at the foundation, with progressive flexibility as you move up."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => (
                        <Link
                            key={feature.layer}
                            href={feature.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div
                                className="relative p-6 bg-gradient-to-b from-white to-mplp-bg border border-mplp-border rounded-2xl hover:shadow-soft transition-all duration-300 h-full group-hover:border-blue-400/50"
                            >
                                {/* Layer Badge */}
                                <div className="absolute -top-3 left-6">
                                    <span className="inline-block px-3 py-1 bg-mplp-dark text-white text-xs font-bold rounded-full group-hover:bg-blue-600 transition-colors">
                                        {feature.layer}
                                    </span>
                                </div>

                                <h3 className="text-xl font-semibold text-mplp-dark mt-4 mb-2 group-hover:text-blue-600 transition-colors">
                                    {feature.name}
                                </h3>
                                <p className="text-sm text-mplp-gray mb-4">{feature.description}</p>

                                <ul className="space-y-2">
                                    {feature.modules.map((module) => (
                                        <li
                                            key={module}
                                            className="flex items-center gap-2 text-sm text-mplp-gray"
                                        >
                                            <span className="w-1.5 h-1.5 bg-mplp-blue rounded-full" />
                                            {module}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}
