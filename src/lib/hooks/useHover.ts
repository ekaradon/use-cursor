import { RefObject } from 'react'
import { useEventListener } from './useEventListener'

export function useHover<T extends HTMLElement>(
  target: RefObject<T>,
  onEnter: () => void,
  onExit: () => void,
) {
  useEventListener('mouseover', onEnter, target)
  useEventListener('mouseout', onExit, target)
}
