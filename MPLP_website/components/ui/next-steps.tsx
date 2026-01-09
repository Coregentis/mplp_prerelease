import { DOCS_URLS, REPO_URLS } from "@/lib/site-config";

export interface NextStepsProps {
    /** Key into DOCS_URLS for primary spec link */
    docsKey: keyof typeof DOCS_URLS;
    /** Key into REPO_URLS for source of truth (default: "root") */
    repoKey?: keyof typeof REPO_URLS;
    /** Key into DOCS_URLS for verification evidence (default: "goldenFlows") */
    evidenceKey?: keyof typeof DOCS_URLS;
    /** Display variant: compact or full with explanation */
    variant?: "compact" | "full";
}

/**
 * NextSteps Component
 * 
 * Provides standardized 3-button CTA for every anchor page:
 * 1. Read the Spec → docs.mplp.io (page-specific)
 * 2. View Source of Truth → GitHub (page-specific path)
 * 3. See Verification Evidence → Golden Flows / Conformance docs
 * 
 * Key-based URL resolution ensures single source of truth for all links.
 * Part of WG-04: Authority chain enforcement.
 */
export function NextSteps({
    docsKey,
    repoKey = "root",
    evidenceKey = "goldenFlows",
    variant = "full",
}: NextStepsProps) {
    const docsUrl = DOCS_URLS[docsKey];
    const repoUrl = REPO_URLS[repoKey];
    const evidenceUrl = DOCS_URLS[evidenceKey];

    return (
        <div className="mt-10">
            <div className="rounded-2xl border border-mplp-border bg-slate-950/40 p-6">
                <div className="text-xs font-semibold text-mplp-text-muted/70 uppercase tracking-wider mb-3">
                    Next Steps
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <a
                        href={docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-mplp-border hover:border-mplp-blue-soft/60 transition-colors text-mplp-text text-sm"
                    >
                        Read the Spec →
                    </a>

                    <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-mplp-border hover:border-mplp-blue-soft/60 transition-colors text-mplp-text text-sm"
                    >
                        View Source of Truth →
                    </a>

                    <a
                        href={evidenceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl px-4 py-2 border border-mplp-border hover:border-mplp-blue-soft/60 transition-colors text-mplp-text text-sm"
                    >
                        See Verification Evidence →
                    </a>
                </div>

                {variant === "full" && (
                    <p className="mt-3 text-xs text-mplp-text-muted/70">
                        Evidence is evaluated through documentation-defined scenarios and replayable artifacts.
                        This website does not certify or endorse implementations.
                    </p>
                )}
            </div>
        </div>
    );
}
