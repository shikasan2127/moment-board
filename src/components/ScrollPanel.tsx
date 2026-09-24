import { forwardRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

/**
 * 縦スクロール可能なコンテナ。ref は useAutoScroll に渡して定期自動スクロールに使う。
 * スクロールバー自体はキオスク表示向けに非表示にする（CSS側で対応）。
 */
export const ScrollPanel = forwardRef<HTMLDivElement, Props>(function ScrollPanel(
  { children, className },
  ref,
) {
  return (
    <div ref={ref} className={`scroll-panel${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
})
