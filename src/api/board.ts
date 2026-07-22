import type { BoardData } from '../types'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

/** fetch のタイムアウト（ミリ秒）。stay-watch-slackbot がSlack APIを呼ぶ都合で応答が変動するため長めに設定 */
const FETCH_TIMEOUT_MS = 30_000

/** タイムアウト付きでJSONを取得する共通ヘルパー */
export async function fetchJson<T>(
  url: string,
  options?: { headers?: HeadersInit; signal?: AbortSignal },
): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  const onExternalAbort = () => controller.abort()
  options?.signal?.addEventListener('abort', onExternalAbort)
  const startedAt = performance.now()
  console.log(`[fetch] → GET ${url}`)
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: options?.headers,
    })
    const elapsedMs = Math.round(performance.now() - startedAt)
    console.log(`[fetch] ← ${res.status} ${url} (${elapsedMs}ms)`)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${url}`)
    }
    return (await res.json()) as T
  } catch (err) {
    const elapsedMs = Math.round(performance.now() - startedAt)
    console.error(`[fetch] ✗ ${url} (${elapsedMs}ms)`, err)
    throw err
  } finally {
    clearTimeout(timer)
    options?.signal?.removeEventListener('abort', onExternalAbort)
  }
}

/**
 * stay-watch-slackbot の GET /api/board から表示データを取得する。
 * presence はサーバ側では常に空で返るため、別途 fetchPresence で補完する。
 */
export function fetchBoardData(signal?: AbortSignal): Promise<BoardData> {
  return fetchJson<BoardData>(`${API_BASE_URL}/api/board`, { signal })
}
