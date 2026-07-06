import type { CSSProperties } from 'react'
import type { Person } from '../types'
import { arrivalToOpacity, ARRIVAL_LABEL } from '../config'

interface Props {
  person: Person
  style?: CSSProperties
}

/** アバター1件。来訪しそう度合いで減光（来るかも=減光）。 */
export function Avatar({ person, style }: Props) {
  const opacity = arrivalToOpacity(person.arrival)
  return (
    <div
      className={`avatar avatar--${person.arrival}`}
      title={`${person.name}（${ARRIVAL_LABEL[person.arrival]}）`}
      style={style}
    >
      <img
        src={person.avatarUrl}
        alt={person.name}
        style={{ opacity }}
        className="avatar-img"
      />
    </div>
  )
}
