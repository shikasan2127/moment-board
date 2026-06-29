import { useBoardData } from '../hooks/useBoardData'
import { Header } from './Header'
import { TimeBlock } from './TimeBlock'

/** 画面全体。データを受け取り各部に配る。 */
export function Board() {
  const data = useBoardData()

  return (
    <div className="board">
      <Header currentTime={data.currentTime} members={data.presence.members} />

      <main className="board-grid">
        {data.timeBlocks.map((block) => (
          <TimeBlock
            key={block.id}
            block={block}
            presentCount={data.presence.members.length}
          />
        ))}
      </main>
    </div>
  )
}
