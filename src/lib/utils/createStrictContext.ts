/*
 * This function allows us to define a context with the following advantages:
 * - No need to check whether or not the context data is initialized (no undefined allowed)
 * - Remove direct access to the Context, only the provider and the hook are provided
 * See references:
 *  - https://juliangaramendy.dev/blog/strict-react-context
 *  - https://dev.to/juliang/why-i-never-use-react-usecontext-4ddf (fallback)
 *  - https://kentcdodds.com/blog/how-to-use-react-context-effectively
 * Example: const [ThingProvider, useThing] = createStrictContext<Thing>({ name: 'Thing' })
 */

import { createContext, useContext } from 'react'
import { Maybe } from './types'

type CreateStrictContextOptions = {
  errorMessage?: string
  name: string
}

export function createStrictContext<T>(options: CreateStrictContextOptions) {
  const Context = createContext<Maybe<T>>(undefined)

  Context.displayName = options.name

  function useStrictContext(): NonNullable<T> {
    const context = useContext(Context)
    if (!context) {
      throw new Error(`[${options.name}] ${options.errorMessage ?? 'Context Provider is missing.'}`)
    }
    return context
  }

  return [Context.Provider, useStrictContext] as const
}
