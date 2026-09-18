'use client'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const components: Components = {
    // Links open safely in a new tab
    a: ({ href, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-900 underline decoration-zinc-300 underline-offset-2 hover:decoration-zinc-900"
        >
            {children}
        </a>
    ),
    // Fenced blocks scroll instead of stretching the layout
    pre: ({ children }) => (
        <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-white p-3 text-xs">
            {children}
        </pre>
    ),
    code: ({ className, children, ...props }) => {
        const isBlock = typeof className === 'string' && className.includes('language-')
        if (isBlock) {
            return (
                <code className={`${className} bg-transparent p-0 text-xs`} {...props}>
                    {children}
                </code>
            )
        }
        return (
            <code
                className="rounded bg-zinc-200/70 px-1 py-0.5 text-[0.85em] font-medium text-zinc-800 before:content-none after:content-none"
                {...props}
            >
                {children}
            </code>
        )
    },
    // GFM tables need their own scroll container on narrow screens
    table: ({ children }) => (
        <div className="overflow-x-auto">
            <table className="w-full text-left">{children}</table>
        </div>
    ),
}

export default function Markdown({
    children,
    isStreaming = false,
}: {
    children: string
    isStreaming?: boolean
}) {
    return (
        <div
            className={[
                'prose prose-sm max-w-none',
                'prose-headings:font-semibold prose-headings:text-zinc-900',
                'prose-p:leading-relaxed prose-p:text-zinc-700',
                'prose-strong:text-zinc-900',
                'prose-li:text-zinc-700 prose-li:marker:text-zinc-400',
                'prose-hr:border-zinc-200',
                'prose-blockquote:border-l-zinc-300 prose-blockquote:text-zinc-500',
                // Blinking caret trailing the last block while tokens stream in
                isStreaming
                    ? "[&>*:last-child]:after:ml-0.5 [&>*:last-child]:after:animate-pulse [&>*:last-child]:after:text-zinc-400 [&>*:last-child]:after:content-['▍']"
                    : '',
            ].join(' ')}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {children}
            </ReactMarkdown>
        </div>
    )
}
