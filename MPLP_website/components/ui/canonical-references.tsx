import Link from "next/link";
import { DOCS_URLS, REPO_URLS, type DocsKey, type RepoKey } from "@/lib/site-config";

export interface CanonicalReferencesProps {
    /** Show link to /definition (default: true) */
    showDefinition?: boolean;
    /** Key into DOCS_URLS for normative spec link (default: "home") */
    docsKey?: DocsKey;
    /** Key into REPO_URLS for source of truth link (default: "root") */
    repoKey?: RepoKey;
    /** Display variant: compact (inline) or full (with explanation) */
    variant?: "compact" | "full";
}

/**
 * Canonical References Component (Key-Driven SSoT)
 * 
 * Provides standardized links back to authority chain:
 * - /definition (site anchor)
 * - docs.mplp.io (normative spec)
 * - GitHub repo (source of truth)
 * 
 * KEY GOVERNANCE PROPERTY: This component ONLY accepts key references,
 * not URL strings. This ensures all external links go through SSoT
 * and can be validated by the governance gate.
 * 
 * Part of WG-04: All pages must link out to authority sources.
 */
export function CanonicalReferences({
    showDefinition = true,
    docsKey = "home",
    repoKey = "root",
    variant = "compact",
}: CanonicalReferencesProps) {
    const docsUrl = DOCS_URLS[docsKey];
    const repoUrl = REPO_URLS[repoKey];

    const items = [
        showDefinition
            ? { label: "Definition", href: "/definition", external: false }
            : null,
        docsUrl
            ? { label: "Normative Spec (Docs)", href: docsUrl, external: true }
            : null,
        repoUrl
            ? { label: "Source of Truth (Repo)", href: repoUrl, external: true }
            : null,
    ].filter(Boolean) as Array<{ label: string; href: string; external: boolean }>;


    return (
        <div className="mt-6 mb-10">
            <div className="rounded-xl border border-mplp-border/40 bg-slate-950/30 px-4 py-3">
                <div className="text-xs font-semibold text-mplp-text-muted/70 uppercase tracking-wider mb-2">
                    Canonical References
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                    {items.map((it) =>
                        it.external ? (
                            <a
                                key={it.href}
                                href={it.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-mplp-blue-soft hover:underline"
                            >
                                {it.label} →
                            </a>
                        ) : (
                            <Link
                                key={it.href}
                                href={it.href}
                                className="text-mplp-blue-soft hover:underline"
                            >
                                {it.label} →
                            </Link>
                        )
                    )}
                </div>

                {variant === "full" && (
                    <p className="mt-2 text-xs text-mplp-text-muted/70">
                        This website provides discovery and positioning content only.
                        Normative requirements live in Docs; the ultimate source of truth is the Repository.
                    </p>
                )}
            </div>
        </div>
    );
}
