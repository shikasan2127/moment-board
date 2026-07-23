import { useEffect, useRef, useState } from 'react'
import type { Person } from '../types'
import { Avatar } from './Avatar'

interface RowProps {
  people: Person[]
}

/** アバターの1行。多い時はアイコンを重ねて収める。 */
function PeopleRow({ people }: RowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [marginLeft, setMarginLeft] = useState(8)

  useEffect(() => {
    const el = rowRef.current
    if (!el || people.length <= 1) { setMarginLeft(8); return }

    const check = () => {
      const iconEl = el.querySelector<HTMLElement>('.avatar')
      if (!iconEl) return
      const n = people.length
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
  }, [people.length])

  return (
    <div ref={rowRef} className="people-row">
      {people.map((person, i) => (
        <Avatar
          key={person.name}
          person={person}
          style={i > 0 ? { marginLeft } : undefined}
        />
      ))}
    </div>
  )
}

interface Props {
  people: Person[]
}

/** 来訪しそうな人を「来そう」「来るかも」の2行に分けて表示。多い時はアイコンを重ねて収める。 */
export function People({ people }: Props) {
  const likely = people.filter((p) => p.arrival === 'likely')
  const maybe = people.filter((p) => p.arrival === 'maybe')

  if (likely.length === 0 && maybe.length === 0) {
    return (
      <div className="people">
        <p className="people-empty">—</p>
      </div>
    )
  }

  return (
    <div className="people">
      {likely.length > 0 && <PeopleRow people={likely} />}
      {maybe.length > 0 && <PeopleRow people={maybe} />}
    </div>
  )
}
