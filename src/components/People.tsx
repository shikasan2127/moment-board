import { useEffect, useRef, useState } from 'react'
import type { Arrival, Person } from '../types'
import { Avatar } from './Avatar'

interface Props {
  people: Person[]
}

const ARRIVAL_ORDER: Arrival[] = ['likely', 'maybe']

/** 来訪しそうな人を表示。1行に収まれば大きく、収まらなければ小さく折り返す。 */
export function People({ people }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [compact, setCompact] = useState(false)

  const sorted = ARRIVAL_ORDER.flatMap((arrival) =>
    people.filter((p) => p.arrival === arrival)
  )

  useEffect(() => {
    const el = rowRef.current
    if (!el) return

    const check = () => {
      // 一度通常サイズに戻して1行に収まるか確認
      el.classList.remove('people-row--compact')
      const overflows = el.scrollWidth > el.clientWidth
      el.classList.toggle('people-row--compact', overflows)
      setCompact(overflows)
    }

    const observer = new ResizeObserver(check)
    observer.observe(el)
    check()
    return () => observer.disconnect()
  }, [sorted.length])

  if (sorted.length === 0) {
    return (
      <div className="people">
        <p className="people-empty">—</p>
      </div>
    )
  }

  return (
    <div className="people">
      <div
        ref={rowRef}
        className={`people-row${compact ? ' people-row--compact' : ''}`}
      >
        {sorted.map((person) => (
          <Avatar key={person.name} person={person} />
        ))}
      </div>
    </div>
  )
}
