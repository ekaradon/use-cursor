import { CSSProperties } from 'react'
import { GlobalCursorStyle } from '../style'
import { Ring } from './Ring'

export function Circle(props: GlobalCursorStyle): CSSProperties {
  return {
    ...Ring(props),
    backgroundColor: props.color,
  }
}
