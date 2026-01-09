import { Container } from "@/components/layout/container";
import { Button } from "@/components/common/button";
import { DOCS_URLS } from "@/lib/site-config";

export function CtaSection() {
    return (
        <section className="py-24 bg-gradient-to-b from-slate-950 to-blue-950 text-white border-t border-slate-800">
            <Container>
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white drop-shadow-lg">
                        Ready to Make Your Agent System MPLP-Conformant?
                    </h2>
                    <p className="text-lg text-blue-200/80 mb-10 leading-relaxed">
                        Whether you&apos;re a runtime author, framework integrator, or enterprise building
                        multi-agent workflows — MPLP provides the governance layer you need.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <Button href={DOCS_URLS.overview} variant="primary" size="lg" external className="shadow-glow hover:shadow-glow-hover">
                            Read the Frozen Specification
                        </Button>
                        <Button href={DOCS_URLS.goldenFlows} variant="outline" size="lg" external className="border-blue-400/30 text-blue-100 hover:bg-blue-500/10 hover:border-blue-400 hover:text-white backdrop-blur-sm">
                            Explore Golden Flows
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
                        <a
                            href={DOCS_URLS.sdkDocs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            TypeScript SDK →
                        </a>
                        <a
                            href={DOCS_URLS.sdkDocs}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Python SDK →
                        </a>
                        <a
                            href={DOCS_URLS.conformance}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            Conformance Checklist →
                        </a>
                        <a
                            href={DOCS_URLS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1"
                        >
                            GitHub →
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}
