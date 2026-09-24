import { useEffect, useState } from 'react'
import { SCREEN_CYCLE_MS } from '../config'

export type ScreenMode = 'activities' | 'presence'

/**
 * 画面1（活動）⇄ 画面2（在室予測）を一定間隔で交互に切り替えるフック。
 * useNightMode / useAutoReload と同じ setInterval パターン。
 */
export function useScreenCycle(): ScreenMode {
  const [mode, setMode] = useState<ScreenMode>('activities')

  useEffect(() => {
    const id = setInterval(() => {
      setMode((prev) => (prev === 'activities' ? 'presence' : 'activities'))
    }, SCREEN_CYCLE_MS)

    return () => clearInterval(id)
  }, [])

  return mode
}
