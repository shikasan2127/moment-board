import type { Activity as ActivityType } from '../types'
import { FaceIcon } from './FaceIcon'

interface Props {
  activity: ActivityType
}

/** 活動1件（表情アイコン＋名前）。文字サイズは全活動で統一する。 */
export function Activity({ activity }: Props) {
  return (
    <li className="activity">
      <FaceIcon level={activity.likelihood} size={26} />
      <span className="activity-name">{activity.name}</span>
    </li>
  )
}
