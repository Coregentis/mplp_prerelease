import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
    className?: string;
    align?: "left" | "center";
}

export function SectionHeader({
    eyebrow,
    title,
    description,
    className,
    align = "center",
}: SectionHeaderProps) {
    return (
        <div className={cn("max-w-3xl mx-auto", align === "center" && "text-center", className)}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mplp-blue-soft/80 mb-4">
                {eyebrow}
            </p>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-mplp-text sm:text-3xl leading-tight">
                {title}
            </h2>
            {description && (
                <p className="mt-4 text-base leading-relaxed text-mplp-text-muted/90">
                    {description}
                </p>
            )}
        </div>
    );
}
