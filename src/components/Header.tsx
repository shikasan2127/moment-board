import type { BoardPerson } from '../types'
import type { ScreenMode } from '../hooks/useScreenCycle'

const TITLES: Record<ScreenMode, string> = {
  activities: '今日の活動予測',
  presence: '今日の在室予測',
}

interface Props {
  currentTime: string
  members: BoardPerson[]
  mode: ScreenMode
}

/** タイトル＋在室アイコン＋現在時刻 */
export function Header({ currentTime, members, mode }: Props) {
  return (
    <header className="board-header">
      <h1 className="board-title">{TITLES[mode]}</h1>
      {members.length > 0 && (
        <div className="header-presence">
          <span className="header-presence-label">現在の在室者</span>
          <div className="presence-avatars">
            {members.map((m) => (
              <img
                key={m.name}
                src={m.avatarUrl}
                alt={m.name}
                title={m.name}
                className="presence-avatar"
              />
            ))}
          </div>
        </div>
      )}
      <time className="board-clock">{currentTime}</time>
    </header>
  )
}
