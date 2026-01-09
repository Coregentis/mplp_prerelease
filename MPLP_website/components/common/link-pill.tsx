import Link from "next/link";
import { ReactNode } from "react";

interface LinkPillProps {
    href: string;
    icon?: ReactNode;
    children: ReactNode;
    external?: boolean;
}

export function LinkPill({ href, icon, children, external = false }: LinkPillProps) {
    const linkProps = external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-mplp-border rounded-full text-sm font-medium text-mplp-gray hover:text-mplp-blue hover:border-mplp-blue transition-all duration-200 shadow-sm hover:shadow-card"
            {...linkProps}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            {children}
        </Link>
    );
}

// Pre-built icon pills
export function GitHubPill({ href }: { href: string }) {
    return (
        <LinkPill
            href={href}
            external
            icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
            }
        >
            GitHub
        </LinkPill>
    );
}

export function DocsPill({ href }: { href: string }) {
    return (
        <LinkPill
            href={href}
            external
            icon={
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            }
        >
            Documentation
        </LinkPill>
    );
}

export function NpmPill({ href }: { href: string }) {
    return (
        <LinkPill
            href={href}
            external
            icon={
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
                </svg>
            }
        >
            NPM
        </LinkPill>
    );
}
