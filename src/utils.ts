/**
 * Returns an array of keys from the input object whose values are truthy.
 *
 * @param map - An object with string keys and values of any type.
 * @returns An array of keys from {@link map} where the corresponding value is truthy.
 */
export function objectToArray(map: Record<string, unknown>) {
  return Object.keys(map).reduce<string[]>((acc, key) => {
    if (map[key]) {
      acc.push(key);
    }

    return acc;
  }, []);
}
