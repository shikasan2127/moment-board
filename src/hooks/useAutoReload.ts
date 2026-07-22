import { useEffect } from 'react'

/** 自動リロードを実行する時刻（0〜23時） */
const RELOAD_HOUR = 4

/**
 * 共有モニターを長時間つけっぱなしにする運用向けに、
 * 毎日決まった時刻（誰もいない深夜帯）にページ全体をリロードする。
 * メモリリークやJSエラーの蓄積をリセットするための保険。
 */
export function useAutoReload(): void {
  useEffect(() => {
    let lastCheckedDate = new Date().getDate()

    const id = setInterval(() => {
      const now = new Date()
      if (now.getDate() === lastCheckedDate) return
      if (now.getHours() < RELOAD_HOUR) return
      lastCheckedDate = now.getDate()
      window.location.reload()
    }, 1000 * 30)

    return () => clearInterval(id)
  }, [])
}
