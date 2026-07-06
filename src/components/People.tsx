import type { Arrival, Person } from '../types'
import { Avatar } from './Avatar'

interface Props {
  people: Person[]
}

const ARRIVAL_ORDER: Arrival[] = ['likely', 'maybe']

/** 来訪しそうな人を1行で表示（来そう→来るかもの順）。 */
export function People({ people }: Props) {
  const sorted = ARRIVAL_ORDER.flatMap((arrival) =>
    people.filter((p) => p.arrival === arrival)
  )

  return (
    <div className="people">
      {sorted.length === 0 ? (
        <p className="people-empty">—</p>
      ) : (
        <div className="people-row">
          {sorted.map((person) => (
            <Avatar key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  )
}
