import React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    kicker?: string;
    className?: string;
    children?: React.ReactNode;
}

export function PageHeader({
    title,
    subtitle,
    kicker,
    className,
    children,
}: PageHeaderProps) {
    return (
        <div className={cn("relative overflow-hidden py-20 sm:py-24", className)}>
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-mplp-blue-soft/10 via-mplp-dark to-mplp-dark" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-mplp-blue/10 blur-[100px] rounded-full opacity-50 pointer-events-none" />

            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                {kicker && (
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mplp-border bg-slate-900/50 px-5 py-2 text-base font-bold tracking-wide text-mplp-blue-soft backdrop-blur-sm">
                        {kicker}
                    </div>
                )}

                <h1 className="text-balance text-4xl font-bold tracking-tight text-mplp-text sm:text-5xl lg:text-6xl leading-tight">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-6 text-lg leading-8 text-mplp-text-muted text-balance">
                        {subtitle}
                    </p>
                )}

                {children && <div className="mt-10 flex items-center justify-center gap-x-6">{children}</div>}
            </div>
        </div>
    );
}
