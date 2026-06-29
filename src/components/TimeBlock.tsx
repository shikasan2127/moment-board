import type { TimeBlock as TimeBlockType } from '../types'
import { Activity } from './Activity'
import { People } from './People'

interface Props {
  block: TimeBlockType
  /** 現在すでに在室している人数（在室してそうな人数の最小値の土台） */
  presentCount: number
}

/** 1時間帯の列（昼 / 夕方 / 夜）。isNow で強調する。 */
export function TimeBlock({ block, presentCount }: Props) {
  // 表示している people は「今後きそうな人」（在室中の人は含まない）。
  // 在室してそうな人数 = 在室中 ＋ 来そう(likely) 〜 ＋ 来るかも(maybe)
  const likelyCount = block.people.filter((p) => p.arrival === 'likely').length
  const maybeCount = block.people.filter((p) => p.arrival === 'maybe').length
  const min = presentCount + likelyCount
  const max = min + maybeCount
  const occupancyText = min === max ? `${min}人` : `${min}〜${max}人`

  return (
    <section className={`time-block${block.isNow ? ' time-block--now' : ''}`}>
      <header className="time-block-header">
        <span className="time-block-label">{block.label}</span>
        <span className="time-block-range">{block.range}</span>
        {block.isNow && <span className="time-block-badge">いま</span>}
      </header>

      <div className="time-block-occupancy">
        {/* <span className="occupancy-label">いそうな人数</span> */}
        <span className="occupancy-value">{occupancyText}</span>
      </div>

      <div className="time-block-activities">
        <h3 className="activities-heading">あそび</h3>
        {block.activities.length === 0 ? (
          <p className="activities-empty">—</p>
        ) : (
          <ul className="activity-list">
            {block.activities.map((activity, i) => (
              <Activity key={`${activity.name}-${i}`} activity={activity} />
            ))}
          </ul>
        )}
      </div>

      <People people={block.people} />
    </section>
  )
}
