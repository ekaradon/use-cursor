import { CSSProperties } from 'react'
import { GlobalCursorStyle } from '../style'
import { Square } from './Square'

export function Diamond(props: GlobalCursorStyle): CSSProperties {
  return {
    rotate: '45deg',
    ...Square(props),
  }
}
