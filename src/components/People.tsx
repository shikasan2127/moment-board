import { useEffect, useRef, useState } from 'react'
import type { Arrival, Person } from '../types'
import { Avatar } from './Avatar'

interface Props {
  people: Person[]
}

const ARRIVAL_ORDER: Arrival[] = ['likely', 'maybe']

/** 来訪しそうな人を1行で表示。多い時はアイコンを重ねて収める。 */
export function People({ people }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [marginLeft, setMarginLeft] = useState(8)

  const sorted = ARRIVAL_ORDER.flatMap((arrival) =>
    people.filter((p) => p.arrival === arrival)
  )

  useEffect(() => {
    const el = rowRef.current
    if (!el || sorted.length <= 1) { setMarginLeft(8); return }

    const check = () => {
      const iconEl = el.querySelector<HTMLElement>('.avatar')
      if (!iconEl) return
      const n = sorted.length
      const iconW = iconEl.offsetWidth
      const containerW = el.clientWidth
      // n個のアイコンをcontainerW内に収めるのに必要なmargin-left
      // total = iconW + (n-1) * (iconW + margin) = containerW
      const needed = (containerW - n * iconW) / (n - 1)
      // 最大50%まで重ねる。余裕がある場合はデフォルトのgap(8px)
      setMarginLeft(Math.max(-iconW * 0.5, Math.min(8, needed)))
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
      <div ref={rowRef} className="people-row">
        {sorted.map((person, i) => (
          <Avatar
            key={person.name}
            person={person}
            style={i > 0 ? { marginLeft } : undefined}
          />
        ))}
      </div>
    </div>
  )
}
