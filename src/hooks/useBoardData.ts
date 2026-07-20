import { useEffect, useState } from 'react'
import { useClock } from './useClock'
import { mockBoardData } from '../mockData'
import { fetchBoardData } from '../api/board'
import { fetchPresence } from '../api/presence'
import type { BoardData } from '../types'

/** ポーリング間隔（5分） */
const POLL_INTERVAL_MS = 5 * 60 * 1000

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export type BoardStatus = 'loading' | 'ok' | 'error'

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

    const load = async () => {
      try {
        const [board, presenceMembers] = await Promise.all([
          fetchBoardData(),
          fetchPresence(),
        ])
        if (cancelled) return
        setData({ ...board, presence: { members: presenceMembers } })
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
      clearInterval(timer)
    }
  }, [])

  return {
    data: data ? { ...data, currentTime } : null,
    status,
  }
}
