import type { Likelihood } from '../types'
import { likelihoodToFace, LIKELIHOOD_LABEL } from '../config'

interface Props {
  level: Likelihood
  size?: number
}

/**
 * 発生しそう度 → 表情アイコン（3種インラインSVG）。
 * happy=やりそう / neutral=やるかも / sad=たぶんやらない
 */
export function FaceIcon({ level, size = 36 }: Props) {
  const face = likelihoodToFace(level)
  const label = LIKELIHOOD_LABEL[level]

  const colors: Record<typeof face, string> = {
    happy: '#f6b93b',
    neutral: '#e0a020',
    sad: '#9aa5b1',
  }
  const color = colors[face]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label={label}
      className="face-icon"
    >
      <circle cx="24" cy="24" r="22" fill={color} />
      {/* 目 */}
      <circle cx="17" cy="20" r="2.6" fill="#3a2f10" />
      <circle cx="31" cy="20" r="2.6" fill="#3a2f10" />
      {/* 口（表情で変化） */}
      {face === 'happy' && (
        <path
          d="M15 29 Q24 38 33 29"
          stroke="#3a2f10"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {face === 'neutral' && (
        <path
          d="M16 31 L32 31"
          stroke="#3a2f10"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {face === 'sad' && (
        <path
          d="M15 33 Q24 25 33 33"
          stroke="#3a2f10"
          strokeWidth="2.8"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
