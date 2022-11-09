import { memo } from 'react'
import { useCursorStyle, useGlobalCursorStyle, useStyles } from '../cursor.hooks'
import { computeStyle, GlobalCursorStyle, Style } from '../style'

type CursorProps = Partial<GlobalCursorStyle> & { initialStyle?: Style }

export const Cursor = memo(function Cursor(props: CursorProps) {
  const globalCursorStyle = useGlobalCursorStyle(props)

  useCursorStyle(computeStyle({ style: props.initialStyle, globalCursorStyle }))

  return <div {...useStyles()} />
})
