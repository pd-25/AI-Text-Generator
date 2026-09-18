import { create } from 'zustand'

type ResponseState = {
  text: string
  isStreaming: boolean
  isProcessing: boolean
  timeTaken: number
  startedAt: number | null
  error: string | null
  start: () => void
  append: (chunk: string) => void
  finish: () => void
  fail: (message: string) => void
  setIsProcessing: (value: boolean) => void
  setTimeTaken: (timeTaken: number) => void
}

export const useResponseStore = create<ResponseState>((set) => ({
  text: '',
  isStreaming: false,
  isProcessing: false,
  error: null,
  timeTaken: 0,
  startedAt: null,
  start: () => set({
    text: '',
    isStreaming: true,
    error: null,
    timeTaken: 0,
    startedAt: Date.now(),
  }),
  append: (chunk) => set((s) => ({ text: s.text + chunk })),
  finish: () => set({ isStreaming: false }),
  fail: (message) => set({ isStreaming: false, error: message }),
  setIsProcessing: (value) => set({
    isProcessing: value
  }),
  setTimeTaken: (timeTaken) => set({timeTaken})
}))