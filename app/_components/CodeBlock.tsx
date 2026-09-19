'use client'
import { useState } from 'react'

// Pretty names for the languages the model actually tends to emit
const LANGUAGE_LABELS: Record<string, string> = {
    bash: 'Bash',
    c: 'C',
    cpp: 'C++',
    css: 'CSS',
    go: 'Go',
    html: 'HTML',
    java: 'Java',
    js: 'JavaScript',
    javascript: 'JavaScript',
    json: 'JSON',
    jsx: 'JSX',
    md: 'Markdown',
    php: 'PHP',
    py: 'Python',
    python: 'Python',
    rb: 'Ruby',
    ruby: 'Ruby',
    rust: 'Rust',
    sh: 'Shell',
    shell: 'Shell',
    sql: 'SQL',
    ts: 'TypeScript',
    typescript: 'TypeScript',
    tsx: 'TSX',
    yaml: 'YAML',
    yml: 'YAML',
}

export default function CodeBlock({
    language,
    code,
}: {
    language?: string
    code: string
}) {
    const [copied, setCopied] = useState(false)
    const label = language
        ? (LANGUAGE_LABELS[language.toLowerCase()] ?? language)
        : 'Code'

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code)
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        } catch {
            // Clipboard is unavailable on insecure origins — leave the label alone
        }
    }

    return (
        <div className="not-prose my-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/50 px-3 py-2">
                <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-400">
                    {label}
                </span>
                <button
                    type="button"
                    onClick={copy}
                    className="rounded-md px-2 py-1 text-[11px] font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
                >
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-3.5">
                <code className="font-mono text-[12.5px] leading-[1.7] text-zinc-100">
                    {code}
                </code>
            </pre>
        </div>
    )
}
