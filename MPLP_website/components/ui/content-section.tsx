import React from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    className?: string;
    background?: "transparent" | "surface";
}

export function ContentSection({
    children,
    className,
    background = "transparent",
    ...props
}: ContentSectionProps) {
    return (
        <section
            className={cn(
                "py-16 sm:py-24 relative overflow-hidden",
                background === "surface" && "bg-slate-950/30 border-y border-mplp-border/50",
                className
            )}
            {...props}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
}
