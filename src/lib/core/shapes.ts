import { GlobalStyle, Style } from './style'

const ShapeList = ['Diamond', 'Ring', 'Square'] as const

export type Shape = typeof ShapeList[number]

function Square({ width, height, color }: GlobalStyle) {
  return {
    border: `3px solid ${color}`,
    width,
    height,
  }
}

function Ring(props: GlobalStyle) {
  return {
    ...Square(props),
    borderRadius: '50%',
  }
}

export const Shapes: Record<Shape, Style> = {
  Diamond: (props) => ({
    ...Square(props),
    transform: 'rotate(45deg)',
  }),
  Ring,
  Square,
} as const
