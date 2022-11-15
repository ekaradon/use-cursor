import { RefObject, useRef } from 'react'
import { useEventListener } from './useEventListener'

export function useHover<T extends HTMLElement>(
  onEnter: (event: MouseEvent) => void,
  onExit: (event: MouseEvent) => void,
  target?: RefObject<T>,
) {
  const root = useRef(document.body)
  const hoverTarget = target ?? root

  useEventListener('mouseover', onEnter, hoverTarget)
  useEventListener('mouseout', onExit, hoverTarget)
}
