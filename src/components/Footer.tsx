import { FaceIcon } from './FaceIcon'
import { LIKELIHOOD_LABEL } from '../config'
import type { Likelihood, PresentMember } from '../types'

interface Props {
  members: PresentMember[]
}

const LEGEND: Likelihood[] = ['high', 'mid', 'low']

/** 在室情報（アイコン＋人数）＋凡例 */
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

      <span className="legend">
        <span className="legend-label">凡例</span>
        {LEGEND.map((level) => (
          <span key={level} className="legend-item">
            <FaceIcon level={level} size={20} />
            <span className="legend-text">{LIKELIHOOD_LABEL[level]}</span>
          </span>
        ))}
      </span>
    </footer>
  )
}
