import { createPubSubContext } from '@/utils/createPubSubContext'
import { GlobalStyle, Style } from './style'

export type Store = {
  styles: Style[]
  globalStyle: GlobalStyle
}

const initialState: Store = {
  styles: [],
  globalStyle: {
    color: 'white',
    height: '40px',
    width: '40px',
  },
}

const { Provider, useStore, useStoreDispatch, getState, subscribe } = createPubSubContext<Store>(
  initialState,
  'Cursor',
)

export { Provider, useStore, useStoreDispatch, getState, subscribe }
