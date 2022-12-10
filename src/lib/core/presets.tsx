import { mergeRefs } from '@/utils/ref'
import { Children, cloneElement, forwardRef, isValidElement, ReactElement, ReactNode } from 'react'
import { Effects } from './effects'
import { useCursorStyle, useCursorStyleOnHover } from './hooks'
import { Shapes } from './shapes'
import { Style } from './style'

type CursorComponent = (props: { children?: ReactElement; on: 'hover' | 'mount' }) => ReactElement
type CursorComponentProps = { children?: ReactNode; on: 'hover' | 'mount' }

const Clone = forwardRef(function CursorComponent({ children }: { children: ReactNode }, ref: any) {
  if (isValidElement(children)) {
    const child = Children.only(children) as any
    return cloneElement(child, { ...children.props, ref: mergeRefs([ref, child.ref]) })
  }
  return null
})

function OnMount({ style, children }: { style: Style; children: ReactNode }) {
  return <Clone ref={useCursorStyle(style)}>{children}</Clone>
}

function OnHover({ style, children }: { style: Style; children: ReactNode }) {
  return <Clone ref={useCursorStyleOnHover(style)}>{children}</Clone>
}

function buildComponentFromRecord<T extends string>(
  record: Record<T, Style>,
): Record<T, CursorComponent> {
  return (Object.entries(record) as Array<[T, Style]>).reduce<Record<T, CursorComponent>>(
    (cursorComponents, [componentName, style]) => ({
      ...cursorComponents,
      [componentName]: ({ children, on }: CursorComponentProps) => {
        return on === 'mount' ? (
          <OnMount style={style}>{children}</OnMount>
        ) : (
          <OnHover style={style}>{children}</OnHover>
        )
      },
    }),
    {} as Record<T, CursorComponent>,
  )
}

export const Presets = {
  Shapes: buildComponentFromRecord(Shapes),
  Effects: buildComponentFromRecord(Effects),
}
