import { ReactNode } from "react";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    badge?: string;
    centered?: boolean;
    children?: ReactNode;
}

export function SectionTitle({
    title,
    subtitle,
    badge,
    centered = true,
    children,
}: SectionTitleProps) {
    return (
        <div className={`mb-12 ${centered ? "text-center" : ""}`}>
            {badge && (
                <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm">
                    <span className="text-blue-400 text-sm font-semibold tracking-wide uppercase">
                        {badge}
                    </span>
                </div>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            {children}
        </div>
    );
}
