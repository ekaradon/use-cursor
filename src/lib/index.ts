import { CursorProvider, Presets } from './core'

export const Cursor = {
  Provider: CursorProvider,
  ...Presets,
}

export {
  setGlobalStyle,
  useCursorStyle,
  useCursorStyleOnHover,
  useGlobalStyle,
  useHideSystemCursor,
} from './core'
