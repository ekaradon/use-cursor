import { isDefined } from '@/utils/data'
import { useEffect } from 'react'
import { useStoreDispatch } from '../context'
import { GlobalCursorStyle } from '../style'

export function CursorGlobalStyle(props: Partial<GlobalCursorStyle>) {
  const setGlobalCursorStyle = useStoreDispatch('globalCursorStyle')

  useEffect(() => {
    const globalCursorStyle: Partial<GlobalCursorStyle> = Object.entries({
      color: props.color,
      height: props.height,
      width: props.width,
    })
      .filter(([, value]) => isDefined(value))
      .reduce((style, [key, value]) => ({ ...style, [key]: value }), {})

    setGlobalCursorStyle((prev) => ({ ...prev, ...globalCursorStyle }))
  }, [setGlobalCursorStyle, props.color, props.height, props.width])

  return null
}
