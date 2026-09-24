import { useEffect, useState } from 'react'

/** 画面を暗くし始める時刻（0〜23時） */
const NIGHT_MODE_START_HOUR = 22

/** 画面を明るく戻す時刻（0〜23時） */
const NIGHT_MODE_END_HOUR = 9

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const jstHourFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  hour: 'numeric',
  hourCycle: 'h23',
})

function isNight(date: Date): boolean {
  const hour = Number(jstHourFormat.format(date))
  return hour >= NIGHT_MODE_START_HOUR || hour < NIGHT_MODE_END_HOUR
}

/**
 * 22時〜翌9時の間は true を返すフック。
 * 共有モニターの常時点灯による眩しさ・焼き付きを抑えるための減光表示用。
 *
 * VITE_USE_MOCK=true のときは、モック確認中に実時刻の影響を受けないよう常に false を返す。
 */
export function useNightMode(): boolean {
  const [night, setNight] = useState(() => !USE_MOCK && isNight(new Date()))

  useEffect(() => {
    if (USE_MOCK) return

    const id = setInterval(() => {
      setNight(isNight(new Date()))
    }, 1000 * 60 * 5)

    return () => clearInterval(id)
  }, [])

  return night
}
