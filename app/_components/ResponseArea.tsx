'use client'
import { useResponseStore } from '@/store/responseStore'

export default function ResponseArea() {
  const text = useResponseStore((s) => s.text)
  const isStreaming = useResponseStore((s) => s.isStreaming)
  const error = useResponseStore((s) => s.error)

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
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-100">
        {text}
        {isStreaming && (
          <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-indigo-400 align-middle" />
        )}
      </p>
    </div>
  )
}