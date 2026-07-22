import { useEffect, useState } from 'react'
import { useClock } from './useClock'
import { mockBoardData } from '../mockData'
import { fetchBoardData } from '../api/board'
import { fetchPresence } from '../api/presence'
import type { BoardData, PresentMember } from '../types'

/** ポーリング間隔（5分） */
const POLL_INTERVAL_MS = 5 * 60 * 1000

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export type BoardStatus = 'loading' | 'ok' | 'error'

/**
 * StayWatch の在室者APIはアバターを返さないため、
 * /api/board の people（Slackアバター付き）から名前で補完する。
 */
function withAvatars(
  board: BoardData,
  members: PresentMember[],
): PresentMember[] {
  const avatarByName = new Map<string, string>()
  for (const block of board.timeBlocks) {
    for (const person of block.people) {
      if (person.avatarUrl) avatarByName.set(person.name, person.avatarUrl)
    }
  }
  return members.map((m) =>
    m.avatarUrl ? m : { ...m, avatarUrl: avatarByName.get(m.name) ?? '' },
  )
}

export interface BoardState {
  /** 表示データ。初回取得前は null（スケルトン表示） */
  data: BoardData | null
  /** error のときも data には最後に成功したデータを保持する */
  status: BoardStatus
}

/**
 * 画面に表示するデータを返すフック（データ取得の唯一の窓口）。
 *
 * stay-watch-slackbot の GET /api/board と StayWatch の在室APIを
 * 5分間隔でポーリングして合成する。取得失敗時は最後に成功したデータを
 * 保持したまま status を 'error' にする（共有モニターを真っ暗にしない）。
 *
 * VITE_USE_MOCK=true のときは従来どおりモックデータを返す。
 * 現在時刻だけは実時計（useClock）を使って常に最新にしている。
 */
export function useBoardData(): BoardState {
  const currentTime = useClock()
  const [data, setData] = useState<BoardData | null>(null)
  const [status, setStatus] = useState<BoardStatus>('loading')

  useEffect(() => {
    if (USE_MOCK) {
      setData(mockBoardData)
      setStatus('ok')
      return
    }

    let cancelled = false
    const controller = new AbortController()

    const load = async () => {
      try {
        const [board, presenceMembers] = await Promise.all([
          fetchBoardData(controller.signal),
          fetchPresence(controller.signal),
        ])
        if (cancelled) return
        setData({
          ...board,
          presence: { members: withAvatars(board, presenceMembers) },
        })
        setStatus('ok')
      } catch {
        if (cancelled) return
        setStatus('error')
      }
    }

    load()
    const timer = setInterval(load, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      controller.abort()
      clearInterval(timer)
    }
  }, [])

  return {
    data: data ? { ...data, currentTime } : null,
    status,
  }
}
