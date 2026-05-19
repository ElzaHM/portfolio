import { useCallback, useRef } from 'react'

export type TwinSessionHandle = {
  generation: number
  signal: AbortSignal
}

/** Hard-reset an HTML5 video element to standby (no src, no decode pipeline). */
export function resetTwinVideoElement(video: HTMLVideoElement | null): void {
  if (!video) return
  video.pause()
  video.removeAttribute('src')
  video.load()
}

/**
 * Per-send session: AbortController + monotonic generation for stale async guards.
 * Does not interact with Azure Speech — callers keep `speak()` as-is.
 */
export function useTwinSession() {
  const generationRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)

  const beginSession = useCallback((): TwinSessionHandle => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const generation = ++generationRef.current
    return { generation, signal: controller.signal }
  }, [])

  const stopSession = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    generationRef.current += 1
  }, [])

  const isCurrentSession = useCallback((generation: number) => {
    return generation === generationRef.current
  }, [])

  const clearAbortRefIfCurrent = useCallback((generation: number) => {
    if (generation === generationRef.current) {
      abortRef.current = null
    }
  }, [])

  return {
    beginSession,
    stopSession,
    isCurrentSession,
    clearAbortRefIfCurrent,
  }
}
