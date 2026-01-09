import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "error" | "outline";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    const variants = {
        default: "bg-mplp-blue-soft/10 text-mplp-blue-soft border-mplp-blue-soft/20",
        success: "bg-mplp-emerald/10 text-mplp-emerald border-mplp-emerald/20",
        warning: "bg-mplp-warning/10 text-mplp-warning border-mplp-warning/20",
        error: "bg-mplp-error/10 text-mplp-error border-mplp-error/20",
        outline: "bg-transparent text-mplp-text-muted border-mplp-border",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
}
