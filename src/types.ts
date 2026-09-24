// 表示データの型定義。stay-watch-slackbot の GET /api/board のレスポンスと対応する。

/** 人物1件（メンバー・在室予測者共通） */
export interface BoardPerson {
  name: string
  avatarUrl: string
}

/** 活動1件（その時間帯に成立しそうな活動） */
export interface BoardActivity {
  id: number
  name: string
  /** 活動ロゴ画像URL。未登録の場合は null */
  imageUrl: string | null
  /** 成立に必要な最低人数 */
  minNumber: number
  /** その時間帯に在室していそうで、かつ関心のあるメンバー */
  members: BoardPerson[]
}

/** タイムライン1時間ぶんの表示データ */
export interface BoardHour {
  /** 時（JST、0〜23） */
  hour: number
  /** この時間に在室していそうな人一覧 */
  people: BoardPerson[]
  /** この時間に成立しそうな活動一覧 */
  activities: BoardActivity[]
}

/** 現在の在室情報 */
export interface BoardPresence {
  members: BoardPerson[]
}

/** 画面全体に渡す表示データ */
export interface BoardData {
  currentTime: string
  presence: BoardPresence
  /** 現在時刻から最大4時間ぶんのタイムライン（1時間ごと） */
  hours: BoardHour[]
}
