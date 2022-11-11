import type { Maybe } from './types'

export function isDifferent<T>(data: T): (element: T) => boolean {
  return (comparedTo) => {
    return data !== comparedTo
  }
}

export function isDefined<T>(data: Maybe<T>): data is T {
  return data !== null && data !== undefined
}

export function mapTuple<T, U>(
  [element, ...tuple]: [T, ...T[]],
  callback: (element: T) => U,
): [U, ...U[]] {
  return [callback(element), ...tuple.map(callback)]
}
