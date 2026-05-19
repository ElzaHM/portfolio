import axios from 'axios'

/** True when an async operation was cancelled via AbortController / axios cancel. */
export function isAbortError(error: unknown): boolean {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true
  }
  if (axios.isCancel(error)) {
    return true
  }
  if (
    error &&
    typeof error === 'object' &&
    'code' in error &&
    (error as { code: string }).code === 'ERR_CANCELED'
  ) {
    return true
  }
  return false
}
