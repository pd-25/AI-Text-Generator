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
            <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-2xl backdrop-blur-xl transition-all hover:border-zinc-700/80 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10">
                {/* Mode Switcher Tabs */}
                <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
                    {suggestions.map((suggestion) => {
                        const isActive = suggestedAction === suggestion.label

                        return (
                            <button
                                key={suggestion.label}
                                type="button"
                                aria-pressed={isActive}
                                disabled={isStreaming}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${isActive
                                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                                    : 'border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800/50 hover:text-zinc-200'
                                    }`}
                                onClick={() => handleSuggestion(suggestion.label)}
                            >
                                {suggestion.icon}
                                <span>{suggestion.label}</span>
                            </button>
                        )
                    })}
                </div>

                {/* Prompt Text Input Box */}
                <div className="relative mt-2">
                    <textarea
                        rows={4}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything, describe your email tone and recipient, or provide your blog topic and keywords..."
                        className="w-full resize-none rounded-xl bg-transparent p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                    />
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 px-1">
                    <span className="text-xs text-zinc-500">
                        {isStreaming ? 'Generating response…' : 'Press ⌘ + Enter to send'}
                    </span>

                    <div className="flex items-center gap-2">
                        {isStreaming && (
                            <button
                                type="button"
                                onClick={cancel}
                                className="rounded-xl border border-zinc-800 bg-zinc-950/60 px-3 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-700 hover:text-zinc-200 cursor-pointer"
                            >
                                Stop
                            </button>
                        )}

                        <button
                            type="button"
                            disabled={!canSend}
                            onClick={handleSend}
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-600/40 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                        >
                            <span>{isStreaming ? 'Generating…' : 'Send Prompt'}</span>
                            <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <ResponseArea />
            <QuickIdeas />
        </>
    )
}