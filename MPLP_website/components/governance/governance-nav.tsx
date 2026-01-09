import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import { DOCS_URLS } from "@/lib/site-config";

interface GovernanceNavProps {
    current?: string;
}

const siblings = [
    { href: "/governance/overview", label: "Overview" },
    { href: "/governance/agentos-protocol", label: "Agent OS Protocol" },
    { href: "/governance/evidence-chain", label: "Evidence Chain" },
    { href: "/governance/governed-stack", label: "Governed Stack" },
    { href: "/governance/iso-iec-42001", label: "ISO/IEC 42001" },
    { href: "/governance/nist-ai-rmf", label: "NIST AI RMF" },
];

const downstream = [
    { href: "/conformance", label: "Conformance Levels" },
    { href: "/golden-flows", label: "Golden Flows" },
    { href: DOCS_URLS.home, label: "Documentation", external: true },
];

export function GovernanceNav({ current }: GovernanceNavProps) {
    return (
        <div className="border-t border-mplp-border mt-12 pt-12">
            {/* Back to Governance */}
            {current !== "/governance" && (
                <div className="mb-8">
                    <Link
                        href="/governance"
                        className="inline-flex items-center gap-2 text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors"
                    >
                        ← Back to Governance
                    </Link>
                </div>
            )}

            {/* Sibling Navigation */}
            <div className="mb-8">
                <h4 className="text-xs font-semibold text-mplp-text-muted uppercase tracking-wider mb-4">
                    Governance Topics
                </h4>
                <div className="flex flex-wrap gap-3">
                    {siblings
                        .filter((s) => s.href !== current)
                        .map((s) => (
                            <Link
                                key={s.href}
                                href={s.href}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-mplp-text-muted border border-mplp-border hover:border-mplp-blue-soft/30 hover:text-mplp-blue-soft transition-colors"
                            >
                                {s.label}
                            </Link>
                        ))}
                </div>
            </div>

            {/* Downstream Links */}
            <div>
                <h4 className="text-xs font-semibold text-mplp-text-muted uppercase tracking-wider mb-4">
                    Related Resources
                </h4>
                <div className="flex flex-wrap gap-6">
                    {downstream.map((d) => (
                        <Link
                            key={d.href}
                            href={d.href}
                            target={d.external ? "_blank" : undefined}
                            rel={d.external ? "noopener noreferrer" : undefined}
                            className="inline-flex items-center gap-2 text-sm text-mplp-text-muted hover:text-mplp-blue-soft transition-colors"
                        >
                            <IconArrowRight className="h-4 w-4 text-mplp-blue-soft" />
                            {d.label}
                            {d.external && <span className="text-xs">↗</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
