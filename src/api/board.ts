import type { BoardData } from '../types'

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? ''

/** fetch のタイムアウト（ミリ秒） */
const FETCH_TIMEOUT_MS = 15_000

/** タイムアウト付きでJSONを取得する共通ヘルパー */
export async function fetchJson<T>(
  url: string,
  headers?: HeadersInit,
): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, { signal: controller.signal, headers })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${url}`)
    }
    return (await res.json()) as T
  } finally {
    clearTimeout(timer)
  }
}

/**
 * stay-watch-slackbot の GET /api/board から表示データを取得する。
 * presence はサーバ側では常に空で返るため、別途 fetchPresence で補完する。
 */
export function fetchBoardData(): Promise<BoardData> {
  return fetchJson<BoardData>(`${API_BASE_URL}/api/board`)
}
