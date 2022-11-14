import { CursorProvider, Effects, Shapes, Style, useCursorStyle } from './core'

type CursorComponent = () => null

function buildComponentFromRecord<T extends string>(
  record: Record<T, Style>,
): Record<T, CursorComponent> {
  return (Object.entries(record) as Array<[T, Style]>).reduce<Record<T, CursorComponent>>(
    (cursorComponents, [componentName, style]) => ({
      ...cursorComponents,
      [componentName]: () => {
        useCursorStyle(style)
        return null
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
