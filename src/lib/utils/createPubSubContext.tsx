/**
 * This function allow us to use a pubsub store
 * preventing the reload of the whole app even
 * if the provider is used at the root level
 * https://www.youtube.com/watch?v=ZKlXqrcBx88
 * https://github.com/jherr/fast-react-context
 */

import { ReactNode, useCallback, useSyncExternalStore } from 'react'
import { createStrictContext } from './createStrictContext'
import { isDefined } from './data'
import { createPubSubStore } from './pubSubStore'
import { Maybe } from './types'

export function createPubSubContext<State>(initialState: State, name: string) {
  type Payload<T> = T extends Function ? never : T | ((previousValue: T) => T)
  type Dispatch<T = Partial<State>> = (payload: Payload<T>) => void

  const store = createPubSubStore<State>(initialState)

  const [StoreContextProvider, useStoreContext] = createStrictContext<Maybe<typeof store>>({
    name,
  })

  function Provider({ children }: { children: ReactNode }) {
    return <StoreContextProvider value={store}>{children}</StoreContextProvider>
  }

  type Selector<SelectorOutput> = (store: State) => SelectorOutput

  function useStore(): State
  function useStore<SelectorOutput>(selector: Selector<SelectorOutput>): SelectorOutput
  function useStore<SelectorOutput>(selector?: Selector<SelectorOutput>): State | SelectorOutput {
    const store = useStoreContext()

    const state = useSyncExternalStore(
      store.subscribe,
      () => (selector ? selector(store.get()) : store.get()),
      () => (selector ? selector(initialState) : initialState),
    )

    return state
  }

  function useStoreDispatch(): Dispatch
  function useStoreDispatch<Key extends keyof State>(key: Key): Dispatch<State[Key]>
  function useStoreDispatch<Key extends keyof State>(key?: Key): Dispatch | Dispatch<State[Key]> {
    const store = useStoreContext()

    const updateProperty = useCallback(
      (payload: Payload<State[Key]>) => {
        if (key) {
          store.setProperty(key, payload)
        }
      },
      [store, key],
    )

    return key ? updateProperty : store.set
  }

  function setState(state: Payload<Partial<State>>): void
  function setState<Key extends keyof State>(key: Key, property: Payload<State[Key]>): void
  function setState<Key extends keyof State>(
    keyOrState: Key | Payload<Partial<State>>,
    property?: Payload<State[Key]>,
  ) {
    if (typeof keyOrState === 'object') {
      return store.set(keyOrState)
    }
    if (typeof keyOrState === 'string' && isDefined(property)) {
      store.setProperty(keyOrState, property)
    }
  }

  return Object.freeze({
    Provider,
    useStore,
    useStoreDispatch,
    getState: store.get,
    setState,
    subscribe(callback: (state: State) => void) {
      return store.subscribe(() => {
        callback(store.get())
      })
    },
  })
}
