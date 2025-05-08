export function objectToArray(map: Record<string, unknown>) {
  return Object.keys(map).reduce<string[]>((acc, key) => {
    if (map[key]) {
      acc.push(key);
    }

    return acc;
  }, []);
}
