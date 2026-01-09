import { ReactElement } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog";
import { Badge } from "@/components/common/badge";
import { Container } from "@/components/layout/container";
import { BackToAnchor } from "@/components/ui/back-to-anchor";

interface BlogPostPageProps {
    post: BlogPost;
    content: ReactElement;
}

export function BlogPostPage({ post, content }: BlogPostPageProps) {
    return (
        <article className="py-12">
            <Container size="narrow">
                {/* Back to Anchor (FAQ) - Per governance alignment pass */}
                <BackToAnchor href="/faq" label="FAQ" />

                {/* Back Link */}
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>

                {/* Header */}
                <header className="mb-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="default" size="sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-slate-400 mb-6">{post.description}</p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-800">
                        <span className="font-medium text-slate-300">{post.author}</span>
                        <span>•</span>
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                    </div>
                </header>

                {/* Content */}
                <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white prose-p:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-300 prose-pre:bg-slate-900/50 prose-pre:border prose-pre:border-slate-800 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white">
                    {content}
                </div>
            </Container>
        </article>
    );
}
