import { useEffect, type RefObject } from 'react'
import { AUTO_SCROLL_MS } from '../config'

/**
 * スクロールコンテナを一定間隔で1ページ分下にスクロールし、
 * 末尾まで到達したら先頭に戻すフック。
 * コンテンツが枠に収まっている（スクロール不要）場合は何もしない。
 */
export function useAutoScroll(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const id = setInterval(() => {
      const el = ref.current
      if (!el) return

      const maxScrollTop = el.scrollHeight - el.clientHeight
      if (maxScrollTop <= 0) return

      const atBottom = el.scrollTop >= maxScrollTop - 1
      el.scrollTo({
        top: atBottom ? 0 : el.scrollTop + el.clientHeight,
        behavior: 'smooth',
      })
    }, AUTO_SCROLL_MS)

    return () => clearInterval(id)
  }, [ref])
}
