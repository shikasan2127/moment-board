// サーバ実装前の仮データ。確定デザイン（計画書 §2）を再現する。
// 将来は useBoardData の中でAPIレスポンスに差し替える。
//
// アバター画像は public/avatars/ の実画像を参照する。

import type { BoardData } from './types'

export const mockBoardData: BoardData = {
  currentTime: '14:23',
  presence: {
    members: [
      { name: 'enami', avatarUrl: '/avatars/enami.png' },
      { name: 'nakamura', avatarUrl: '/avatars/nakamura.png' },
    ],
  },
  timeBlocks: [
    {
      id: 'noon',
      label: '昼',
      range: '〜15時',
      isNow: true,
      activities: [
        { name: 'スマブラ', likelihood: 'high', headcount: 4 },
        { name: 'ボードゲーム', likelihood: 'mid', headcount: 3 },
        { name: '麻雀', likelihood: 'low', headcount: 4 },
      ],
      people: [
        { name: 'hanada', avatarUrl: '/avatars/hanada.png', arrival: 'likely' },
        { name: 'hayashi', avatarUrl: '/avatars/hayashi.png', arrival: 'likely' },
        { name: 'natsuki', avatarUrl: '/avatars/natsuki.png', arrival: 'maybe' },
      ],
    },
    {
      id: 'evening',
      label: '夕方',
      range: 'もうすぐ',
      isNow: false,
      activities: [
        { name: 'カタン', likelihood: 'high', headcount: 4 },
        { name: 'スマブラ', likelihood: 'high', headcount: 5 },
        { name: '麻雀', likelihood: 'mid', headcount: 4 },
        { name: '人狼', likelihood: 'low', headcount: 7 },
      ],
      people: [
        { name: 'hayashi', avatarUrl: '/avatars/hayashi.png', arrival: 'likely' },
        { name: 'natsuki', avatarUrl: '/avatars/natsuki.png', arrival: 'likely' },
        { name: 'hiroto', avatarUrl: '/avatars/hiroto.png', arrival: 'likely' },
        { name: 'niwa', avatarUrl: '/avatars/niwa.png', arrival: 'maybe' },
      ],
    },
    {
      id: 'night',
      label: '夜',
      range: '19時〜',
      isNow: false,
      activities: [
        { name: 'スマブラ', likelihood: 'mid', headcount: 3 },
        { name: 'マリカ', likelihood: 'low', headcount: 4 },
      ],
      people: [
        { name: 'ryuki', avatarUrl: '/avatars/ryuki.png', arrival: 'maybe' },
        { name: 'tada', avatarUrl: '/avatars/tada.png', arrival: 'maybe' },
        { name: 'gomamono', avatarUrl: '/avatars/gomamono.png', arrival: 'maybe' },
      ],
    },
  ],
}
