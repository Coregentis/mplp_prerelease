"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // ms
    animation?: "fade-in" | "fade-in-up" | "scale-in";
    threshold?: number;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    animation = "fade-in-up",
    threshold = 0,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const animationClass = {
        "fade-in": "animate-fade-in",
        "fade-in-up": "animate-fade-in-up",
        "scale-in": "animate-scale-in",
    }[animation];

    return (
        <div
            ref={ref}
            className={cn(
                className,
                isVisible ? animationClass : "opacity-0",
                delay > 0 && `animation-delay-${delay}`
            )}
            style={{ animationDelay: isVisible ? `${delay}ms` : "0ms" }}
        >
            {children}
        </div>
    );
}
