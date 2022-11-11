import { isDefined } from '@/utils/data'
import { useEffect } from 'react'
import { useStoreDispatch } from '../context'
import { useCursorStyle } from '../hooks'
import { GlobalStyle } from '../style'

/*
 * Things that need to be called before everything else should be put there
 */
export function InitCursor(props: Partial<GlobalStyle>) {
  const setGlobalStyle = useStoreDispatch('globalStyle')

  useCursorStyle(({ width, height }) => ({
    transform: `translateX(calc(-${width} / 2)) translateY(calc(-${height} / 2))`,
  }))

  useEffect(() => {
    const globalCursorStyle: Partial<GlobalStyle> = Object.entries({
      color: props.color,
      height: props.height,
      width: props.width,
    })
      .filter(([, value]) => isDefined(value))
      .reduce((style, [key, value]) => ({ ...style, [key]: value }), {})

    setGlobalStyle((prev) => ({ ...prev, ...globalCursorStyle }))
  }, [setGlobalStyle, props.color, props.height, props.width])

  return null
}
