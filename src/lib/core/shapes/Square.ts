import { rgba } from 'polished'
import { CSSProperties } from 'react'
import { GlobalCursorStyle } from '../style'

export function Square(props: GlobalCursorStyle): CSSProperties {
  return {
    border: `3px solid ${props.color}`,
    boxShadow: `2px -3px 41px -1px ${rgba(props.color, 0.64)}`,
    width: props.width,
    height: props.height,
    transform: `translateX(calc(-${props.width} / 2)) translateY(calc(-${props.height} / 2))`,
  }
}
