'use client'
import { useState } from "react";
import QuickIdeas from "./QuickIdeas";
import ResponseArea from "./ResponseArea";

export default function PromtBar() {
    const [suggestedAction, setSuggestedAction] = useState<string>('')
    const [query, setQuery] = useState<string>('')
    const [stemmedResponse, setStemmedResponse] = useState<string | null>('')
    const handleSuggestion = (suggestion: string) => {
        if (suggestedAction == suggestion) {
            setSuggestedAction('')
            return
        }
        setSuggestedAction(suggestion)
    }


    const suggestions = [
        {
            label: 'Compose Mail',
            icon: (
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                </svg>
            )
        },
        {
            label: 'Generate Blog',
            icon: (
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
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                </svg>
            )
        }
    ]


    const sendPrompt = async () => {
        console.log('s -- ', suggestedAction);
        console.log('q-- ', query);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/query?query_text=${encodeURIComponent(
                    `${suggestedAction} ${query}`
                )}`
            );

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            if (!response.body) {
                throw new Error('Response body is empty');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let done = false;

            while (!done) {
                const { value, done: readerDone } = await reader.read();

                done = readerDone;

                if (value) {
                    const checkValue = decoder.decode(value, {
                        stream: true,
                    });

                    setStemmedResponse((prevText) => prevText + checkValue);
                }
            }

            // Decode any remaining bytes
            const remainingText = decoder.decode();

            if (remainingText) {
                setStemmedResponse((prevText) => prevText + remainingText);
            }
        } catch (error) {
            console.error('Error sending prompt:', error);
        }
    };


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
                                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition cursor-pointer ${isActive
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
                        placeholder="Ask anything, describe your email tone and recipient, or provide your blog topic and keywords..."
                        className="w-full resize-none rounded-xl bg-transparent p-3 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Action Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 px-1">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">Press send to generate</span>
                    </div>

                    {/* Send Button with Icon */}
                    <button
                        type="button"
                        className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-600/40 active:scale-[0.98] cursor-pointer"
                        onClick={sendPrompt}
                    >
                        <span>Send Prompt</span>
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
            <div>
                <ResponseArea />
                {stemmedResponse}
            </div>
            <QuickIdeas />
        </>
    )
}
