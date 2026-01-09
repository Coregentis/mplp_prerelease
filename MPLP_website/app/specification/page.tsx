
import { Shell } from "@/components/layout/shell";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Badge } from "@/components/ui/badge";

export const metadata = {
    title: "Specification Entry",
    description: "Official entry point for the Multi-Agent Lifecycle Protocol (MPLP) specification. Access normative documentation and source schemas.",
};

export default function SpecificationPage() {
    return (
        <Shell>
            <Container className="py-24 sm:py-32">
                <ScrollReveal animation="fade-in-up">
                    <SectionHeader
                        eyebrow="Canonical Entry"
                        title="The MPLP Specification"
                        description="MPLP is a structural protocol, not a framework. This page provides the authoritative paths to the normative specification and its source representation."
                        align="center"
                        className="mb-16"
                    />

                    <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                        {/* Documentation Path */}
                        <div className="mplp-card p-8 sm:p-10 relative overflow-hidden group hover:border-mplp-blue-soft/40 transition-all">
                            <div className="absolute top-0 right-0 p-4">
                                <Badge variant="outline" className="text-[10px] tracking-widest border-mplp-blue-soft/20 text-mplp-blue-soft uppercase">Normative</Badge>
                            </div>
                            <h3 className="text-xl font-bold text-mplp-text mb-4">Official Documentation</h3>
                            <p className="text-mplp-text-muted mb-8 leading-relaxed">
                                The human-readable normative specification, including architectural diagrams, lifecycle state machines, and conformance rules.
                            </p>
                            <Button href={DOCS_URLS.home} external variant="primary" size="lg" className="w-full shadow-glow-hover">
                                Read Specification
                            </Button>
                        </div>

                        {/* Source Path */}
                        <div className="mplp-card p-8 sm:p-10 relative overflow-hidden group hover:border-mplp-blue-soft/40 transition-all">
                            <div className="absolute top-0 right-0 p-4">
                                <Badge variant="outline" className="text-[10px] tracking-widest border-mplp-border text-mplp-text-muted uppercase">Source</Badge>
                            </div>
                            <h3 className="text-xl font-bold text-mplp-text mb-4">Protocol Repository</h3>
                            <p className="text-mplp-text-muted mb-8 leading-relaxed">
                                The machine-readable source of truth, containing JSON Schemas, validator source code, unit tests, and the protocol constitution.
                            </p>
                            <Button href={REPO_URLS.root} external variant="secondary" size="lg" className="w-full border-mplp-border/60">
                                GitHub Repository
                            </Button>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <p className="text-sm text-mplp-text-muted max-w-2xl mx-auto italic">
                            &quot;To ensure interoperability in the agentic era, systems must be built against a stable protocol, not a moving framework target.&quot;
                        </p>
                    </div>
                </ScrollReveal>
            </Container>
        </Shell>
    );
}
