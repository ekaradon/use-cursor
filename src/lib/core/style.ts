import { Maybe } from '@/utils/types'
import { CSSProperties, RefObject } from 'react'
import { Effect, Effects } from './effects'
import { Shape, Shapes } from './shapes'

export const defaultCursorStyles: CSSProperties = {
  position: 'absolute',
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

export type EffectStyles = `Effect.${Effect}`
export type ShapeStyles = `Shape.${Shape}`
export type CursorStylePayload = Style | EffectStyles | ShapeStyles

function getNamespaceAndName(style: EffectStyles | ShapeStyles) {
  return style.split('.') as ['Effect', Effect] | ['Shape', Shape]
}

export function getStyleFromPayload<T extends HTMLElement>(target?: RefObject<T>) {
  return (payload: CursorStylePayload): { style: Style; context?: { target?: RefObject<T> } } => {
    function getStyle(): Style {
      if (typeof payload === 'string') {
        const [namespace, name] = getNamespaceAndName(payload)
        switch (namespace) {
          case 'Effect':
            return Effects[name]
          case 'Shape':
            return Shapes[name]
          default:
            throw Error(`Invalid call to useCursorStyleOnHover(${payload})`)
        }
      }
      return payload
    }
    return { style: getStyle(), context: { target } }
  }
}
