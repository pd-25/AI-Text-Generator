'use client'
import { useResponseStore } from '@/store/responseStore'
import ProcessingStatus from './ProcessingStatus'
import Markdown from './Markdown'

export default function ResponseArea() {
    const text = useResponseStore((s) => s.text)
    const isStreaming = useResponseStore((s) => s.isStreaming)
    const error = useResponseStore((s) => s.error)
    const isProcessing = useResponseStore((s) => s.isProcessing)

    if (error) {
        return (
            <div className="mt-4 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-300">
                {error}
            </div>
        )
    }

    if (!text && !isStreaming) return null

    return (
        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            {isProcessing ? (
                <div className="text-sm leading-relaxed text-zinc-100">
                    <ProcessingStatus />
                </div>
            ) : (
                <Markdown isStreaming={isStreaming}>{text}</Markdown>
            )}
        </div>
    )
}
