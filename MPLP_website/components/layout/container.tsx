import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
    size?: "default" | "narrow" | "wide";
}

export function Container({
    children,
    className = "",
    size = "default",
}: ContainerProps) {
    const sizeClasses = {
        narrow: "max-w-4xl",
        default: "max-w-7xl",
        wide: "max-w-screen-2xl",
    };

    return (
        <div
            className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
        >
            {children}
        </div>
    );
}
