import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    external?: boolean;
    target?: string;
}

export function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    href,
    external,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mplp-blue-soft/50 focus:ring-offset-2 focus:ring-offset-mplp-dark";

    const variants = {
        primary: "bg-mplp-blue text-white shadow-stable hover:bg-mplp-blue-soft hover:shadow-glow-blue hover:-translate-y-0.5 active:translate-y-0",
        secondary: "border border-mplp-border bg-slate-950/50 text-mplp-text backdrop-blur-sm hover:border-mplp-blue-soft/30 hover:bg-mplp-blue-soft/5 hover:text-mplp-blue-light",
        tertiary: "text-mplp-text-muted hover:text-mplp-text hover:bg-white/5",
        ghost: "bg-transparent hover:bg-white/5 text-mplp-text",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        if (external) {
            return (
                <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
