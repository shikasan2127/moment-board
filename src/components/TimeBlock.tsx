import type { Likelihood, TimeBlock as TimeBlockType } from '../types'
import { FaceIcon } from './FaceIcon'
import { People } from './People'

interface Props {
  block: TimeBlockType
  presentCount: number
}

const LIKELIHOOD_ORDER: Likelihood[] = ['high', 'mid', 'low']

/** 1時間帯の列（昼 / 夕方 / 夜）。isNow で強調する。 */
export function TimeBlock({ block, presentCount }: Props) {
  const likelyCount = block.people.filter((p) => p.arrival === 'likely').length
  const maybeCount = block.people.filter((p) => p.arrival === 'maybe').length
  const min = presentCount + likelyCount
  const max = min + maybeCount
  const occupancyText = min === max ? `${min}人` : `${min}〜${max}人`

  // 同じlikelihoodの活動をグループ化
  const groups = LIKELIHOOD_ORDER.map((level) => ({
    level,
    activities: block.activities.filter((a) => a.likelihood === level),
  })).filter((g) => g.activities.length > 0)

  return (
    <section className={`time-block${block.isNow ? ' time-block--now' : ''}`}>
      <header className="time-block-header">
        <span className="time-block-label">{block.label}</span>
        <span className="occupancy-value">{occupancyText}</span>
        {block.isNow && <span className="time-block-badge">いま</span>}
      </header>

      <div className="time-block-activities">
        <h3 className="activities-heading">あそび</h3>
        {groups.length === 0 ? (
          <p className="activities-empty">—</p>
        ) : (
          <ul className="activity-list">
            {groups.map(({ level, activities }) => (
              <li key={level} className="activity-group">
                <FaceIcon level={level} size={52} />
                <div className="activity-group-names">
                  {activities.map((a) => (
                    <span key={a.name} className="activity-name">{a.name}</span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <People people={block.people} />
    </section>
  )
}
