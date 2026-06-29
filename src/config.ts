// しきい値・段階 → 見た目の対応を一箇所に集約する。
// likelihood / arrival の段階数や見た目を調整したい場合はここを変更する。

import type { Arrival, Likelihood } from './types'

/** 表情アイコンの種類 */
export type FaceLevel = 'happy' | 'neutral' | 'sad'

/** 発生しそう度 → 表情アイコン段階 */
export const FACE_BY_LIKELIHOOD: Record<Likelihood, FaceLevel> = {
  high: 'happy', // やりそう
  mid: 'neutral', // やるかも
  low: 'sad', // たぶんやらない
}

/** 発生しそう度 → 説明テキスト（凡例やアクセシビリティ用） */
export const LIKELIHOOD_LABEL: Record<Likelihood, string> = {
  high: 'やりそう',
  mid: 'やるかも',
  low: 'たぶんやらない',
}

/** likelihood → 表情アイコン段階を返す */
export function likelihoodToFace(level: Likelihood): FaceLevel {
  return FACE_BY_LIKELIHOOD[level]
}

/** 来訪しそう度合い → アバターの不透明度（来るかも=減光） */
export const AVATAR_OPACITY_BY_ARRIVAL: Record<Arrival, number> = {
  likely: 1, // 来そう = 通常
  maybe: 0.4, // 来るかも = 減光
}

/** 来訪しそう度合い → 説明テキスト */
export const ARRIVAL_LABEL: Record<Arrival, string> = {
  likely: '来そう',
  maybe: '来るかも',
}

/** arrival → 不透明度を返す */
export function arrivalToOpacity(arrival: Arrival): number {
  return AVATAR_OPACITY_BY_ARRIVAL[arrival]
}
