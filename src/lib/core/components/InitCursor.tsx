import { useCursorStyle } from '../hooks'

/*
 * Things that need to be called before everything else should be put there
 */
export function InitCursor() {
  useCursorStyle(({ width, height }) => ({
    transform: `translateX(calc(-${width} / 2)) translateY(calc(-${height} / 2))`,
  }))

  return null
}
