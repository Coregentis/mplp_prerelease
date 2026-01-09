import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";

interface BackToAnchorProps {
    /** Target anchor path */
    href: string;
    /** Anchor name (e.g., "Governance", "FAQ") */
    label: string;
    /** Optional additional classes */
    className?: string;
}

/**
 * BackToAnchor Component
 * 
 * Governance requirement: All non-anchor pages MUST include this component
 * to ensure ≤3 clicks back to one of the 7 semantic anchors.
 * 
 * Anchor mapping:
 * - /why-mplp → /faq
 * - /compliance (legacy) → /governance/overview [TERM-WAIVER: Historical reference]
 * - /ecosystem → /references
 * - /blog/* → /faq
 * - /governance/* (subpages) → /governance/overview
 */

export function BackToAnchor({ href, label, className = "" }: BackToAnchorProps) {
    return (
        <div className={`mb-8 ${className}`}>
            <Link
                href={href}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-mplp-text-muted hover:text-mplp-blue-soft transition-colors group"
            >
                <span className="rotate-180 group-hover:-translate-x-1 transition-transform">
                    <IconArrowRight className="h-3 w-3" />
                </span>
                Back to {label}
            </Link>
        </div>
    );
}
