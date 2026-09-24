import type { BoardActivity } from '../types'
import { PersonGrid } from './PersonGrid'

interface Props {
  activity: BoardActivity
}

/** 活動1件：ロゴ＋参加しそうなメンバー。 */
export function ActivityCard({ activity }: Props) {
  return (
    <li className="activity-card">
      <div className="activity-card-header">
        {activity.imageUrl ? (
          <img src={activity.imageUrl} alt={activity.name} className="activity-logo" />
        ) : (
          <div
            className="activity-logo activity-logo--placeholder"
            role="img"
            aria-label={activity.name}
          />
        )}
      </div>
      <PersonGrid people={activity.members} />
    </li>
  )
}
