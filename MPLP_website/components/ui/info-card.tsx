import React from "react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export function InfoCard({ title, children, className, icon }: InfoCardProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col rounded-2xl border border-mplp-border bg-slate-900/40 p-6 transition-all duration-300 hover:border-mplp-blue-soft/40 hover:-translate-y-1 hover:shadow-glow hover:bg-slate-900/60",
                className
            )}
        >
            {icon && <div className="mb-4 text-mplp-blue-soft">{icon}</div>}
            <h3 className="text-sm font-semibold text-mplp-text group-hover:text-mplp-blue-soft transition-colors">
                {title}
            </h3>
            <div className="mt-2 text-xs leading-relaxed text-mplp-text-muted">
                {children}
            </div>
        </div>
    );
}
