import { useEffect, useState } from 'react'

/** 画面を暗くし始める時刻（0〜23時） */
const NIGHT_MODE_START_HOUR = 22

/** 画面を明るく戻す時刻（0〜23時） */
const NIGHT_MODE_END_HOUR = 9

function isNight(date: Date): boolean {
  return date.getHours() >= NIGHT_MODE_START_HOUR || date.getHours() < NIGHT_MODE_END_HOUR
}

/**
 * 22時〜翌9時の間は true を返すフック。
 * 共有モニターの常時点灯による眩しさ・焼き付きを抑えるための減光表示用。
 */
export function useNightMode(): boolean {
  const [night, setNight] = useState(() => isNight(new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setNight(isNight(new Date()))
    }, 1000 * 60 * 5)

    return () => clearInterval(id)
  }, [])

  return night
}
