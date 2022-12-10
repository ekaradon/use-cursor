import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from 'react'
import {
  CursorProvider,
  Effects,
  Shapes,
  Style,
  useCursorStyle,
  useCursorStyleOnHover,
} from './core'

type CursorComponent = (props: { children?: ReactElement; on: 'hover' | 'mount' }) => ReactElement
type UseStyle = typeof useCursorStyle | typeof useCursorStyleOnHover
type CursorComponentProps = { children?: ReactNode; on: 'hover' | 'mount'; useStyle?: UseStyle }

function buildComponentFromRecord<T extends string>(
  record: Record<T, Style>,
): Record<T, CursorComponent> {
  return (Object.entries(record) as Array<[T, Style]>).reduce<Record<T, CursorComponent>>(
    (cursorComponents, [componentName, style]) => ({
      ...cursorComponents,
      [componentName]: ({
        children,
        on,
        useStyle = on === 'hover' ? useCursorStyleOnHover : useCursorStyle,
      }: CursorComponentProps) => {
        const childRef = useStyle(style)

        if (isValidElement(children)) {
          const child = Children.only(children)
          return cloneElement(child, {
            ...children.props,
            ref: (node: any) => {
              childRef.current = node
              const ref = (child as any).ref
              if (typeof ref === 'function') {
                ref(node)
              } else if (ref) {
                ref.current = node
              }
            },
          })
        }
      },
    }),
    {} as Record<T, CursorComponent>,
  )
}

export const Cursor = {
  Provider: CursorProvider,
  Shapes: buildComponentFromRecord(Shapes),
  Effects: buildComponentFromRecord(Effects),
}

export {
  setGlobalStyle,
  useCursorStyle,
  useCursorStyleOnHover,
  useGlobalStyle,
  useHideSystemCursor,
} from './core'
