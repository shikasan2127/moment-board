import { useRef } from 'react'
import type { BoardHour } from '../types'
import type { ScreenMode } from '../hooks/useScreenCycle'
import { useAutoScroll } from '../hooks/useAutoScroll'
import { ScrollPanel } from './ScrollPanel'
import { ActivityCard } from './ActivityCard'
import { PersonGrid } from './PersonGrid'

interface Props {
  hour: BoardHour
  mode: ScreenMode
  isNow: boolean
}

/** 1時間帯の列。中身は画面モードに応じて「活動＋メンバー」か「在室予測メンバー」を表示する。 */
export function HourColumn({ hour, mode, isNow }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useAutoScroll(scrollRef)

  return (
    <section className={`time-block${isNow ? ' time-block--now' : ''}`}>
      <header className="time-block-header">
        <span className="time-block-label">{hour.hour}時</span>
      </header>

      <ScrollPanel ref={scrollRef} className="time-block-scroll">
        {mode === 'activities' ? (
          hour.activities.length === 0 ? (
            <p className="activities-empty">—</p>
          ) : (
            <ul className="activity-list">
              {hour.activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </ul>
          )
        ) : (
          <PersonGrid people={hour.people} />
        )}
      </ScrollPanel>
    </section>
  )
}
