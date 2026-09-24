import type { BoardPerson } from '../types'

interface Props {
  person: BoardPerson
}

/** メンバー1人分のアイコン＋名前。 */
export function Avatar({ person }: Props) {
  return (
    <div className="avatar" title={person.name}>
      <img src={person.avatarUrl} alt={person.name} className="avatar-img" />
      <span className="avatar-name">{person.name}</span>
    </div>
  )
}
