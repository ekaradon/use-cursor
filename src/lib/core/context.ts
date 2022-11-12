import { createPubSubContext } from '@/utils/createPubSubContext'
import { Maybe } from '@/utils/types'
import { RefObject } from 'react'
import { GlobalStyle, Style } from './style'

export type Store = {
  rules: { style: Style; context?: { target?: RefObject<HTMLElement> } }[]
  globalStyle: GlobalStyle
  cursor: Maybe<HTMLElement>
}

const initialState: Store = {
  rules: [],
  globalStyle: {
    color: 'white',
    height: '40px',
    width: '40px',
  },
  cursor: null,
}

const { Provider, useStore, useStoreDispatch, getState, subscribe } = createPubSubContext<Store>(
  initialState,
  'Cursor',
)

export { Provider, useStore, useStoreDispatch, getState, subscribe }
