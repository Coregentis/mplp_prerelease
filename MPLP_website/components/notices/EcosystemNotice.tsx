import { DOCS_URLS, REPO_URLS } from "@/lib/site-config";

export function EcosystemNotice() {
    return (
        <div className="max-w-4xl mx-auto p-6 rounded-xl border border-mplp-border bg-slate-950/50">
            <p className="text-sm text-mplp-text-muted leading-relaxed">
                <strong className="text-mplp-text">Informative Ecosystem Overview:</strong>{" "}
                The tools and SDKs described on this page are reference implementations that support
                evaluation and adoption of the MPLP protocol. They are <strong className="text-mplp-text">optional</strong> and
                not required for protocol adoption. This listing does not constitute certification, endorsement,
                or recommendation. For normative protocol definitions, see{" "}
                <a href={DOCS_URLS.home} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">docs.mplp.io</a>.
                For source of truth, see{" "}
                <a href={REPO_URLS.root} target="_blank" rel="noopener noreferrer" className="text-mplp-blue-soft hover:underline">GitHub</a>.
            </p>
        </div>
    );
}
