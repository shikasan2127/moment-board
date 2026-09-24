# サーバサイド要件定義

`stay-watch-slackbot`（`GET /api/board`）が実際に返すデータ契約。
実装は `stay-watch-slackbot/src/service/board.go` を正とする。

---

## 1. 提供するAPI（エンドポイント）

### 1-1. ボードデータ取得

フロントエンドが画面描画に必要なデータをまとめて返す。

```
GET /api/board
```

**レスポンスのイメージ（フロントの `src/types.ts` と対応）**

```json
{
  "currentTime": "14:23",
  "presence": {
    "members": []
  },
  "hours": [
    {
      "hour": 15,
      "people": [
        { "name": "hanada", "avatarUrl": "https://.../hanada.png" }
      ],
      "activities": [
        {
          "id": 5,
          "name": "人狼",
          "imageUrl": "https://.../daycast/events/5.png",
          "minNumber": 3,
          "members": [
            { "name": "hanada", "avatarUrl": "https://.../hanada.png" }
          ]
        }
      ]
    }
  ]
}
```

- `hours` は現在時刻の列を先頭に、最大4列（現在時刻〜3時間後まで、1時間ごと）。`boardHourEnd`（19時）を超える列は出さないため、夜間は列数が減っていく
- `presence.members` は常に空配列。現在の在室者はフロントが StayWatch の在室APIから別途取得して補完する（`src/api/presence.ts`, `src/hooks/useBoardData.ts`）
- `hours[].people`: その時間帯に在室していそうなメンバー（来訪確率が `BOARD_ARRIVAL_MAYBE_THRESHOLD` 以上、かつ予測来訪/退室時刻がその時間帯と重なる人）
- `hours[].activities`: その時間帯に成立しそうな活動。以下の**両方**を満たす活動のみを含む
  1. その時間帯に在室していそうで、かつ活動に関心があるメンバーが `minNumber` 人以上そろう
  2. その活動のGMM時間帯確率（`GetAllActivityProbabilities`）が `BOARD_ACTIVITY_PROBABILITY_THRESHOLD` 以上
- 旧仕様にあった `likelihood`（表情アイコン段階）・`arrival`（来訪度合い）・固定3区分（`noon`/`evening`/`night`）は廃止済み

---

## 2. 内部で必要な処理（実装済み）

### 2-1. 時間帯の算出

`boardHourRange`（`board.go`）が、現在時刻を先頭に最大4時間ぶんの列を返す。`boardHourStart`(11時)より前は11時始まりに、`boardHourEnd`(19時)を超える列は出さない。

### 2-2. 在室予測メンバーの算出

`collectBoardPeople` が、来訪確率が `BOARD_ARRIVAL_MAYBE_THRESHOLD` 以上のユーザーについて、StayWatchの来訪・退室予測時刻（分単位）を取得し、`isPresentAtHour` で時間帯ごとの在室有無を判定する。

### 2-3. 活動の絞り込み（時間帯単位）

`buildBoardActivitiesForHour` が、時間帯ごとに以下を判定する。

- 人数条件: その時間帯に在室していそうで活動に関心があるメンバーが `event.MinNumber` 人以上
- 確率条件: `activity.go` の `GetAllActivityProbabilities`（イベントのログ履歴からGMMで算出した時間帯別発生確率）が閾値 `config.Board.ActivityProbability`（環境変数 `BOARD_ACTIVITY_PROBABILITY_THRESHOLD`、既定 `0.3`）以上

両方を満たす活動だけをその時間帯の `activities` に含める。

### 2-4. 在室情報の提供

現在の在室メンバー一覧は `BoardData.Presence` では常に空配列を返す。フロントエンドが StayWatch の在室APIから直接取得する（サーバ経由にしない）。

---

## 3. Slack連携

### 3-1. アバター画像URLの取得

`user.IconURL`（`model/user.go`）に、Slackから取得したアイコンURLを保存する。`fetchSlackIconURL`（`service/user.go`）で取得し、`POST /api/users/icons/refresh` で全ユーザー分を再取得できる。

### 3-2. 活動ロゴ画像URLの取得

`EventImageURL(ev.ImageKey)`（`service/event_image.go`）が、オブジェクトストレージ（S3互換）に保存された画像キーから公開URLを組み立てて返す。未登録の場合は `null`。

---

## 4. データ更新方式

フロントエンドは `GET /api/board` と StayWatchの在室APIを5分間隔でポーリングする（`useBoardData.ts` の `POLL_INTERVAL_MS`）。取得失敗時は最後に成功したデータを保持したまま `status: 'error'` にする。

---

## 5. 設定値（環境変数）

| 環境変数 | 用途 | 既定値 |
|----------|------|--------|
| `BOARD_ARRIVAL_LIKELY_THRESHOLD` | 来訪確率のしきい値（現状レスポンスには未使用、再調整余地として保持） | 0.5 |
| `BOARD_ARRIVAL_MAYBE_THRESHOLD` | 「来訪・在室していそう」の足切りしきい値 | 0.3 |
| `BOARD_ACTIVITY_PROBABILITY_THRESHOLD` | 活動の時間帯別GMM確率のしきい値。これ未満の活動はその時間帯の一覧に出さない | 0.3 |
