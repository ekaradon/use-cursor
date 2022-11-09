import { CSSProperties } from 'react'
import { GlobalCursorStyle } from '../style'
import { Square } from './Square'

export function Ring(props: GlobalCursorStyle): CSSProperties {
  return {
    ...Square(props),
    borderRadius: '50%',
  }
}
