export const objectToArray = (map) => {
  return Object.keys(map).reduce((acc, key) => {
    if (map[key]) {
      acc.push(key);
    }

    return acc;
  }, []);
};
