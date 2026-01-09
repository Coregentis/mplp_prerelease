import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/common/section-title";
import { BlogList } from "@/components/blog/blog-list";
import { getAllPosts } from "@/lib/blog";
import { BackToAnchor } from "@/components/ui/back-to-anchor";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
    title: "Blog",
    description: "MPLP Protocol news, updates, and technical articles.",
    alternates: {
        canonical: `${siteConfig.url}/blog`,
    },
    keywords: [
        ...siteConfig.keywords,
        "AI Blog",
        "Protocol Updates",
        "Tutorials",
        "Case Studies",
        "Announcements",
    ],
};

export default function BlogPage() {
    const posts = getAllPosts();

    // Blog index schema (authority + absolute URL). No Breadcrumb JSON-LD here by design.
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "MPLP Blog",
        "description": "Protocol updates, technical deep-dives, and announcements for MPLP.",
        "url": `${siteConfig.url}/blog`,
        "isPartOf": { "@id": `${siteConfig.url}#website` },
        "publisher": { "@id": `${siteConfig.url}#mpgc` },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${siteConfig.url}/blog`,
        },
    };

    return (
        <>
            <JsonLd data={blogSchema} />
            <div className="py-20">
                <Container size="narrow">
                    <BackToAnchor href="/faq" label="FAQ" />
                    <SectionTitle
                        badge="Blog"
                        title="Protocol Updates & Insights"
                        subtitle="News, technical deep-dives, and announcements from the MPLP team."
                    />

                    <BlogList posts={posts} />
                </Container>
            </div>
        </>
    );
}
