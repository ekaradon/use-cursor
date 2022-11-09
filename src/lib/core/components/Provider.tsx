import { ReactNode } from 'react'
import { Provider } from '../cursor.context'
import { GlobalCursorStyle, Style } from '../style'
import { Cursor } from './Cursor'
import { HideDefaultCursor } from './HideDefaultCursor'

type CursorProviderProps = {
  children: ReactNode
  hideDefaultCursor?: boolean
  initialStyle?: Style
} & Partial<GlobalCursorStyle>

export function CursorProvider({
  children,
  hideDefaultCursor = true,
  ...cursorStyle
}: CursorProviderProps) {
  return (
    <Provider>
      {children}
      {hideDefaultCursor && <HideDefaultCursor />}
      <Cursor {...cursorStyle} />
    </Provider>
  )
}
