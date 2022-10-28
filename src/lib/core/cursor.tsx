import { useEventListener } from '@/hooks/useEventListener'
import { createPubSubContext } from '@/utils/createPubSubContext'
import { CSSProperties, memo, ReactNode, useEffect, useRef } from 'react'

const { Provider, useStore } = createPubSubContext<{ styles: CSSProperties[] }>(
  { styles: [] },
  'Cursor',
)

const defaultCursorStyles: CSSProperties = { position: 'absolute', pointerEvents: 'none' }

function useInitialStyle(initialStyle: CSSProperties = {}) {
  const initialStyleRef = useRef(initialStyle)
  const [, setListOfCSS] = useStore()

  useEffect(() => {
    if (!initialStyleRef.current) {
      return
    }
    setListOfCSS({ styles: [initialStyleRef.current] })
    return () => setListOfCSS({ styles: [] })
  }, [setListOfCSS])
}

function useStyles() {
  const ref = useRef<HTMLDivElement>(null)
  const [styles] = useStore((state) => state.styles)
  const style: CSSProperties = Object.assign({}, defaultCursorStyles, ...styles)

  useEventListener('mousemove', (event) => {
    if (ref.current) {
      ref.current.style.top = event.pageY + 'px'
      ref.current.style.left = event.pageX + 'px'
    }
  })

  return { ref, style }
}

const Cursor = memo(function Cursor({ initialStyle }: { initialStyle?: CSSProperties }) {
  useInitialStyle(initialStyle)

  return <div {...useStyles()} />
})

type CursorProviderProps = {
  children: ReactNode
  hideCursor?: boolean
  initialStyle?: CSSProperties
}

export function CursorProvider({ children, initialStyle, hideCursor = true }: CursorProviderProps) {
  useEffect(() => {
    if (!hideCursor) {
      return
    }
    const previousCursor = document.body.style.cursor
    document.body.style.cursor = 'none'

    return () => {
      document.body.style.cursor = previousCursor
    }
  }, [hideCursor])

  return (
    <Provider>
      {children}
      <Cursor initialStyle={initialStyle} />
    </Provider>
  )
}

export function useCursorOnHover<T extends HTMLElement>(style: CSSProperties) {
  const targetRef = useRef<T>(null)
  const styleRef = useRef(style)
  const [styles, setStyles] = useStore((state) => state.styles)

  useEventListener(
    'mouseenter',
    () => setStyles({ styles: [...styles, styleRef.current] }),
    targetRef,
  )

  useEventListener(
    'mouseleave',
    () => setStyles({ styles: styles.filter((style) => style !== styleRef.current) }),
    targetRef,
  )

  return targetRef
}
