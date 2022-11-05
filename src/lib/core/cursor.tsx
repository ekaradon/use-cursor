import { useEventListener } from '@/hooks/useEventListener'
import { useHover } from '@/hooks/useHover'
import { createPubSubContext } from '@/utils/createPubSubContext'
import { CSSProperties, memo, ReactNode, RefObject, useEffect, useRef } from 'react'

const { Provider, useStore } = createPubSubContext<{ styles: CSSProperties[] }>(
  { styles: [] },
  'Cursor',
)

const defaultCursorStyles: CSSProperties = { position: 'absolute', pointerEvents: 'none' }

function useStyles(initialStyle: CSSProperties = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const initialStyleRef = useRef(initialStyle)
  const [styles, setListOfCSS] = useStore((state) => state.styles)
  const style: CSSProperties = Object.assign({}, defaultCursorStyles, ...styles)

  useEffect(() => {
    if (!initialStyleRef.current) {
      return
    }
    setListOfCSS({ styles: [initialStyleRef.current] })
    return () => setListOfCSS({ styles: [] })
  }, [setListOfCSS])

  useEventListener('mousemove', (event) => {
    if (ref.current) {
      ref.current.style.top = event.pageY + 'px'
      ref.current.style.left = event.pageX + 'px'
    }
  })

  return { ref, style }
}

export function useHideSystemCursor<T extends HTMLElement>(hoverTarget?: RefObject<T>) {
  const root = useRef(document.body)
  const previousCursor = useRef(document.body.style.cursor)
  const target = hoverTarget ?? root

  useHover(
    target,
    () => (document.body.style.cursor = 'none'),
    () => (document.body.style.cursor = previousCursor.current),
  )

  useEffect(() => {
    // Used to enforce hidding the default cursor on page loading
    if (root.current === document.body) {
      document.body.dispatchEvent(
        new MouseEvent('mouseenter', {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      )
    }
  }, [])
}

const Cursor = memo(function Cursor({ initialStyle }: { initialStyle?: CSSProperties }) {
  return <div {...useStyles(initialStyle)} />
})

type CursorProviderProps = {
  children: ReactNode
  hideDefaultCursor?: boolean
  initialStyle?: CSSProperties
}

export function CursorProvider({ children, initialStyle, hideDefaultCursor }: CursorProviderProps) {
  useHideSystemCursor()

  return (
    <Provider>
      {children}
      <Cursor initialStyle={initialStyle} />
    </Provider>
  )
}

export function useCursorOnHover<T extends HTMLElement>(
  ...listOfStyles: [CSSProperties, ...CSSProperties[]]
) {
  const target = useRef<T>(null)
  const styleRef = useRef(Object.assign(...listOfStyles))
  const [styles, setStyles] = useStore((state) => state.styles)

  useHover(
    target,
    () => setStyles({ styles: [...styles, styleRef.current] }),
    () => setStyles({ styles: styles.filter((style) => style !== styleRef.current) }),
  )

  return target
}
