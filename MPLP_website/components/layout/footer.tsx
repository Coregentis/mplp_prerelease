import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site-config";
import { Logo } from "@/components/ui/logo";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-mplp-dark text-mplp-text border-t border-mplp-border/50 relative z-10" aria-label="Site Footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-4">
                        <Link href="/" className="mb-4 inline-block" aria-label="MPLP Home">
                            <Logo className="h-7 w-auto" />
                        </Link>
                        <p className="text-mplp-text-muted text-sm leading-relaxed max-w-xs font-normal">
                            <strong>Multi-Agent Lifecycle Protocol</strong><br />
                            MPLP is a vendor-neutral lifecycle protocol for AI agents—observable, governed, and evidence-based.
                        </p>
                    </div>

                    {/* Links Columns - High Density / Technical */}
                    <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8" role="navigation" aria-label="Footer Navigation">
                        {/* Specification (Anchors #1-4) */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-mplp-text mb-4 border-b border-mplp-border/50 pb-2">Specification</h3>
                            <ul className="space-y-2">
                                {footerLinks.specification.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-mplp-text-muted hover:text-mplp-blue-light text-[13px] transition-colors font-medium block py-0.5"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Governance (Anchors #5-7) */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-mplp-text mb-4 border-b border-mplp-border/50 pb-2">Governance</h3>
                            <ul className="space-y-2">
                                {footerLinks.governance.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-mplp-text-muted hover:text-mplp-blue-light text-[13px] transition-colors font-medium block py-0.5"
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                            {link.label}{link.href.startsWith("http") && " ↗"}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* External / Community */}
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-mplp-text mb-4 border-b border-mplp-border/50 pb-2">Community</h3>
                            <ul className="space-y-2">
                                {footerLinks.external.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-mplp-text-muted hover:text-mplp-blue-light text-[13px] transition-colors font-medium block py-0.5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.label} ↗
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-mplp-border/50">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-mplp-text-muted text-xs">
                            <strong>MPLP</strong> = Multi-Agent Lifecycle Protocol (not a license).
                        </p>
                        <p className="text-mplp-text-muted text-xs">
                            © {currentYear} Bangshi Beijing Network Technology Co., Ltd. Licensed under Apache License 2.0.
                        </p>
                    </div>
                    <div className="flex justify-center gap-6 mt-6">
                        <Link
                            href={siteConfig.links.github}
                            className="text-mplp-text-muted hover:text-mplp-text transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="MPLP on GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                        </Link>
                        <Link
                            href={siteConfig.links.twitter}
                            className="text-mplp-text-muted hover:text-mplp-text transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="MPLP on X (formerly Twitter)"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
