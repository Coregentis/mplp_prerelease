"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, DOCS_URLS, REPO_URLS } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

    // Close drawer when route changes
    React.useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button
                    className="md:hidden p-2 -mr-2 text-mplp-text-muted hover:text-mplp-text transition-colors"
                    aria-label="Open navigation menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-[60] bg-mplp-dark/80 backdrop-blur-sm animate-fade-in" />
                <Dialog.Content className="fixed inset-y-0 right-0 z-[70] w-full max-w-xs bg-mplp-dark border-l border-mplp-border p-6 shadow-2xl animate-slide-in-right focus:outline-none">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-8">
                            <Logo className="h-6 w-auto" />
                            <Dialog.Close asChild>
                                <button
                                    className="p-2 -mr-2 text-mplp-text-muted hover:text-mplp-text transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </Dialog.Close>
                        </div>

                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "px-4 py-3 rounded-xl text-lg font-semibold transition-all",
                                            isActive
                                                ? "text-mplp-blue-soft bg-mplp-blue-soft/10 shadow-sm"
                                                : "text-mplp-text-muted hover:text-mplp-text hover:bg-white/5"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-8 border-t border-mplp-border space-y-4">
                            <Link
                                href={DOCS_URLS.home}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm font-medium text-mplp-text-muted hover:text-mplp-text transition-colors"
                            >
                                Documentation →
                            </Link>
                            <Button
                                href={REPO_URLS.root}
                                external
                                variant="secondary"
                                className="w-full justify-start gap-3 h-12"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                GitHub Repository
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
