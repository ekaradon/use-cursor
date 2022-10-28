import { useCallback, useRef } from 'react'

type Payload<Store> = Partial<Store> | ((previousValue: Store) => Partial<Store>)
type Dispatch<Store> = (payload: Payload<Store>) => void
type PubSubStore<Store> = {
  get: () => Store
  set: Dispatch<Store>
  subscribe: (callback: () => void) => () => void
}

export function usePubSubStore<Store>(initialState: Store): PubSubStore<Store> {
  const store = useRef(initialState)
  const subscribers = useRef(new Set<() => void>())

  return Object.freeze({
    get: useCallback(() => store.current, []),
    set: useCallback((payload: Payload<Store>) => {
      const value: Partial<Store> = typeof payload === 'function' ? payload(store.current) : payload
      store.current = { ...store.current, ...value }
      subscribers.current.forEach((callback) => callback())
    }, []),
    subscribe: useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, []),
  })
}
