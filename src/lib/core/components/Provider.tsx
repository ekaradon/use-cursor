import { ReactNode } from 'react'
import { Provider } from '../context'
import { GlobalStyle } from '../style'
import { Cursor } from './Cursor'
import { HideDefaultCursor } from './HideDefaultCursor'
import { InitCursor } from './InitCursor'

interface CursorProviderProps extends Partial<GlobalStyle> {
  children: ReactNode
  hideDefaultCursor?: boolean
}

export function CursorProvider({
  children,
  hideDefaultCursor = true,
  ...props
}: CursorProviderProps) {
  return (
    <Provider>
      <InitCursor {...props} />
      {children}
      {hideDefaultCursor && <HideDefaultCursor />}
      <Cursor />
    </Provider>
  )
}
