import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "accent" | "outline" | "frozen";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    size = "sm",
    className = "",
}: BadgeProps) {
    const variants = {
        default: "bg-mplp-blueSoft text-mplp-blue",
        accent: "bg-green-100 text-mplp-accent",
        outline: "border border-mplp-border text-mplp-gray bg-transparent",
        frozen: "bg-mplp-accent text-white",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </span>
    );
}
