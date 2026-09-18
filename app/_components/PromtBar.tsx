'use client'
import { useState, KeyboardEvent } from "react";
import QuickIdeas from "./QuickIdeas";
import ResponseArea from "./ResponseArea";
import { useStreamingQuery } from "@/hooks/useStreamingQuery";
import { useResponseStore } from "@/store/responseStore";
import { suggestions } from "@/config/constants";

export default function PromtBar() {
    const [suggestedAction, setSuggestedAction] = useState<string>('')
    const [query, setQuery] = useState<string>('')

    const { send, cancel } = useStreamingQuery()
    const isStreaming = useResponseStore((s) => s.isStreaming)
    const text = useResponseStore((s) => s.text)

    const handleSuggestion = (suggestion: string) => {
        setSuggestedAction((prev) => (prev === suggestion ? '' : suggestion))
    }

    const canSend = query.trim().length > 0 && !isStreaming

    const handleSend = () => {
        if (!canSend) return
        send(`${suggestedAction} ${query}`.trim())
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Prompt Workspace Container */}
            <div className="rounded-2xl border border-zinc-200 bg-white transition focus-within:border-zinc-400">
                {/* Prompt Text Input Box */}
                <textarea
                    rows={4}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Describe what you want to write…"
                    className="w-full resize-none bg-transparent p-4 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none"
                />

                {/* Action Toolbar */}
                <div className="flex items-center justify-between gap-3 border-t border-zinc-100 p-2.5">
                    {/* Mode Switcher */}
                    <div className="flex items-center gap-1.5">
                        {suggestions.map((suggestion) => {
                            const isActive = suggestedAction === suggestion.label

                            return (
                                <button
                                    key={suggestion.label}
                                    type="button"
                                    aria-pressed={isActive}
                                    disabled={isStreaming}
                                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${isActive
                                        ? 'bg-zinc-900 text-white'
                                        : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                                        }`}
                                    onClick={() => handleSuggestion(suggestion.label)}
                                >
                                    {suggestion.icon}
                                    <span>{suggestion.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        {isStreaming && (
                            <button
                                type="button"
                                onClick={cancel}
                                className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 cursor-pointer"
                            >
                                Stop
                            </button>
                        )}

                        <button
                            type="button"
                            disabled={!canSend}
                            onClick={handleSend}
                            aria-label="Send prompt"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white transition hover:bg-zinc-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 19V5m0 0l-6 6m6-6l6 6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {!text && !isStreaming && <QuickIdeas onSelect={setQuery} />}

            <ResponseArea />
        </>
    )
}
