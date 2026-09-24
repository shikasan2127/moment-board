import { useEffect, useState } from 'react'

/** 現在時刻の "HH:MM" 文字列を返す */
function formatNow(date: Date): string {
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
}

/**
 * 現在時刻を保持し、1分ごとに更新するフック。
 * 共有モニターに常時表示する時計用。
 */
export function useClock(): string {
  const [time, setTime] = useState(() => formatNow(new Date()))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatNow(new Date()))
    }, 1000 * 30) // 30秒ごとに確認し、分が変われば表示が変わる

    return () => clearInterval(id)
  }, [])

  return time
}
