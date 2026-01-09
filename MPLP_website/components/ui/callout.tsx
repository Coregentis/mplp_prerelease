"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IconInfoCircle, IconAlertCircle, IconCheck, IconX } from "@/components/ui/icons";

interface CalloutProps {
    title?: string;
    children: React.ReactNode;
    variant?: "info" | "warning" | "invariant" | "scope" | "non-goal";
    className?: string;
}

export function Callout({ title, children, variant = "info", className }: CalloutProps) {
    const variants = {
        info: {
            bg: "bg-mplp-blue-soft/5",
            border: "border-mplp-blue-soft/30",
            icon: <IconInfoCircle className="h-5 w-5 text-mplp-blue-soft" />,
            titleColor: "text-mplp-blue-light",
            label: "",
        },
        warning: {
            bg: "bg-mplp-warning/5",
            border: "border-mplp-warning/30",
            icon: <IconAlertCircle className="h-5 w-5 text-mplp-warning" />,
            titleColor: "text-mplp-warning",
            label: "",
        },
        invariant: {
            bg: "bg-mplp-dark-soft/50",
            border: "border-mplp-blue-soft/50 shadow-glow-blue/10",
            icon: <div className="h-5 w-5 rounded-full bg-mplp-blue-soft flex items-center justify-center text-[10px] text-white font-bold">I</div>,
            titleColor: "text-mplp-blue-soft",
            label: "Normative Invariant",
        },
        scope: {
            bg: "bg-mplp-emerald/5",
            border: "border-mplp-emerald/30",
            icon: <IconCheck className="h-5 w-5 text-mplp-emerald" />,
            titleColor: "text-mplp-emerald",
            label: "In Scope",
        },
        "non-goal": {
            bg: "bg-mplp-error/5",
            border: "border-mplp-error/30",
            icon: <IconX className="h-5 w-5 text-mplp-error" />,
            titleColor: "text-mplp-error",
            label: "Non-Goal",
        },
    };

    const style = variants[variant];

    return (
        <aside className={cn(
            "my-8 p-6 rounded-2xl border flex gap-6 relative overflow-hidden group transition-all",
            style.bg,
            style.border,
            className
        )}>
            {/* Decorative background element for invariant */}
            {variant === "invariant" && (
                <div className="absolute top-0 right-0 p-2 opacity-5 text-[10px] font-mono select-none">
                    INVARIANT_BLOCK
                </div>
            )}

            <div className="flex-none pt-1">
                {style.icon}
            </div>

            <div className="flex-1">
                {(title || style.label) && (
                    <div className={cn("text-xs font-bold uppercase tracking-[0.2em] mb-3", style.titleColor)}>
                        {title || style.label}
                    </div>
                )}
                <div className="text-sm leading-relaxed text-mplp-text-muted prose prose-invert prose-sm max-w-none">
                    {children}
                </div>
            </div>
        </aside>
    );
}

// Specialized versions
export const InvariantHighlight = ({ title, children, className }: CalloutProps) => (
    <Callout variant="invariant" title={title} className={className}>{children}</Callout>
);

export const ScopeBracket = ({ title, children, className }: CalloutProps) => (
    <Callout variant="scope" title={title} className={className}>{children}</Callout>
);

export const NonGoalBracket = ({ title, children, className }: CalloutProps) => (
    <Callout variant="non-goal" title={title} className={className}>{children}</Callout>
);
