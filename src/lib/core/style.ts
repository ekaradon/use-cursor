import { Maybe } from '@/utils/types'
import { CSSProperties, RefObject } from 'react'

export const defaultCursorStyles: CSSProperties = {
  position: 'fixed',
  pointerEvents: 'none',
}

export type GlobalStyle = {
  color: NonNullable<CSSProperties['color']>
  height: NonNullable<CSSProperties['height']>
  width: NonNullable<CSSProperties['width']>
}

interface StyleProps<T extends HTMLElement> extends GlobalStyle {
  cursor?: Maybe<HTMLElement>
  target?: RefObject<T>
}

export type Style<T extends HTMLElement = HTMLElement> =
  | CSSProperties
  | ((sharedStyle: StyleProps<T>) => CSSProperties)

type ComputeStyleProps<T extends HTMLElement> = {
  style?: Style<T>
  globalStyle: GlobalStyle
  target?: RefObject<T>
  cursor?: Maybe<HTMLElement>
}

export function computeStyle<T extends HTMLElement>({
  style,
  globalStyle,
  target,
  cursor,
}: ComputeStyleProps<T>): CSSProperties {
  if (!style) {
    return {}
  }
  if (typeof style === 'object') {
    return style
  }
  return style({ ...globalStyle, target, cursor })
}
