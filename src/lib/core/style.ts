import { CSSProperties, RefObject } from 'react'

export const defaultCursorStyles: CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  overflow: 'hidden',
}

export type GlobalStyle = {
  color: NonNullable<CSSProperties['color']>
  height: NonNullable<CSSProperties['height']>
  width: NonNullable<CSSProperties['width']>
}

interface StyleProps<T extends HTMLElement> extends GlobalStyle {
  target?: RefObject<T>
}

export type Style<T extends HTMLElement = HTMLElement> =
  | CSSProperties
  | ((sharedStyle: StyleProps<T>) => CSSProperties)

type ComputeStyleProps<T extends HTMLElement> = {
  style?: Style<T>
  globalStyle: GlobalStyle
  target?: RefObject<T>
}

export function computeStyle<T extends HTMLElement>({
  style,
  globalStyle,
  target,
}: ComputeStyleProps<T>): CSSProperties {
  if (!style) {
    return {}
  }
  if (typeof style === 'object') {
    return style
  }
  return style({ ...globalStyle, target })
}
