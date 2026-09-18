const ideas = [
    'Follow-up email after a client pitch',
    'SEO outline: Modern Web Architectures',
    'Polite meeting rescheduling note',
]

export default function QuickIdeas({
    onSelect,
}: {
    onSelect: (idea: string) => void
}) {
    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {ideas.map((idea) => (
                <button
                    key={idea}
                    type="button"
                    onClick={() => onSelect(idea)}
                    className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer"
                >
                    {idea}
                </button>
            ))}
        </div>
    )
}
