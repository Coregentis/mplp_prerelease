import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    external?: boolean;
    onClick?: () => void;
}

export function Button({
    children,
    href,
    variant = "primary",
    size = "md",
    className = "",
    external = false,
    onClick,
}: ButtonProps) {
    const variants = {
        primary:
            "bg-mplp-blue text-white hover:bg-mplp-blueLight shadow-md hover:shadow-lg",
        secondary:
            "bg-mplp-dark text-white hover:bg-gray-800 shadow-md hover:shadow-lg",
        outline:
            "border-2 border-mplp-blue text-mplp-blue hover:bg-mplp-blueSoft",
        ghost: "text-mplp-gray hover:text-mplp-blue hover:bg-mplp-bg",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const baseClasses = `inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        const linkProps = external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};

        return (
            <Link href={href} className={baseClasses} {...linkProps}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseClasses}>
            {children}
        </button>
    );
}
