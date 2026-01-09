import { ReactNode } from "react";
import Link from "next/link";

interface CardProps {
    title: string;
    description?: string;
    icon?: ReactNode;
    href?: string;
    className?: string;
    children?: ReactNode;
}

export function Card({
    title,
    description,
    icon,
    href,
    className = "",
    children,
}: CardProps) {
    const content = (
        <div
            className={`p-6 bg-white border border-mplp-border rounded-2xl shadow-card hover:shadow-soft transition-all duration-300 ${href ? "hover:border-mplp-blue cursor-pointer" : ""
                } ${className}`}
        >
            {icon && (
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-mplp-blueSoft text-mplp-blue rounded-xl">
                    {icon}
                </div>
            )}
            <h3 className="text-xl font-semibold text-mplp-dark mb-2">{title}</h3>
            {description && (
                <p className="text-mplp-gray text-sm leading-relaxed">{description}</p>
            )}
            {children}
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
}
