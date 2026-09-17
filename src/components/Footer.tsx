import type { BoardPerson } from '../types'

interface Props {
  members: BoardPerson[]
}

/** 在室情報（アイコン＋人数）。現状 Board.tsx からは未使用。 */
export function Footer({ members }: Props) {
  return (
    <footer className="board-footer">
      <div className="presence">
        <span className="presence-count">いま{members.length}人在室</span>
        {members.length > 0 && (
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
        )}
      </div>
    </footer>
  )
}
