import { useState } from 'react'

export default function QuickIdeas() {
    const [ideas, setIdeas] = useState([
        '✉️ Follow-up email after client pitch',
        '✍️ SEO outline: Modern Web Architectures',
        '✉️ Polite meeting rescheduling note'
    ])
    return (
        <div>{/* Quick Suggestion Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-zinc-500">Quick ideas:</span>
                {ideas.map((idea, index) => (
                    <button
                        key={index}
                        type="button"
                        className="rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-xs text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200"
                    >
                        {idea}
                    </button>
                ))}
            </div>
        </div>
    )
}
