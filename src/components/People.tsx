import type { Arrival, Person } from '../types'
import { ARRIVAL_LABEL } from '../config'
import { Avatar } from './Avatar'

interface Props {
  people: Person[]
}

// 表示順（来そう → 来るかも）
const ARRIVAL_ORDER: Arrival[] = ['likely', 'maybe']

/** 「いそうな人」を来訪しそう度合いでグループ化して表示。人数は可変。 */
export function People({ people }: Props) {
  return (
    <div className="people">
      <h3 className="people-heading">いそうな人</h3>
      {people.length === 0 ? (
        <p className="people-empty">—</p>
      ) : (
        <div className="people-groups">
          {ARRIVAL_ORDER.map((arrival) => {
            const group = people.filter((p) => p.arrival === arrival)
            if (group.length === 0) return null
            return (
              <div key={arrival} className={`people-group people-group--${arrival}`}>
                <span className="people-group-label">{ARRIVAL_LABEL[arrival]}</span>
                <div className="people-list">
                  {group.map((person) => (
                    <Avatar key={person.name} person={person} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
