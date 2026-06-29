// 表示データの型定義。
// この型はそのまま将来のAPIレスポンス仕様の叩き台となる。

/** 活動の発生しそう度（表情アイコンに対応） */
export type Likelihood = 'high' | 'mid' | 'low'

/** メンバーの来訪しそう度合い（来そう / 来るかも） */
export type Arrival = 'likely' | 'maybe'

/** 時間帯のID */
export type TimeBlockId = 'noon' | 'evening' | 'night'

/** 活動1件 */
export interface Activity {
  name: string
  likelihood: Likelihood
  /** その活動に集まりそうな人数（予想参加人数） */
  headcount: number
}

/** 人物1件（今後きそうな人） */
export interface Person {
  name: string
  avatarUrl: string
  arrival: Arrival
}

/** 現在すでに在室している人 */
export interface PresentMember {
  name: string
  avatarUrl: string
}

/** 1時間帯（昼 / 夕方 / 夜） */
export interface TimeBlock {
  id: TimeBlockId
  label: string // 「昼」など
  range: string // 「〜15時」など
  isNow: boolean
  activities: Activity[]
  people: Person[]
}

/** 画面全体に渡す表示データ */
export interface BoardData {
  currentTime: string
  presence: { members: PresentMember[] }
  timeBlocks: TimeBlock[]
}
