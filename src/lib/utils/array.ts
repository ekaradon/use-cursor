export function isDifferent<T>(data: T): (element: T) => boolean {
  return (comparedTo) => {
    return data !== comparedTo
  }
}
