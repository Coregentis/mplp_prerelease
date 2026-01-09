import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd, generateBreadcrumbSchema } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";

export interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    // Prepare schema data
    const schemaItems = [
        { name: "Home", item: siteConfig.url },
        ...items.map((item) => ({
            name: item.label,
            item: `${siteConfig.url}${item.href}`,
        })),
    ];

    const schema = generateBreadcrumbSchema(schemaItems);

    return (
        <>
            <JsonLd data={schema} />
            <nav aria-label="Breadcrumb" className={`flex items-center text-[11px] font-bold uppercase tracking-wider text-slate-400 ${className}`}>
                <ol className="flex items-center space-x-2">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center hover:text-mplp-blue-soft transition-colors"
                            aria-label="Home"
                        >
                            <Home className="h-3.5 w-3.5" />
                        </Link>
                    </li>

                    {items.map((item, index) => (
                        <li key={`${item.href}-${index}`} className="flex items-center space-x-2">
                            <ChevronRight className="h-3.5 w-3.5 text-mplp-border" />
                            {index === items.length - 1 ? (
                                <span className="text-mplp-blue-light flex items-center gap-2" aria-current="page">
                                    <span className="h-1 w-1 rounded-full bg-mplp-blue-soft shadow-glow-blue" />
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    href={item.href}
                                    className="hover:text-mplp-blue-soft transition-all hover:bg-white/5 px-1.5 py-0.5 rounded"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
