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
    color: '#ffffff',
    height: '40px',
    width: '40px',
  },
  cursor: null,
}

const { Provider, useStore, useStoreDispatch, getState, subscribe, setState } =
  createPubSubContext<Store>(initialState, 'Cursor')

// prettier-ignore
export const setGlobalStyle = (setState<'globalStyle'>).bind(null, 'globalStyle')
// prettier-ignore
export const setRules = (setState<'rules'>).bind(null, 'rules')
// prettier-ignore
export const setCursor = (setState<'cursor'>).bind(null, 'cursor')

export { Provider, useStore, useStoreDispatch, getState, subscribe }
