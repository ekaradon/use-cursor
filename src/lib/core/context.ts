import { createPubSubContext } from '@/utils/createPubSubContext'
import { GlobalCursorStyle, Style } from './style'

export type Store = {
  globalCursorStyle: GlobalCursorStyle
  styles: Style[]
}

const initialState: Store = {
  globalCursorStyle: {
    color: 'white',
    height: '40px',
    width: '40px',
  },
  styles: [],
}

const { Provider, useStore, useStoreDispatch, getState } = createPubSubContext<Store>(
  initialState,
  'Cursor',
)

export { Provider, useStore, useStoreDispatch, getState }
