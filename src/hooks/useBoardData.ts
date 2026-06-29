import { useClock } from './useClock'
import { mockBoardData } from '../mockData'
import type { BoardData } from '../types'

/**
 * 画面に表示するデータを返すフック。
 *
 * 今はモックデータを返すだけ。将来サーバ接続する際は、
 * この関数の中だけをAPI取得に差し替えればよい（データ取得の唯一の窓口）。
 *
 * 現在時刻だけは実時計（useClock）を使って常に最新にしている。
 */
export function useBoardData(): BoardData {
  const currentTime = useClock()

  return {
    ...mockBoardData,
    currentTime,
  }
}
