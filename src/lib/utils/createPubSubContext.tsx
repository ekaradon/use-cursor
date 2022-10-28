/**
 * This function allow us to use a pubsub store
 * preventing the reload of the whole app even
 * if the provider is used at the root level
 * https://www.youtube.com/watch?v=ZKlXqrcBx88
 * https://github.com/jherr/fast-react-context
 */

import { ReactNode, useSyncExternalStore } from 'react'
import { createStrictContext } from './createStrictContext'
import { usePubSubStore } from './pubSubStore'
import { Maybe } from './types'

export function createPubSubContext<Store>(initialState: Store, name: string) {
  type Payload = Partial<Store> | ((previousValue: Store) => Partial<Store>)
  type Dispatch = (payload: Payload) => void

  const useStoreData = usePubSubStore<Store>

  const [StoreContextProvider, useStoreContext] = createStrictContext<
    Maybe<ReturnType<typeof useStoreData>>
  >({
    name,
  })

  function Provider({ children }: { children: ReactNode }) {
    return (
      <StoreContextProvider value={useStoreData(initialState)}>{children}</StoreContextProvider>
    )
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
