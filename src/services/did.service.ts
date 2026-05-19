import axios, { type AxiosInstance } from 'axios'

/** Public still used as D-ID `source_url` (Talks API). */
export const DID_AVATAR_SOURCE_URL =
  'https://i.ibb.co/JF2Mnk12/virtual-avatar2.png' as const

const DID_API_ORIGIN = 'https://api.d-id.com'

/** Known talk lifecycle values from D-ID OpenAPI `TalkStatus`. */
export type DidTalkStatus = 'created' | 'started' | 'done' | 'error' | 'rejected'

export type DidTalk = {
  id: string
  object?: string
  created_at?: string
  created_by?: string
  status: DidTalkStatus | string
  /** Present when `status === "done"`. */
  result_url?: string
  /** Optional error payload when status is terminal. */
  error?: { kind?: string; description?: string }
}

export type CreateTalkResponse = Pick<DidTalk, 'id' | 'object' | 'created_at' | 'created_by' | 'status'>

export type PollTalkOptions = {
  /** Delay between GET /talks/:id polls. Default 2000. */
  intervalMs?: number
  /** Max wall time before throwing timeout. Default 120_000. */
  timeoutMs?: number
  /** When aborted, polling stops immediately. */
  signal?: AbortSignal
}

export type DidRequestOptions = {
  signal?: AbortSignal
}

function assertNotAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError')
  }
}

function abortableSleep(ms: number, signal?: AbortSignal): Promise<void> {
  assertNotAborted(signal)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      clearTimeout(timer)
      signal?.removeEventListener('abort', onAbort)
      reject(new DOMException('Aborted', 'AbortError'))
    }

    signal?.addEventListener('abort', onAbort, { once: true })
  })
}

function encodeBasicCredentials(raw: string): string {
  if (typeof globalThis.btoa === 'function') {
    try {
      return globalThis.btoa(raw)
    } catch {
      return globalThis.btoa(
        encodeURIComponent(raw).replace(/%([0-9A-F]{2})/g, (_, hex) =>
          String.fromCharCode(Number.parseInt(hex, 16)),
        ),
      )
    }
  }
  throw new Error('D-ID: cannot encode Basic credentials in this environment')
}

function getDidAxios(): AxiosInstance {
  const key = import.meta.env.VITE_DID_API_KEY?.trim()
  if (!key) {
    throw new Error('Missing VITE_DID_API_KEY (set in .env.local as USER:PASSWORD)')
  }
  const auth = `Basic ${encodeBasicCredentials(key)}`
  return axios.create({
    baseURL: DID_API_ORIGIN,
    headers: {
      Authorization: auth,
      'Content-Type': 'application/json',
    },
    validateStatus: (status) => status >= 200 && status < 300,
  })
}

/**
 * POST /talks — create a talk from text script + fixed avatar image.
 * @returns talk `id` for polling.
 */
export async function createTalk(text: string, options?: DidRequestOptions): Promise<string> {
  const input = text.trim()
  if (input.length < 3) {
    throw new Error('D-ID script input must be at least 3 characters')
  }

  assertNotAborted(options?.signal)

  const client = getDidAxios()
  const { data } = await client.post<CreateTalkResponse>(
    '/talks',
    {
      source_url: DID_AVATAR_SOURCE_URL,
      script: {
        type: 'text',
        input,
      },
    },
    { signal: options?.signal },
  )

  if (!data?.id) {
    throw new Error('D-ID createTalk: response missing id')
  }
  return data.id
}

/** GET /talks/:id — current talk payload (status, result_url, …). */
export async function getTalk(id: string, options?: DidRequestOptions): Promise<DidTalk> {
  assertNotAborted(options?.signal)
  const client = getDidAxios()
  const { data } = await client.get<DidTalk>(`/talks/${encodeURIComponent(id)}`, {
    signal: options?.signal,
  })
  return data
}

/**
 * Poll GET /talks/:id until `status === "done"` (return `result_url`) or terminal failure / timeout.
 * @throws on `error` | `rejected` | timeout | missing `result_url` when done
 */
export async function pollTalkUntilTerminal(
  id: string,
  options?: PollTalkOptions,
): Promise<string> {
  const intervalMs = options?.intervalMs ?? 2000
  const timeoutMs = options?.timeoutMs ?? 120_000
  const signal = options?.signal
  const started = Date.now()

  for (;;) {
    assertNotAborted(signal)

    if (Date.now() - started > timeoutMs) {
      throw new Error(
        `D-ID talk ${id}: timeout after ${timeoutMs}ms (last poll interval ${intervalMs}ms)`,
      )
    }

    const talk = await getTalk(id, { signal })
    const status = talk.status

    if (status === 'done') {
      const url = talk.result_url
      if (!url) {
        throw new Error(`D-ID talk ${id}: status done but result_url is missing`)
      }
      return url
    }

    if (status === 'error' || status === 'rejected') {
      const detail =
        talk.error?.description ?? talk.error?.kind ?? JSON.stringify(talk.error ?? {})
      throw new Error(`D-ID talk ${id}: status "${status}" — ${detail}`)
    }

    await abortableSleep(intervalMs, signal)
  }
}
