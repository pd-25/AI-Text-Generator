'use client'
import { Children, isValidElement, type ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from './CodeBlock'

// Fenced blocks arrive as nested React nodes; flatten them back to raw source
function toText(node: ReactNode): string {
    if (node == null || typeof node === 'boolean') return ''
    if (typeof node === 'string' || typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(toText).join('')
    if (isValidElement<{ children?: ReactNode }>(node))
        return toText(node.props.children)
    return ''
}

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
    // Fenced blocks render as a dark card with a language header and copy button
    pre: ({ children }) => {
        const code = Children.toArray(children).find((child) =>
            isValidElement<{ className?: string; children?: ReactNode }>(child),
        ) as React.ReactElement<{ className?: string; children?: ReactNode }> | undefined

        const language = /language-([\w+#-]+)/.exec(code?.props.className ?? '')?.[1]

        return (
            <CodeBlock
                language={language}
                code={toText(code?.props.children ?? children).replace(/\n$/, '')}
            />
        )
    },
    // Only inline code reaches here — fenced blocks are handled by `pre` above
    code: ({ children, ...props }) => (
        <code
            className="rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[0.85em] font-medium text-zinc-800 before:content-none after:content-none"
            {...props}
        >
            {children}
        </code>
    ),
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
