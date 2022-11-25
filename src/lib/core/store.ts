import { createPubSubContext } from '@/utils/createPubSubContext'
import { Maybe } from '@/utils/types'
import {
  createElement,
  CSSProperties,
  forwardRef,
  PropsWithRef,
  ReactElement,
  RefObject,
} from 'react'
import { GlobalStyle, Style } from './style'

export type Store = {
  cursor: Maybe<HTMLElement>
  globalStyle: GlobalStyle
  rules: { style: Style; context?: { target?: RefObject<HTMLElement> } }[]
  template: (props: PropsWithRef<{ style: CSSProperties }>) => ReactElement | null
}

const initialState: Store = {
  cursor: null,
  globalStyle: {
    color: '#ffffff',
    height: '40px',
    width: '40px',
  },
  rules: [],
  template: forwardRef((props, ref) => createElement('div', { ...props, ref })),
}

const { Provider, useStore, useStoreDispatch, getState, subscribe, setState } =
  createPubSubContext<Store>(initialState, 'Cursor')

// prettier-ignore
export const setGlobalStyle = (setState<'globalStyle'>).bind(null, 'globalStyle')
// prettier-ignore
export const setRules = (setState<'rules'>).bind(null, 'rules')
// prettier-ignore
export const setCursor = (setState<'cursor'>).bind(null, 'cursor')
export function setTemplate(template: Store['template']) {
  return setState({ template })
}

export { Provider, useStore, useStoreDispatch, getState, subscribe }
