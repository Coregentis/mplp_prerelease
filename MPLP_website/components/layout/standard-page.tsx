"use client";

import React from "react";
import { Shell } from "@/components/layout/shell";
import { PageHeader } from "@/components/layout/page-header";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { JsonLd } from "@/components/seo/json-ld";
import { BackToAnchor } from "@/components/ui/back-to-anchor";

interface StandardPageProps {
    title: string;
    subtitle: string;
    kicker?: string;
    breadcrumbs: BreadcrumbItem[];
    children: React.ReactNode;
    jsonLd?: Record<string, unknown>;
    backTo?: {
        href: string;
        label: string;
    };
    /** Content to render ABOVE the page header (e.g., positioning notices) */
    beforeHeader?: React.ReactNode;
}

export function StandardPage({
    title,
    subtitle,
    kicker,
    breadcrumbs,
    children,
    jsonLd,
    backTo,
    beforeHeader,
}: StandardPageProps) {
    return (
        <Shell>
            {jsonLd && <JsonLd data={jsonLd} />}
            <div className="pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {backTo && <BackToAnchor href={backTo.href} label={backTo.label} />}
                <Breadcrumb items={breadcrumbs} />
            </div>
            {beforeHeader && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    {beforeHeader}
                </div>
            )}
            <PageHeader
                title={title}
                subtitle={subtitle}
                kicker={kicker}
            />
            {children}
        </Shell>
    );
}

