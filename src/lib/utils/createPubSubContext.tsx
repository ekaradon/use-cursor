/**
 * This function allow us to use a pubsub store
 * preventing the reload of the whole app even
 * if the provider is used at the root level
 * https://www.youtube.com/watch?v=ZKlXqrcBx88
 * https://github.com/jherr/fast-react-context
 */

import { ReactNode, useCallback, useRef, useSyncExternalStore } from 'react'
import { createStrictContext } from './createStrictContext'
import { Maybe } from './types'

export function createPubSubContext<Store>(initialState: Store, name: string) {
  type PartialStore = Partial<Store>
  type Payload = PartialStore | ((previousValue: Store) => PartialStore)
  type Dispatch = (payload: Payload) => void

  function useStoreData(): {
    get: () => Store
    set: Dispatch
    subscribe: (callback: () => void) => () => void
  } {
    const store = useRef(initialState)

    const get = useCallback(() => store.current, [])

    const subscribers = useRef(new Set<() => void>())

    const set = useCallback((payload: Payload) => {
      const value: PartialStore = typeof payload === 'function' ? payload(store.current) : payload
      store.current = { ...store.current, ...value }
      subscribers.current.forEach((callback) => callback())
    }, [])

    const subscribe = useCallback((callback: () => void) => {
      subscribers.current.add(callback)
      return () => subscribers.current.delete(callback)
    }, [])

    return {
      get,
      set,
      subscribe,
    }
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>

  const [StoreContextProvider, useStoreContext] = createStrictContext<
    Maybe<UseStoreDataReturnType>
  >({
    name,
  })

  function Provider({ children }: { children: ReactNode }) {
    return <StoreContextProvider value={useStoreData()}>{children}</StoreContextProvider>
  }

  type Selector<SelectorOutput> = (store: Store) => SelectorOutput

  function useStore(): [Store, Dispatch]
  function useStore<SelectorOutput>(selector: Selector<SelectorOutput>): [SelectorOutput, Dispatch]
  function useStore<SelectorOutput>(
    selector?: Selector<SelectorOutput>,
  ): [Store | SelectorOutput, Dispatch] {
    const store = useStoreContext()

    const state = useSyncExternalStore(
      store.subscribe,
      () => (selector ? selector(store.get()) : store.get()),
      () => (selector ? selector(initialState) : initialState),
    )

    return [state, store.set]
  }

  return Object.freeze({
    Provider,
    useStore,
  })
}
