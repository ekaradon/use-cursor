import { GlobalCursorStyle, Style } from './style'

const ShapeList = ['Circle', 'Diamond', 'Ring', 'Square'] as const

export type Shape = typeof ShapeList[number]

function Square({ width, height, color }: GlobalCursorStyle) {
  return {
    border: `3px solid ${color}`,
    width,
    height,
  }
}

function Ring(props: GlobalCursorStyle) {
  return {
    ...Square(props),
    borderRadius: '50%',
  }
}

export const Shapes: Record<Shape, Style> = {
  Circle: (props) => ({
    ...Ring(props),
    backgroundColor: props.color,
  }),
  Diamond: (props) => ({
    ...Square(props),
    transform: 'rotate(45deg)',
  }),
  Ring,
  Square,
} as const
