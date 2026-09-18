import { useCallback, useEffect, useRef } from 'react'
import { useResponseStore } from '@/store/responseStore'

export function useStreamingQuery() {
    const abortRef = useRef<AbortController | null>(null)

    useEffect(() => () => abortRef.current?.abort(), [])

    const send = useCallback(async (queryText: string) => {
        const { start, append, finish, fail, setIsProcessing } = useResponseStore.getState()

        abortRef.current?.abort()
        const controller = new AbortController()
        abortRef.current = controller

        start()

        try {
            setIsProcessing(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API}/query?query_text=${encodeURIComponent(queryText)}`,
                { signal: controller.signal }
            )

            if (!res.ok) throw new Error(`Request failed: ${res.status}`)
            if (!res.body) throw new Error('Response body is empty')
            
            const reader = res.body.getReader()
            const decoder = new TextDecoder('utf-8')

            while (true) {
                
                const { value, done } = await reader.read()
                if(value) setIsProcessing(false);
                if (done) break
                append(decoder.decode(value, { stream: true }))
            }

            const tail = decoder.decode()
            if (tail) append(tail)

            finish()
        } catch (err) {
            if ((err as Error).name === 'AbortError') return
            fail((err as Error).message ?? 'Something went wrong')
        }
    }, [])

    const cancel = useCallback(() => abortRef.current?.abort(), [])

    return { send, cancel }
}