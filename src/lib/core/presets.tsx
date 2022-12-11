import { mergeRefs } from '@/utils/ref'
import { Children, cloneElement, forwardRef, isValidElement, ReactElement, ReactNode } from 'react'
import { Effects } from './effects'
import { useCursorStyle, useCursorStyleOnHover } from './hooks'
import { Shapes } from './shapes'
import { Style } from './style'

const hoverOnlyComponents = [Effects.Zoom] as const

type HoverOnlyComponents = typeof hoverOnlyComponents[number]
type ComponentProps<T extends string> = T extends 'hover'
  ? { on: T; children: ReactElement }
  : { on: T; children?: ReactElement }
type Component<T> = (
  props: ComponentProps<T extends HoverOnlyComponents ? 'hover' : 'hover' | 'mount'>,
) => ReactElement
type Presets<T> = { [K in keyof T]: Component<T[K]> }

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

function buildComponentFromRecord<T extends Record<string, Style>>(data: T): Presets<T> {
  return Object.entries(data).reduce<Partial<Presets<T>>>(
    (presets, [presetName, preset]) => ({
      ...presets,
      [presetName]: ({ children, on }) =>
        on === 'mount' ? (
          <OnMount style={preset}>{children}</OnMount>
        ) : (
          <OnHover style={preset}>{children}</OnHover>
        ),
    }),
    {},
  ) as Presets<T>
}

const AllPresets = {
  Shapes: buildComponentFromRecord(Shapes),
  Effects: buildComponentFromRecord(Effects),
} as const

export { AllPresets as Presets }
