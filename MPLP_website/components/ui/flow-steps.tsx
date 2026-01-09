"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Step {
    name: string;
    desc?: string;
}

interface FlowStepsProps {
    steps: Step[];
    className?: string;
    variant?: "compact" | "detailed";
}

export function FlowSteps({ steps, className, variant = "compact" }: FlowStepsProps) {
    return (
        <div className={cn("w-full", className)}>
            {/* Desktop: Horizontal Lifeline */}
            <div className="hidden md:flex items-start justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-[15px] left-0 w-full h-px bg-gradient-to-r from-mplp-blue-soft/20 via-mplp-blue-soft/50 to-mplp-blue-soft/20 -z-10" />

                {steps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center px-2 group">
                        <div className="h-8 w-8 rounded-full bg-mplp-dark border border-mplp-border flex items-center justify-center text-[10px] font-bold text-mplp-blue-soft group-hover:border-mplp-blue-soft/50 group-hover:shadow-glow-blue transition-all duration-300">
                            {i + 1}
                        </div>
                        <div className="mt-3">
                            <h4 className="text-[11px] font-bold text-mplp-text uppercase tracking-wider group-hover:text-mplp-blue-light transition-colors">
                                {step.name}
                            </h4>
                            {variant === "detailed" && step.desc && (
                                <p className="mt-2 text-[11px] text-mplp-text-muted leading-relaxed max-w-[150px]">
                                    {step.desc}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Mobile: Vertical Lifeline */}
            <div className="flex flex-col md:hidden space-y-6 relative">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-mplp-blue-soft/20 via-mplp-blue-soft/50 to-mplp-blue-soft/20 -z-10" />

                {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 group">
                        <div className="flex-none h-8 w-8 rounded-full bg-mplp-dark border border-mplp-border flex items-center justify-center text-[10px] font-bold text-mplp-blue-soft group-hover:border-mplp-blue-soft/50 transition-all">
                            {i + 1}
                        </div>
                        <div className="pt-1">
                            <h4 className="text-sm font-bold text-mplp-text uppercase tracking-wider group-hover:text-mplp-blue-light transition-colors">
                                {step.name}
                            </h4>
                            {step.desc && (
                                <p className="mt-1 text-xs text-mplp-text-muted leading-relaxed">
                                    {step.desc}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
