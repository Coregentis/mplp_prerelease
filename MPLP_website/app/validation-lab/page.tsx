import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { NonCertificationNotice } from "@/components/notices";
import { FlaskConical, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Validation Lab — MPLP",
    description: "MPLP Validation Lab provides evidence-based conformance evaluation tools. This is not an auditing service. All validation is self-declared and evidence-based.",
    alternates: {
        canonical: `${siteConfig.url}/validation-lab`,
    },
};

export default function ValidationLabPage() {
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "MPLP Validation Lab",
        "description": "Evidence-based conformance evaluation tools for MPLP protocol",
        "url": `${siteConfig.url}/validation-lab`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/validation-lab`
        },
        "isPartOf": { "@id": `${siteConfig.url}#website` }
    };

    return (
        <Shell>
            <JsonLd data={webPageSchema} />

            <PageHeader
                title="Validation Lab"
                subtitle="Evidence-based conformance evaluation for MPLP protocol."
                kicker="Evaluation Tools"
            />

            {/* Non-Certification Notice */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <NonCertificationNotice />
                </div>
            </ContentSection>

            {/* Coming Soon */}
            <ContentSection background="surface">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-mplp-blue-soft/10 mb-8">
                        <FlaskConical className="h-10 w-10 text-mplp-blue-soft" />
                    </div>

                    <h2 className="text-3xl font-bold text-mplp-text mb-4">
                        Coming Soon
                    </h2>

                    <p className="text-lg text-mplp-text-muted mb-8 max-w-xl mx-auto">
                        The Validation Lab will provide tools for evaluating conformance with MPLP protocol semantics.
                        All evaluation is <strong>evidence-based</strong> and <strong>self-declared</strong>.
                    </p>

                    <div className="mplp-card p-8 text-left max-w-xl mx-auto">
                        <h3 className="text-lg font-bold text-mplp-text mb-4">What to Expect</h3>
                        <ul className="space-y-3 text-sm text-mplp-text-muted">
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Golden Flow test runners for conformance evaluation</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Schema validators for Plan, Confirm, Trace, and Snapshot modules</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Evidence chain verification tools</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-mplp-emerald mt-0.5">✓</span>
                                <span>Self-assessment reports for conformance documentation</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ContentSection>

            {/* Boundary Statement */}
            <ContentSection>
                <div className="max-w-4xl mx-auto">
                    <div className="rounded-2xl border border-mplp-border bg-slate-950/50 p-8">
                        <h3 className="text-lg font-bold text-mplp-text mb-4">
                            Validation Lab Boundaries
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold text-mplp-emerald mb-2">What It Will Provide</p>
                                <ul className="space-y-2 text-sm text-mplp-text-muted">
                                    <li>• Evidence-based evaluation tools</li>
                                    <li>• Self-assessment frameworks</li>
                                    <li>• Golden Flow test execution</li>
                                    <li>• Schema validation utilities</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-mplp-text-muted mb-2">What It Will NOT Provide</p>
                                <ul className="space-y-2 text-sm text-mplp-text-muted">
                                    <li>• Official auditing or assessment</li>
                                    <li>• Badges, seals, or marks</li>
                                    <li>• Third-party verification</li>
                                    <li>• Regulatory or legal guarantees</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentSection>

            {/* In the Meantime */}
            <ContentSection background="surface">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-mplp-text mb-4">
                        In the Meantime
                    </h2>
                    <p className="text-mplp-text-muted mb-8">
                        Explore the conformance model and Golden Flows to understand
                        how MPLP defines protocol-level evaluation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button href="/golden-flows" variant="primary">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            View Golden Flows
                        </Button>
                        <Button href="/conformance" variant="secondary" className="border-mplp-border/50">
                            Conformance Model
                        </Button>
                        <Button href="/governance/evidence-chain" variant="secondary" className="border-mplp-border/50">
                            Evidence Chain
                        </Button>
                    </div>
                </div>
            </ContentSection>
        </Shell>
    );
}
