import type { BoardHour } from '../types'
import type { ScreenMode } from '../hooks/useScreenCycle'
import { HourColumn } from './HourColumn'

interface Props {
  hours: BoardHour[]
  mode: ScreenMode
}

/** 時間帯の列を横に並べるグリッド。列数は hours の数に応じて可変（最大4列）。 */
export function HourGrid({ hours, mode }: Props) {
  return (
    <main
      className="board-grid"
      style={{ gridTemplateColumns: `repeat(${hours.length}, 1fr)` }}
    >
      {hours.map((hour, i) => (
        <HourColumn key={hour.hour} hour={hour} mode={mode} isNow={i === 0} />
      ))}
    </main>
  )
}
