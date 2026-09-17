import type { BoardPerson } from '../types'
import { fetchJson } from './board'

const STAYWATCH_BASE_URL: string = import.meta.env.VITE_STAYWATCH_BASE_URL ?? ''
const STAYWATCH_PRESENCE_PATH: string =
  import.meta.env.VITE_STAYWATCH_PRESENCE_PATH ?? ''
const STAYWATCH_API_KEY: string = import.meta.env.VITE_STAYWATCH_API_KEY ?? ''

/**
 * StayWatch の在室者APIのレスポンス想定。
 * 実際のフィールド名が確定したらここを合わせる。
 */
interface StayWatchStayer {
  name?: string
  userName?: string
  avatarUrl?: string
  iconUrl?: string
}

/**
 * StayWatch 本体から現在の在室者を直接取得し BoardPerson[] に変換する。
 * URL未設定・取得失敗時は空配列を返す（在室セクションは空表示になる）。
 */
export async function fetchPresence(
  signal?: AbortSignal,
): Promise<BoardPerson[]> {
  if (!STAYWATCH_BASE_URL || !STAYWATCH_PRESENCE_PATH) {
    return []
  }
  try {
    const raw = await fetchJson<unknown>(
      `${STAYWATCH_BASE_URL}${STAYWATCH_PRESENCE_PATH}`,
      {
        headers: STAYWATCH_API_KEY ? { 'X-API-Key': STAYWATCH_API_KEY } : undefined,
        signal,
      },
    )
    return toPresentMembers(raw)
  } catch {
    return []
  }
}

/** レスポンス形状のゆらぎ（配列直下 / {result: []} / {data: []}）を吸収する */
function toPresentMembers(raw: unknown): BoardPerson[] {
  const list = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as { result?: unknown[] })?.result)
      ? (raw as { result: unknown[] }).result
      : Array.isArray((raw as { data?: unknown[] })?.data)
        ? (raw as { data: unknown[] }).data
        : []

  return list
    .map((item) => {
      const s = item as StayWatchStayer
      return {
        name: s.name ?? s.userName ?? '',
        avatarUrl: s.avatarUrl ?? s.iconUrl ?? '',
      }
    })
    .filter((m) => m.name !== '')
}
