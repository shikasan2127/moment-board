import { useBoardData } from '../hooks/useBoardData'
import { useAutoReload } from '../hooks/useAutoReload'
import { useNightMode } from '../hooks/useNightMode'
import { useScreenCycle } from '../hooks/useScreenCycle'
import { HourGrid } from './HourGrid'

/** 画面全体。データを受け取り各部に配る。 */
export function Board() {
  const { data, status } = useBoardData()
  useAutoReload()
  const isNight = useNightMode()
  const screenMode = useScreenCycle()

  // 初回取得前はスケルトン表示
  if (!data) {
    return (
      <div className={`board board--loading${isNight ? ' board--night' : ''}`}>
        <p className="board-loading-text">
          {status === 'error' ? 'データを取得できません' : '読み込み中…'}
        </p>
      </div>
    )
  }

  return (
    <div className={`board${isNight ? ' board--night' : ''}`}>
      {status === 'error' && (
        <div className="board-error-badge" title="最新データの取得に失敗しています">
          ⚠ 更新エラー
        </div>
      )}

      <div className="board-screen" key={screenMode}>
        <HourGrid hours={data.hours} mode={screenMode} />
      </div>
    </div>
  )
}
