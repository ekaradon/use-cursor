import { CSSProperties } from 'react'

export const defaultCursorStyles: CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  overflow: 'hidden',
}

export type GlobalCursorStyle = {
  color: NonNullable<CSSProperties['color']>
  height: NonNullable<CSSProperties['height']>
  width: NonNullable<CSSProperties['width']>
}

export type Style = CSSProperties | ((sharedStyle: GlobalCursorStyle) => CSSProperties)

type ComputeStyleProps = {
  style?: Style
  globalCursorStyle: GlobalCursorStyle
}

export function computeStyle({ style, globalCursorStyle }: ComputeStyleProps): CSSProperties {
  if (!style) {
    return {}
  }
  if (typeof style === 'object') {
    return style
  }
  return style(globalCursorStyle)
}
