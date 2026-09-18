'use client'
import { processingWords } from "@/config/constant";
import { useEffect, useState } from "react";

const pickWord = (current: string): string => {
    let next = current;

    // The list has duplicates, so compare text to guarantee a visible change
    while (next === current) {
        next = processingWords[Math.floor(Math.random() * processingWords.length)];
    }

    return next;
};

export default function ProcessingStatus() {
    const [word, setWord] = useState(processingWords[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setWord(pickWord);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-3" role="status" aria-live="polite">
            <div className="flex items-center gap-2.5">
                {/* Pulsing beacon */}
                <span className="relative flex h-2 w-2 shrink-0">
                    <span className="motion-safe-only absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-zinc-500" />
                </span>

                {/* key remounts the span so every word replays the entrance */}
                <span
                    key={word}
                    className="shimmer-text motion-safe-only animate-shimmer text-sm font-medium"
                >
                    <span className="motion-safe-only inline-block animate-word-in">
                        {word}
                    </span>
                </span>

                <span className="flex items-center gap-[3px] pb-0.5">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className="motion-safe-only h-1 w-1 animate-dot rounded-full bg-zinc-400"
                            style={{ animationDelay: `${i * 0.16}s` }}
                        />
                    ))}
                </span>
            </div>

            {/* Indeterminate bar — the backend gives no percentage to show */}
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-200">
                <div className="motion-safe-only h-full w-1/4 animate-track rounded-full bg-zinc-400" />
            </div>
        </div>
    );
}
