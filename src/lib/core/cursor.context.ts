import { createPubSubContext } from '@/utils/createPubSubContext'
import { CSSProperties } from 'react'
import { GlobalCursorStyle } from './style'

export type Store = {
  globalCursorStyle: GlobalCursorStyle
  styles: CSSProperties[]
  transformations: CSSProperties['transform'][]
}

const initialState: Store = {
  globalCursorStyle: {
    color: 'white',
    height: '40px',
    width: '40px',
  },
  styles: [],
  transformations: [],
}

const { Provider, useStore, useStoreDispatch, getState } = createPubSubContext<Store>(
  initialState,
  'Cursor',
)

export { Provider, useStore, useStoreDispatch, getState }
