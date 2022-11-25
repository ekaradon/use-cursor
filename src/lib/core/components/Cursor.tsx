import { memo } from 'react'
import { useStyles } from '../hooks'
import { useStore } from '../store'

export const Cursor = memo(function Cursor() {
  const Template = useStore((state) => state.template)

  return <Template {...useStyles()} />
})
