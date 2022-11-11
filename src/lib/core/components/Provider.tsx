import { ReactNode } from 'react'
import { Provider } from '../context'
import { GlobalCursorStyle } from '../style'
import { Cursor } from './Cursor'
import { CursorGlobalStyle } from './CursorGlobalStyle'
import { HideDefaultCursor } from './HideDefaultCursor'
import { InitCursor } from './InitCursor'

interface CursorProviderProps extends Partial<GlobalCursorStyle> {
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
      <InitCursor />
      {children}
      {hideDefaultCursor && <HideDefaultCursor />}
      <CursorGlobalStyle {...props} />
      <Cursor />
    </Provider>
  )
}
