import { CursorProvider } from './components/Provider'
import { useCursorOnHover, useHideSystemCursor } from './cursor.hooks'
import { Circle, Diamond, Ring, Square } from './shapes'

const Cursor = {
  Provider: CursorProvider,
  Shapes: {
    Ring,
    Circle,
    Square,
    Diamond,
  },
}

export { Cursor, useCursorOnHover, useHideSystemCursor }
