export function createPubSubStore<State>(initialState: State) {
  type Payload<T, U = State> = T extends Function ? never : T | ((previousValue: U) => T)

  const subscribers = new Set<() => void>()
  let state: State = { ...initialState }

  function publish() {
    subscribers.forEach((callback) => callback())
  }

  return Object.freeze({
    get() {
      return state
    },
    set(payload: Payload<Partial<State>>) {
      state = { ...state, ...(typeof payload === 'function' ? payload(state) : payload) }
      publish()
    },
    setProperty<Key extends keyof State, Property = State[Key]>(
      key: Key,
      payload: Payload<Property, Property>,
    ) {
      state = { ...state, [key]: typeof payload === 'function' ? payload(state[key]) : payload }
      publish()
    },
    subscribe(callback: () => void) {
      subscribers.add(callback)
      return () => subscribers.delete(callback)
    },
  })
}
