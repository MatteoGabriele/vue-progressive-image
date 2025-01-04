export const isClient: boolean = typeof window !== "undefined";

export const getImage = (): HTMLImageElement | null => {
  return isClient ? new Image() : null;
};

export const createPoll = (
  callback: () => void,
  delay: number
): NodeJS.Timer | null => {
  return isClient ? setInterval(callback, delay) : null;
};
