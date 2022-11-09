import { useEventListener } from '@/hooks/useEventListener'
import { useHover } from '@/hooks/useHover'
import { isDifferent } from '@/utils/array'
import { CSSProperties, RefObject, useEffect, useMemo, useRef } from 'react'
import { getState, useStore, useStoreDispatch } from './cursor.context'
import { computeStyle, defaultCursorStyles, GlobalCursorStyle, Style } from './style'

export function useHideSystemCursor<T extends HTMLElement>(hoverTarget?: RefObject<T>) {
  const root = useRef(document.body)
  const previousCursor = useRef(document.body.style.cursor)
  const target = hoverTarget ?? root

  useHover(
    target,
    () => (document.body.style.cursor = 'none'),
    () => (document.body.style.cursor = previousCursor.current),
  )
}

export function useGlobalCursorStyle(cursorStyle: Partial<GlobalCursorStyle>): GlobalCursorStyle {
  const { globalCursorStyle } = getState()

  return useMemo(
    () => ({
      color: cursorStyle.color ?? globalCursorStyle.color,
      height: cursorStyle.height ?? globalCursorStyle.height,
      width: cursorStyle.width ?? globalCursorStyle.width,
    }),
    [globalCursorStyle, cursorStyle.color, cursorStyle.height, cursorStyle.width],
  )
}

export function useCursorStyle(style: Style) {
  const globalCursorStyle = useStore((state) => state.globalCursorStyle)
  const styleRef = useRef(computeStyle({ style, globalCursorStyle }))
  const setStyles = useStoreDispatch('styles')

  useEffect(() => {
    const css = styleRef.current
    setStyles((styles) => [...styles, css])
    return () => setStyles((styles) => styles.filter(isDifferent(css)))
  }, [setStyles])
}

export function useStyles() {
  const ref = useRef<HTMLDivElement>(null)
  const styles = useStore((state) => state.styles)
  const style: CSSProperties = Object.assign({}, defaultCursorStyles, ...styles)

  useEventListener('mousemove', (event) => {
    if (ref.current) {
      ref.current.style.top = event.pageY + 'px'
      ref.current.style.left = event.pageX + 'px'
    }
  })

  return { ref, style }
}

export function useCursorOnHover<T extends HTMLElement>(
  ...listOfStyles: [CSSProperties, ...CSSProperties[]]
) {
  const target = useRef<T>(null)
  const styleRef = useRef(Object.assign(...listOfStyles))
  const setStyles = useStoreDispatch('styles')

  useHover(
    target,
    () => setStyles((styles) => [...styles, styleRef.current]),
    () => setStyles((styles) => styles.filter(isDifferent(styleRef.current))),
  )

  return target
}
