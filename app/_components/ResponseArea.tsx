'use client'
import { useResponseStore } from '@/store/responseStore'
import ProcessingStatus from './ProcessingStatus'
import Markdown from './Markdown'
import { useEffect } from 'react'

export default function ResponseArea() {
    const text = useResponseStore((s) => s.text)
    const isStreaming = useResponseStore((s) => s.isStreaming)
    const error = useResponseStore((s) => s.error)
    const isProcessing = useResponseStore((s) => s.isProcessing)
    

    if (error) {
        return (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
            </div>
        )
    }

    if (!text && !isStreaming) return null
    // useEffect(() => {
    //     console.log('isProcessing:', isProcessing)
    // }, [isProcessing])

    return (
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            
            {isProcessing ? (
                
                <div className="text-sm text-zinc-400">
                    
                    <ProcessingStatus />
                </div>
            ) : (
                <Markdown isStreaming={isStreaming}>{text}</Markdown>
            )}
        </div>
    )
}
