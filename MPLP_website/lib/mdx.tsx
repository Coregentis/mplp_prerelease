import { compileMDX } from "next-mdx-remote/rsc";
import { ReactElement } from "react";
import remarkGfm from "remark-gfm";

// Custom MDX components
const mdxComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <h1 className="text-4xl font-bold text-mplp-text mb-6">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-3xl font-semibold text-mplp-text mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-2xl font-semibold text-mplp-text mt-6 mb-3">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <p className="text-mplp-text-muted leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
        <a
            href={href}
            className="text-mplp-blue-soft hover:text-mplp-blue-light underline transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
            {children}
        </a>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc list-inside text-mplp-text-muted mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal list-inside text-mplp-text-muted mb-4 space-y-2">{children}</ol>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-mplp-dark-soft text-mplp-blue-soft px-1.5 py-0.5 rounded text-sm font-mono border border-mplp-border">
            {children}
        </code>
    ),
    pre: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-mplp-dark-soft text-mplp-text p-4 rounded-xl overflow-x-auto mb-4 border border-mplp-border">
            {children}
        </pre>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-mplp-blue-soft pl-4 italic text-mplp-text-muted my-4">
            {children}
        </blockquote>
    ),
    // Table components
    table: ({ children }: { children: React.ReactNode }) => (
        <div className="overflow-x-auto my-8 rounded-lg border border-mplp-border">
            <table className="w-full text-left text-sm">{children}</table>
        </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <thead className="bg-mplp-dark-soft text-mplp-text font-semibold border-b border-mplp-border">
            {children}
        </thead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <tbody className="divide-y divide-mplp-border bg-mplp-dark/50">
            {children}
        </tbody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <tr className="hover:bg-mplp-dark-soft/50 transition-colors">
            {children}
        </tr>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <th className="px-6 py-4 whitespace-nowrap">{children}</th>
    ),
    td: ({ children }: { children: React.ReactNode }) => (
        <td className="px-6 py-4 text-mplp-text-muted">{children}</td>
    ),
};

export async function renderMDX(source: string): Promise<ReactElement> {
    const { content } = await compileMDX({
        source,
        components: mdxComponents,
        options: {
            parseFrontmatter: false,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
        },
    });

    return content;
}
