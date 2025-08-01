/**
 * Removes attributes from an object that are null or undefined.
 * @param obj - The object to clean
 * @returns A new object without null or undefined values
 */
export function removeBlankAttributes<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  const result: Partial<T> = {}
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      result[key] = obj[key]
    }
  }
  return result
}
