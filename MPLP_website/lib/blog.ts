import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    draft: boolean;
    readingTime: string;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    draft: boolean;
    readingTime: string;
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(BLOG_DIR)) {
        return [];
    }

    const files = fs.readdirSync(BLOG_DIR);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString().split("T")[0],
        author: data.author || "MPLP Team",
        tags: data.tags || [],
        draft: data.draft || false,
        readingTime: stats.text,
        content,
    };
}

export function getAllPosts(): BlogPostMeta[] {
    const slugs = getAllPostSlugs();
    const posts = slugs
        .map((slug) => {
            const post = getPostBySlug(slug);
            if (!post) return null;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { content, ...meta } = post;
            return meta;
        })
        .filter((post): post is BlogPostMeta => post !== null && !post.draft)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
}
