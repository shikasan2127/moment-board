import type { BoardPerson } from '../types'
import { Avatar } from './Avatar'

interface Props {
  people: BoardPerson[]
}

/** メンバーのアイコンを重ねずに並べるグリッド。収まりきらない分は親のスクロールで見せる。 */
export function PersonGrid({ people }: Props) {
  if (people.length === 0) {
    return <p className="people-empty">—</p>
  }

  return (
    <div className="person-grid">
      {people.map((person) => (
        <Avatar key={person.name} person={person} />
      ))}
    </div>
  )
}
