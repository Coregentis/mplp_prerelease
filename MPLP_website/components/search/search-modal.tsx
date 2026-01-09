"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { sortByTierAndRelevance } from "@/lib/search/page-tier";

interface SearchResult {
    url: string;
    meta: {
        title?: string;
    };
    excerpt: string;
    score?: number;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * Convert Pagefind build path to actual route.
 * Pagefind indexes .next/server/app/*.html files, but we need the actual route.
 * Examples:
 * - /server/app/governance.html -> /governance
 * - /server/app/modules/context.html -> /modules/context
 * - /server/app/index.html -> /
 */
function pagefindUrlToRoute(url: string): string {
    // Extract pathname from URL
    let pathname = url;
    try {
        pathname = new URL(url, "http://localhost").pathname;
    } catch {
        // URL parsing failed, use as-is
    }

    // Remove .next build path prefixes and .html suffix
    pathname = pathname
        .replace(/^\/server\/app/, "")
        .replace(/^\/static\/app/, "")
        .replace(/\.html$/, "")
        .replace(/\/index$/, "/")
        .replace(/\/$/, "") || "/";

    return pathname;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [pagefind, setPagefind] = useState<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Load Pagefind
    useEffect(() => {
        async function loadPagefind() {
            if (typeof window !== "undefined") {
                try {
                    // Check if pagefind exists first to avoid noisy console error in dev
                    const response = await fetch("/pagefind/pagefind.js", { method: "HEAD" });
                    if (!response.ok) {
                        console.warn("Search index not found. Run 'npm run postbuild' to generate.");
                        return;
                    }

                    // @ts-expect-error - Pagefind is loaded at runtime from the generated index
                    const pf = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js");
                    await pf.init();
                    setPagefind(pf);
                } catch (err) {
                    // Silence errors in dev environment if index is simply missing
                    if (process.env.NODE_ENV === "development") {
                        console.log("Pagefind search is inactive (missing index).");
                    } else {
                        console.error("Failed to load Pagefind index:", err);
                    }
                }
            }
        }
        loadPagefind();
    }, []);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Handle search
    const handleSearch = useCallback(
        async (searchQuery: string) => {
            if (!pagefind || !searchQuery.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const search = await pagefind.search(searchQuery);
                const data = await Promise.all(
                    search.results.slice(0, 10).map((r: { data: () => Promise<SearchResult> }) => r.data())
                );
                const sorted = sortByTierAndRelevance(data);
                setResults(sorted);
            } catch (e) {
                console.error("Search error:", e);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        },
        [pagefind]
    );

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 200);
        return () => clearTimeout(timer);
    }, [query, handleSearch]);

    // Close on Escape
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl bg-mplp-dark border border-mplp-border rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-mplp-border">
                    <svg
                        className="w-5 h-5 text-mplp-text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search documentation..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-mplp-text placeholder-mplp-text-muted text-base outline-none"
                    />
                    <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono text-mplp-text-muted bg-mplp-dark-soft border border-mplp-border rounded">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto">
                    {isLoading && (
                        <div className="px-4 py-8 text-center text-mplp-text-muted">
                            Searching...
                        </div>
                    )}

                    {!isLoading && query && results.length === 0 && (
                        <div className="px-4 py-8 text-center text-mplp-text-muted">
                            No results found for &quot;{query}&quot;
                        </div>
                    )}

                    {!isLoading && results.length > 0 && (
                        <ul className="py-2">
                            {results.map((result, index) => (
                                <li key={index}>
                                    <Link
                                        href={pagefindUrlToRoute(result.url)}
                                        onClick={onClose}
                                        className="block px-4 py-3 hover:bg-mplp-blue-soft/10 transition-colors"
                                    >
                                        <div className="text-sm font-medium text-mplp-text">
                                            {result.meta?.title || "Untitled"}
                                        </div>
                                        <div
                                            className="text-xs text-mplp-text-muted mt-1 line-clamp-2"
                                            dangerouslySetInnerHTML={{ __html: result.excerpt }}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {!isLoading && !query && (
                        <div className="px-4 py-8 text-center text-mplp-text-muted text-sm">
                            Start typing to search...
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-mplp-border flex items-center justify-between text-xs text-mplp-text-muted">
                    <span>
                        Powered by{" "}
                        <a
                            href="https://pagefind.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-mplp-blue-soft hover:underline"
                        >
                            Pagefind
                        </a>
                    </span>
                    <span>↑↓ to navigate · ↵ to select</span>
                </div>
            </div>
        </div>,
        document.body
    );
}
