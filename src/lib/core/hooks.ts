import { useEventListener } from '@/hooks/useEventListener'
import { useHover } from '@/hooks/useHover'
import { isDefined, isDifferent, mapTuple } from '@/utils/data'
import { CSSProperties, RefObject, useEffect, useRef } from 'react'
import { useStore, useStoreDispatch } from './context'
import { Effect, Effects } from './effects'
import { Shape, Shapes } from './shapes'
import { computeStyle, defaultCursorStyles, GlobalStyle, Style } from './style'

export function useHideSystemCursor<T extends HTMLElement>(hoverTarget?: RefObject<T>) {
  const previousCursor = useRef(document.body.style.cursor)

  useHover(
    () => (document.body.style.cursor = 'none'),
    () => (document.body.style.cursor = previousCursor.current),
    hoverTarget,
  )
}

export function useGlobalStyle(): GlobalStyle {
  return useStore((state) => state.globalStyle)
}

export function useCursorStyle(style: Style) {
  const styleRef = useRef(style)
  const setStyles = useStoreDispatch('styles')

  useEffect(() => {
    const scopedStyle = styleRef.current

    setStyles((styles) => [...styles, scopedStyle])

    return () => {
      setStyles((styles) => styles.filter(isDifferent(scopedStyle)))
    }
  }, [setStyles])
}

export function useStyles() {
  const ref = useRef<HTMLDivElement>(null)
  const globalStyle = useStore((state) => state.globalStyle)
  const styles = useStore((state) => state.styles).map((style) =>
    computeStyle({ style, globalStyle: globalStyle }),
  )
  const transform = styles
    .map(({ transform }) => transform)
    .filter(isDefined)
    .join(' ')
  const style: CSSProperties = Object.assign({}, defaultCursorStyles, ...styles, {
    transform,
  })

  useEventListener('mousemove', (event) => {
    if (ref.current) {
      ref.current.style.top = event.pageY + 'px'
      ref.current.style.left = event.pageX + 'px'
    }
  })

  return { ref, style }
}

type EffectStyles = `Effect.${Effect}`
type ShapeStyles = `Shape.${Shape}`

function getNamespaceAndName(style: EffectStyles | ShapeStyles) {
  return style.split('.') as ['Effect', Effect] | ['Shape', Shape]
}

type CursorStylePayload = Style | EffectStyles | ShapeStyles
function useComputeStyleFromPayload<T extends HTMLElement>(target: RefObject<T>) {
  const globalStyle = useStore((state) => state.globalStyle)

  return <T extends CursorStylePayload>(payload: T) => {
    if (typeof payload === 'string') {
      const [namespace, name] = getNamespaceAndName(payload)
      switch (namespace) {
        case 'Effect':
          return computeStyle({ style: Effects[name], globalStyle, target })
        case 'Shape':
          return computeStyle({ style: Shapes[name], globalStyle, target })
        default:
          throw Error(`Invalid call to useCursorStyleOnHover(${payload})`)
      }
    }
    return computeStyle({ style: payload, globalStyle, target })
  }
}

export function useCursorStyleOnHover<T extends HTMLElement>(
  ...payloads: [CursorStylePayload, ...CursorStylePayload[]]
) {
  const target = useRef<T>(null)
  const style = Object.assign(...mapTuple(payloads, useComputeStyleFromPayload(target)))
  const styleRef = useRef(style)
  const setStyles = useStoreDispatch('styles')

  useHover(
    () => setStyles((styles) => [...styles, styleRef.current]),
    () => setStyles((styles) => styles.filter(isDifferent(styleRef.current))),
    target,
  )

  return target
}
