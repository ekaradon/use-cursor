import { useCursorStyle, useGlobalStyle } from '../hooks'
import { GlobalStyle } from '../style'

/*
 * Things that need to be called before everything else should be put there
 */
export function InitCursor(props: Partial<GlobalStyle>) {
  useGlobalStyle(props)
  useCursorStyle(({ width, height }) => ({
    transform: `translateX(calc(-${width} / 2)) translateY(calc(-${height} / 2))`,
  }))

  return null
}
