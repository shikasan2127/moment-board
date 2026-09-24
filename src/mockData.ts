// サーバ未接続時の開発用モックデータ（VITE_USE_MOCK=true で使用）。
// 1時間帯に多人数・多活動を含め、スクロール動作を確認できるようにしている。
//
// アバター画像は public/avatars/ の実画像を参照する。

import type { BoardData, BoardPerson } from './types'

function person(name: string): BoardPerson {
  return { name, avatarUrl: `/avatars/${name}.png` }
}

const MEMBERS = [
  'enami',
  'nakamura',
  'hanada',
  'hayashi',
  'natsuki',
  'hiroto',
  'niwa',
  'ryuki',
  'tada',
  'gomamono',
]

export const mockBoardData: BoardData = {
  currentTime: '14:23',
  presence: {
    members: [person('enami'), person('nakamura')],
  },
  hours: [
    {
      hour: 14,
      people: MEMBERS.slice(0, 8).map(person),
      activities: [
        {
          id: 1,
          name: 'スマブラ',
          imageUrl: null,
          minNumber: 3,
          members: MEMBERS.slice(0, 4).map(person),
        },
        {
          id: 2,
          name: 'ボードゲーム',
          imageUrl: null,
          minNumber: 3,
          members: MEMBERS.slice(2, 6).map(person),
        },
        {
          id: 3,
          name: '麻雀',
          imageUrl: null,
          minNumber: 4,
          members: MEMBERS.slice(4, 8).map(person),
        },
        {
          id: 4,
          name: '人狼',
          imageUrl: null,
          minNumber: 5,
          members: MEMBERS.slice(0, 7).map(person),
        },
      ],
    },
    {
      hour: 15,
      people: MEMBERS.slice(1, 5).map(person),
      activities: [
        {
          id: 5,
          name: 'カタン',
          imageUrl: null,
          minNumber: 4,
          members: MEMBERS.slice(1, 5).map(person),
        },
      ],
    },
    {
      hour: 16,
      people: MEMBERS.slice(3, 6).map(person),
      activities: [
        {
          id: 6,
          name: 'マリオカート',
          imageUrl: null,
          minNumber: 2,
          members: MEMBERS.slice(3, 6).map(person),
        },
      ],
    },
    {
      hour: 17,
      people: [],
      activities: [],
    },
  ],
}
