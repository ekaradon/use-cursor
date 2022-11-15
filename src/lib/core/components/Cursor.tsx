import { memo } from 'react'
import { useStyles } from '../hooks'

export const Cursor = memo(function Cursor() {
  return <div {...useStyles()} />
})
