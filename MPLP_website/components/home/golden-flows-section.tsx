import { Container } from "@/components/layout/container";
import Link from "next/link";
import { SectionTitle } from "@/components/common/section-title";
import { Button } from "@/components/common/button";

/**
 * Golden Flows — Aligned with Flow detail pages
 * displayName = Narrative (homepage)
 * canonicalName = Official Flow title (must match detail page)
 * phases = Simplified version of actual execution steps
 * href = Links to site Flow detail pages (not external docs)
 */
const flows = [
    {
        id: "01",
        displayName: "Intent → Plan",
        canonicalName: "Intent to Plan Transition",
        description: "Transform user intent into structured context and generate an executable plan.",
        phases: ["Context Retrieval", "Plan Generation", "Verification"],
        href: "/golden-flows/flow-01",
    },
    {
        id: "02",
        displayName: "Governed Execution",
        canonicalName: "Governed Execution",
        description: "Execute plans while respecting constraints and emitting trace events.",
        phases: ["Policy Check", "Execution", "Trace Recording"],
        href: "/golden-flows/flow-02",
    },
    {
        id: "03",
        displayName: "Multi-Agent Coordination",
        canonicalName: "Multi-Agent Coordination Loop",
        description: "Coordinate multiple agents with role assignment and atomic task handoffs.",
        phases: ["Role Assignment", "Task Handoff", "Result Aggregation"],
        href: "/golden-flows/flow-03",
    },
    {
        id: "04",
        displayName: "Drift Detection",
        canonicalName: "Drift Detection & Recovery",
        description: "Detect state divergence and trigger recovery or replanning sequences.",
        phases: ["Drift Analysis", "Alert Generation", "Recovery Plan"],
        href: "/golden-flows/flow-04",
    },
    {
        id: "05",
        displayName: "External Integration",
        canonicalName: "Runtime Integration & External I/O",
        description: "Connect to external systems via the L4 Integration Layer with tracked side-effects.",
        phases: ["L4 Adapter", "Protocol Event Handling", "Response"],
        href: "/golden-flows/flow-05",
    },
];

export function GoldenFlowsSection() {
    return (
        <section className="py-24 bg-slate-950">
            <Container>
                <SectionTitle
                    badge="Normative Validation"
                    title="Golden Flows"
                    subtitle="Golden Flows define the normative integration scenarios that every MPLP-conformant runtime is expected to pass."
                />

                {/* Flows Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {flows.map((flow) => (
                        <Link
                            key={flow.id}
                            href={flow.href}
                            className="bg-glass border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all group block"
                        >
                            {/* Flow Number */}
                            <div className="flex items-center gap-3 mb-2">
                                <span className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                                    {flow.id}
                                </span>
                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{flow.displayName}</h3>
                            </div>

                            {/* Canonical Name */}
                            <p className="text-xs text-blue-400/70 font-mono mb-3">{flow.canonicalName}</p>

                            {/* Description */}
                            <p className="text-sm text-slate-400 mb-4">{flow.description}</p>

                            {/* Phases */}
                            <div className="flex flex-wrap gap-2">
                                {flow.phases.map((phase, i) => (
                                    <span
                                        key={phase}
                                        className="text-xs px-2 py-1 bg-blue-900/30 border border-blue-500/20 text-blue-300 rounded-full"
                                    >
                                        {i + 1}. {phase}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button href="/golden-flows" variant="primary" size="lg" className="shadow-glow hover:shadow-glow-hover">
                        Explore All Golden Flows →
                    </Button>
                </div>
            </Container>
        </section>
    );
}
