import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

interface BlogListProps {
    posts: BlogPostMeta[];
}

export function BlogList({ posts }: BlogListProps) {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-400">No posts yet. Check back soon!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-8">
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className="group p-8 bg-glass rounded-2xl border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-900/10 transition-all duration-300 relative overflow-hidden"
                >
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all pointer-events-none" />

                    <Link href={`/blog/${post.slug}`} className="block relative z-10">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3">
                            {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                            {post.description}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="text-slate-400">{post.author}</span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <time dateTime={post.date} className="text-slate-400">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                            <span className="w-1 h-1 bg-slate-600 rounded-full" />
                            <span className="text-slate-400">{post.readingTime}</span>
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
}
