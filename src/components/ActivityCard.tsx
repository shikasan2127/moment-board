import type { BoardActivity } from '../types'
import { PersonGrid } from './PersonGrid'

interface Props {
  activity: BoardActivity
}

/** 活動1件：ロゴ＋名前＋参加しそうなメンバー。 */
export function ActivityCard({ activity }: Props) {
  return (
    <li className="activity-card">
      <div className="activity-card-header">
        {activity.imageUrl ? (
          <img src={activity.imageUrl} alt={activity.name} className="activity-logo" />
        ) : (
          <div className="activity-logo activity-logo--placeholder" aria-hidden="true" />
        )}
        <span className="activity-name">{activity.name}</span>
        <span className="activity-min-number">{activity.minNumber}人〜</span>
      </div>
      <PersonGrid people={activity.members} />
    </li>
  )
}
