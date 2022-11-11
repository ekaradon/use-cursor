import { useEventListener } from '@/hooks/useEventListener'
import { useHover } from '@/hooks/useHover'
import { isDefined, isDifferent, mapTuple } from '@/utils/data'
import { CSSProperties, RefObject, useEffect, useRef } from 'react'
import { useStore, useStoreDispatch } from './context'
import { Effect, Effects } from './effects'
import { Shape, Shapes } from './shapes'
import { computeStyle, defaultCursorStyles, GlobalCursorStyle, Style } from './style'

export function useHideSystemCursor<T extends HTMLElement>(hoverTarget?: RefObject<T>) {
  const root = useRef(document.body)
  const previousCursor = useRef(document.body.style.cursor)
  const target = hoverTarget ?? root

  useHover(
    target,
    () => (document.body.style.cursor = 'none'),
    () => (document.body.style.cursor = previousCursor.current),
  )
}

export function useGlobalCursorStyle(): GlobalCursorStyle {
  return useStore((store) => store.globalCursorStyle)
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
  const globalCursorStyle = useStore((state) => state.globalCursorStyle)
  const styles = useStore((state) => state.styles).map((style) =>
    computeStyle({ style, globalCursorStyle }),
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
function useComputeStyleFromPayload() {
  const globalCursorStyle = useStore((state) => state.globalCursorStyle)

  return <T extends CursorStylePayload>(payload: T) => {
    if (typeof payload === 'string') {
      const [namespace, name] = getNamespaceAndName(payload)
      switch (namespace) {
        case 'Effect':
          return computeStyle({ style: Effects[name], globalCursorStyle })
        case 'Shape':
          return computeStyle({ style: Shapes[name], globalCursorStyle })
        default:
          throw Error(`Invalid call to useCursorStyleOnHover(${payload})`)
      }
    }
    return computeStyle({ style: payload, globalCursorStyle })
  }
}

export function useCursorStyleOnHover<T extends HTMLElement>(
  ...payloads: [CursorStylePayload, ...CursorStylePayload[]]
) {
  const target = useRef<T>(null)
  const style = Object.assign(...mapTuple(payloads, useComputeStyleFromPayload()))
  const styleRef = useRef(style)
  const setStyles = useStoreDispatch('styles')

  useHover(
    target,
    () => setStyles((styles) => [...styles, styleRef.current]),
    () => setStyles((styles) => styles.filter(isDifferent(styleRef.current))),
  )

  return target
}
